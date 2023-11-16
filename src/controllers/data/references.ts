import {Request, Response} from 'express';
import {References} from '../../db';
import U from "../../common/u";

export class ReferencesController {
    static get = async(req: Request, res: Response): Promise<Response> => {
        try {
            const {id} = req.params;
            const DBReferences = await References.getByProject(id);
            const references = [];
            for(const DBReference of DBReferences) {
                const reference = {};
                for(const key in References.keys)
                    reference[key] = DBReference[key] || U.defaultValue(References.keys[key]);
                references.push(U.clean(reference));
            }
            return res.status(200).send(references);
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
