import {Request, Response} from 'express';
import {Classes, Attributes, References} from '../db';
import U from '../common/u';

export class ClassesController {
    static get = async(req: Request, res: Response): Promise<Response> => {
        try {
            const {id} = req.params;
            const DBClasses = await Classes.getByProject(id);
            const classes = [];
            // Building features & operations.
            for(const DBClass of DBClasses) {
                const cls = {}; for(const key in Classes.keys) cls[key] = DBClass[key];
                /* Features */
                const attributes = (await Attributes.getByFather(DBClass.id)).map(a => a.id);
                const references = (await References.getByFather(DBClass.id)).map(r => r.id);
                cls['features'] = [...attributes, ...references];
                cls['attributes'] = attributes; cls['references'] = references;
                /* Operations */
                cls['operations'] = [];
                classes.push(U.clean(cls));
            }
            return res.status(200).send(classes);
        } catch(error) {return res.status(400).send(error);}
    }

    static create = async (req: Request, res: Response): Promise<Response> => {
        try {
            const {id} = req.params; const body = req.body;
            const element = Classes.create({...body, projectId: id});
            return res.status(200).send(element);
        } catch(error) {return res.status(400).send(error);}
    }

    static delete = async(req: Request, res: Response): Promise<Response> => {
        try {
            const {id} = req.params;
            await Classes.deleteByProject(id);
            return res.status(200).send('Classes deleted.');
        } catch(error) {return res.status(400).send(error);}
    }
}
