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
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const colors_1 = __importDefault(require("colors"));
const morgan_1 = __importDefault(require("morgan"));
const userRoute_1 = __importDefault(require("./router/userRoute"));
const categoryRoute_1 = __importDefault(require("./router/categoryRoute"));
const contentRoute_1 = __importDefault(require("./router/contentRoute"));
const mongoDb_1 = __importDefault(require("./config/mongoDb"));
const imageUploadRoute_1 = __importDefault(require("./router/imageUploadRoute"));
const customErrorMiddleware_1 = __importDefault(require("./middleware/customErrorMiddleware"));
dotenv_1.default.config();
(0, mongoDb_1.default)();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.static(path_1.default.join(__dirname, '/frontend/public/images')));
app.use((0, morgan_1.default)('dev'));
app.use('/dev/flutter/api/user', userRoute_1.default);
app.use('/dev/flutter/api/category', categoryRoute_1.default);
app.use('/dev/flutter/api/content', contentRoute_1.default);
app.use('/dev/flutter/api/upload', imageUploadRoute_1.default);
//Serve client
if (process.env.NODE_ENV === 'production') {
    app.use(express_1.default.static(path_1.default.join(__dirname, '../frontend/build')));
    app.get('*', (req, res) => {
        res.sendFile(path_1.default.resolve(__dirname, '../', 'frontend', 'build', 'index.html'));
    });
}
else {
    app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        res.send(`Server API is running...!`);
    }));
}
app.use((req, res, next) => {
    res.send(`Page could not be found with this url~${req.originalUrl}`);
});
app.use(customErrorMiddleware_1.default);
const server = app.listen(PORT, () => {
    console.log(`${colors_1.default.yellow(`Server in ${process.env.NODE_ENV} is running on port ${PORT}`)}`);
});
process.on('unhandledRejection', (err, promise) => {
    console.log(colors_1.default.bgRed(`Error Connection ${err}`));
    server.close(() => { process.exit(1); });
});
