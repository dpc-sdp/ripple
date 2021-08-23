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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const controllers_1 = require("./controllers");
//.env
dotenv_1.default.config();
//express
const PORT = process.env.PORT || 3001;
const SERVER_URL = process.env.SERVER_URL || 'http://localhost';
function createRippleTideApiServer(config) {
    const apiRoot = `/${config.apiBase || 'api'}/${config.apiVersion || 'v2'}`;
    const router = express_1.Router();
    router.use('/page', controllers_1.TidePageController);
    router.use('/site/:id', controllers_1.TideSiteController);
    const app = express_1.default();
    app.use(apiRoot, router);
    console.log(config);
    app.locals.config = config;
    return app;
}
exports.default = createRippleTideApiServer;
