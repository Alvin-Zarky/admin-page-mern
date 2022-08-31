"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const categoryController_1 = require("../controller/categoryController");
const advancedResultMiddleware_1 = require("../middleware/advancedResultMiddleware");
const authTokenMiddleware_1 = require("../middleware/authTokenMiddleware");
const CategoryModel_1 = __importDefault(require("../model/CategoryModel"));
const router = (0, express_1.default)();
router.use(authTokenMiddleware_1.authMiddleware);
router.route('/').post(categoryController_1.createCategory).get((0, advancedResultMiddleware_1.advancedResultMiddleware)(CategoryModel_1.default, {
    path: "user",
    select: "userName userEmail",
    model: "User"
}), categoryController_1.collectCategory);
router.route('/:id').put(categoryController_1.updateCategory).delete(categoryController_1.deleteCategory);
router.get('/all', categoryController_1.countAllCategory);
exports.default = router;
