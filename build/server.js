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
// const openapiSpecification = swaggerJsdoc(options);
var app = (0, express_1.default)();
var address = "localhost:3000";
var options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Store API",
            version: "1.0.0",
            description: "This is a documentation for a store api that manages users and orders.",
        },
        servers: [
            {
                url: "http://".concat(address),
                description: "My API Documentation",
            },
        ],
    },
    apis: ["./handlers/*.ts", "./server.ts"],
};
app.use(body_parser_1.default.json());
/**
 * @swagger
 * /:
 *   get:
 *     summary: Checks if the api is working
 *     responses:
 *       200:
 *         description: the list of the posts
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Users:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - password
 *       properties:
 *         id:
 *           type: integer
 *           description: The Auto-generated id of a user
 *         firstName:
 *           type: string
 *           description: first name of the user
 *         lastName:
 *           type: string
 *           description: last name of the user
 *         password:
 *           type: string
 *           descripton: user's password
 *       example:
 *         id: 1
 *         firstName: Omar
 *         lastName: Faramawy
 *         password: 123password
 *
 */
app.get("/", function (req, res) {
    res.send("Hello World!");
});
(0, products_1.productRoutes)(app);
(0, users_1.userRoutes)(app);
(0, orders_1.OrderRoutes)(app);
var swaggerSpec = (0, swagger_jsdoc_1.default)(options);
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
app.listen(3000, function () {
    console.log("starting app on: ".concat(address));
});
exports.default = app;
