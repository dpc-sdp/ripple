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
const tide_page_1 = __importDefault(require("./../services/tide-page"));
/**
 * Page API
 * @route GET /page
 */
exports.default = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const runtimeConfig = req.app.locals.config;
    const tidePageApi = new tide_page_1.default(runtimeConfig);
    try {
        if (!req.query.path) {
            throw new Error('No id given');
        }
        const config = {
            params: {
                site: req.query.site || runtimeConfig.tide.site
            }
        };
        const data = yield tidePageApi.getPageByPath(req.query.path, config);
        if (data) {
            return res.status(200).json(data);
        }
    }
    catch (error) {
        res.status(error.status || 500).json({
            error,
            message: 'Error'
        });
    }
});
