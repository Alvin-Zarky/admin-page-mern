"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const UserModel = new mongoose_1.default.Schema({
    userName: {
        type: String,
        required: [true, 'Please input the username']
    },
    userEmail: {
        type: String,
        required: [true, 'Please input the useremail']
    },
    password: {
        type: String,
        required: [true, 'Please input the password']
    },
    userRole: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    publishedAt: {
        type: Date,
        default: Date.now()
    }
}, { timestamps: true });
const User = mongoose_1.default.model('User', UserModel);
exports.default = User;
