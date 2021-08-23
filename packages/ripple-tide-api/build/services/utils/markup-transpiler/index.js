"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio_1 = __importDefault(require("cheerio"));
const default_plugins_1 = __importDefault(require("./default-plugins"));
// This is a hack to cheerio to solve the unwanted encode issue.
// https://github.com/cheeriojs/cheerio/issues/866#issuecomment-275699121
// We don't want cheerio to encode our vue template, as it will add encoded entities into Vue props.
// NOTE: Any HTML encoded entities in original HTML will be kept as it is.
const cheerioHtml = cheerio_1.default.prototype.html;
cheerio_1.default.prototype.html = function wrappedHtml() {
    var result = cheerioHtml.apply(this, arguments);
    if (typeof result === 'string') {
        result = result.replace(/&#x([0-9a-f]{1,6});/gi, function (entity, code) {
            code = parseInt(code, 16);
            // don't unescape ascii characters, assuming that all ascii characters
            // are encoded for a good reason
            if (code < 0x80)
                return entity;
            return String.fromCodePoint(code);
        });
    }
    return result;
};
// A markup transplier for converting HTML into Vue template by giving plugins.
const markupTranspiler = (html, plugins = default_plugins_1.default, options = {}) => {
    if (!html) {
        return '';
    }
    const $ = cheerio_1.default.load(html, options);
    const $body = $('body');
    let markupData = {};
    if (Object.keys(plugins).length > 1) {
        // Load plugins to transpile embedded components
        for (const [index, plugin] of plugins.entries()) {
            $.prototype[`plugin${index}`] = plugin;
            const data = $body[`plugin${index}`]();
            if (data) {
                markupData = Object.assign(Object.assign({}, markupData), data);
            }
        }
    }
    return $('body').html();
};
exports.default = markupTranspiler;
