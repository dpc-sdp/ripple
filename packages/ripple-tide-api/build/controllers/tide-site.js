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
const tide_site_1 = __importDefault(require("./../services/tide-site"));
/**
 * Site API
 * @route GET /site
 */
exports.default = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tideSiteApi = new tide_site_1.default(req.app.locals.config);
    try {
        if (req.params && req.params.id) {
            const data = yield tideSiteApi.getSiteData(`${req.params.id}`);
            if (data) {
                return res.status(200).json(data);
            }
        }
        tideSiteApi.handleError('No id given');
    }
    catch (error) {
        res.status(error.status || 500).json(error);
    }
});
