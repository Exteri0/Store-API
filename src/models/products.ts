import client from '../database'

export type Product = {
    name:string,
    price:number
};

export class ProductStore {

    async index():Promise<Product[]>{
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM products;'
            const result = await conn.query(sql);
            conn.release()
            return result.rows
        }
        catch (err){
            throw new Error(`found error while index model ${err}`);
        }
    }

    async show(id:number):Promise<Product>{
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM products WHERE id=$1';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`found error while show model ${error}`);
        }
    }

    async create(product:Product):Promise<Product>{
        try {
            const conn = await client.connect();
            const sql = 'INSERT INTO products (name, price) VALUES ($1,$2) RETURNING *';
            const result = await conn.query(sql,[product.name,product.price]);
            console.log(result);
            const newProduct = result.rows[0];
            console.log(newProduct);
            conn.release();
            return newProduct;
        } catch (error) {
            throw new Error(`found error while create Product model ${error}`);
        }
    }

}