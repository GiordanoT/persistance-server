import {Request, Response} from 'express';
import {Users} from '../db';
import U from '../common/u';

class AuthController {
    static register = async (req: Request, res: Response): Promise<Response> => {
        try {
            const {id, username, email, password} = req.body;
            if (!username || !email || !password) return res.status(400).send('Missing required parameters.');
            const existingEmail = await Users.getByEmail(email);
            if (existingEmail) return res.status(400).send('Email already taken.');
            const user = await Users.create({id, username, email,
                authentication: {
                    password: U.encrypt(password),
                    token: U.encrypt(U.random())
                }
            });
            res.cookie('AUTH-TOKEN', user.authentication.token, {domain: process.env['DOMAIN'], path: '/'});
            delete user['authentication'];
            return res.status(200).send(user);
        } catch (error) {
            return res.status(400).send(error);
        }
    }

    static login = async (req: Request, res: Response): Promise<Response> => {
        try {
            const {email, password} = req.body;
            if (!email || !password) return res.status(400).send('Missing required parameters.');
            const user = await Users.getByEmail(email).select('+authentication.password');
            if (!user) return res.status(403).send('Bad Credentials.');
            if(user.authentication.password !== U.encrypt(password)) return res.status(403).send('Bad Credentials.');
            user.authentication.token = U.encrypt(U.random());
            await user.save();
            res.cookie('AUTH-TOKEN', user.authentication.token, {domain: process.env['DOMAIN'], path: '/'});
            delete user['authentication'];
            return res.status(200).send(user);
        } catch (error) {
            return res.status(400).send(error);
        }
    }

    static logout = async (req: Request, res: Response): Promise<Response> => {
        try {
            const token = req.cookies['AUTH-TOKEN'];
            const user = await Users.getByToken(token);
            user.authentication.token = '';
            await user.save();
            res.cookie('AUTH-TOKEN', '', {domain: process.env['DOMAIN'], path: '/'});
            return res.status(200).send('Logged out.');
        } catch (error) {
            return res.status(400).send(error);
        }
    }
}

export default AuthController;
