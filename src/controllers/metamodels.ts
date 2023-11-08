import {Request, Response} from 'express';
import {Metamodels, Packages} from '../db';

export class MetamodelsController {
    static get = async(req: Request, res: Response): Promise<Response> => {
        try {
            const {id} = req.params;
            const DBMetamodels = await Metamodels.getByProject(id);
            const metamodels = [];
            // Building packages.
            for(const DBMetamodel of DBMetamodels) {
                const metamodel = {}; for(const key in Metamodels.keys) metamodel[key] = DBMetamodel[key];
                metamodel['packages'] = (await Packages.getByFather(DBMetamodel.id)).map(p => p.id);
                metamodels.push(metamodel);
            }
            return res.status(200).send(metamodels);
        } catch(error) {return res.status(400).send(error);}
    }

    static create = async (req: Request, res: Response): Promise<Response> => {
        try {
            const {id} = req.params; const body = req.body;
            const element = Metamodels.create({...body, projectId: id});
            return res.status(200).send(element);
        } catch(error) {return res.status(400).send(error);}
    }

    static delete = async(req: Request, res: Response): Promise<Response> => {
        try {
            const {id} = req.params;
            await Metamodels.deleteByProject(id);
            return res.status(200).send('Metamodels deleted.');
        } catch(error) {return res.status(400).send(error);}
    }
}
