"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var products_1 = require("./handlers/products");
var users_1 = require("./handlers/users");
var orders_1 = require("./handlers/orders");
var swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
var swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
var app = (0, express_1.default)();
var address = "localhost:3000";
app.use(body_parser_1.default.json());
app.get("/", function (req, res) {
    res.send("Hello World!");
});
(0, products_1.productRoutes)(app);
(0, users_1.userRoutes)(app);
(0, orders_1.OrderRoutes)(app);
app.listen(3000, function () {
    console.log("starting app on: ".concat(address));
});
var options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Store API",
            version: "1.0.0",
        },
        servers: [
            {
                url: "http://localhost:3000",
                description: "My API Documentation",
            },
        ],
    },
    apis: ["./handlers/*.ts", "./server.ts"],
};
var swaggerSpec = (0, swagger_jsdoc_1.default)(options);
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
// const openapiSpecification = swaggerJsdoc(options);
exports.default = app;
