import { ProductStore,Product } from "../models/products";
import { Request,Response, } from "express";
import jwt from 'jsonwebtoken';
import express from "express";

const store = new ProductStore;

async function index(req:Request,res:Response){
    try{
        const result = await store.index();
        res.status(200).json(result);
    }
    catch(err){
        console.log(`found error while index in handler product ${err}`);
    }
}

async function show(req:Request,res:Response){
    try {
        const result = await store.show(req.params.id as unknown as number);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(`Internal server error, ${error}`)
    }
}

async function create(req:Request,res:Response){
    try {
        console.log(req.body.token)
        jwt.verify(req.body.token, process.env.TOKEN_SECRET as string);

    } catch (err) {
        res.status(401).json(`Access denied, Invalid token. ${err}`)
        return
    }
    try {
        const p = {
            name:req.body.name,
            price:req.body.price
        }
        const result = await store.create(p);
        console.log(result);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(`internet server error, ${err}`);
    }
}

export async function productRoutes(app:express.Application):Promise<void>{
    app.get('/products',function(req:Request,res:Response){
        index(req,res);
    })
    app.get('/products/:id',function (req:Request,res:Response){
        show(req,res);
    })
    app.post('/products',function(req:Request,res:Response){
        create(req,res);
    })
}