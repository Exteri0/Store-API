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

export async function userRoutes(app: express.Application) {
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
