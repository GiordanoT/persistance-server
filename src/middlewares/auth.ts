import {Request, Response, NextFunction} from 'express';
import {Users} from '../db';
import {merge} from 'lodash';
import U from '../common/u';

class AuthMiddleware {
    static isAuthenticated = async(req: Request, res: Response, next: NextFunction): Promise<Response|void> => {
        try {
            const token = U.getToken(req);
            if(!token) return res.status(401).send('Token not provide.');
            const existingUser = await Users.getByToken(token);
            if(!existingUser) res.status(401).send('Invalid Token.');
            merge(req, {identity: existingUser});
            return next();
        } catch(error) {
            return res.status(400).send(error);
        }
    }

    /* todo: this function will check if i'm the owner of the element that i'm trying to edit. */
    private static isOwner = async(req: Request, res: Response, next: NextFunction): Promise<Response|void> => {
        try {
            // import {get} from 'lodash';
            // const {element} = req.params;
            // const currentUser = get(req, 'identity'); refer to line 12
            // if(element.author !== currentUser) I'm not the owner of the element
            next();
        } catch(error) {
            return res.status(400).send(error);
        }
    }
}

export default AuthMiddleware;
