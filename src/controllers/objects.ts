import {Request, Response} from 'express';
import {Objects, Values} from '../db';
import U from '../common/u';

export class ObjectsController {
    static get = async(req: Request, res: Response): Promise<Response> => {
        try {
            const {id} = req.params;
            const DBObjects = await Objects.getByProject(id);
            const objects = [];
            // Building features.
            for(const DBObject of DBObjects) {
                const object = {}; for(const key in Objects.keys) object[key] = DBObject[key];
                /* Features */
                object['features'] = (await Values.getByFather(DBObject.id)).map(v => v.id);
                objects.push(U.clean(object));
            }
            return res.status(200).send(objects);
        } catch(error) {return res.status(400).send(error);}
    }

    static create = async (req: Request, res: Response): Promise<Response> => {
        try {
            const {id} = req.params; const body = req.body;
            const element = Objects.create({...body, projectId: id});
            return res.status(200).send(element);
        } catch(error) {return res.status(400).send(error);}
    }

    static delete = async(req: Request, res: Response): Promise<Response> => {
        try {
            const {id} = req.params;
            await Objects.deleteByProject(id);
            return res.status(200).send('Objects deleted.');
        } catch(error) {return res.status(400).send(error);}
    }
}
