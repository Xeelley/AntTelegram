"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
process.env.NTBA_FIX_319 = '1';
const AntCore_1 = require("./core/AntCore");
class AntTelegram extends AntCore_1.AntCore {
    constructor(token, config) {
        super(token, config);
    }
    add(type, status, method) {
        if (type === 'live_location' && typeof status === 'function') {
            this.liveLocationListeners.push(status);
        }
        else {
            if (!this.botListeners[type])
                this.botListeners[type] = {};
            this.botListeners[type][status.toString()] = method;
        }
    }
    native(status, method) {
        this.nativeListeners[status.toString()] = method;
    }
    sendMessage(chatId, text, options) {
        return this.api.sendMessage(chatId, text, options);
    }
}
exports.AntTelegram = AntTelegram;
