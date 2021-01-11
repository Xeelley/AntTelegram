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
    protected nativeListeners: T.NativeListeners;
    protected commands: T.Commands;
    protected liveLocationListeners: Function[];
    protected startCommandListeners: T.StartCommandCallback[];
    constructor(token: string, config: T.AntTelegramConfig);
    command(command: string, method: T.CommandCallback): void;
    onStart(method: T.StartCommandCallback): void;
    status(chat_id: number, status: string): Promise<any>;
    on(event: T.AntTelegramEvent, listener: (...args: any[]) => void): any;
    private init;
    private addListeners;
    private addDirectListeners;
    private addBasicListeners;
    private checkStatus;
    private checkStatusNative;
    private liveLocationHandler;
    private startCommandHandler;
    private onError;
    private isMask;
    private isMatch;
}
