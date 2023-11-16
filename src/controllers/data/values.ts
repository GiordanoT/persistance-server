import {Request, Response} from 'express';
import {Values} from '../../db';
import U from '../../common/u';

export class ValuesController {
    static get = async(req: Request, res: Response): Promise<Response> => {
        try {
            const {id} = req.params;
            const DBValues = await Values.getByProject(id);
            const values = [];
            for(const DBValue of DBValues) {
                const value = {};
                for(const key in Values.keys)
                    value[key] = DBValue[key] || U.defaultValue(Values.keys[key]);
                values.push(U.clean(value));
            }
            return res.status(200).send(values);
        } catch(error) {return res.status(400).send(error);}
    }

    static create = async (req: Request, res: Response): Promise<Response> => {
        try {
            const {id} = req.params; const body = req.body;
            const element = Values.create({...body, projectId: id});
            return res.status(200).send(element);
        } catch(error) {return res.status(400).send(error);}
    }

    static delete = async(req: Request, res: Response): Promise<Response> => {
        try {
            const {id} = req.params;
            await Values.deleteByProject(id);
            return res.status(200).send('Values deleted.');
        } catch(error) {return res.status(400).send(error);}
    }
}
