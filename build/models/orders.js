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
exports.OrderStore = void 0;
var database_1 = __importDefault(require("../database"));
var OrderStore = /** @class */ (function () {
    function OrderStore() {
    }
    OrderStore.prototype.index = function () {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = 'SELECT * FROM orders;';
                        return [4 /*yield*/, conn.query(sql)];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows];
                    case 3:
                        err_1 = _a.sent();
                        throw new Error("error while model order index ".concat(err_1));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrderStore.prototype.currentOrder = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql3, result1, sql, result, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        console.log("entered current order");
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql3 = 'SELECT * FROM orders WHERE user_id = $1;';
                        return [4 /*yield*/, conn.query(sql3, [id])];
                    case 2:
                        result1 = _a.sent();
                        sql = 'SELECT * FROM order_products WHERE order_id = $1;';
                        return [4 /*yield*/, conn.query(sql, [result1.rows[0].id])];
                    case 3:
                        result = _a.sent();
                        console.log(result);
                        conn.release();
                        return [2 /*return*/, result.rows];
                    case 4:
                        err_2 = _a.sent();
                        console.log("found error ".concat(err_2));
                        throw new Error("error while currentOrder model order ".concat(err_2));
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    OrderStore.prototype.create = function (order) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql1, sql3, result1, sql2, result2, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql1 = 'INSERT INTO orders(status,user_id) VALUES($1,$2);';
                        return [4 /*yield*/, conn.query(sql1, [order.status, order.user_id])];
                    case 2:
                        _a.sent();
                        sql3 = 'SELECT * FROM orders WHERE user_id = $1 AND status =$2;';
                        return [4 /*yield*/, conn.query(sql3, [order.user_id, order.status])];
                    case 3:
                        result1 = _a.sent();
                        sql2 = 'INSERT INTO order_products(order_id,quantity,product_id)VALUES($1,$2,$3);';
                        return [4 /*yield*/, conn.query(sql2, [result1.rows[0].id, order.quantity, order.user_id])];
                    case 4:
                        result2 = _a.sent();
                        console.log(result2.rows);
                        return [2 /*return*/, {
                                order: result1.rows[0],
                            }];
                    case 5:
                        err_3 = _a.sent();
                        console.log(err_3);
                        throw new Error("found error while order model create ".concat(err_3));
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    OrderStore.prototype.addProduct = function (product_id, quantity, order_id) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        console.log("entered add product model order function");
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = 'INSERT INTO order_products(product_id,quantity,order_id)VALUES($1,$2,$3) RETURNING *;';
                        return [4 /*yield*/, conn.query(sql, [product_id, quantity, order_id])];
                    case 2:
                        result = _a.sent();
                        console.log(result);
                        conn.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        err_4 = _a.sent();
                        throw new Error("found error while order model addProduct");
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrderStore.prototype.setStatus = function (order_status, order_id) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = 'UPDATE orders SET status = $1 WHERE id = $2 RETURNING *';
                        return [4 /*yield*/, conn.query(sql, [order_status, order_id])];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        err_5 = _a.sent();
                        throw new Error("found error while model order setStatus ".concat(err_5));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return OrderStore;
}());
exports.OrderStore = OrderStore;
