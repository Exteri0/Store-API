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
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Store API",
      version: "1.0.0",
    },
    servers: [
      {
        url: `http://${address}`,
        description: "My API Documentation",
      },
    ],
  },

  apis: ["./handlers/*.ts", "./server.ts"],
};

const swaggerSpec = swaggerJsDoc(options);

app.use(bodyParser.json());

app.get("/", function (req: Request, res: Response) {
  res.send("Hello World!");
});

productRoutes(app);
userRoutes(app);
OrderRoutes(app);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});

export default app;
