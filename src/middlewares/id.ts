import {Request, Response, NextFunction} from 'express';
import U from '../common/u';

class IdMiddleware {
    static notExist = async(req: Request, res: Response, next: NextFunction): Promise<Response|void> => {
        try {
            const {id} = req.body;
            if(!id) return res.status(400).send('Missing required parameters.');
            if (await U.existingId(id)) return res.status(400).send('ID already taken.');
            return next();
        } catch(error) {
            return res.status(400).send(error);
        }
    }
}

export default IdMiddleware;
