import { User, UserStore } from "../models/users";
import { Request, Response } from "express";
import express from "express";
import jwt from "jsonwebtoken";

const store = new UserStore();

async function index(req: Request, res: Response) {
  try {
    jwt.verify(req.body.token, process.env.TOKEN_SECRET as string);
  } catch (err) {
    res.status(401).json(`Access denied, Invalud token. ${err}`);
    return;
  }
  try {
    const result = await store.index();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(`internetal server error, ${err}`);
  }
}

async function show(req: Request, res: Response) {
  try {
    jwt.verify(req.body.token, process.env.TOKEN_SECRET as string);
  } catch (err) {
    res.status(401).json(`Access denied, Invalid token. ${err}`);
    return;
  }
  try {
    const result = await store.show(req.params.id as unknown as number);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(`internal server error ${err}`);
  }
}

async function create(req: Request, res: Response) {
  try {
    const user: User = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: req.body.password,
    };
    const result = await store.create(user);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(`error while users create handler ${err}`);
  }
}

async function authenticate(req: Request, res: Response) {
  try {
    const user: User = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: req.body.password,
    };
    const result = await store.signIn(user);
    if (result != null) {
      const token = jwt.sign(
        { user: user },
        process.env.TOKEN_SECRET as string
      );
      res.json({
        token: token,
        User: result,
      });
    } else {
      res.status(401).json("Wrong Username or password");
    }
  } catch (err) {
    res.status(500).json(`error while authenticate hadnler users`);
  }
}

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
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
 *         password: HASHED_PASSWORD
 *
 */

/**
 * @swagger
 *  tags:
 *    name: Users
 *    description: users' data
 */

export async function userRoutes(app: express.Application) {
  /**
   * @swagger
   * /users:
   *   get:
   *     summary: Returns all users
   *     tags: [Users]
   *     responses:
   *       200:
   *         description: the list of the users
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/User'
   *       401:
   *         description: unauthorized - did not provide token
   *       500:
   *         description: server error - did not connect appropriately with database
   *
   *   post:
   *     summary: Creates new user
   *     tags: [Users]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               firstName:
   *                 type: string
   *               lastName:
   *                  type: string
   *               password:
   *                   type: string
   *             example:
   *               firstName: "John"
   *               lastName: "Snow"
   *               password: "123password"
   *
   *
   *     responses:
   *      200:
   *        description: the successfully created user
   *        content:
   *          application/json:
   *            schema:
   *              items:
   *                $ref: '#/components/schemas/User'
   *      400:
   *        description: bad request (bad data)
   *
   *
   * /users/{id}:
   *   get:
   *     summary: get the required user
   *     tags: [Users]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               id:
   *                 type: integer
   *               token:
   *                 type: string
   *     responses:
   *       200:
   *         description: the specified user
   *         content:
   *           application/json:
   *             schema:
   *               items:
   *                 $ref: '#/components/schemas/User'
   *
   *
   * /users/signin:
   *   post:
   *     summary: Sign in with user credentials to get token
   *     tags: [Users]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               firstName:
   *                 type: string
   *               lastName:
   *                 type: string
   *               password:
   *                 type: string
   *     responses:
   *       200:
   *         description: token after successfully signing in
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 User:
   *                   type: object
   *                   properties:
   *                     id:
   *                       type: integer
   *                     firstName:
   *                       type: string
   *                     lastName:
   *                       type: string
   *                     password:
   *                       type: string
   *                 token:
   *                   type: string
   *             example:
   *               User:
   *                 id: 1
   *                 firstName: John
   *                 lastName: Snow
   *                 password: HASHED_PASSWORD
   *               token: hwhhwhshs6585gahwhgwuwjwusuhs
   *       401:
   *         description: wrong password or name
   *
   *
   *
   */
  app.get("/users", function (req: Request, res: Response) {
    index(req, res);
  });
  app.get("/users/:id", function (req: Request, res: Response) {
    show(req, res);
  });
  app.post("/users", function (req: Request, res: Response) {
    create(req, res);
  });
  app.post("/users/signin", function (req: Request, res: Response) {
    authenticate(req, res);
  });
}
