"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const contentController_1 = require("../controller/contentController");
const advancedResultMiddleware_1 = require("../middleware/advancedResultMiddleware");
const authTokenMiddleware_1 = require("../middleware/authTokenMiddleware");
const ContentModel_1 = __importDefault(require("../model/ContentModel"));
const router = express_1.default.Router();
router.use(authTokenMiddleware_1.authMiddleware);
router.get('/all', contentController_1.countAllContent);
router.route('/').post(contentController_1.createContent).get((0, advancedResultMiddleware_1.advancedResultMiddleware)(ContentModel_1.default, {
    path: "user",
    select: "userName userEmail",
    model: "User"
}), contentController_1.getContent);
router.route('/:id').get(contentController_1.getContentDetail).put(contentController_1.updateContent).delete(contentController_1.deleteContent);
exports.default = router;
