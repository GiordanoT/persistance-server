import {Request, Response} from 'express';
import {Classes, Enumerators, Literals} from '../../db';
import U from '../../common/u';

export class EnumeratorsController {
    static get = async(req: Request, res: Response): Promise<Response> => {
        try {
            const {id} = req.params;
            const DBEnumerators = await Enumerators.getByProject(id);
            const enumerators = [];
            // Building literals.
            for(const DBEnumerator of DBEnumerators) {
                const enumerator = {}; for(const key in Classes.keys) enumerator[key] = DBEnumerator[key];
                /* Literals */
                enumerator['literals'] = (await Literals.getByFather(DBEnumerator.id)).map(l => l.id);
                enumerators.push(U.clean(enumerator));
            }
            return res.status(200).send(enumerators);
        } catch(error) {return res.status(400).send(error);}
    }

    static create = async (req: Request, res: Response): Promise<Response> => {
        try {
            const {id} = req.params; const body = req.body;
            const element = Enumerators.create({...body, projectId: id});
            return res.status(200).send(element);
        } catch(error) {return res.status(400).send(error);}
    }

    static delete = async(req: Request, res: Response): Promise<Response> => {
        try {
            const {id} = req.params;
            await Enumerators.deleteByProject(id);
            return res.status(200).send('Enumerators deleted.');
        } catch(error) {return res.status(400).send(error);}
    }
}
