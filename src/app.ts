import dotenv from 'dotenv';
dotenv.config();
import express, {Application} from 'express';
import bodyParser from 'body-parser';
import * as admin from 'firebase-admin/app';
import serviceAccountParams from '../src/config';
admin.initializeApp({
    credential: admin.cert(serviceAccountParams)
});

import UserRoutes from './services/routes/user';

const app: Application = express();
const PORT: string | undefined = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/user/register', UserRoutes.register);
app.use('/user/login', UserRoutes.login);
app.use('/test', UserRoutes.test);

app.listen(PORT, () => {
    console.log(`App listen on http://localhost:${PORT}`);
});
