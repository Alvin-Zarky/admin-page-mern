"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ContentModel = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: [true, 'Please input the user id'],
        ref: 'User'
    },
    userName: {
        type: String,
        required: [true, 'Please input the username']
    },
    category: {
        type: String,
        required: [true, 'Please input the category type'],
    },
    contentTitle: {
        type: String,
        required: [true, 'Please input the title']
    },
    contentDescription: {
        type: String,
        required: [true, 'Please input the description']
    },
    picture: {
        type: String,
        required: [true, 'Please upload the image']
    },
    publishedAt: {
        type: Date,
        default: Date.now()
    }
}, { timestamps: true });
const Content = mongoose_1.default.model('Content', ContentModel);
exports.default = Content;
