import dotenv from 'dotenv';
dotenv.config();
import express, {Application} from 'express';
import * as admin from 'firebase-admin/app';
import serviceAccountParams from '../src/config';
admin.initializeApp({
    credential: admin.cert(serviceAccountParams)
});

import UserRoutes from './services/routes/user';

const app: Application = express();
const PORT: string | undefined = process.env.PORT;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/user/register', UserRoutes.register);
app.use('/user/login', UserRoutes.login);
app.use('/user', UserRoutes.getOneUser);
app.use('/settings', UserRoutes.update);

app.listen(PORT, () => {
    console.log(`App listen on http://localhost:${PORT}`);
});
