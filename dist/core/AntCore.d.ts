/// <reference types="node" />
import { EventEmitter } from 'events';
import * as Telegram from 'node-telegram-bot-api';
import * as AntTypes from './types';
import * as T from './t';
export declare class AntCore extends EventEmitter {
    api: Telegram;
    Types: typeof AntTypes;
    private config;
    protected botListeners: T.Listeners;
    protected commands: T.Commands;
    protected liveLocationListeners: Function[];
    constructor(token: string, config: T.AntTelegramConfig);
    command(command: string, method: T.CommandCallback): void;
    status(chat_id: Number, status: String): Promise<any>;
    on(event: T.AntTelegramEvent, listener: (...args: any[]) => void): any;
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
