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
var TelegramBot = require("node-telegram-bot-api");
var AntTelegram = (function (_super) {
    __extends(AntTelegram, _super);
    function AntTelegram(token, config) {
        var _this = _super.call(this) || this;
        _this.botListeners = {
            photo: {},
            message: {},
            location: {},
            contact: {},
            callback_query: {},
            pre_checkout_query: {},
            successful_payment: {},
        };
        _this.commands = {};
        _this.liveLocationListeners = [];
        _this.api = new TelegramBot(token, { polling: true });
        if (!config.getStatus)
            throw new Error('Ant: config.getStatus not provided! This field is mandatory.');
        if (!config.setStatus)
            throw new Error('Ant: config.setStatus not provided! This field is mandatory.');
        config.maskSeparator = config.maskSeparator || ':';
        _this.config = config;
        _this.api.on('error', function (err) { return _this.emit('error', err); });
        _this.api.on('polling_error', function (err) { return _this.emit('error', err); });
        _this.api.on('webhook_error', function (err) { return _this.emit('error', err); });
        _this.init();
        return _this;
    }
    AntTelegram.prototype.add = function (type, status, method) {
        if (type === 'live_location' && typeof status === 'function') {
            this.liveLocationListeners.push(status);
        }
        else {
            this.botListeners[type][status] = method;
        }
    };
    AntTelegram.prototype.command = function (command, method) {
        this.commands[command] = method;
    };
    AntTelegram.prototype.status = function (chat_id, status) {
        return this.config.setStatus(chat_id, status);
    };
    AntTelegram.prototype.init = function () {
        var _this = this;
        this.api.on('message', function (message) {
            var text = message.text;
            var chatId = message.chat.id;
            var messageId = message.message_id;
            if (Object.keys(_this.commands).includes(text)) {
                _this.commands[text](chatId, message);
                return;
            }
            _this.checkStatus(chatId, 'message', text, messageId);
        });
        this.api.on('location', function (message) {
            var location = message.location;
            var chatId = message.chat.id;
            _this.checkStatus(chatId, 'location', location);
        });
        this.api.on('photo', function (message) {
            var photo = message.photo;
            var chatId = message.chat.id;
            _this.checkStatus(chatId, 'photo', photo);
        });
        this.api.on('contact', function (message) {
            var chatId = message.chat.id;
            var contact = message.contact;
            _this.checkStatus(chatId, 'contact', contact);
        });
        this.api.on('successful_payment', function (data) {
            var chatId = data.from.id;
            var payment = data.successful_payment;
            _this.checkStatus(chatId, 'successful_payment', payment);
        });
        this.api.on('pre_checkout_query', function (query) {
            var chatId = query.from.id;
            _this.api.answerPreCheckoutQuery(query.id, true, null).then(function () {
                _this.checkStatus(chatId, 'pre_checkout_query', query);
            }).catch(function (err) { return _this.onError(chatId, err); });
        });
        this.api.on('callback_query', function (query) {
            var data = JSON.parse(query.data);
            var chatId = query.message.chat.id;
            var messageId = query.message.message_id;
            _this.api.answerCallbackQuery(query.id, { show_alert: true }).then(function () {
                if (!!~Object.keys(_this.botListeners.callback_query).indexOf(data.type)) {
                    _this.botListeners.callback_query[data.type](chatId, data.data, messageId);
                }
            }).catch(function (err) { return _this.onError(chatId, err); });
        });
        this.api.on('edited_message', function (message) {
            if (message['location']) {
                _this.liveLocationHandler(message);
            }
        });
    };
    AntTelegram.prototype.checkStatus = function (chat_id, type, data, extra) {
        var _this = this;
        this.config.getStatus(chat_id)
            .then(function (status) {
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
    AntTelegram.prototype.liveLocationHandler = function (message) {
        var chatId = message.chat.id;
        this.liveLocationListeners.forEach(function (listener) {
            return listener(chatId, message.location);
        }, this);
    };
    AntTelegram.prototype.onError = function (id, err) {
        this.emit('chat_error', id, err);
    };
    AntTelegram.prototype.isMask = function (mask) {
        return mask.split(this.config.maskSeparator).includes('*');
    };
    AntTelegram.prototype.isMatch = function (status, mask) {
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
    return AntTelegram;
}(events_1.EventEmitter));
exports.default = AntTelegram;
