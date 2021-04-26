// Remove depracation warnings by node-telegram-bot-api
process.env.NTBA_FIX_319 = '1';

import * as T from './core/t';
import { AntCore } from './core/AntCore';
import * as Telegram from 'node-telegram-bot-api';
import TelegramBot = require('node-telegram-bot-api');
import { TelegramKeyboard } from './core/types';


export class AntTelegram extends AntCore {

    constructor(token: string, config: T.AntTelegramConfig) {
        super(token, config);
    }


    public add(type: 'message', status: string, listener: (chat_id: number, text: string, message_id: number) => any): void;
    public add(type: 'successful_payment', status: string, listener: (chat_id: number, successful_payment: Telegram.SuccessfulPayment, mask?: string) => any): void;
    public add(type: 'pre_checkout_query', status: string, listener: (chat_id: number, successful_payment: Telegram.PreCheckoutQuery, mask?: string) => any): void;
    public add(type: 'callback_query', status: string, listener: (chat_id: number, data: any, message_id: number) => any): void;
    
    public add(type: 'animation', status: string, listener: (chat_id: number, message: Telegram.Message, mask?: string) => any): void;
    public add(type: 'channel_chat_created', status: string, listener: (chat_id: number, message: Telegram.Message, mask?: string) => any): void;
    public add(type: 'delete_chat_photo', status: string, listener: (chat_id: number, message: Telegram.Message, mask?: string) => any): void;
    public add(type: 'group_chat_created', status: string, listener: (chat_id: number, message: Telegram.Message, mask?: string) => any): void;
    public add(type: 'left_chat_member', status: string, listener: (chat_id: number, message: Telegram.Message, mask?: string) => any): void;
    public add(type: 'migrate_from_chat_id', status: string, listener: (chat_id: number, message: Telegram.Message, mask?: string) => any): void;
    public add(type: 'migrate_to_chat_id', status: string, listener: (chat_id: number, message: Telegram.Message, mask?: string) => any): void;
    public add(type: 'new_chat_members', status: string, listener: (chat_id: number, message: Telegram.Message, mask?: string) => any): void;
    public add(type: 'new_chat_photo', status: string, listener: (chat_id: number, message: Telegram.Message, mask?: string) => any): void;
    public add(type: 'new_chat_title', status: string, listener: (chat_id: number, message: Telegram.Message, mask?: string) => any): void;
    public add(type: 'edited_message', status: string, listener: (chat_id: number, message: Telegram.Message, mask?: string) => any): void;
    public add(type: 'edited_message_text', status: string, listener: (chat_id: number, message: Telegram.Message, mask?: string) => any): void;
    public add(type: 'edited_message_caption', status: string, listener: (chat_id: number, message: Telegram.Message, mask?: string) => any): void;
    public add(type: 'passport_data', status: string, listener: (chat_id: number, message: Telegram.Message, mask?: string) => any): void;
    public add(type: 'pinned_message', status: string, listener: (chat_id: number, message: Telegram.Message, mask?: string) => any): void;
    public add(type: 'supergroup_chat_created', status: string, listener: (chat_id: number, message: Telegram.Message, mask?: string) => any): void;
    public add(type: 'shipping_query', status: string, listener: (chat_id: number, query: Telegram.ShippingQuery, mask?: string) => any): void;
    public add(type: 'inline_query', status: string, listener: (chat_id: number, query: Telegram.InlineQuery, mask?: string) => any): void;

    public add(type: 'live_location', listener: (chat_id: number, location: Telegram.Location) => any): void;

    public add(type: 'audio', status: string, listener: (chat_id: number, audio: Telegram.Audio, mask?: string) => any): void;
    public add(type: 'contact', status: string, listener: (chat_id: number, contact: Telegram.Contact, mask?: string) => any): void;
    public add(type: 'document', status: string, listener: (chat_id: number, document: Telegram.Document, mask?: string) => any): void;
    public add(type: 'game', status: string, listener: (chat_id: number, game: Telegram.Game, mask?: string) => any): void;
    public add(type: 'invoice', status: string, listener: (chat_id: number, invoice: Telegram.Invoice, mask?: string) => any): void;
    public add(type: 'location', status: string, listener: (chat_id: number, location: Telegram.Location, mask?: string) => any): void;
    public add(type: 'photo', status: string, listener: (chat_id: number, photo: Telegram.PhotoSize[], mask?: string) => any): void;
    public add(type: 'sticker', status: string, listener: (chat_id: number, sticker: Telegram.Sticker, mask?: string) => any): void;
    public add(type: 'text', status: string, listener: (chat_id: number, text: string, mask?: string) => any): void;
    public add(type: 'video', status: string, listener: (chat_id: number, video: Telegram.Video, mask?: string) => any): void;
    public add(type: 'video_note', status: string, listener: (chat_id: number, video_note: Telegram.Video, mask?: string) => any): void;
    public add(type: 'voice', status: string, listener: (chat_id: number, voice: Telegram.Voice, mask?: string) => any): void;

    public add(type: '*', status: string, listener: (message: Telegram.Message) => any): void;

    public add(type: T.AntListenerType, status: string | Function, method?: Function) {
    
        if (type === 'live_location' && typeof status === 'function') {
            this.liveLocationListeners.push(status);
        } else {
            if (!this.botListeners[type]) this.botListeners[type] = {};
            this.botListeners[type][<string>status] = method;
        }
    }

    public native(status: string, method: (message: Telegram.Message, mask?: string) => any) {
        this.nativeListeners[status] = method;
    }

    public sendMessage(chat_id: number, text: string, options?: TelegramBot.SendMessageOptions | TelegramKeyboard) {
        // @ts-ignore
        return this.api.sendMessage(chat_id, text, options);
    }
}