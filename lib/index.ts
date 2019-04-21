import { EventEmitter } from 'events';
import * as TelegramBot from 'node-telegram-bot-api';
import * as AntTypes from './types';

import { 
    Listeners, 
    AntTelegramConfig,
    ListenerCallback,
    ListenerType,
    Commands,
    AntTelegramEvent,
} from './t';



export class AntTelegram extends EventEmitter {
    
    public api: TelegramBot;
    public Types = AntTypes;

    private config: AntTelegramConfig;

    
    private botListeners: Listeners = {
        photo:              {},
        message:            {},
        location:           {},
        contact:            {},
        callback_query:     {},
        pre_checkout_query: {},
        successful_payment: {},
    }
    private commands: Commands = {};
    private liveLocationListeners: Function[] = [];


    /**
     * Create new AntTelegram instance.
     * 
     * @param {String}            token  - Telegram bot token.
     * @param {AntTelegramConfig} config 
     */
    constructor(token: string, config: AntTelegramConfig) {
        super();
        
        if (!config.getStatus) throw new Error('Ant: config.getStatus not provided! This field is mandatory.');
        if (!config.setStatus) throw new Error('Ant: config.setStatus not provided! This field is mandatory.');
        config.maskSeparator = config.maskSeparator || ':'; 
        config.useWebhook    = config.useWebhook || false;
        this.config = config;

        this.api = new TelegramBot(token, { polling: !this.config.useWebhook });


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


    /**
     * Set new listener of incoming messages from FB
     * @param {ListenerType}     type   Type of listener. 
     * @param {string}           status User scenario status for this listener.
     * @param {ListenerCallback} method Callback that will be invoked when new message of provided type and
     *                                  on provided scenario status will be recieved.
     */
    public add(type: ListenerType, status: string, method: ListenerCallback) {
        if (type === 'live_location' && typeof status === 'function') {
            this.liveLocationListeners.push(status);
        } else {
            this.botListeners[type][status] = method;
        }
    }

    /**
     * Set new listener of incoming chat commands from Tg
     * @param {string}           command Command (with '/')
     * @param {ListenerCallback} method  Callback that will be invoked when new provided command will be recieved.
     */
    public command(command: string, method: ListenerCallback) {
        this.commands[command] = method;
    }

    public status(chat_id: Number, status: String): Promise<any> {
        return this.config.setStatus(chat_id, status);
    }

    public on(event: AntTelegramEvent, listener: (...args: any[]) => void): any {
        return super.on(event, listener);
    }

    private init() {
        this.api.on('message', (message: any) => {
            const text      = message.text;
            const chatId    = message.chat.id;
            const messageId = message.message_id;
    
            if (Object.keys(this.commands).includes(text)) {
                this.commands[text](chatId, message);
                return;
            }
            this.checkStatus(chatId, 'message', text, messageId);
        });
        this.api.on('location', (message: any) => {
            const location = message.location;
            const chatId   = message.chat.id;
    
            this.checkStatus(chatId, 'location', location);
        });
        this.api.on('photo', (message: any) => {
            const photo  = message.photo;
            const chatId = message.chat.id;
    
            this.checkStatus(chatId, 'photo', photo);
        });
        this.api.on('contact', (message: any) => {
            const chatId  = message.chat.id;
            const contact = message.contact;
    
            this.checkStatus(chatId, 'contact', contact);
        });
        this.api.on('successful_payment', (data: any) => {
            const chatId  = data.from.id;
            const payment = data.successful_payment;
    
            this.checkStatus(chatId, 'successful_payment', payment);
        });
        this.api.on('pre_checkout_query', (query: any) => {
            const chatId = query.from.id;
    
            this.api.answerPreCheckoutQuery(query.id, true, null).then(() => {
                this.checkStatus(chatId, 'pre_checkout_query', query);
            }).catch((err: Error) => this.onError(chatId, err));
        });
        this.api.on('callback_query', (query: any) => {
            const data      = JSON.parse(query.data);
            const chatId    = query.message.chat.id;
            const messageId = query.message.message_id;
    
            this.api.answerCallbackQuery(query.id, { show_alert: true }).then(() => {
                if (!!~Object.keys(this.botListeners.callback_query).indexOf(data.t)) {
                    this.botListeners.callback_query[data.t](chatId, data.d, messageId);
                }
            }).catch((err: Error) => this.onError(chatId, err));
        });
        this.api.on('edited_message', (message: any) => { 
            if (message['location']) {
                this.liveLocationHandler(message);
            }
        });
    }


    private checkStatus(chat_id: Number, type: string, data: any, extra?: any) {
        this.config.getStatus(chat_id)
        .then(status => {
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

    private liveLocationHandler(message: any) {
        const chatId = message.chat.id;
        this.liveLocationListeners.forEach((listener: ListenerCallback) => {
            return listener(chatId, message.location);
        }, this);
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