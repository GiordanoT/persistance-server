import {Request, Response} from 'express';
import {Literals} from '../../db';
import U from '../../common/u';

export class LiteralsController {
    static get = async(req: Request, res: Response): Promise<Response> => {
        try {
            const {id} = req.params;
            const DBLiterals = await Literals.getByProject(id);
            const literals = [];
            for(const DBLiteral of DBLiterals) {
                const literal = {};
                for(const key in Literals.keys)
                    literal[key] = DBLiteral[key] || U.defaultValue(Literals.keys[key]);
                literals.push(U.clean(literal));
            }
            return res.status(200).send(literals);
        } catch(error) {return res.status(400).send(error);}
    }

    static create = async (req: Request, res: Response): Promise<Response> => {
        try {
            const {id} = req.params; const body = req.body;
            const element = Literals.create({...body, projectId: id});
            return res.status(200).send(element);
        } catch(error) {return res.status(400).send(error);}
    }

    static delete = async(req: Request, res: Response): Promise<Response> => {
        try {
            const {id} = req.params;
            await Literals.deleteByProject(id);
            return res.status(200).send('Literals deleted.');
        } catch(error) {return res.status(400).send(error);}
    }
}
