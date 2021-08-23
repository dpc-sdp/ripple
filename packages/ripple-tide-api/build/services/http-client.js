"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const qs_1 = __importDefault(require("qs"));
class HttpClient {
    constructor(config) {
        this._initializeResponseInterceptor = () => {
            this.client.interceptors.response.use(this._handleResponse, this._handleError);
        };
        this._handleResponse = ({ data }) => data;
        this._handleError = (error) => Promise.reject(error);
        this.client = axios_1.default.create({
            baseURL: config.baseUrl,
            auth: config.auth,
            paramsSerializer: function (params) {
                return qs_1.default.stringify(params, { arrayFormat: 'brackets', indices: false });
            }
        });
        this._initializeResponseInterceptor();
    }
}
exports.default = HttpClient;
