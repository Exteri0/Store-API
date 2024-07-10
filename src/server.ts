import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { productRoutes } from "./handlers/products";
import { userRoutes } from "./handlers/users";
import { OrderRoutes } from "./handlers/orders";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";

// const openapiSpecification = swaggerJsdoc(options);
const app: express.Application = express();
const address: string = "localhost:3000";

const options = {
  failOnErrors: true,
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Store API",
      version: "1.0.0",
      description:
        "This is a documentation for a store api that manages users and orders.",
    },
    servers: [
      {
        url: `http://${address}`,
        description: "My API Documentation",
      },
    ],
  },

  apis: ["./src/handlers/*.ts", "./src/server.ts"],
};

app.use(bodyParser.json());

/**
 * @swagger
 * /:
 *   get:
 *     summary: Checks if the api is working
 *     responses:
 *       200:
 *         description: The api is working
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Hello World!
 */

app.get("/", function (req: Request, res: Response) {
  res.status(200).send("Hello World!");
});

productRoutes(app);
userRoutes(app);
OrderRoutes(app);

const swaggerSpec = swaggerJsDoc(options);

console.log(JSON.stringify(swaggerSpec, null, 2));

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});
export default app;
