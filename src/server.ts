import express from 'express';
import router from './controller';
import databaseConnect from './database';

const PORT = 3000;

const app = express();

app.use(express.json());
app.use(router);

databaseConnect();

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));