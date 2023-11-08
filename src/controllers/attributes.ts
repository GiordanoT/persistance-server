import {Request, Response} from 'express';
import {Attributes} from '../db';

export class AttributesController {
    static get = async(req: Request, res: Response): Promise<Response> => {
        try {
            const {id} = req.params;
            const DBAttributes = await Attributes.getByProject(id);
            return res.status(200).send(DBAttributes);
        } catch(error) {return res.status(400).send(error);}
    }

    static create = async (req: Request, res: Response): Promise<Response> => {
        try {
            const {id} = req.params; const body = req.body;
            const element = Attributes.create({...body, projectId: id});
            return res.status(200).send(element);
        } catch(error) {return res.status(400).send(error);}
    }

    static delete = async(req: Request, res: Response): Promise<Response> => {
        try {
            const {id} = req.params;
            await Attributes.deleteByProject(id);
            return res.status(200).send('Attributes deleted.');
        } catch(error) {return res.status(400).send(error);}
    }
}
