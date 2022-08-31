"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controller/userController");
const authTokenMiddleware_1 = require("../middleware/authTokenMiddleware");
const router = express_1.default.Router();
router.post('/login', userController_1.userLogin);
router.post('/register', userController_1.userRegister);
router.get('/logout', authTokenMiddleware_1.authMiddleware, userController_1.userLogOut);
router.get('/profile', authTokenMiddleware_1.authMiddleware, userController_1.userProfile);
router.get('/all', authTokenMiddleware_1.authMiddleware, userController_1.countAllUser);
exports.default = router;
