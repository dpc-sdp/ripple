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
const jsonapi_parse_1 = __importDefault(require("jsonapi-parse"));
const tide_api_1 = __importDefault(require("./tide-api"));
class TideSite extends tide_api_1.default {
    constructor(config) {
        super(config);
        this.site = config.site;
        this.siteMapping = config.siteMapping;
    }
    getSiteData(siteid) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!siteid) {
                this.handleError('Error: No site id', 400);
            }
            const include = this.siteMapping.includes;
            const params = {
                include: include.toString(),
                site: siteid
            };
            if (/\d/.test(siteid)) {
                params['filter'] = {
                    drupal_internal__tid: siteid
                };
            }
            else {
                params['filter'] = {
                    name: siteid
                };
            }
            try {
                const response = yield this.client.get(`/taxonomy_term/sites`, { params });
                if (response) {
                    const resource = jsonapi_parse_1.default.parse(response).data[0];
                    const siteData = yield this.getMappedData(this.siteMapping.mapping, resource);
                    return siteData;
                }
            }
            catch (error) {
                console.log(error);
                this.handleError('Error fetching site data' + error.message, 500);
            }
        });
    }
}
exports.default = TideSite;
