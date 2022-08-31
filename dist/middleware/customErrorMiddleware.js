"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const customErrorClass_1 = __importDefault(require("../utility/customErrorClass"));
const customErrorMiddleware = (err, req, res, next) => {
    let error = Object.assign({}, err);
    error.message = err.message;
    error.stack = err.stack;
    error.statusCode = err.statusCode;
    if (err.name === 'CastError') {
        error = new customErrorClass_1.default(`Couldn't found data with this id ~${err.value}`, 404);
        error.statusCode = 404;
    }
    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map((val) => val.message);
        error = new customErrorClass_1.default(`${message}`, 400);
        error.statusCode = 400;
    }
    if (err.name === 11000) {
        error = new customErrorClass_1.default(`Douplicate field entering data`, 400);
        error.statusCode = 400;
    }
    const statusCode = err.statusCode || error.statusCode || 500;
    const message = error.message || 'Internal Server Error';
    res.status(statusCode).json({
        success: false,
        message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : null
    });
};
exports.default = customErrorMiddleware;
