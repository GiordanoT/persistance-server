import {Request, Response} from 'express';
import Users from '../db/users';

class UsersController {
    static getAll = async(req: Request, res: Response): Promise<Response> => {
        try {
            const users = await Users.getAll();
            return res.status(200).send(users);
        } catch(error) {
            return res.status(400).send(error);
        }
    }
}

export default UsersController;
