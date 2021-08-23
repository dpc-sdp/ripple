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
const http_client_1 = __importDefault(require("./http-client"));
const api_error_1 = __importDefault(require("./utils/api-error"));
const api_logger_1 = __importDefault(require("./utils/api-logger"));
const lodash_get_1 = __importDefault(require("lodash.get"));
class TideApi extends http_client_1.default {
    constructor(config) {
        super({
            baseUrl: `${config.tide.baseUrl}${config.tide.apiPrefix}`,
            auth: config.tide.auth
        });
        if (!config) {
            throw new Error('Error - No configuration specified');
        }
        this.utils = {
            get: lodash_get_1.default
        };
        this.debug = config.debug;
        this.logger = new api_logger_1.default();
    }
    getMappedData(mapping, resource) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!mapping || !resource) {
                this.handleError('Error: Unable to retrive data from mapping' + mapping, 500);
            }
            const data = {};
            for (const key in mapping) {
                try {
                    if (mapping.hasOwnProperty(key)) {
                        const resolver = mapping[key];
                        if (typeof resolver === 'string' || Array.isArray(resolver)) {
                            data[key] = lodash_get_1.default(resource, resolver);
                        }
                        else if (resolver.constructor.name === 'AsyncFunction') {
                            const resolveFn = resolver.bind(this);
                            data[key] = yield resolveFn(resource);
                        }
                        else if (typeof resolver === 'function') {
                            const resolveFn = resolver.bind(this);
                            data[key] = resolveFn(resource);
                        }
                        else if (typeof resolver === 'object') {
                            data[key] = resolver;
                        }
                    }
                }
                catch (error) {
                    console.log(key, error);
                }
            }
            return data;
        });
    }
    getErrorMessage(status) {
        switch (status) {
            case 404:
            case 403:
                return 'Page not found';
            case 401:
                return 'Unauthorized';
            case 400:
                return 'Bad request';
            case 503:
            case 500:
                return 'Server is not available';
            default:
                return 'Error fetching data';
        }
    }
    handleError(debug, status = 500) {
        if (this.debug) {
            if (status === 404) {
                this.logger.info(this.getErrorMessage(status));
            }
            else {
                this.logger.error(debug);
            }
        }
        const getReturnStatus = code => {
            switch (code) {
                case 404:
                case 403:
                    return 404;
                default:
                    return code;
            }
        };
        return new api_error_1.default({
            status: getReturnStatus(status),
            message: this.getErrorMessage(status)
        });
    }
}
exports.default = TideApi;
