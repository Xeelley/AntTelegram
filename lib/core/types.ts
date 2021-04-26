export interface TelegramInlineButton {
    text: string;
    callback_data: string;
}

export interface TelegramRequestContactButton {
    text: string;
    request_contact?: Boolean;
}

type TelegramParseMode = 'Markdown' | 'HTML' | 'None';

type TelegramInlineKeyboardMarkup = TelegramInlineButton[][];

type TelegramKeyboardMarkup = string[][];

export interface TelegramReplyMarkup {
    keyboard?: TelegramKeyboardMarkup;
    inline_keyboard?: TelegramInlineKeyboardMarkup;
    resize_keyboard?: Boolean;
}

export interface TelegramKeyboard {
    reply_markup: TelegramReplyMarkup;
    parse_mode?: TelegramParseMode;
}



/**
 * @description
 * Outer methods below
 */

export function InlineButton(text: string, type: string, data?: any): TelegramInlineButton {
    return {
        text,
        callback_data: JSON.stringify({ t: type, d: data }),
    }
}

export function RequestContactButton(text: string): TelegramRequestContactButton {
    return { 
        text,
        request_contact: true,
    }
}

export function Keyboard(keyboard: TelegramKeyboardMarkup, parse_mode: TelegramParseMode = 'Markdown'): TelegramKeyboard {
    const result: TelegramKeyboard = {
        reply_markup: { keyboard, resize_keyboard: true },
    };
    if (parse_mode !== 'None') result.parse_mode = parse_mode;
    return result;
}

export function InlineKeyboard(inline_keyboard: TelegramInlineKeyboardMarkup, parse_mode: TelegramParseMode = 'Markdown'): TelegramKeyboard {
    const result: TelegramKeyboard = {
        reply_markup: { inline_keyboard, resize_keyboard: true },
    };
    if (parse_mode !== 'None') result.parse_mode = parse_mode;
    return result;
}






