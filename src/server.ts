import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { productRoutes } from './handlers/products';
import { userRoutes } from './handlers/users';
import { OrderRoutes } from './handlers/orders';

const app: express.Application = express()
const address: string = "0.0.0.0:3000"

app.use(bodyParser.json())

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})
productRoutes(app);
userRoutes(app);
OrderRoutes(app);

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})

export default app;