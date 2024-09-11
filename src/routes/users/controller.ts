import {Request, Response} from 'express';
import {Users} from '../../db';
import U from '../../common/u';

export class UsersController {
    static getById = async(req: Request, res: Response): Promise<Response> => {
        try {
            const {id} = req.params;
            const user = await Users.getById(id);
            if(!user) return res.status(404).send('User not found.');
            return res.status(200).send(user);
        } catch(error) {
            return res.status(400).send(error);
        }
    }

    static getAll = async(req: Request, res: Response): Promise<Response> => {
        try {
            const {email} = req.query;
            const users = (email) ? [await Users.getByEmail(email as string)] : await Users.getAll();
            if(!users) return res.status(404).send('User not found.');
            return res.status(200).send(users.length > 1 ? users : users[0]);
        } catch(error) {
            return res.status(400).send(error);
        }
    }

    static update = async(req: Request, res: Response): Promise<Response> => {
        try {
            const {id} = req.params;
            const body = U.keepKeys(req.body, [
                'name',
                'surname',
                'nickname',
                'affiliation',
                'country',
                'newsletter'
            ]);
            const user = await Users.getById(id);
            if(!user) return res.status(404).send('User not found.');
            await Users.update(id, body);
            return res.status(200).send('User updated.');
        } catch(error) {
            return res.status(400).send(error);
        }
    }

    static password = async(req: Request, res: Response): Promise<Response> => {
        try {
            const {email} = req.body;
            const user = await Users.getByEmail(email);
            if(!user) return res.status(404).send('User not found.');
            const password = U.random();
            await Users.update(user.id, {password: U.encrypt(password)});
            // Todo: send email to user with the new password
            return res.status(200).send('User updated.');
        } catch(error) {
            return res.status(400).send(error);
        }
    }

    static delete = async(req: Request, res: Response): Promise<Response> => {
        try {
            const {id} = req.params;
            const user = await Users.getById(id);
            if(!user) return res.status(404).send('User not found.');
            await Users.delete(id);
            return res.status(200).send('User deleted.');
        } catch(error) {
            return res.status(400).send(error);
        }
    }
}
