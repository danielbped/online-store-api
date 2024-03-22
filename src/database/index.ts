import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "../entity/User"
import dotenv from 'dotenv';

dotenv.config();

const {
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    POSTGRES_DB, PORT,
    HOST_DB
} = process.env;

export const AppDataSource = new DataSource({
    type: "postgres",
    host: HOST_DB,
    port: Number(PORT) || 5433,
    username: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    database: POSTGRES_DB,
    synchronize: true,
    logging: false,
    entities: [User],
    migrations: [],
    subscribers: [],
})

const databaseConnect = () => AppDataSource
    .initialize()
    .then(async () => {
        console.log('Database connected successfully')
    }).catch((error: any) => console.log(error))

export default databaseConnect;