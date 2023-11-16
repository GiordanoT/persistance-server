import {Request, Response} from 'express';
import {VoidVertexs} from '../../db';
import U from '../../common/u';

export class VoidVertexsController {
    static get = async(req: Request, res: Response): Promise<Response> => {
        try {
            const {id} = req.params;
            const DBVoidVertexs = await VoidVertexs.getByProject(id);
            const voidVertexs = [];
            for(const DBVoidVertex of DBVoidVertexs) {
                const voidVertex = {};
                for(const key in VoidVertexs.keys)
                    voidVertex[key] = DBVoidVertex[key] || U.defaultValue(VoidVertexs.keys[key]);
                // voidVertex['subElements'] = await Fields.getByFather(DBVoidVertex.id).map(f => f.id);
                voidVertexs.push(U.clean(voidVertex));
            }
            return res.status(200).send(voidVertexs);
        } catch(error) {return res.status(400).send(error);}
    }

    static create = async (req: Request, res: Response): Promise<Response> => {
        try {
            const {id} = req.params; const body = req.body;
            const element = VoidVertexs.create({...body, projectId: id});
            return res.status(200).send(element);
        } catch(error) {return res.status(400).send(error);}
    }

    static delete = async(req: Request, res: Response): Promise<Response> => {
        try {
            const {id} = req.params;
            await VoidVertexs.deleteByProject(id);
            return res.status(200).send('VoidVertexs deleted.');
        } catch(error) {return res.status(400).send(error);}
    }
}
