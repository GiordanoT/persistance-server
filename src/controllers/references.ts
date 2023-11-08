import {Request, Response} from 'express';
import {References} from '../db';

export class ReferencesController {
    static get = async(req: Request, res: Response): Promise<Response> => {
        try {
            const {id} = req.params;
            const DBReferences = await References.getByProject(id);
            return res.status(200).send(DBReferences);
        } catch(error) {return res.status(400).send(error);}
    }

    static create = async (req: Request, res: Response): Promise<Response> => {
        try {
            const {id} = req.params; const body = req.body;
            const element = References.create({...body, projectId: id});
            return res.status(200).send(element);
        } catch(error) {return res.status(400).send(error);}
    }

    static delete = async(req: Request, res: Response): Promise<Response> => {
        try {
            const {id} = req.params;
            await References.deleteByProject(id);
            return res.status(200).send('References deleted.');
        } catch(error) {return res.status(400).send(error);}
    }
}
