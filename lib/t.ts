export interface AntTelegramConfig {
    getStatus: (chat_id: Number) => Promise<string>;
    setStatus: (chat_id: Number, status: String) => Promise<any>;
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
    (user_id: String | Number, data: any, mask?: String): void;
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
'passport_data' |
'pinned_message' |
'supergroup_chat_created';

export type AntListenerType = AntModifiedListenerType | AntDirectListenerType | AntBasicListenerType;

export type AntTelegramEvent = 'error' |
'chat_error' |
'webhook_error' |
'polling_error' |
'Error';

