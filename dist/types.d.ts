interface TelegramInlineButton {
    text: String;
    callback_data: String;
}
interface TelegramRequestContactButton {
    text: String;
    request_contact?: Boolean;
}
declare type TelegramParseMode = 'Markdown' | 'HTML' | 'None';
declare type TelegramInlineKeyboardMarkup = TelegramInlineButton[][];
declare type TelegramKeyboardMarkup = String[][];
interface TelegramReplyMarkup {
    keyboard?: TelegramKeyboardMarkup;
    inline_keyboard?: TelegramInlineKeyboardMarkup;
    resize_keyboard?: Boolean;
}
interface TelegramKeyboard {
    reply_markup: TelegramReplyMarkup;
    parse_mode?: TelegramParseMode;
}
declare function InlineButton(text: String, type: String, data: any): TelegramInlineButton;
declare function RequestContactButton(text: String): TelegramRequestContactButton;
declare function Keyboard(keyboard: TelegramKeyboardMarkup, parse_mode?: TelegramParseMode): TelegramKeyboard;
declare function InlineKeyboard(inline_keyboard: TelegramInlineKeyboardMarkup, parse_mode?: TelegramParseMode): TelegramKeyboard;
export { InlineButton, RequestContactButton, Keyboard, InlineKeyboard, };
