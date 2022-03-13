import dotenv from 'dotenv';
dotenv.config();
import { Request, Response} from "express";
import DataBase from '../db/db';
import User from "../../utils/handlers/User";

const userDB = new DataBase('users');

class UserRoutes {
    static test(req: Request, res: Response): void {
        console.log(req.body);
    }

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
        let {email, password}: any = req.query;
        let user = await User.findByEmail(email);
        if (!user) {
            res.status(400).json('Пользователь не найден - Зарегистрируйтесь');
        } else {
            let isMatch = User.comparePassword(password, user.password);
            if (!isMatch) {
                res.json('Неверный пароль, попробуйте другой');
            }
           
            let token = User.getToken(user.email);

            res.status(200).json({token, userId: user.email, user})
        }
    }
}

export default UserRoutes;
