export interface AntTelegramConfig {
    getStatus: (chat_id: Number) => Promise<string>;
    setStatus: (chat_id: Number, status: String) => Promise<any>;
    maskSeparator?: string;
}
export interface Listeners {
    photo: {
        [key in string]: Function;
    };
    message: {
        [key in string]: Function;
    };
    location: {
        [key in string]: Function;
    };
    contact: {
        [key in string]: Function;
    };
    callback_query: {
        [key in string]: Function;
    };
    pre_checkout_query: {
        [key in string]: Function;
    };
    successful_payment: {
        [key in string]: Function;
    };
    [key: string]: {
        [key in string]: Function;
    };
}
export interface Commands {
    [key: string]: Function;
}
export interface ListenerCallback {
    (user_id: String | Number, data: any, mask?: String): void;
}
export declare type ListenerType = 'photo' | 'message' | 'location' | 'contact' | 'callback_query' | 'live_location' | 'pre_checkout_query' | 'successful_payment';
export declare type AntTelegramEvent = 'error' | 'chat_error' | 'webhook_error' | 'polling_error' | 'Error';
