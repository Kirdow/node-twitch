export type TwitchApiRateLimit = {
    limit: number;
    remaining: number;
    reset: number;
};
export declare class TwitchApiRateLimitError extends Error {
    ratelimit: TwitchApiRateLimit;
    constructor(ratelimit: TwitchApiRateLimit);
}
