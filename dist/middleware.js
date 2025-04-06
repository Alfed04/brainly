"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("./config");
const userMiddleware = (req, res, next) => {
    const token = req.headers["token"];
    const decode = jsonwebtoken_1.default.verify(token, config_1.JWT_PASSWORD);
    // console.log(decode)
    if (decode) {
        //@ts-ignore
        req.userId = decode.id;
        next();
    }
    else {
        res.status(403).json({
            message: "You are not authenticated"
        });
    }
};
exports.userMiddleware = userMiddleware;
