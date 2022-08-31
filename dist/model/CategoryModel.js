"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const CategoryModel = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: [true, 'Please input the user id'],
        ref: 'User'
    },
    userName: {
        type: String,
        required: [true, 'Please input the username']
    },
    categoryName: {
        type: String,
        required: [true, 'Please input the category name']
    },
    slugUrl: {
        type: String,
        required: [true, 'Please input the slug url']
    },
    publishedAt: {
        type: Date,
        default: Date.now()
    }
}, { timestamps: true });
const Category = mongoose_1.default.model('Category', CategoryModel);
exports.default = Category;
