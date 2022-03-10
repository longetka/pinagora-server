import { Request, Response} from "express";
import DataBase from '../db/db';

const userDB = new DataBase('users');

class UserRoutes {
    static async add(req: Request, res: Response): Promise<void> {
        let userQuery = req.query;
        await userDB.add(userQuery);
        res.json('SUCCESS: User added');
    }
}

export default UserRoutes;
