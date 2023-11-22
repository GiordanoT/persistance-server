import {Request, Response} from 'express';
import {Parameters} from '../../db';
import U from '../../common/u';

export class ParametersController {
    static get = async(req: Request, res: Response): Promise<Response> => {
        try {
            const {id} = req.params;
            const DBParameters = await Parameters.getByProject(id);
            const parameters = [];
            for(const DBParameter of DBParameters) {
                const parameter = {};
                for(const key in Parameters.keys)
                    parameter[key] = DBParameter[key] || U.defaultValue(Parameters.keys[key]);
                parameters.push(U.clean(parameter));
            }
            return res.status(200).send(parameters);
        } catch(error) {return res.status(400).send(error);}
    }

    static create = async (req: Request, res: Response): Promise<Response> => {
        try {
            const {id} = req.params; const body = req.body;
            if(body.id) await Parameters.deleteById(body.id);
            const element = Parameters.create({...body, projectId: id});
            return res.status(200).send(element);
        } catch(error) {return res.status(400).send(error);}
    }

    static delete = async(req: Request, res: Response): Promise<Response> => {
        try {
            const {id} = req.params;
            await Parameters.deleteByProject(id);
            return res.status(200).send('Parameters deleted.');
        } catch(error) {return res.status(400).send(error);}
    }
}
