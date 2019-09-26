import * as Telegram from 'node-telegram-bot-api';


export interface AntTelegramConfig {
    getStatus: (chat_id: number) => Promise<string>;
    setStatus: (chat_id: number, status: string) => Promise<any>;
    maskSeparator?: string;
    useWebhook?: Boolean;
}

export interface Listeners {
    [key: string]: { [key in string]: Function };
}

export interface Commands {
    [key: string]: Function;
}

export interface ListenerCallback {
    (user_id: string | number, data: any, mask?: string): void;
}

export interface CommandCallback {
    (user_id: string | number, params: { [index: string]: string }, message: Telegram.Message): void;
}

export interface StartCommandCallback {
    (user_id: string | number, value: string, message: Telegram.Message): void;
}

export type AntModifiedListenerType = 
'message' |
'callback_query' |
'live_location' |
'pre_checkout_query' |
'successful_payment';

export type AntBasicListenerType = 
'photo' |
'location' |
'text' |
'contact' |
'audio' | 
'document' | 
'game' | 
'invoice' | 
'sticker' | 
'video' | 
'video_note' | 
'voice';

export type AntDirectListenerType = 
'animation' |
'channel_chat_created' |
'delete_chat_photo' |
'group_chat_created' |
'left_chat_member' |
'migrate_from_chat_id' |
'migrate_to_chat_id' |
'new_chat_members' |
'new_chat_photo' |
'new_chat_title' |
'shipping_query' |
'inline_query' |
'edited_message' |
'edited_message_text' |
'edited_message_caption' |
'passport_data' |
'pinned_message' |
'supergroup_chat_created';

export type AntListenerType = AntModifiedListenerType | AntDirectListenerType | AntBasicListenerType;

export type AntTelegramEvent = 'error' |
'chat_error' |
'webhook_error' |
'polling_error' |
'Error';

