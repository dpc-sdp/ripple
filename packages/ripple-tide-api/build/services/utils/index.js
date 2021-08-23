"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBody = exports.getLandingPageComponents = exports.getLinkFromField = exports.getMediaImage = exports.removeDomainFromPath = exports.getImageFromField = void 0;
const lodash_get_1 = __importDefault(require("lodash.get"));
const index_1 = __importDefault(require("./markup-transpiler/index"));
const getImageFromField = (field, path) => {
    let getPath;
    if (Array.isArray(path)) {
        getPath = [...path, 'field_media_image'];
    }
    else if (typeof path === 'string') {
        getPath = `${path}.field_media_image`;
    }
    const image = lodash_get_1.default(field, getPath);
    if (image) {
        return exports.getMediaImage(image);
    }
};
exports.getImageFromField = getImageFromField;
const removeDomainFromPath = path => typeof path === 'string' && path.length > 0
    ? path.replace(/^.*(?=(\/sites\/default\/files))/, '')
    : path;
exports.removeDomainFromPath = removeDomainFromPath;
const getMediaImage = fieldMediaImage => {
    if (fieldMediaImage) {
        const focalPoint = fieldMediaImage.meta.focal_point;
        delete fieldMediaImage.meta.focal_point;
        // Replace BE domain for images as they will be proxied through FE
        return Object.assign(Object.assign({ src: fieldMediaImage.url ? exports.removeDomainFromPath(fieldMediaImage.url) : '' }, fieldMediaImage.meta), { focalPoint });
    }
};
exports.getMediaImage = getMediaImage;
const getLinkFromField = (field, path) => {
    let url, text;
    if (Array.isArray(path)) {
        text = lodash_get_1.default(field, [...path, 'title'], false);
        url = lodash_get_1.default(field, [...path, 'url'], lodash_get_1.default(field, [...path, 'uri']), false);
    }
    else if (typeof path === 'string') {
        text = lodash_get_1.default(field, `${path}.title`, false);
        url = lodash_get_1.default(field, `${path}.url`, lodash_get_1.default(field, `${path}.uri`), false);
    }
    else {
        text = lodash_get_1.default(field, 'title', false);
        url = lodash_get_1.default(field, 'url', lodash_get_1.default(field, 'uri'), false);
    }
    return { text: url && text === '' ? url : text, url };
};
exports.getLinkFromField = getLinkFromField;
const getLandingPageComponents = (pageData, componentFieldPath, componentMapping, tideApi) => __awaiter(void 0, void 0, void 0, function* () {
    const componentFields = pageData[componentFieldPath];
    const mappedComponents = [];
    if (componentFields && Array.isArray(componentFields)) {
        for (let i = 0; i < componentFields.length; i++) {
            const cmpData = componentFields[i];
            if (componentMapping.hasOwnProperty(cmpData.type)) {
                const componentMappingFunction = componentMapping[cmpData.type];
                if (componentMappingFunction.constructor.name === 'AsyncFunction') {
                    const data = yield componentMappingFunction.apply(tideApi, [
                        cmpData,
                        pageData
                    ]);
                    mappedComponents.push(Object.assign({ uuid: cmpData.uuid }, data));
                }
                else if (typeof componentMappingFunction === 'function') {
                    const data = componentMappingFunction.apply(tideApi, [
                        cmpData,
                        pageData
                    ]);
                    mappedComponents.push(Object.assign({ uuid: cmpData.uuid }, data));
                }
            }
        }
        return mappedComponents;
    }
});
exports.getLandingPageComponents = getLandingPageComponents;
const getBody = (html, customPlugins = []) => {
    const plugins = customPlugins.length > 0 ? customPlugins : undefined;
    return index_1.default(html, plugins);
};
exports.getBody = getBody;
exports.default = {
    getImageFromField: exports.getImageFromField,
    getLinkFromField: exports.getLinkFromField,
    getLandingPageComponents: exports.getLandingPageComponents,
    getBody: exports.getBody
};
