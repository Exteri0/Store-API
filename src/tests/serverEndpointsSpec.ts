import supertest from 'supertest';
import app from '../server';
import { Product } from '../models/products';
import { User } from '../models/users';
import jwt, { JwtPayload } from "jsonwebtoken";
import { Order } from '../models/orders';

const request = supertest(app);

const user:User={
    firstname:'omar',
    lastname:'faramawy',
    password:'secret'
}

const myToken = jwt.sign({user:user},process.env.TOKEN_SECRET as string)


describe("Product Endpoint tests",async () => {

    const goodProduct:Product={
        name:'ball',
        price:100
    };

    const createdGoodProduct={...goodProduct,id:3}
    
    const createdGoodProducts=[
        {
            ...goodProduct,id:1
        },
        {
            ...goodProduct,id:2
        },
        {
            ...goodProduct,id:3
        }
    ]

    it("tests the create route without a token",async () => {
        const response = await request.post('/products');
        expect(response.status).toBe(401);
    })

    it("tests the create endpoint ",async () => {
        console.log(myToken);
        const response = await request.post('/products').send({...goodProduct,token:myToken});
        expect(response.status).toBe(200);
        expect(response.body).toEqual(createdGoodProduct);
    })
    
    it("tests the show endpoint",async () => {
        const response  = await request.get("/products/3");
        expect(response.status).toBe(200);
        expect(response.body).toEqual(createdGoodProduct) 
    })

    it("tests the index endpoint",async () => {
        const response = await request.get("/products");
        expect(response.status).toBe(200);
        expect(response.body).toEqual(createdGoodProducts);
    })

})

describe("Users Endpoint tests",async () => {
    const goodUser:User = {
        firstname:"omar",
        lastname:"faramawy",
        password:"secret"
    }

    const badUser1:User={
        firstname:"omar",
        lastname:"faramawy",
        password:"notcorrectpassword"
    }

    const badUser2:User={
        firstname:"faramawy",
        lastname:"omar",
        password:"secret"
    }
    
    const createdGoodUser={
        ...goodUser,id:1
    }

    it("tests the index endpoint without token",async () => {
        const response = await request.get("/users");
        expect(response.status).toBe(401);
    })
    it("tests the show endpoint without a valid token",async () => {
        const response = await request.get("/users/1").send({token:"sad"});
        expect(response.status).toBe(401);
    })

    it("tests the index endpoint with a valid token",async () => {
        const response= await request.get("/users").send({token:myToken});
        expect(response.status).toBe(200);
        expect(response.body[0].firstname).toEqual(createdGoodUser.firstname)
        expect(response.body[0].lastname).toEqual(createdGoodUser.lastname)
    })
    it("tests the show endpoint with a valid token",async () => {
        const response = await request.get("/users/1").send({token:myToken});
        expect(response.status).toBe(200);
        expect(response.body.firstname).toEqual(createdGoodUser.firstname)
        expect(response.body.lastname).toEqual(createdGoodUser.lastname)
        expect(response.body.id).toEqual(createdGoodUser.id)
    })
    it("tests the create endpoint",async () => {
        const response = await request.post("/users").send(goodUser)
        expect(response.status).toBe(200);
        expect(response.body.firstname).toEqual(createdGoodUser.firstname)
        expect(response.body.lastname).toEqual(createdGoodUser.lastname)
        expect(response.body.id).toEqual(2)
    })
    it("tests the sign in endpoint with a valid user",async () => {
        const response = await request.post("/users/signin").send(goodUser);
        expect(response.body.User.id).toBe(1)
        expect(response.body.User.firstname).toEqual(createdGoodUser.firstname)
        expect(response.body.User.lastname).toEqual(createdGoodUser.lastname)
        const decodedJWT = jwt.verify(response.body.token,process.env.TOKEN_SECRET as string) as JwtPayload
        expect(decodedJWT.user.password).toEqual(goodUser.password);
    })
})


describe("Orders Endpoint tests",async () => {

    const goodOrder:Order={
        user_id:1,
        status:"active",
        product_id:1,
        quantity:12
    }
    
    const createdGoodOrder:Order={
        user_id:1,
        id:1,
        status:"someOtherStatus"
    }

    const addedProduct=
        {
            product_id:1,
            quantity:12,
            order_id:1,
        }
    
    describe("testing the methods without valid tokens",async()=>{
        it("tests the index endpoint without token",async () => {
            const response = await request.get("/orders").send({token:"asdsa"});
            expect(response.status).toBe(401);
        })
        it("tests the currentOrder endpoint without token",async () => {
            const response = await request.get("/orders/1").send({token:"asdsa"});
            expect(response.status).toBe(401);
        })
        it("tests the create endpoint without a valid token",async () => {
            const response = await request.post("/orders").send({token:"asdsa"});
            expect(response.status).toBe(401);
        })
        it("tests the addProduct endpoint without a valid token",async () => {
            const response = await request.post("/orders/add").send({token:"asdsa"});
            expect(response.status).toBe(401);
        })
        it("tests the setStatus endpoint without a valid token",async () => {
            const response = await request.post("/orders/1").send({token:"asdsa"});
            expect(response.status).toBe(401);
        })
    })

    describe("testing the endpoints with valid tokens",async () => {
        it("tests the index endpoint with a valid token",async () => {
            const response= await request.get("/orders").send({token:myToken})
            expect(response.status).toBe(200);
            expect(response.body).toEqual([createdGoodOrder]);
        })
        it("tests the currentOrder endpoint with a valid token",async () => {
            const response = await request.get("/orders/1").send({token:myToken});
            expect(response.status).toBe(200);
            expect(response.body).toEqual([{...addedProduct,id:1},
                {...addedProduct,id:2}])
        })
        it("tests the create order endpoint with a valid token",async () => {
            const response = await request.post("/orders").send({...goodOrder,
                token:myToken});
            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                order:{
                    ...createdGoodOrder,
                    id:2,
                    status:"active"
                }
            })
        })
        it("tests the addProduct endpoint with a valid token",async () => {
            const response = await request.post("/orders/add").send({...addedProduct,token:myToken});
            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                ...addedProduct,
                id:4
            })
        })
        it("tests the set status endpoint with a valid token",async () => {
            const response = await request.post("/orders/1").send({status:"someOtherOtherStatus",token:myToken})
            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                ...createdGoodOrder,
                status:"someOtherOtherStatus"
            })
        })
    })

})