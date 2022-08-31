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
Object.defineProperty(exports, "__esModule", { value: true });
exports.advancedResultMiddleware = void 0;
const advancedResultMiddleware = (model, populate) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let data = model.find();
    let count = model.countDocuments();
    if (req.query) {
        data = model.find(req.query);
    }
    if (populate) {
        data.populate(populate);
    }
    if (req.query.select) {
        const selectQuery = req.query.select.split(',').join(' ');
        data.select(selectQuery);
    }
    if (req.query.sort) {
        const sortQuery = req.query.sort.split(',').join(' ');
        data.sort(sortQuery);
    }
    if (req.query.search) {
        const searchKeyword = {
            categoryName: {
                $regex: req.query.search,
                $options: `i`
            },
            contentTitle: {
                $regex: req.query.search,
                $options: `i`
            }
        };
        data = model.find(Object.assign({}, searchKeyword));
        count = model.countDocuments(Object.assign({}, searchKeyword));
    }
    const pagination = {};
    const countData = yield count;
    const pages = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const start = (pages - 1) * limit;
    const end = pages * limit;
    const allPages = Math.ceil(countData / limit);
    data.skip(start).limit(limit);
    data.sort({ createdAt: -1 });
    const result = yield data;
    if (start > 0) {
        pagination.prev = {
            page: pages - 1
        };
    }
    if (end < countData) {
        pagination.next = {
            page: pages + 1
        };
    }
    res.advancedResult = {
        success: true,
        count: countData,
        pages,
        allPages,
        pagination,
        data: result
    };
    next();
});
exports.advancedResultMiddleware = advancedResultMiddleware;
