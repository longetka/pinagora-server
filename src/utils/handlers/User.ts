import dotenv from 'dotenv';
dotenv.config();
import bcrypt from 'bcrypt';
import jwt, {Secret} from 'jsonwebtoken';
import DataBase from "../../services/db/db";
const userDB = new DataBase('users');
const jwtSecret: Secret | any = process.env.JWT_SECRET;

class User {
    // TODO: Refactor returning Promise<TYPE>!
    static async findByEmail(email: string): Promise<any | null> {
        let userData = await userDB.getDocByEmail(email);
        if (userData) {
            return userData;
        } else {
            return null;
        }
    }

    static async updateUser(email: string, ...data: any): Promise<void> {
        await userDB.updateDoc(email, data);
    }

    static async hashedPassword(password: string): Promise<string> {
        let hashedPassword = await bcrypt.hash(password, 10);
        return hashedPassword;
    }

    static async comparePassword(
        password: string, hashPass: string
    ): Promise<boolean> {
        let comparedPassword: boolean = await bcrypt.compare(password, hashPass);
        return comparedPassword;
    }

    static getToken(userId: string): string {
        let token = jwt.sign({userId: userId}, jwtSecret, {expiresIn: '1h'});
        return token;
    }
}

export default User;
