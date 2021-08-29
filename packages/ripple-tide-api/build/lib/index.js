"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSharePath = exports.isPreviewPath = exports.redirect = void 0;
exports.redirect = {
    login: '/oauth/login',
    logout: '/',
    home: '/oauth/success',
    callback: '/oauth/login'
};
const isPreviewPath = path => {
    return path.indexOf('/preview/') === 0;
};
exports.isPreviewPath = isPreviewPath;
const isSharePath = path => {
    return path.indexOf('/share_link/') === 0;
};
exports.isSharePath = isSharePath;
