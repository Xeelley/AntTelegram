export interface TelegramInlineButton {
    text: string;
    callback_data: string;
}
export interface TelegramRequestContactButton {
    text: string;
    request_contact?: Boolean;
}
declare type TelegramParseMode = 'Markdown' | 'HTML' | 'None';
declare type TelegramInlineKeyboardMarkup = TelegramInlineButton[][];
declare type TelegramKeyboardMarkup = string[][];
export interface TelegramReplyMarkup {
    keyboard?: TelegramKeyboardMarkup;
    inline_keyboard?: TelegramInlineKeyboardMarkup;
    resize_keyboard?: Boolean;
}
export interface TelegramKeyboard {
    reply_markup: TelegramReplyMarkup;
    parse_mode?: TelegramParseMode;
}
export declare function InlineButton(text: string, type: string, data?: any): TelegramInlineButton;
export declare function RequestContactButton(text: string): TelegramRequestContactButton;
export declare function Keyboard(keyboard: TelegramKeyboardMarkup, parse_mode?: TelegramParseMode): TelegramKeyboard;
export declare function InlineKeyboard(inline_keyboard: TelegramInlineKeyboardMarkup, parse_mode?: TelegramParseMode): TelegramKeyboard;
export {};
