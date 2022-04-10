import dotenv from 'dotenv';
dotenv.config();
import { Request, Response} from "express";
import DataBase from '../db/db';
import User from "../../utils/handlers/User";

const userDB = new DataBase('users');

class UserRoutes {
    static async register(req: Request, res: Response): Promise<void> {
        console.log(req.body)
        let {firstName, lastName, email, password}: any = req.body;
        let isUsed = await User.findByEmail(email);
        console.log(email)
        console.log(isUsed);
        if (isUsed === null) {
            let hashedPassword = await User.hashedPassword(password);
            let user = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: hashedPassword
            };
            console.log(user)
            await userDB.addDoc(email, user);
            res.status(201).json('Пользователь успешно создан');
        } else if (isUsed.email === email) {
            res.json('Такой пользователь уже существует')
        }
    }

    static async login(req: Request, res: Response): Promise<void> {
        let {email, password}: any = req.body;
        let user = await User.findByEmail(email);
        if (!user) {
            res.status(202).json('Пользователь не найден - Зарегистрируйтесь');
        } 
        let isMatch = await User.comparePassword(password, user.password);
        if (!isMatch) {
            res.status(202).json('Неверный пароль, попробуйте другой');
        } else {
            let token = User.getToken(user.email);
            res.status(200).json({token, userId: user.email, user})
        }
    }

    static async getOneUser(req: Request, res: Response): Promise<void> {
        let {userId}: any = req.body;
        let user = await User.findByEmail(userId);
        res.status(200).json({user});
    }

    static async update(req: Request, res: Response): Promise<void> {
        let body: any = req.body;
        let user = await User.findByEmail(body.userId);
        //await User.updateUser(body.userId, {
            //firstName: body.firstName,
            //lastName: body.lastName
        //});
        res.json({user});
    }
}

export default UserRoutes;
