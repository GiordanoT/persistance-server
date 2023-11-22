import {Request, Response} from 'express';
import {Operations, Parameters} from '../../db';
import U from '../../common/u';

export class OperationsController {
    static get = async(req: Request, res: Response): Promise<Response> => {
        try {
            const {id} = req.params;
            const DBOperations = await Operations.getByProject(id);
            const operations = [];
            for(const DBOperation of DBOperations) {
                const operation = {};
                for(const key in Operations.keys)
                    operation[key] = DBOperation[key] || U.defaultValue(Operations.keys[key]);
                operation['parameters'] = (await Parameters.getByFather(DBOperation.id)).map(p => p.id);
                operation['exceptions'] = [];
                operations.push(U.clean(operation));
            }
            return res.status(200).send(operations);
        } catch(error) {return res.status(400).send(error);}
    }

    static create = async (req: Request, res: Response): Promise<Response> => {
        try {
            const {id} = req.params; const body = req.body;
            if(body.id) await Operations.deleteById(body.id);
            const element = Operations.create({...body, projectId: id});
            return res.status(200).send(element);
        } catch(error) {return res.status(400).send(error);}
    }

    static delete = async(req: Request, res: Response): Promise<Response> => {
        try {
            const {id} = req.params;
            await Operations.deleteByProject(id);
            return res.status(200).send('Operations deleted.');
        } catch(error) {return res.status(400).send(error);}
    }
}
