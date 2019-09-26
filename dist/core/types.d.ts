export interface TelegramInlineButton {
    text: String;
    callback_data: String;
}
export interface TelegramRequestContactButton {
    text: String;
    request_contact?: Boolean;
}
declare type TelegramParseMode = 'Markdown' | 'HTML' | 'None';
declare type TelegramInlineKeyboardMarkup = TelegramInlineButton[][];
declare type TelegramKeyboardMarkup = String[][];
export interface TelegramReplyMarkup {
    keyboard?: TelegramKeyboardMarkup;
    inline_keyboard?: TelegramInlineKeyboardMarkup;
    resize_keyboard?: Boolean;
}
export interface TelegramKeyboard {
    reply_markup: TelegramReplyMarkup;
    parse_mode?: TelegramParseMode;
}
export declare function InlineButton(text: String, type: String, data: any): TelegramInlineButton;
export declare function RequestContactButton(text: String): TelegramRequestContactButton;
export declare function Keyboard(keyboard: TelegramKeyboardMarkup, parse_mode?: TelegramParseMode): TelegramKeyboard;
export declare function InlineKeyboard(inline_keyboard: TelegramInlineKeyboardMarkup, parse_mode?: TelegramParseMode): TelegramKeyboard;
export {};
