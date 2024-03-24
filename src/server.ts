import express from 'express';
import router from './routes';
import databaseConnect from './database';
import SwaggerDocs from './utils/swagger';
import cors from 'cors';

const PORT = 3000;

const app = express();

app.use(express.json());
app.use(router);
app.use(cors());

databaseConnect();

new SwaggerDocs().generate(app, PORT);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));