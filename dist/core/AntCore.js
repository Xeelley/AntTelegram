"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
const Telegram = require("node-telegram-bot-api");
const AntTypes = require("./types");
const CommandParser_1 = require("../utils/CommandParser");
class AntCore extends events_1.EventEmitter {
    constructor(token, config) {
        super();
        this.Types = AntTypes;
        this.botListeners = {};
        this.commands = {};
        this.liveLocationListeners = [];
        this.startCommandListeners = [];
        if (!config.getStatus)
            throw new Error('Ant: config.getStatus not provided! This field is mandatory.');
        if (!config.setStatus)
            throw new Error('Ant: config.setStatus not provided! This field is mandatory.');
        config.maskSeparator = config.maskSeparator || ':';
        config.useWebhook = config.useWebhook || false;
        this.config = config;
        this.api = new Telegram(token, { polling: !this.config.useWebhook });
        this.api.on('error', (err) => {
            this.emit('error', err);
            this.emit('Error', err);
        });
        this.api.on('polling_error', (err) => {
            this.emit('polling_error', err);
            this.emit('Error', err);
        });
        this.api.on('webhook_error', (err) => {
            this.emit('webhook_error', err);
            this.emit('Error', err);
        });
        this.init();
    }
    command(command, method) {
        this.commands[command] = method;
    }
    onStart(method) {
        this.startCommandListeners.push(method);
    }
    status(chat_id, status) {
        return this.config.setStatus(chat_id, status);
    }
    on(event, listener) {
        super.on(event, listener);
    }
    init() {
        this.addListeners();
        this.addBasicListeners();
        this.addDirectListeners();
    }
    addListeners() {
        this.api.on('message', (message) => {
            if (!message.text)
                return;
            const text = message.text;
            const chatId = message.chat.id;
            const messageId = message.message_id;
            const command = text.indexOf('?') !== -1 ?
                text.slice(0, text.indexOf('?')) : text;
            if (Object.keys(this.commands).includes(command)) {
                return this.commands[command](chatId, CommandParser_1.CommandParser.parse(text), message);
            }
            if (text.slice(0, 6) === '/start') {
                return this.startCommandHandler(message);
            }
            this.checkStatus(chatId, 'message', text, messageId);
        });
        this.api.on('successful_payment', (data) => {
            this.checkStatus(data.from.id, 'successful_payment', data.successful_payment);
        });
        this.api.on('pre_checkout_query', (query) => {
            this.api.answerPreCheckoutQuery(query.id, true, null).then(() => {
                this.checkStatus(query.from.id, 'pre_checkout_query', query);
            }).catch((err) => this.onError(query.from.id, err));
        });
        this.api.on('callback_query', (query) => {
            const data = JSON.parse(query.data);
            this.api.answerCallbackQuery(query.id, { show_alert: true }).then(() => {
                if (!!~Object.keys(this.botListeners.callback_query).indexOf(data.t)) {
                    this.botListeners.callback_query[data.t](query.message.chat.id, data.d, query.message.message_id);
                }
            }).catch((err) => this.onError(query.message.chat.id, err));
        });
        this.api.on('inline_query', (query) => {
            this.checkStatus(query.from.id, 'inline_query', query.query);
        });
        this.api.on('edited_message', (message) => {
            if (message.location) {
                this.liveLocationHandler(message);
            }
            else {
                this.checkStatus(message.chat.id, 'edited_message', message);
            }
        });
    }
    addDirectListeners() {
        const types = [
            'animation', 'channel_chat_created', 'delete_chat_photo', 'group_chat_created',
            'left_chat_member', 'migrate_from_chat_id', 'migrate_to_chat_id', 'new_chat_members',
            'new_chat_photo', 'new_chat_title', 'passport_data', 'pinned_message', 'supergroup_chat_created',
            'edited_message_text', 'edited_message_caption', 'shipping_query',
        ];
        types.forEach((type) => {
            this.api.on(type, (message) => {
                const chatId = message.chat ? message.chat.id : message.from.id;
                if (chatId)
                    this.checkStatus(chatId, type, message);
            });
        }, this);
    }
    addBasicListeners() {
        const types = [
            'audio', 'contact', 'document', 'game', 'invoice', 'location', 'photo', 'sticker', 'text',
            'video', 'video_note', 'voice'
        ];
        types.forEach(type => {
            this.api.on(type, (message) => {
                const chatId = message.chat.id;
                const data = type !== '*' ? message[type] : null;
                this.checkStatus(chatId, type, data, message);
            });
        }, this);
    }
    checkStatus(chat_id, type, data, extra) {
        this.config.getStatus(chat_id)
            .then(status => {
            if (!status)
                return;
            this.botListeners['*'] = this.botListeners['*'] || {};
            if (Object.keys(this.botListeners['*']).includes(status) && typeof extra === 'object') {
                this.botListeners['*'][status](extra);
            }
            this.botListeners[type] = this.botListeners[type] || {};
            if (Object.keys(this.botListeners[type]).includes(status)) {
                return this.botListeners[type][status](chat_id, data, extra);
            }
            else {
                for (let i in Object.keys(this.botListeners[type])) {
                    const listener = Object.keys(this.botListeners[type])[i];
                    if (this.isMask(listener) && this.isMatch(status, listener)) {
                        return this.botListeners[type][listener](chat_id, data, this.isMatch(status, listener));
                    }
                }
            }
        })
            .catch((err) => this.onError(chat_id, err));
    }
    liveLocationHandler(message) {
        const chatId = message.chat.id;
        this.liveLocationListeners.forEach((listener) => {
            return listener(chatId, message.location);
        }, this);
    }
    startCommandHandler(message) {
        this.startCommandListeners.forEach(listener => listener(message.chat.id, message.text.slice(7), message));
    }
    onError(id, err) {
        this.emit('chat_error', id, err);
        this.emit('Error', Object.assign(err, { chat_id: id }));
    }
    isMask(mask) {
        return mask.split(this.config.maskSeparator).includes('*');
    }
    isMatch(status, mask) {
        if (mask === '*')
            return status;
        const statusLevels = status.split(this.config.maskSeparator);
        const maskLevels = mask.split(this.config.maskSeparator);
        let maskMatch;
        if (maskLevels.length !== statusLevels.length) {
            return null;
        }
        for (let i = 0; i < maskLevels.length; i++) {
            if (maskLevels[i] !== '*') {
                if (maskLevels[i] !== statusLevels[i]) {
                    return null;
                }
            }
            else {
                maskMatch = statusLevels[i];
            }
        }
        return maskMatch;
    }
}
exports.AntCore = AntCore;
