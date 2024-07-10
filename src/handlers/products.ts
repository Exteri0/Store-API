import { ProductStore, Product } from "../models/products";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import express from "express";

const store = new ProductStore();

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - price
 *       properties:
 *         id:
 *           type: integer
 *           description: The Auto-generated id of a product
 *         name:
 *           type: string
 *           description: name of the product
 *         price:
 *           type: integer
 *           description: product's price
 *       example:
 *         id: 1
 *         name: Rubix Cube
 *         price: 15
 */

/**
 * @swagger
 *  tags:
 *    name: Products
 *    description: products' data
 */

async function index(req: Request, res: Response) {
  try {
    const result = await store.index();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(`found error while index in handler product ${err}`);
  }
}

async function show(req: Request, res: Response) {
  try {
    const result = await store.show(req.params.id as unknown as number);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(`Internal server error, ${error}`);
  }
}

async function create(req: Request, res: Response) {
  try {
    console.log(req.body.token);
    jwt.verify(req.body.token, process.env.TOKEN_SECRET as string);
  } catch (err) {
    res.status(401).json(`Access denied, Invalid token. ${err}`);
    return;
  }
  try {
    const p = {
      name: req.body.name,
      price: req.body.price,
    };
    const result = await store.create(p);
    console.log(result);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json(`internet server error, ${err}`);
  }
}

export async function productRoutes(app: express.Application): Promise<void> {
  /**
   * @swagger
   * /products:
   *    get:
   *        summary: Returns all products
   *        tags: [Products]
   *        responses:
   *            200:
   *                description: the list of the products
   *                content:
   *                    application/json:
   *                        schema:
   *                            type: array
   *                            items:
   *                                $ref: '#/components/schemas/Product'
   *            500:
   *                description: server error - did not connect properly with the database
   *
   *    post:
   *        summary: create a new product
   *        tags: [Products]
   *        requestBody:
   *            required: true
   *            content:
   *                application/json:
   *                    schema:
   *                        type: object
   *                        properties:
   *                            name:
   *                                type: string
   *                                description: name of the product
   *                            price:
   *                                type: integer
   *                                description: product's price
   *                            token:
   *                                type: string
   *                                description: token used for authorization
   *                        example:
   *                            name: "ball"
   *                            price: 10
   *                            token: "hwhhwhshs6585gahwhgwuwjwusuhs"
   *
   *        responses:
   *            200:
   *                description: the successfully created product
   *                content:
   *                    application/json:
   *                        schema:
   *                            items:
   *                                $ref: '#/components/schemas/Product'
   *            401:
   *                description: Unauthroized (did not provide token)
   *            400:
   *                description: bad request (bad data)
   *
   *
   * /products/{id}:
   *    get:
   *        summary: Returns the product specified by its id
   *        tags: [Products]
   *        parameters:
   *            -   in : path
   *                name: id
   *                description: the specified id
   *                schema:
   *                    type: integer
   *                required: true
   *        responses:
   *            200:
   *                description: the specified product
   *                content:
   *                    application/json:
   *                        schema:
   *                            items:
   *                                $ref: '#/components/schemas/Product'
   *            500:
   *                description: server error - did not connect properly with the database
   */
  app.get("/products", function (req: Request, res: Response) {
    index(req, res);
  });
  app.get("/products/:id", function (req: Request, res: Response) {
    show(req, res);
  });
  app.post("/products", function (req: Request, res: Response) {
    create(req, res);
  });
}
