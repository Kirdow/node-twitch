"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLocalAccessToken = getLocalAccessToken;
exports.getLocalRefreshToken = getLocalRefreshToken;
exports.getLocalClientId = getLocalClientId;
exports.getLocalClientSecret = getLocalClientSecret;
exports.parseOptions = parseOptions;
exports.parseMixedParam = parseMixedParam;
exports.parseArrayToQueryString = parseArrayToQueryString;
exports.isNumber = isNumber;
exports.addThumbnailMethod = addThumbnailMethod;
exports.sleep = sleep;
const fs_1 = __importDefault(require("fs"));
const userFile = "./data/apiUser.json";
function getLocalAccessToken() {
    const data = JSON.parse(fs_1.default.readFileSync(userFile, "utf8"));
    return data.access_token;
}
function getLocalRefreshToken() {
    const data = JSON.parse(fs_1.default.readFileSync(userFile, "utf8"));
    return data.refresh_token;
}
function getLocalClientId() {
    const data = JSON.parse(fs_1.default.readFileSync(userFile, "utf8"));
    return data.client_id;
}
function getLocalClientSecret() {
    const data = JSON.parse(fs_1.default.readFileSync(userFile, "utf8"));
    return data.client_secret;
}
/**
 * Parses an object into a query string. If the value of a property is an array, that array will be parsed with the `parseArrayToQueryString` function. If a value is undefined or null, it will be skipped.
 * @param {Object} options - The options to parse.
 */
function parseOptions(options) {
    let query = "";
    for (const key in options) {
        const value = options[key];
        if (value === null || value === undefined)
            continue;
        if (Array.isArray(value))
            query += parseArrayToQueryString(key, value);
        else
            query += `${key}=${value}&`;
    }
    return query.replace(/&$/, "");
}
function parseMixedParam({ values, stringKey, numericKey }) {
    let query = "";
    function addToQuery(value) {
        const key = !isNumber(value) ? stringKey : numericKey;
        query += `${key}=${value}&`;
    }
    if (Array.isArray(values))
        values.forEach(addToQuery);
    else
        addToQuery(values);
    return query.replace(/&$/, "");
}
/**
 * Parse an array into a query string where every value has the same key.
 * @param {string} key - The key to use. This will be repeated in the query for every value in the array
 * @param {string[]|string} arr - Array of values to parse into query string.
 */
function parseArrayToQueryString(key, arr) {
    const list = Array.isArray(arr) ? arr : [arr];
    const result = list.map(value => `${key}=${value}`).join("&");
    return result;
}
/** Check if a string represents a number */
function isNumber(value) {
    if (typeof value === "undefined")
        return false;
    if (value === null)
        return false;
    if (("" + value).includes("x"))
        return false;
    return !isNaN(Number("" + value));
}
function addThumbnailMethod(stream) {
    const thumbnailUrl = stream.thumbnail_url;
    stream.getThumbnailUrl = (options = { width: 1920, height: 1080 }) => {
        const { width, height } = options;
        return thumbnailUrl.replace("{width}", "" + width).replace("{height}", "" + height);
    };
    return stream;
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
