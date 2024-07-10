import { OrderStore, Order } from "../models/orders";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import express from "express";

const store = new OrderStore();
const tsecret = process.env.TOKEN_SECRET;

async function index(req: Request, res: Response) {
  try {
    jwt.verify(req.body.token, tsecret as string);
  } catch (err) {
    res.status(401).json(`Access denied, Invalid token. ${err}`);
    return;
  }
  try {
    const result = await store.index();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(`Internal server error ${err}`);
    return;
  }
}

async function currentOrder(req: Request, res: Response) {
  try {
    jwt.verify(req.body.token, tsecret as string);
  } catch (err) {
    res.status(401).json(`Access denied, ${err}`);
    return;
  }
  try {
    const result = await store.currentOrder(req.params.id as unknown as number);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(`Internal server error ${err}`);
  }
}

async function create(req: Request, res: Response) {
  try {
    jwt.verify(req.body.token, tsecret as string);
  } catch (err) {
    res.status(401).json(`Access denied, Invalid token. ${err}`);
    return;
  }
  try {
    const order: Order = {
      product_id: req.body.product_id,
      quantity: req.body.quantity,
      user_id: req.body.user_id,
      status: req.body.status,
    };
    const result = await store.create(order);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(`internal server error ${err}`);
  }
}

async function addProduct(req: Request, res: Response) {
  try {
    jwt.verify(req.body.token, tsecret as string);
  } catch (err) {
    res.status(401).json(`Access denied, Invalid token. ${err}`);
    return;
  }
  try {
    const result = await store.addProduct(
      req.body.product_id,
      req.body.quantity,
      req.body.order_id
    );
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(`internal server error ${err}`);
  }
}

async function setStatus(req: Request, res: Response) {
  try {
    jwt.verify(req.body.token, tsecret as string);
  } catch (err) {
    res.status(401).json(`Access denied, Invalid token. ${err}`);
    return;
  }
  try {
    const result = await store.setStatus(
      req.body.status,
      req.params.id as unknown as number
    );
    res.json(result);
  } catch (err) {
    res.status(500).json(`internal server error ${err}`);
  }
}

export async function OrderRoutes(app: express.Application) {
  app.get("/orders", function (req: express.Request, res: express.Response) {
    index(req, res);
  });
  app.get(
    "/orders/:id",
    function (req: express.Request, res: express.Response) {
      currentOrder(req, res);
    }
  );
  app.post("/orders", function (req: express.Request, res: express.Response) {
    create(req, res);
  });
  app.post(
    "/orders/add",
    function (req: express.Request, res: express.Response) {
      addProduct(req, res);
    }
  );
  app.post(
    "/orders/:id",
    function (req: express.Request, res: express.Response) {
      setStatus(req, res);
    }
  );
}
