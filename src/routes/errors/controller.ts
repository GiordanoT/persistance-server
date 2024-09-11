import {Request, Response} from 'express';
import {Errors, Users} from '../../db';

export class ErrorsController {
    static create = async(req: Request, res: Response): Promise<Response> => {
        try {
            const {timestamp, data} = req.body;
            if (!timestamp || !data) return res.status(400).send('Missing required parameters.');
            const token = String(req.headers['auth-token']);
            const user = await Users.getByToken(token);
            await Errors.create({user: `${user.name} ${user.surname}`, timestamp, data});
            return res.status(200).send('Error Created.');
        } catch (error) {return res.status(400).send(error);}
    }

    static getAll = async(req: Request, res: Response): Promise<Response> => {
        try {
            const errors = await Errors.getAll();
            return res.status(200).send(errors);
        } catch(error) {
            return res.status(400).send(error);
        }
    }
}
