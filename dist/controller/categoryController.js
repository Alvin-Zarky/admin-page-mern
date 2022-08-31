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
exports.countAllCategory = exports.deleteCategory = exports.updateCategory = exports.collectCategory = exports.createCategory = void 0;
const CategoryModel_1 = __importDefault(require("../model/CategoryModel"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const customErrorClass_1 = __importDefault(require("../utility/customErrorClass"));
const createCategory = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, slug } = req.body;
    if (!req.user) {
        throw new customErrorClass_1.default(`User not found `, 404);
    }
    if (!req.user.id) {
        throw new customErrorClass_1.default(`User id not exist`, 404);
    }
    if (!name || !slug) {
        throw new customErrorClass_1.default(`Please input the field`, 400);
    }
    const category = yield CategoryModel_1.default.create({
        user: req.user._id,
        userName: req.user.userName,
        categoryName: name,
        slugUrl: slug,
        publishedAt: Date.now()
    });
    if (!category) {
        throw new customErrorClass_1.default(`Category created failed`, 400);
    }
    res.status(201).json({ success: true, data: category });
}));
exports.createCategory = createCategory;
const collectCategory = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        throw new customErrorClass_1.default(`User not found `, 404);
    }
    if (!req.user.id) {
        throw new customErrorClass_1.default(`User id not exist`, 404);
    }
    if (!res.advancedResult.data || res.advancedResult.data.length === 0) {
        throw new customErrorClass_1.default(`Data category not found`, 404);
    }
    res.status(200).json(res.advancedResult);
}));
exports.collectCategory = collectCategory;
const updateCategory = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, slug } = req.body;
    if (!req.user) {
        throw new customErrorClass_1.default(`User not authorize`, 401);
    }
    if (!req.user.id) {
        throw new customErrorClass_1.default(`User id does not exist`, 404);
    }
    const category = yield CategoryModel_1.default.findByIdAndUpdate(req.params.id, {
        categoryName: name,
        slugUrl: slug
    }, { new: true, runValidators: true });
    if (!category) {
        throw new customErrorClass_1.default(`Category update not found`, 404);
    }
    res.status(200).json({ success: true, data: category });
}));
exports.updateCategory = updateCategory;
const deleteCategory = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        throw new customErrorClass_1.default(`User not authorize`, 401);
    }
    if (!req.user.id) {
        throw new customErrorClass_1.default(`User id does not exist`, 404);
    }
    const category = yield CategoryModel_1.default.findByIdAndDelete(req.params.id);
    if (!category) {
        throw new customErrorClass_1.default(`Category delete not found`, 404);
    }
    res.status(200).json({ success: true, data: category });
}));
exports.deleteCategory = deleteCategory;
const countAllCategory = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        throw new customErrorClass_1.default(`User not authorize`, 401);
    }
    if (!req.user.id) {
        throw new customErrorClass_1.default(`User id does not exist`, 404);
    }
    const category = yield CategoryModel_1.default.countDocuments();
    res.status(200).json({ success: true, count: category });
}));
exports.countAllCategory = countAllCategory;
