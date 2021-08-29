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
const default_mapping_1 = __importDefault(require("./utils/default-mapping"));
class TidePage extends tide_api_1.default {
    constructor(config) {
        super(config);
        this.modules = config.modules;
    }
    getRouteByPath(path, site = 4) {
        return __awaiter(this, void 0, void 0, function* () {
            const routeUrl = `/route?site=${site}&path=${path}`;
            return this.client
                .get(routeUrl)
                .then(response => this.utils.get(response, 'data.attributes'))
                .catch(error => {
                return Promise.reject(this.handleError(`Error: ${error.response.status} `, error.response.status));
            });
        });
    }
    getPageByPath(path, config = { params: {} }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // if (this.isShareLink(path)) {
                //   return this.getPageFromShareLink(path, config)
                // }
                // if (this.isPreviewLink(path)) {
                //   return this.getPageFromPreviewLink(path, config)
                // }
                const route = yield this.getRouteByPath(path);
                if (route && !route.error) {
                    if (route.hasOwnProperty('redirect_type')) {
                        return Object.assign({ type: 'redirect' }, route);
                    }
                    return this.getPageByRouteData(route, {
                        params: Object.assign(Object.assign({}, config.params), { include: this.getResourceIncludes(route.bundle) })
                    });
                }
                return Promise.reject(route);
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
    }
    // async getPageFromShareLink(path, config = { params: {} }): Promise<any> {
    //   const shareLinkData = await this.client.get(path).then(response => {
    //     if (response.data) {
    //       return jsonapiParse.parse(response).data || response.data
    //     }
    //     return response
    //   })
    //   if (shareLinkData) {
    //     const sharedNode = shareLinkData.shared_node
    //     const routeData = {
    //       entity_type: 'node',
    //       bundle: sharedNode.type.replace('node--', ''),
    //       uuid: sharedNode.id
    //     }
    //     const pageData = await this.getPageByRouteData(routeData, {
    //       headers: {
    //         'X-Share-Link-Token': shareLinkData.id
    //       },
    //       params: {
    //         ...config.params,
    //         include: this.getResourceIncludes(routeData.bundle)
    //       }
    //     })
    //     return Promise.resolve(pageData)
    //   }
    // }
    // async getPageFromPreviewLink(path, config = { params: {} }): Promise<any> {
    //   const { 2: contentType, 3: uuid, 4: revisionId } = path.split('/')
    //   const routeData = {
    //     entity_type: 'node',
    //     bundle: contentType,
    //     uuid: uuid
    //   }
    //   const resourceVersion =
    //     revisionId === 'latest' ? 'rel:working-copy' : `id:${revisionId}`
    //   if (config.headers['x-oauth2-authorization']) {
    //     try {
    //       const pageData = await this.getPageByRouteData(routeData, {
    //         headers: {
    //           'x-oauth2-authorization': config.headers['x-oauth2-authorization']
    //         },
    //         params: {
    //           ...config.params,
    //           site: 4,
    //           resourceVersion,
    //           include: this.getResourceIncludes(routeData.bundle)
    //         }
    //       })
    //       return Promise.resolve(pageData)
    //     } catch (error) {
    //       return Promise.reject(
    //         this.handleError(
    //           { message: 'Unauthorized', error },
    //           (error.response && error.response.status) || 401
    //         )
    //       )
    //     }
    //   }
    //   return Promise.reject(this.handleError({ message: 'Unauthorized' }, 401))
    // }
    getResourceIncludes(type) {
        const includes = this.modules[type] ? this.modules[type].includes : [];
        if (default_mapping_1.default &&
            Array.isArray(default_mapping_1.default.includes) &&
            default_mapping_1.default.includes.length > 0) {
            includes.push(...default_mapping_1.default.includes);
        }
        return includes ? includes.toString() : '';
    }
    isShareLink(route) {
        if (typeof route !== 'string') {
            return false;
        }
        return route.indexOf('/share_link/') === 0;
    }
    isPreviewLink(route) {
        if (typeof route !== 'string') {
            return false;
        }
        return route.indexOf('/preview/') === 0;
    }
    getPageByRouteData(route, config) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (route && route.entity_type && route.bundle && route.uuid) {
                    const nodeUrl = `/${route.entity_type}/${route.bundle}/${route.uuid}`;
                    return this.client
                        .get(nodeUrl, config)
                        .then(response => {
                        if (response.data) {
                            const data = jsonapi_parse_1.default.parse(response).data || response.data;
                            return this.getTidePage(data, route.bundle);
                        }
                        return response;
                    })
                        .catch(error => {
                        return Promise.reject(this.handleError({}, error.response.status));
                    });
                }
                throw this.handleError('Invalid route');
            }
            catch (error) {
                return Promise.reject(this.handleError({ message: 'Application Error - getPageByRouteData', error }, error.response.status || 500));
            }
        });
    }
    getTaxonomyItems(taxonomyName, config) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const url = `/taxonomy_term/${taxonomyName}`;
                return this.client.get(url, config).then(response => {
                    if (response.data) {
                        const data = jsonapi_parse_1.default.parse(response).data || response.data;
                        return data;
                    }
                    return response;
                });
            }
            catch (error) {
                return Promise.reject(this.handleError({ message: 'Application Error - getTaxonomyItems', error }, error.response.status || 500));
            }
        });
    }
    getTidePage(resource, type) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.debug) {
                default_mapping_1.default.mapping._source = src => src;
            }
            const moduleMapping = this.modules[type] &&
                this.modules[type].hasOwnProperty('mapping') &&
                this.modules[type].mapping;
            if (!moduleMapping) {
                return Promise.reject(this.handleError({ message: 'Unable to resolve module - ' + type }));
            }
            return this.getMappedData(Object.assign(Object.assign({}, default_mapping_1.default.mapping), moduleMapping), resource);
        });
    }
    getResourceType(type) {
        return type.replace('node--', '');
    }
}
exports.default = TidePage;
