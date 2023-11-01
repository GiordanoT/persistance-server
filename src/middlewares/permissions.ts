import {Request, Response, NextFunction} from 'express';
import {Users} from '../db';
import U from '../common/u';
import {Projects} from '../db';

class PermissionsMiddleware {
    static isAuthor = async(req: Request, res: Response, next: NextFunction): Promise<Response|void> => {
        try {
            const user = await Users.getByToken(U.getToken(req));
            const {id} = req.params; const project = await Projects.getById(id);
            if(user.id !== project.author) return res.status(201).send('Only authors can delete projects.');
            next();
        } catch(error) {
            return res.status(400).send(error);
        }
    }
}

export default PermissionsMiddleware;
