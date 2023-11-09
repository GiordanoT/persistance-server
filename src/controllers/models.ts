import {Request, Response} from 'express';
import {Models, Objects} from '../db';
import U from '../common/u';

export class ModelsController {
    static get = async(req: Request, res: Response): Promise<Response> => {
        try {
            const {id} = req.params;
            const DBModels = await Models.getByProject(id);
            const models = [];
            // Building objects.
            for(const DBModel of DBModels) {
                const model = {}; for(const key in Models.keys) model[key] = DBModel[key];
                /* Objects */
                model['objects'] = (await Objects.getByFather(DBModel.id)).map(o => o.id);
                // todo: fix this in frontend, create 2 different views: 1 -> M2 & 2 -> M1
                model['packages'] = [];
                models.push(U.clean(model));
            }
            return res.status(200).send(models);
        } catch(error) {return res.status(400).send(error);}
    }

    static create = async (req: Request, res: Response): Promise<Response> => {
        try {
            const {id} = req.params; const body = req.body;
            const element = Models.create({...body, projectId: id});
            return res.status(200).send(element);
        } catch(error) {return res.status(400).send(error);}
    }

    static delete = async(req: Request, res: Response): Promise<Response> => {
        try {
            const {id} = req.params;
            await Models.deleteByProject(id);
            return res.status(200).send('Models deleted.');
        } catch(error) {return res.status(400).send(error);}
    }
}
