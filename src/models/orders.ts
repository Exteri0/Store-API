import client from '../database';
import { Product } from './products';

export type Order={
    id?:number,
    product_id?:number,
    quantity?:number,
    user_id:number,
    status:string,
};

export class OrderStore{

    async index():Promise<Order[]>{
        try {
            const conn = await client.connect();
            const sql ='SELECT * FROM orders;'
            const result = await conn.query(sql);
            conn.release();
            return result.rows; 
        } catch (err) {
            throw new Error(`error while model order index ${err}`)
        }
    }

    async currentOrder(id:number):Promise<object[]>{
        try {
            console.log("entered current order")
            const conn = await client.connect();
            const sql3 = 'SELECT * FROM orders WHERE user_id = $1;'
            const result1 = await conn.query(sql3,[id]);
            const sql = 'SELECT * FROM order_products WHERE order_id = $1;'
            const result = await conn.query(sql,[result1.rows[0].id]);
            console.log(result);
            conn.release();
            return result.rows;
        } catch (err) {
            console.log(`found error ${err}`)
            throw new Error(`error while currentOrder model order ${err}`);
        }
    }

    async create(order:Order):Promise<object>{
        try {
            const conn = await client.connect();
            const sql1 = 'INSERT INTO orders(status,user_id) VALUES($1,$2);'
            await conn.query(sql1,[order.status,order.user_id]);
            const sql3 = 'SELECT * FROM orders WHERE user_id = $1 AND status =$2;'
            const result1 = await conn.query(sql3,[order.user_id,order.status]);
            const sql2 = 'INSERT INTO order_products(order_id,quantity,product_id)VALUES($1,$2,$3);'
            const result2= await conn.query(sql2,[result1.rows[0].id,order.quantity,order.user_id]);
            console.log(result2.rows);
            return {
                order: result1.rows[0],
            };
        } catch (err) {
            console.log(err);
            throw new Error(`found error while order model create ${err}`);
        }
    }

    async addProduct(product_id:number,quantity:number,order_id:number){
        try {
            console.log("entered add product model order function")
            const conn = await client.connect();
            const sql = 'INSERT INTO order_products(product_id,quantity,order_id)VALUES($1,$2,$3) RETURNING *;';
            const result = await conn.query(sql,[product_id,quantity,order_id]);
            console.log(result)
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`found error while order model addProduct`);
        }
    }

    async setStatus(order_status:string,order_id:number):Promise<Order>{
        try {
            const conn = await client.connect();
            const sql = 'UPDATE orders SET status = $1 WHERE id = $2 RETURNING *';
            const result = await conn.query(sql,[order_status,order_id]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`found error while model order setStatus ${err}`);
        }
    }

}