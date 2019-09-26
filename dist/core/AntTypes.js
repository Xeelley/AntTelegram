"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AntCore_1 = require("./AntCore");
class AntTypes extends AntCore_1.AntCore {
    constructor(token, config) {
        super(token, config);
    }
    sendMessage(chatId, text, options) {
        return this.api.sendMessage(chatId, text, options);
    }
}
exports.AntTypes = AntTypes;
