import client from '../database';
import bcrypt, { compareSync } from "bcrypt";
import jwt from 'jsonwebtoken';
const {
    pepper,
    saltRounds
}=process.env

export type User = {
    id?:number,
    firstname:string,
    lastname:string,
    password:string
};

export class UserStore{

    async index():Promise<User[]>{
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM users;';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`error while index model user ${err}`);
        }
    }

    async show(id:number):Promise<User>{
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM users WHERE id=$1;';
            const result = await client.query(sql,[id]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`found error while show model users ${err}`);
        }
    }

    async create(user:User):Promise<User>{
        try {
            const conn = await client.connect();
            const sql = 'INSERT INTO users (firstName,lastName,password) VALUES($1,$2,$3) RETURNING *';
            const result = await conn.query(sql,[user.firstname,user.lastname,bcrypt.hashSync(user.password+pepper,parseInt(saltRounds as string))]);
            console.log(result);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`error while create user model ${err}`);
        }
    }

    async signIn(user:User):Promise<User|null>{
        try {
            console.log("Entered the model sign in");
            const conn = await client.connect();
            const sql = 'SELECT * FROM users WHERE firstName = $1 AND lastName = $2;'
            const result = await conn.query(sql,[user.firstname,user.lastname]);
            console.log(result.rows.length)
            conn.release();
            if(result.rows.length){
                const DBUser = result.rows[0];
                console.log(DBUser);
                if(compareSync(user.password+pepper,DBUser.password)){
                    return DBUser;
                };
            }
            return null;
        } catch (err) {
            throw new Error(`error while authenticate model ${err}`);
        }
    }

}