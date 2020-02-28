
import { EventEmitter } from 'events';
import * as Telegram from 'node-telegram-bot-api';
import * as AntTypes from './types';

import * as T from './t';

import { CommandParser } from '../utils/CommandParser';


export class AntCore extends EventEmitter {
    
    public api: Telegram;
    public Types = AntTypes;
    
    private config: T.AntTelegramConfig;
    
    protected botListeners: T.Listeners = {};
    protected commands: T.Commands = {};
    protected liveLocationListeners: Function[] = [];
    protected startCommandListeners: T.StartCommandCallback[] = [];


    constructor(token: string, config: T.AntTelegramConfig) {
        super();
        
        if (!config.getStatus) throw new Error('Ant: config.getStatus not provided! This field is mandatory.');
        if (!config.setStatus) throw new Error('Ant: config.setStatus not provided! This field is mandatory.');
        config.maskSeparator = config.maskSeparator || ':'; 
        config.useWebhook    = config.useWebhook || false;
        this.config = config;

        this.api = new Telegram(token, { polling: !this.config.useWebhook });


        this.api.on('error',         (err: Error) => {
            this.emit('error', err);
            this.emit('Error', err);
        });
        this.api.on('polling_error', (err: Error) => {
            this.emit('polling_error', err);
            this.emit('Error', err);
        });
        this.api.on('webhook_error', (err: Error) => {
            this.emit('webhook_error', err);
            this.emit('Error', err);
        });

        this.init();

    }

    public command(command: string, method: T.CommandCallback) {
        this.commands[command] = method;
    }

    public onStart(method: T.StartCommandCallback) {
        this.startCommandListeners.push(method);
    }

    public status(chat_id: number, status: string): Promise<any> {
        return this.config.setStatus(chat_id, status);
    }

    public on(event: T.AntTelegramEvent, listener: (...args: any[]) => void): any {
        super.on(event, listener);
    }

    private init() {
        this.addListeners();
        this.addBasicListeners();
        this.addDirectListeners();
    }

    private addListeners() {
        this.api.on('message', (message: Telegram.Message) => {
            if (!message.text) return;
            const text      = message.text;
            const chatId    = message.chat.id;
            const messageId = message.message_id; 

            const command = text.indexOf('?') !== -1 ?
                text.slice(0, text.indexOf('?')) : text;
    
            if (Object.keys(this.commands).includes(command)) {
                return this.commands[command](chatId, CommandParser.parse(text), message);
            } 
            if (text.slice(0, 6) === '/start') {
                return this.startCommandHandler(message);
            }
            this.checkStatus(chatId, 'message', text, messageId);
        });
        this.api.on('successful_payment', (data: Telegram.Message) => {
            this.checkStatus(data.from.id, 'successful_payment', data.successful_payment);
        });
        this.api.on('pre_checkout_query', (query: Telegram.PreCheckoutQuery) => {
            this.api.answerPreCheckoutQuery(query.id, true, null).then(() => {
                this.checkStatus(query.from.id, 'pre_checkout_query', query);
            }).catch((err: Error) => this.onError(query.from.id, err));
        });
        this.api.on('callback_query', (query: Telegram.CallbackQuery) => {
            const data      = JSON.parse(query.data);
            this.api.answerCallbackQuery(query.id, { show_alert: true }).then(() => {
                if (!!~Object.keys(this.botListeners.callback_query).indexOf(data.t)) {
                    this.botListeners.callback_query[data.t](query.message.chat.id, data.d, query.message.message_id);
                }
            }).catch((err: Error) => this.onError(query.message.chat.id, err));
        });
        this.api.on('inline_query', (query: Telegram.InlineQuery) => {
            this.checkStatus(query.from.id, 'inline_query', query.query);
        })
        this.api.on('edited_message', (message: Telegram.Message) => { 
            if (message.location) {
                this.liveLocationHandler(message);
            } else {
                this.checkStatus(message.chat.id, 'edited_message', message);
            }
        });
    }

    private addDirectListeners() {
        const types: T.AntDirectListenerType[] = [
            'animation','channel_chat_created','delete_chat_photo','group_chat_created',
            'left_chat_member','migrate_from_chat_id','migrate_to_chat_id','new_chat_members',
            'new_chat_photo','new_chat_title','passport_data','pinned_message','supergroup_chat_created',
            'edited_message_text', 'edited_message_caption', 'shipping_query',
        ]; 
        types.forEach((type: any) => {
            this.api.on(type, (message: Telegram.Message) => {
                const chatId = message.chat ? message.chat.id : message.from.id;
                if (chatId) this.checkStatus(chatId, type, message);
            });
        }, this)
    }

    private addBasicListeners() {
        const types: T.AntBasicListenerType[] = [
            'audio','contact','document','game','invoice','location','photo','sticker','text',
            'video','video_note','voice'
        ];
        types.forEach(type => {
            this.api.on(<any>type, (message: Telegram.Message) => {
                const chatId = message.chat.id;
                const data = type !== '*' ? message[type] : null;
                this.checkStatus(chatId, type, data, message);
            });
        }, this);
    }

    private checkStatus(chat_id: number, type: string, data: any, extra?: any) {
        this.config.getStatus(chat_id)
        .then(status => {
            if (!status) return;

            // wildcard
            this.botListeners['*'] = this.botListeners['*'] || {};
            if (Object.keys(this.botListeners['*']).includes(status) && typeof extra === 'object') {
                this.botListeners['*'][status](<Telegram.Message>extra);
            }

            this.botListeners[type] = this.botListeners[type] || {}; 
            if (Object.keys(this.botListeners[type]).includes(status)) {
                return this.botListeners[type][status](chat_id, data, extra);
            } else {
                for (let i in Object.keys(this.botListeners[type])) {
                    const listener = Object.keys(this.botListeners[type])[i];
                    if (this.isMask(listener) && this.isMatch(status, listener)) {
                        return this.botListeners[type][listener](chat_id, data, this.isMatch(status, listener));
                    }
                }
            }
        })
        .catch((err: Error) => this.onError(chat_id, err));
    }

    private liveLocationHandler(message: Telegram.Message) {
        const chatId = message.chat.id;
        this.liveLocationListeners.forEach((listener: T.ListenerCallback) => {
            return listener(chatId, message.location);
        }, this);
    } 

    private startCommandHandler(message: Telegram.Message) {
        this.startCommandListeners.forEach(listener => listener(message.chat.id, message.text.slice(7), message));
    }

    private onError(id: String | Number, err: Error) {
        this.emit('chat_error', id, err);
        this.emit('Error', Object.assign(err, { chat_id: id }));
    }

    private isMask(mask: String): Boolean {
        return mask.split(this.config.maskSeparator).includes('*');
    }

    private isMatch(status: String, mask: String) {
        if (mask === '*') return status;

        const statusLevels = status.split(this.config.maskSeparator);
        const maskLevels   = mask.split(this.config.maskSeparator);
        let   maskMatch;
        if (maskLevels.length !== statusLevels.length) {
            return null;
        }
        for (let i = 0; i < maskLevels.length; i++) {
            if (maskLevels[i] !== '*') {
                if (maskLevels[i] !== statusLevels[i]) {
                    return null;
                }
            } else {
                maskMatch = statusLevels[i];
            }
        }
        return maskMatch;
    }

}
