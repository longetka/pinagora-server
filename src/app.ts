import express, {Application, Request, Response} from 'express';
import * as admin from 'firebase-admin/app';
import serviceAccountParams from '../src/config';
admin.initializeApp({
    credential: admin.cert(serviceAccountParams)
});

import UserRoutes from './services/routes/user';

const app: Application = express();
const PORT: number = 8080;

app.use('/user/add', UserRoutes.add);

app.listen(PORT, () => {
    console.log(`App listen on http://localhost:${PORT}`);
});
