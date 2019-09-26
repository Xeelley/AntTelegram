/// <reference types="node-telegram-bot-api" />
import { AntCore } from './AntCore';
import * as T from './t';
export declare class AntTypes extends AntCore {
    constructor(token: string, config: T.AntTelegramConfig);
    sendMessage(chatId: number | string, text: string, options?: any): Promise<import("node-telegram-bot-api").Message>;
}
