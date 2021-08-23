"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TideApiError extends Error {
    constructor({ status = 500, message = 'Error', debug = false }, ...params) {
        super(...params);
        // Maintains proper stack trace for where our error was thrown
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, TideApiError);
        }
        this.name = 'TideError';
        // Custom debugging information
        this.status = status;
        this.message = message;
        this.debug = debug;
        this.date = new Date();
    }
}
exports.default = TideApiError;
