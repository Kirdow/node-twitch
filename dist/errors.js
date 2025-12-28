"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TwitchApiRateLimitError = void 0;
class TwitchApiRateLimitError extends Error {
    ratelimit;
    constructor(ratelimit) {
        super("Twitch API rate limit reached");
        this.ratelimit = ratelimit;
    }
}
exports.TwitchApiRateLimitError = TwitchApiRateLimitError;
