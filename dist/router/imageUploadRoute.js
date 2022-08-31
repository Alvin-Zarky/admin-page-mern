"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const multer_1 = __importDefault(require("multer"));
const router = express_1.default.Router();
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        // cb(null, 'uploads/')
        cb(null, 'frontend/public/images/');
    },
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now() + '-' + Math.round(Math.random() * 1E9)}${path_1.default.extname(file.originalname)}`);
    }
});
function checkFileSync(file, cb) {
    const fileType = /jpg|jpeg|png|gif/;
    const extType = fileType.test(path_1.default.extname(file.originalname).toLowerCase());
    const minetype = fileType.test(file.mimetype);
    if (extType && minetype) {
        cb(null, true);
    }
    else {
        cb(null, false);
        return cb(new Error(`Image only...!`));
    }
}
const upload = (0, multer_1.default)({
    storage,
    fileFilter: function (req, file, cb) {
        checkFileSync(file, cb);
    }
});
router.post('/', upload.single('image'), (req, res, next) => {
    res.send(`/images/${req.file.filename}`);
});
exports.default = router;
