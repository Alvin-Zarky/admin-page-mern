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
exports.countAllUser = exports.userProfile = exports.userLogOut = exports.userLogin = exports.userRegister = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const UserModel_1 = __importDefault(require("../model/UserModel"));
const customErrorClass_1 = __importDefault(require("../utility/customErrorClass"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const userRegister = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, secretKey } = req.body;
    if (!name || !email || !password) {
        throw new customErrorClass_1.default(`Please input the field`, 400);
    }
    const existName = yield UserModel_1.default.findOne({ "userName": { $regex: new RegExp("^" + name.toLowerCase(), "i") } });
    if (existName) {
        throw new customErrorClass_1.default(`Username is already existed`, 400);
    }
    const existEmail = yield UserModel_1.default.findOne({ "userEmail": { $regex: new RegExp("^" + email.toLowerCase(), "i") } });
    if (existEmail) {
        throw new customErrorClass_1.default(`Useremail is already existed`, 400);
    }
    const hashSalt = yield bcryptjs_1.default.genSalt(10);
    const hashPassword = yield bcryptjs_1.default.hash(password, hashSalt);
    const valuesUser = {
        userName: name,
        userEmail: email,
        password: hashPassword,
        userRole: "user",
        isAdmin: false,
        publishedAt: Date.now()
    };
    if (secretKey === 'alvindevops') {
        const user = yield UserModel_1.default.create(valuesUser);
        if (!user) {
            throw new customErrorClass_1.default(`User created fail`, 400);
        }
        res.status(200).json({
            success: true,
            data: {
                _id: user._id,
                name: user.userName,
                email: user.userEmail,
                role: user.userRole,
                isAdmin: user.isAdmin,
                createdAt: user.publishedAt,
                jsontoken: userGeneratedToken(user._id)
            }
        });
    }
    else {
        throw new customErrorClass_1.default(`The secret isn't available for this registration`, 400);
    }
}));
exports.userRegister = userRegister;
const userLogin = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new customErrorClass_1.default(`Please input the field`, 400);
    }
    const user = yield UserModel_1.default.findOne({ "userEmail": { $regex: new RegExp("^" + email.toLowerCase(), "i") } });
    if (user) {
        if (password && (yield bcryptjs_1.default.compare(password, user.password))) {
            const values = {
                _id: user._id,
                name: user.userName,
                email: user.userEmail,
                role: user.userRole,
                isAdmin: user.isAdmin,
                createdAt: user.publishedAt,
                jsontoken: userGeneratedToken(user._id)
            };
            res.status(200).json({ success: true, data: values });
        }
        else {
            throw new customErrorClass_1.default(`Password is incorrect`, 401);
        }
    }
    else {
        throw new customErrorClass_1.default(`There is no user record here or there is something went wrong`, 401);
    }
}));
exports.userLogin = userLogin;
const userLogOut = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        throw new customErrorClass_1.default(`User not authorize`, 401);
    }
    if (!req.user.id) {
        throw new customErrorClass_1.default(`User id not found`, 404);
    }
    const user = yield UserModel_1.default.findById(req.user.id);
    if (user) {
        res.status(200).json({ success: true, message: "User has been log out successfully", data: {
                _id: user._id,
                name: user.userName,
                email: user.userEmail,
                role: user.userRole,
                isAdmin: user.isAdmin,
                createdAt: user.publishedAt
            } });
    }
    else {
        throw new customErrorClass_1.default(`User does not exist`, 404);
    }
}));
exports.userLogOut = userLogOut;
const userProfile = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        throw new customErrorClass_1.default(`User not authorize`, 401);
    }
    if (!req.user.id) {
        throw new customErrorClass_1.default(`User id not found`, 404);
    }
    const user = yield UserModel_1.default.findById(req.user.id).select('-password');
    if (!user) {
        throw new customErrorClass_1.default(`User does not exist`, 401);
    }
    const values = {
        _id: user._id,
        name: user.userName,
        email: user.userEmail,
        role: user.userRole,
        isAdmin: user.isAdmin,
        createdAt: user.publishedAt
    };
    res.status(200).json({ success: true, data: values });
}));
exports.userProfile = userProfile;
const countAllUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        throw new customErrorClass_1.default(`User not authorize`, 401);
    }
    if (!req.user.id) {
        throw new customErrorClass_1.default(`User id not found`, 404);
    }
    const user = yield UserModel_1.default.find();
    const count = yield UserModel_1.default.countDocuments();
    if (!user) {
        throw new customErrorClass_1.default(`User not found`, 404);
    }
    res.status(200).json({ success: true, count, data: user });
}));
exports.countAllUser = countAllUser;
const userGeneratedToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, `${process.env.JWT_SECRET_KEY}`, { expiresIn: process.env.JWT_EXPIRES_IN });
};
