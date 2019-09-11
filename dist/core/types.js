"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function InlineButton(text, type, data) {
    return {
        text,
        callback_data: JSON.stringify({ t: type, d: data }),
    };
}
exports.InlineButton = InlineButton;
function RequestContactButton(text) {
    return {
        text,
        request_contact: true,
    };
}
exports.RequestContactButton = RequestContactButton;
function Keyboard(keyboard, parse_mode = 'Markdown') {
    const result = {
        reply_markup: { keyboard, resize_keyboard: true },
    };
    if (parse_mode !== 'None')
        result.parse_mode = parse_mode;
    return result;
}
exports.Keyboard = Keyboard;
function InlineKeyboard(inline_keyboard, parse_mode = 'Markdown') {
    const result = {
        reply_markup: { inline_keyboard, resize_keyboard: true },
    };
    if (parse_mode !== 'None')
        result.parse_mode = parse_mode;
    return result;
}
exports.InlineKeyboard = InlineKeyboard;
