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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRoutes = void 0;
var orders_1 = require("../models/orders");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var store = new orders_1.OrderStore;
var tsecret = process.env.TOKEN_SECRET;
function index(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var result, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    try {
                        jsonwebtoken_1.default.verify(req.body.token, tsecret);
                    }
                    catch (err) {
                        res.status(401).json("Access denied, Invalid token. ".concat(err));
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, store.index()];
                case 2:
                    result = _a.sent();
                    res.status(200).json(result);
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    res.status(500).json("Internal server error ".concat(err_1));
                    return [2 /*return*/];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function currentOrder(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var result, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    try {
                        jsonwebtoken_1.default.verify(req.body.token, tsecret);
                    }
                    catch (err) {
                        res.status(401).json("Access denied, ".concat(err));
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, store.currentOrder(req.params.id)];
                case 2:
                    result = _a.sent();
                    res.status(200).json(result);
                    return [3 /*break*/, 4];
                case 3:
                    err_2 = _a.sent();
                    res.status(500).json("Internal server error ".concat(err_2));
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function create(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var order, result, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    try {
                        jsonwebtoken_1.default.verify(req.body.token, tsecret);
                    }
                    catch (err) {
                        res.status(401).json("Access denied, Invalid token. ".concat(err));
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    order = {
                        product_id: req.body.product_id,
                        quantity: req.body.quantity,
                        user_id: req.body.user_id,
                        status: req.body.status
                    };
                    return [4 /*yield*/, store.create(order)];
                case 2:
                    result = _a.sent();
                    res.status(200).json(result);
                    return [3 /*break*/, 4];
                case 3:
                    err_3 = _a.sent();
                    res.status(500).json("internal server error ".concat(err_3));
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function addProduct(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var result, err_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    try {
                        jsonwebtoken_1.default.verify(req.body.token, tsecret);
                    }
                    catch (err) {
                        res.status(401).json("Access denied, Invalid token. ".concat(err));
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, store.addProduct(req.body.product_id, req.body.quantity, req.body.order_id)];
                case 2:
                    result = _a.sent();
                    res.status(200).json(result);
                    return [3 /*break*/, 4];
                case 3:
                    err_4 = _a.sent();
                    res.status(500).json("internal server error ".concat(err_4));
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function setStatus(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var result, err_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    try {
                        jsonwebtoken_1.default.verify(req.body.token, tsecret);
                    }
                    catch (err) {
                        res.status(401).json("Access denied, Invalid token. ".concat(err));
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, store.setStatus(req.body.status, req.params.id)];
                case 2:
                    result = _a.sent();
                    res.json(result);
                    return [3 /*break*/, 4];
                case 3:
                    err_5 = _a.sent();
                    res.status(500).json("internal server error ".concat(err_5));
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function OrderRoutes(app) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            app.get("/orders", function (req, res) {
                index(req, res);
            });
            app.get("/orders/:id", function (req, res) {
                currentOrder(req, res);
            });
            app.post("/orders", function (req, res) {
                create(req, res);
            });
            app.post("/orders/add", function (req, res) {
                addProduct(req, res);
            });
            app.post("/orders/:id", function (req, res) {
                setStatus(req, res);
            });
            return [2 /*return*/];
        });
    });
}
exports.OrderRoutes = OrderRoutes;
