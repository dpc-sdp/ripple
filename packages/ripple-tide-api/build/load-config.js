"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.getSiteConfig = exports.getModulesFromConfig = exports.loadMapping = void 0;
const js_yaml_1 = __importDefault(require("js-yaml"));
const appRoot = require('app-root-path');
const path = require('path');
const fs = require('fs');
const loadMapping = (filePath) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (fs.existsSync(filePath)) {
            const mappingConfig = yield Promise.resolve().then(() => __importStar(require(filePath))).then(m => m.default);
            // Each module can define a YAML OpenAPI 3 spec
            if (fs.existsSync(filePath + '/definition.yaml')) {
                const schema = js_yaml_1.default.load(fs.readFileSync(path.join(filePath, './definition.yaml'), 'utf-8'));
                mappingConfig.schema = schema;
            }
            // Add top level components for use with $ref
            if (fs.existsSync(filePath + '/components-definition.yaml')) {
                const schemaComponents = js_yaml_1.default.load(fs.readFileSync(path.join(filePath, './components-definition.yaml'), 'utf-8'));
                mappingConfig.schemaComponents = schemaComponents;
            }
            return mappingConfig;
        }
    }
    catch (error) {
        return error;
    }
});
exports.loadMapping = loadMapping;
const getModulesFromConfig = (config) => __awaiter(void 0, void 0, void 0, function* () {
    if (config.modules) {
        const modules = Object.keys(config.modules);
        const modulesToLoad = {};
        for (let i = 0; i < modules.length; i++) {
            const type = modules[i];
            let modulePath;
            switch (typeof config.modules[type]) {
                case 'boolean':
                    modulePath = path.join(__dirname, `./src/modules/${type}`);
                    break;
                case 'string':
                    modulePath = appRoot.path + config.modules[type];
                    break;
                case 'object':
                    throw new Error(`Object modules are currently unsupported. Check ${type} module config.`);
                default:
                    throw new Error(`ERROR: Unable to load module - ${type}`);
            }
            const mapping = yield exports.loadMapping(modulePath);
            if (mapping) {
                modulesToLoad[type] = mapping;
            }
            else {
                throw new Error(`ERROR: Unable to load module - ${type}`);
            }
        }
        return modulesToLoad;
    }
});
exports.getModulesFromConfig = getModulesFromConfig;
const getSiteConfig = (config) => __awaiter(void 0, void 0, void 0, function* () {
    if (config.siteMapping) {
        return exports.loadMapping(appRoot.path + config.siteMapping);
    }
});
exports.getSiteConfig = getSiteConfig;
