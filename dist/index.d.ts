/// <reference types="node" />
import { EventEmitter } from 'events';
import * as TelegramBot from 'node-telegram-bot-api';
import { AntTelegramConfig, ListenerCallback, ListenerType } from './t';
export default class AntTelegram extends EventEmitter {
    api: TelegramBot;
    private config;
    private botListeners;
    private commands;
    private liveLocationListeners;
    constructor(token: String, config: AntTelegramConfig);
    add(type: ListenerType, status: string, method: ListenerCallback): void;
    command(command: string, method: ListenerCallback): void;
    status(chat_id: Number, status: String): Promise<any>;
    private init;
    private checkStatus;
    private liveLocationHandler;
    private onError;
    private isMask;
    private isMatch;
}
