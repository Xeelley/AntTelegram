/// <reference types="node" />
import { EventEmitter } from 'events';
import * as TelegramBot from 'node-telegram-bot-api';
import * as AntTypes from './core/types';
import { AntTelegramConfig, ListenerCallback, AntTelegramEvent } from './core/t';
export declare class AntTelegram extends EventEmitter {
    api: TelegramBot;
    Types: typeof AntTypes;
    private config;
    private botListeners;
    private commands;
    private liveLocationListeners;
    constructor(token: string, config: AntTelegramConfig);
    add(type: 'message', status: string, listener: (chat_id: Number, text: string, message_id: Number) => any): void;
    add(type: 'successful_payment', status: string, listener: (chat_id: Number, successful_payment: String) => any): void;
    command(command: string, method: ListenerCallback): void;
    status(chat_id: Number, status: String): Promise<any>;
    on(event: AntTelegramEvent, listener: (...args: any[]) => void): any;
    private init;
    private addListeners;
    private addDirectListeners;
    private addBasicListeners;
    private checkStatus;
    private liveLocationHandler;
    private onError;
    private isMask;
    private isMatch;
}
