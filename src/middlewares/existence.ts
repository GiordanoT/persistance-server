import {Request, Response, NextFunction} from 'express';
import {Projects, Users} from '../db';

class ExistenceMiddleware {
    static user = async(req: Request, res: Response, next: NextFunction): Promise<Response|void> => {
        try {
            const {id} = req.params;
            const element = await Users.getById(id);
            if(!element) return res.status(404).send('User not found.');
            return next();
        } catch(error) {
            return res.status(400).send(error);
        }
    }

    static project = async(req: Request, res: Response, next: NextFunction): Promise<Response|void> => {
        try {
            const {id} = req.params;
            const element = await Projects.getById(id);
            if(!element) return res.status(404).send('Project not found.');
            return next();
        } catch(error) {
            return res.status(400).send(error);
        }
    }
}

export default ExistenceMiddleware;
