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
exports.meta = void 0;
const create_server_1 = __importDefault(require("./create-server"));
const load_config_1 = require("./load-config");
const path = require('path');
const TideApiModule = function (moduleOptions) {
    return __awaiter(this, void 0, void 0, function* () {
        const modules = yield load_config_1.getModulesFromConfig(moduleOptions);
        const siteMapping = yield load_config_1.getSiteConfig(moduleOptions);
        const conf = Object.assign(Object.assign({}, moduleOptions), { modules,
            siteMapping });
        this.extendRoutes((routes, resolve) => {
            routes.push({
                // Extends routes to add tide page wildcard route, routes added under /pages will still take precedence
                name: 'tide-page',
                path: '*',
                component: resolve(__dirname, './../components/tide.vue')
            });
        });
        this.addPlugin({
            src: path.resolve(__dirname, './../plugins/tide-api.js'),
            fileName: 'tide-api.js',
            options: Object.assign(Object.assign({}, moduleOptions), { modules })
        });
        this.requireModule(['@nuxtjs/axios', {
                debug: false,
                // Using proxy for Tide request https://axios.nuxtjs.org/options#proxy
                // proxy: true
            }]);
        this.addServerMiddleware(create_server_1.default(conf));
    });
};
exports.default = TideApiModule;
exports.meta = require('./../package.json');
