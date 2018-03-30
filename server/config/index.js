"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config({ path: '.env' });
exports.default = {
    port: process.env.PORT,
    AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
    AUTH0_API_AUDIENCE: process.env.AUTH0_API_AUDIENCE,
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASS: process.env.EMAIL_PASS,
    EMAIL_RECIEVER: process.env.EMAIL_RECIEVER,
    mongoUrl: process.env.DB_CONN,
    mongoPWD: process.env.MONGO_PWD,
    mongoUser: process.env.MONGO_USER,
    mongoDB: process.env.MONGO_DB,
    mongoAuth: process.env.MONGO_AUTH
};
