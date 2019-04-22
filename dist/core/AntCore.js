"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var events_1 = require("events");
var Telegram = require("node-telegram-bot-api");
var AntTypes = require("./types");
var AntCore = (function (_super) {
    __extends(AntCore, _super);
    function AntCore(token, config) {
        var _this = _super.call(this) || this;
        _this.Types = AntTypes;
        _this.botListeners = {};
        _this.commands = {};
        _this.liveLocationListeners = [];
        if (!config.getStatus)
            throw new Error('Ant: config.getStatus not provided! This field is mandatory.');
        if (!config.setStatus)
            throw new Error('Ant: config.setStatus not provided! This field is mandatory.');
        config.maskSeparator = config.maskSeparator || ':';
        config.useWebhook = config.useWebhook || false;
        _this.config = config;
        _this.api = new Telegram(token, { polling: !_this.config.useWebhook });
        _this.api.on('error', function (err) {
            _this.emit('error', err);
            _this.emit('Error', err);
        });
        _this.api.on('polling_error', function (err) {
            _this.emit('polling_error', err);
            _this.emit('Error', err);
        });
        _this.api.on('webhook_error', function (err) {
            _this.emit('webhook_error', err);
            _this.emit('Error', err);
        });
        _this.init();
        return _this;
    }
    AntCore.prototype.command = function (command, method) {
        this.commands[command] = method;
    };
    AntCore.prototype.status = function (chat_id, status) {
        return this.config.setStatus(chat_id, status);
    };
    AntCore.prototype.on = function (event, listener) {
        _super.prototype.on.call(this, event, listener);
    };
    AntCore.prototype.init = function () {
        this.addListeners();
        this.addBasicListeners();
        this.addDirectListeners();
    };
    AntCore.prototype.addListeners = function () {
        var _this = this;
        this.api.on('message', function (message) {
            if (!message.text)
                return;
            var text = message.text;
            var chatId = message.chat.id;
            var messageId = message.message_id;
            if (Object.keys(_this.commands).includes(text)) {
                _this.commands[text](chatId, message);
                return;
            }
            _this.checkStatus(chatId, 'message', text, messageId);
        });
        this.api.on('successful_payment', function (data) {
            _this.checkStatus(data.from.id, 'successful_payment', data.successful_payment);
        });
        this.api.on('pre_checkout_query', function (query) {
            _this.api.answerPreCheckoutQuery(query.id, true, null).then(function () {
                _this.checkStatus(query.from.id, 'pre_checkout_query', query);
            }).catch(function (err) { return _this.onError(query.from.id, err); });
        });
        this.api.on('callback_query', function (query) {
            var data = JSON.parse(query.data);
            _this.api.answerCallbackQuery(query.id, { show_alert: true }).then(function () {
                if (!!~Object.keys(_this.botListeners.callback_query).indexOf(data.t)) {
                    _this.botListeners.callback_query[data.t](query.message.chat.id, data.d, query.message.message_id);
                }
            }).catch(function (err) { return _this.onError(query.message.chat.id, err); });
        });
        this.api.on('inline_query', function (query) {
            _this.checkStatus(query.from.id, 'inline_query', query.query);
        });
        this.api.on('edited_message', function (message) {
            if (message.location) {
                _this.liveLocationHandler(message);
            }
            else {
                _this.checkStatus(message.chat.id, 'edited_message', message);
            }
        });
    };
    AntCore.prototype.addDirectListeners = function () {
        var _this = this;
        var types = [
            'animation', 'channel_chat_created', 'delete_chat_photo', 'group_chat_created',
            'left_chat_member', 'migrate_from_chat_id', 'migrate_to_chat_id', 'new_chat_members',
            'new_chat_photo', 'new_chat_title', 'passport_data', 'pinned_message', 'supergroup_chat_created',
            'edited_message_text', 'edited_message_caption', 'shipping_query',
        ];
        types.forEach(function (type) {
            _this.api.on(type, function (message) {
                var chatId = message.chat ? message.chat.id : message.from.id;
                if (chatId)
                    _this.checkStatus(chatId, type, message);
            });
        }, this);
    };
    AntCore.prototype.addBasicListeners = function () {
        var _this = this;
        var types = [
            'audio', 'contact', 'document', 'game', 'invoice', 'location', 'photo', 'sticker', 'text',
            'video', 'video_note', 'voice',
        ];
        types.forEach(function (type) {
            _this.api.on(type, function (message) {
                var chatId = message.chat.id;
                var data = message[type];
                _this.checkStatus(chatId, type, data);
            });
        }, this);
    };
    AntCore.prototype.checkStatus = function (chat_id, type, data, extra) {
        var _this = this;
        this.config.getStatus(chat_id)
            .then(function (status) {
            if (!status)
                return;
            if (Object.keys(_this.botListeners[type]).includes(status)) {
                return _this.botListeners[type][status](chat_id, data, extra);
            }
            else {
                for (var i in Object.keys(_this.botListeners[type])) {
                    var listener = Object.keys(_this.botListeners[type])[i];
                    if (_this.isMask(listener) && _this.isMatch(status, listener)) {
                        return _this.botListeners[type][listener](chat_id, data, _this.isMatch(status, listener));
                    }
                }
            }
        })
            .catch(function (err) { return _this.onError(chat_id, err); });
    };
    AntCore.prototype.liveLocationHandler = function (message) {
        var chatId = message.chat.id;
        this.liveLocationListeners.forEach(function (listener) {
            return listener(chatId, message.location);
        }, this);
    };
    AntCore.prototype.onError = function (id, err) {
        this.emit('chat_error', id, err);
        this.emit('Error', Object.assign(err, { chat_id: id }));
    };
    AntCore.prototype.isMask = function (mask) {
        return mask.split(this.config.maskSeparator).includes('*');
    };
    AntCore.prototype.isMatch = function (status, mask) {
        if (mask === '*')
            return status;
        var statusLevels = status.split(this.config.maskSeparator);
        var maskLevels = mask.split(this.config.maskSeparator);
        var maskMatch;
        if (maskLevels.length !== statusLevels.length) {
            return null;
        }
        for (var i = 0; i < maskLevels.length; i++) {
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
    };
    return AntCore;
}(events_1.EventEmitter));
exports.AntCore = AntCore;
