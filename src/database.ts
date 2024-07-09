import dotenv from 'dotenv'
import { Pool } from 'pg'

dotenv.config()

const{
    POSTGRES_HOST,
    POSTGRES_DB,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    POSTGRES_TEST_DB,
}=process.env
function yes(ENV:string):Pool{
    if(ENV=='dev'){
        return new Pool({
            host:POSTGRES_HOST,
            database:POSTGRES_DB,
            user:POSTGRES_USER,
            password:POSTGRES_PASSWORD
        })    
    }
    else {
        return new Pool({
            host:POSTGRES_HOST,
            database:POSTGRES_TEST_DB,
            user:POSTGRES_USER,
            password:POSTGRES_PASSWORD
        })
    }
}
const client = yes(process.env.ENV as string);

export default client;