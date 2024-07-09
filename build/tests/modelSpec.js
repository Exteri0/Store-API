"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var products_1 = require("../models/products");
var orders_1 = require("../models/orders");
var users_1 = require("../models/users");
var bcrypt_1 = __importDefault(require("bcrypt"));
var UStore = new users_1.UserStore;
var PStore = new products_1.ProductStore;
var OStore = new orders_1.OrderStore;
describe("Product Model Tests", function () { return __awaiter(void 0, void 0, void 0, function () {
    var goodProduct, createdGoodProduct, createdGoodProducts;
    return __generator(this, function (_a) {
        goodProduct = {
            name: 'ball',
            price: 100
        };
        createdGoodProduct = __assign(__assign({}, goodProduct), { id: 1 });
        createdGoodProducts = [
            __assign(__assign({}, goodProduct), { id: 1 }),
            __assign(__assign({}, goodProduct), { id: 2 })
        ];
        describe("isDefined tests", function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                it("expects that there is an index function defined", function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        expect(PStore.index).toBeDefined();
                        return [2 /*return*/];
                    });
                }); });
                it("expects that there is a show function defined", function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        expect(PStore.index).toBeDefined();
                        return [2 /*return*/];
                    });
                }); });
                it("expects that there is a create function defined", function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        expect(PStore.index).toBeDefined();
                        return [2 /*return*/];
                    });
                }); });
                return [2 /*return*/];
            });
        }); });
        describe("Product Model functionality tests", function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                it("tests the functionality of the create method", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, PStore.create(goodProduct)];
                            case 1:
                                result = _a.sent();
                                expect(result).toEqual(createdGoodProduct);
                                return [2 /*return*/];
                        }
                    });
                }); });
                it("tests the functionality of the index method", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, PStore.create(goodProduct)];
                            case 1:
                                _a.sent();
                                return [4 /*yield*/, PStore.index()];
                            case 2:
                                result = _a.sent();
                                expect(result).toHaveSize(2);
                                expect(result).toEqual(createdGoodProducts);
                                return [2 /*return*/];
                        }
                    });
                }); });
                it("tests the functionality of the show method", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, PStore.show(createdGoodProduct.id)];
                            case 1:
                                result = _a.sent();
                                expect(result).toEqual(createdGoodProduct);
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        }); });
        return [2 /*return*/];
    });
}); });
describe("User Model tests", function () { return __awaiter(void 0, void 0, void 0, function () {
    var goodUser, badUser1, badUser2, createdGoodUser;
    return __generator(this, function (_a) {
        goodUser = {
            firstname: "omar",
            lastname: "faramawy",
            password: "secret"
        };
        badUser1 = {
            firstname: "omar",
            lastname: "faramawy",
            password: "notcorrectpassword"
        };
        badUser2 = {
            firstname: "faramawy",
            lastname: "omar",
            password: "secret"
        };
        createdGoodUser = {
            id: 1,
            firstname: "omar",
            lastname: "faramawy",
            password: bcrypt_1.default.hashSync(goodUser.password + process.env.pepper, parseInt(process.env.saltRounds))
        };
        describe("isDefined tests", function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                it("expectst that there is an index method defined", function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        expect(UStore.index).toBeDefined();
                        return [2 /*return*/];
                    });
                }); });
                it("expectst that there is a create method defined", function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        expect(UStore.create).toBeDefined();
                        return [2 /*return*/];
                    });
                }); });
                it("expectst that there is a show method defined", function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        expect(UStore.show).toBeDefined();
                        return [2 /*return*/];
                    });
                }); });
                it("expectst that there is a sign in method defined", function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        expect(UStore.signIn).toBeDefined();
                        return [2 /*return*/];
                    });
                }); });
                return [2 /*return*/];
            });
        }); });
        describe("User Model functionality tests", function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                it("tests the functionality of the create method", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, UStore.create(goodUser)];
                            case 1:
                                result = _a.sent();
                                expect(result.firstname).toEqual(createdGoodUser.firstname);
                                expect(result.lastname).toEqual(createdGoodUser.lastname);
                                expect(result.id).toEqual(1);
                                return [2 /*return*/];
                        }
                    });
                }); });
                it("tests functionality of index method", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, UStore.index()];
                            case 1:
                                result = _a.sent();
                                expect(result).toHaveSize(1);
                                return [2 /*return*/];
                        }
                    });
                }); });
                it("tests the functionality of show method", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, UStore.show(createdGoodUser.id)];
                            case 1:
                                result = _a.sent();
                                expect(result.firstname).toEqual(createdGoodUser.firstname);
                                expect(result.lastname).toEqual(createdGoodUser.lastname);
                                return [2 /*return*/];
                        }
                    });
                }); });
                it("tests the functionality of sign in method", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var result1, result2, result3;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, UStore.signIn(goodUser)];
                            case 1:
                                result1 = _a.sent();
                                return [4 /*yield*/, UStore.signIn(badUser1)];
                            case 2:
                                result2 = _a.sent();
                                return [4 /*yield*/, UStore.signIn(badUser2)];
                            case 3:
                                result3 = _a.sent();
                                expect(result1).toBeDefined();
                                expect(result2).toBeNull();
                                expect(result3).toBeNull();
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        }); });
        return [2 /*return*/];
    });
}); });
describe("Order Model tests", function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        describe("isDefined tests", function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                it("expects that there is an add product function defined", function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        expect(OStore.addProduct).toBeDefined();
                        return [2 /*return*/];
                    });
                }); });
                it("expects that there is an index function defined", function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        expect(OStore.index).toBeDefined();
                        return [2 /*return*/];
                    });
                }); });
                it("expects that there is a currentOrder function defined", function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        expect(OStore.currentOrder).toBeDefined();
                        return [2 /*return*/];
                    });
                }); });
                it("expects that there is a create function defined", function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        expect(OStore.create).toBeDefined();
                        return [2 /*return*/];
                    });
                }); });
                it("expects that there is a set status function defined", function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        expect(OStore.setStatus).toBeDefined();
                        return [2 /*return*/];
                    });
                }); });
                return [2 /*return*/];
            });
        }); });
        describe("Order Model functionality tests", function () { return __awaiter(void 0, void 0, void 0, function () {
            var goodOrder, createdGoodOrder, addedProduct;
            return __generator(this, function (_a) {
                goodOrder = {
                    user_id: 1,
                    status: "active",
                    product_id: 1,
                    quantity: 12
                };
                createdGoodOrder = {
                    user_id: 1,
                    id: 1,
                    status: "active"
                };
                addedProduct = {
                    product_id: 1,
                    quantity: 12,
                    order_id: 1,
                };
                it("tests the functionality of the create function", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, OStore.create(goodOrder)];
                            case 1:
                                result = _a.sent();
                                expect(result).toEqual({
                                    order: createdGoodOrder
                                });
                                return [2 /*return*/];
                        }
                    });
                }); });
                it("tests the functionality of the index function", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, OStore.index()];
                            case 1:
                                result = _a.sent();
                                expect(result).toEqual([__assign({}, createdGoodOrder)]);
                                return [2 /*return*/];
                        }
                    });
                }); });
                it("tests the functionality of adding a product on an order", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, OStore.addProduct(1, 12, 1)];
                            case 1:
                                result = _a.sent();
                                expect(result).toEqual(__assign(__assign({}, addedProduct), { id: 2 }));
                                return [2 /*return*/];
                        }
                    });
                }); });
                it("tests the functionality of getting the current Order", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, OStore.currentOrder(1)];
                            case 1:
                                result = _a.sent();
                                console.log(result);
                                expect(result).toEqual([__assign(__assign({}, addedProduct), { id: 1 }), __assign(__assign({}, addedProduct), { id: 2 })]);
                                return [2 /*return*/];
                        }
                    });
                }); });
                it("tests the functionality of setStatus", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, OStore.setStatus("someOtherStatus", 1)];
                            case 1:
                                result = _a.sent();
                                expect(result).toEqual(__assign(__assign({}, createdGoodOrder), { status: "someOtherStatus" }));
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        }); });
        return [2 /*return*/];
    });
}); });
