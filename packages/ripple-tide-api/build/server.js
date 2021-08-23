"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const create_server_1 = __importDefault(require("./create-server"));
const dotenv_1 = __importDefault(require("dotenv"));
//.env
dotenv_1.default.config();
const PORT = process.env.PORT || 3001;
const SERVER_URL = process.env.SERVER_URL || 'http://localhost';
const app = create_server_1.default({
    apiBase: 'api',
    apiVersion: 'v2',
    debug: process.env.NODE_ENV === 'development',
    site: 4,
    siteMapping: {
        mapping: {
            name: 'name'
        },
        includes: [
            'field_site_logo'
        ]
    },
    modules: {
        landing_page: {
            mapping: {
                title: 'title'
            },
            includes: []
        }
    },
    auth: {
        username: 'dpc',
        password: 'dpc',
    },
    tide: {
        apiPrefix: 'api/v1',
        site: 4,
        baseUrl: process.env.CONTENT_API_SERVER || '',
        auth: {
            username: 'dpc',
            password: 'sdp',
        }
    }
});
app.listen(PORT, () => {
    console.info(`Service starting at ${SERVER_URL}:${PORT}`);
});
