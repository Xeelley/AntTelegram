/// <reference types="node" />
import { EventEmitter } from 'events';
import * as TelegramBot from 'node-telegram-bot-api';
import * as AntTypes from './types';
import { AntTelegramConfig, ListenerCallback, ListenerType, AntTelegramEvent } from './t';
export declare class AntTelegram extends EventEmitter {
    api: TelegramBot;
    Types: typeof AntTypes;
    private config;
    private botListeners;
    private commands;
    private liveLocationListeners;
    constructor(token: string, config: AntTelegramConfig);
    add(type: ListenerType, status: string, method: ListenerCallback): void;
    command(command: string, method: ListenerCallback): void;
    status(chat_id: Number, status: String): Promise<any>;
    on(event: AntTelegramEvent, listener: (...args: any[]) => void): any;
    private init;
    private checkStatus;
    private liveLocationHandler;
    private onError;
    private isMask;
    private isMatch;
}
