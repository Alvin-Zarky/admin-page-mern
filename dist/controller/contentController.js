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
exports.countAllContent = exports.deleteContent = exports.updateContent = exports.getContentDetail = exports.getContent = exports.createContent = void 0;
const ContentModel_1 = __importDefault(require("../model/ContentModel"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const customErrorClass_1 = __importDefault(require("../utility/customErrorClass"));
const createContent = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { category, title, detail, image } = req.body;
    if (!req.user) {
        throw new customErrorClass_1.default(`User not authorize`, 401);
    }
    if (!req.user.id) {
        throw new customErrorClass_1.default(`User id not found`, 404);
    }
    const content = yield ContentModel_1.default.create({
        user: req.user.id,
        userName: req.user.userName,
        category,
        contentTitle: title,
        contentDescription: detail,
        picture: image,
        publishedAt: Date.now()
    });
    if (!content) {
        throw new customErrorClass_1.default(`Create content failed`, 400);
    }
    res.status(201).json({ success: true, data: content });
}));
exports.createContent = createContent;
const getContent = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        throw new customErrorClass_1.default(`User not authorize`, 401);
    }
    if (!req.user.id) {
        throw new customErrorClass_1.default(`User id not found`, 404);
    }
    if (!res.advancedResult.data || res.advancedResult.data.length === 0) {
        throw new customErrorClass_1.default(`Data content not found`, 404);
    }
    res.status(200).json(res.advancedResult);
}));
exports.getContent = getContent;
const getContentDetail = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        throw new customErrorClass_1.default(`User not authorize`, 401);
    }
    if (!req.user.id) {
        throw new customErrorClass_1.default(`User id not found`, 404);
    }
    const content = yield ContentModel_1.default.findById(req.params.id);
    if (!content) {
        throw new customErrorClass_1.default(`Content detail not found`, 404);
    }
    res.status(200).json({ success: true, data: content });
}));
exports.getContentDetail = getContentDetail;
const updateContent = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { category, title, detail, image } = req.body;
    if (!req.user) {
        throw new customErrorClass_1.default(`User not authorize`, 401);
    }
    if (!req.user.id) {
        throw new customErrorClass_1.default(`User id not found`, 404);
    }
    const content = yield ContentModel_1.default.findByIdAndUpdate(req.params.id, {
        category,
        contentTitle: title,
        contentDescription: detail,
        picture: image
    }, { new: true, runValidators: true });
    if (!content) {
        throw new customErrorClass_1.default(`Content not found`, 404);
    }
    res.status(200).json({ success: true, data: content });
}));
exports.updateContent = updateContent;
const deleteContent = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        throw new customErrorClass_1.default(`User not authorize`, 401);
    }
    if (!req.user.id) {
        throw new customErrorClass_1.default(`User id not found`, 404);
    }
    const content = yield ContentModel_1.default.findById(req.params.id);
    if (!content) {
        throw new customErrorClass_1.default(`Content not found`, 404);
    }
    yield content.remove();
    res.status(200).json({ success: true, data: content });
}));
exports.deleteContent = deleteContent;
const countAllContent = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        throw new customErrorClass_1.default(`User not authorize`, 401);
    }
    if (!req.user.id) {
        throw new customErrorClass_1.default(`User id does not exist`, 404);
    }
    const content = yield ContentModel_1.default.countDocuments();
    res.status(200).json({ success: true, count: content });
}));
exports.countAllContent = countAllContent;
