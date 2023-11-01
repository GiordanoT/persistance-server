import {Request, Response} from 'express';
import {Users} from '../db';

class UsersController {
    static getOne = async(req: Request, res: Response): Promise<Response> => {
        try {
            const {id} = req.params;
            const user = await Users.getById(id);
            return res.status(200).send(user);
        } catch(error) {
            return res.status(400).send(error);
        }
    }

    static getAll = async(req: Request, res: Response): Promise<Response> => {
        try {
            const users = await Users.getAll();
            return res.status(200).send(users);
        } catch(error) {
            return res.status(400).send(error);
        }
    }

    static update = async(req: Request, res: Response): Promise<Response> => {
        try {
            const {id} = req.params;
            const {username} = req.body;
            await Users.update(id, {username});
            return res.status(200).send('User updated.');
        } catch(error) {
            return res.status(400).send(error);
        }
    }

    static delete = async(req: Request, res: Response): Promise<Response> => {
        try {
            const {id} = req.params;
            await Users.delete(id);
            return res.status(200).send('User deleted.');
        } catch(error) {
            return res.status(400).send(error);
        }
    }
}

export default UsersController;
