import * as T from './core/t';
import { AntCore } from './core/AntCore';
import * as Telegram from 'node-telegram-bot-api';
import TelegramBot = require('node-telegram-bot-api');
import { TelegramKeyboard } from './core/types';
export declare class AntTelegram extends AntCore {
    constructor(token: string, config: T.AntTelegramConfig);
    add(type: 'message', status: string, listener: (chat_id: number, text: string, message_id: number) => any): void;
    add(type: 'successful_payment', status: string, listener: (chat_id: number, successful_payment: Telegram.SuccessfulPayment, mask?: string) => any): void;
    add(type: 'pre_checkout_query', status: string, listener: (chat_id: number, successful_payment: Telegram.PreCheckoutQuery, mask?: string) => any): void;
    add(type: 'callback_query', status: string, listener: (chat_id: number, data: any, message_id: number) => any): void;
    add(type: 'animation', status: string, listener: (chat_id: number, message: Telegram.Message, mask?: string) => any): void;
    add(type: 'channel_chat_created', status: string, listener: (chat_id: number, message: Telegram.Message, mask?: string) => any): void;
    add(type: 'delete_chat_photo', status: string, listener: (chat_id: number, message: Telegram.Message, mask?: string) => any): void;
    add(type: 'group_chat_created', status: string, listener: (chat_id: number, message: Telegram.Message, mask?: string) => any): void;
    add(type: 'left_chat_member', status: string, listener: (chat_id: number, message: Telegram.Message, mask?: string) => any): void;
    add(type: 'migrate_from_chat_id', status: string, listener: (chat_id: number, message: Telegram.Message, mask?: string) => any): void;
    add(type: 'migrate_to_chat_id', status: string, listener: (chat_id: number, message: Telegram.Message, mask?: string) => any): void;
    add(type: 'new_chat_members', status: string, listener: (chat_id: number, message: Telegram.Message, mask?: string) => any): void;
    add(type: 'new_chat_photo', status: string, listener: (chat_id: number, message: Telegram.Message, mask?: string) => any): void;
    add(type: 'new_chat_title', status: string, listener: (chat_id: number, message: Telegram.Message, mask?: string) => any): void;
    add(type: 'edited_message', status: string, listener: (chat_id: number, message: Telegram.Message, mask?: string) => any): void;
    add(type: 'edited_message_text', status: string, listener: (chat_id: number, message: Telegram.Message, mask?: string) => any): void;
    add(type: 'edited_message_caption', status: string, listener: (chat_id: number, message: Telegram.Message, mask?: string) => any): void;
    add(type: 'passport_data', status: string, listener: (chat_id: number, message: Telegram.Message, mask?: string) => any): void;
    add(type: 'pinned_message', status: string, listener: (chat_id: number, message: Telegram.Message, mask?: string) => any): void;
    add(type: 'supergroup_chat_created', status: string, listener: (chat_id: number, message: Telegram.Message, mask?: string) => any): void;
    add(type: 'shipping_query', status: string, listener: (chat_id: number, query: Telegram.ShippingQuery, mask?: string) => any): void;
    add(type: 'inline_query', status: string, listener: (chat_id: number, query: Telegram.InlineQuery, mask?: string) => any): void;
    add(type: 'live_location', listener: (chat_id: number, location: Telegram.Location) => any): void;
    add(type: 'audio', status: string, listener: (chat_id: number, audio: Telegram.Audio, mask?: string) => any): void;
    add(type: 'contact', status: string, listener: (chat_id: number, contact: Telegram.Contact, mask?: string) => any): void;
    add(type: 'document', status: string, listener: (chat_id: number, document: Telegram.Document, mask?: string) => any): void;
    add(type: 'game', status: string, listener: (chat_id: number, game: Telegram.Game, mask?: string) => any): void;
    add(type: 'invoice', status: string, listener: (chat_id: number, invoice: Telegram.Invoice, mask?: string) => any): void;
    add(type: 'location', status: string, listener: (chat_id: number, location: Telegram.Location, mask?: string) => any): void;
    add(type: 'photo', status: string, listener: (chat_id: number, photo: Telegram.PhotoSize[], mask?: string) => any): void;
    add(type: 'sticker', status: string, listener: (chat_id: number, sticker: Telegram.Sticker, mask?: string) => any): void;
    add(type: 'text', status: string, listener: (chat_id: number, text: string, mask?: string) => any): void;
    add(type: 'video', status: string, listener: (chat_id: number, video: Telegram.Video, mask?: string) => any): void;
    add(type: 'video_note', status: string, listener: (chat_id: number, video_note: Telegram.Video, mask?: string) => any): void;
    add(type: 'voice', status: string, listener: (chat_id: number, voice: Telegram.Voice, mask?: string) => any): void;
    add(type: '*', status: string, listener: (message: Telegram.Message) => any): void;
    native(status: string, method: (message: Telegram.Message, mask?: string) => any): void;
    sendMessage(chat_id: number, text: string, options?: TelegramBot.SendMessageOptions | TelegramKeyboard): Promise<Telegram.Message>;
}
