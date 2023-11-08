import {Request, Response} from 'express';
import {Models} from '../db';

export class ModelsController {
    static get = async(req: Request, res: Response): Promise<Response> => {
        try {
            const {id} = req.params;
            const elements = await Models.getByProject(id);
            return res.status(200).send(elements);
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
