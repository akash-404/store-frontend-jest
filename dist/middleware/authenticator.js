"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var authenticate = function (req, res, next) {
    try {
        if (req.headers.authorization) {
            var header = req.headers.authorization;
            var token = header.split(' ')[1];
            jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
            next();
        }
        else {
            throw new Error('Authorization token is not present');
        }
    }
    catch (err) {
        res.status(401).send("Authentication Failure ------- ".concat(err));
    }
};
exports.authenticate = authenticate;
