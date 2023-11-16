import {Request, Response} from 'express';
import {Vertexs} from '../../db';
import U from '../../common/u';

export class VertexsController {
    static get = async(req: Request, res: Response): Promise<Response> => {
        try {
            const {id} = req.params;
            const DBVertexs = await Vertexs.getByProject(id);
            const vertexs = [];
            for(const DBVertex of DBVertexs) {
                const vertex = {};
                for(const key in Vertexs.keys)
                    vertex[key] = DBVertex[key] || U.defaultValue(Vertexs.keys[key]);
                // vertex['subElements'] = await Fields.getByFather(DBVertex.id).map(f => f.id);
                vertexs.push(U.clean(vertex));
            }
            return res.status(200).send(vertexs);
        } catch(error) {return res.status(400).send(error);}
    }

    static create = async (req: Request, res: Response): Promise<Response> => {
        try {
            const {id} = req.params; const body = req.body;
            const element = Vertexs.create({...body, projectId: id});
            return res.status(200).send(element);
        } catch(error) {return res.status(400).send(error);}
    }

    static delete = async(req: Request, res: Response): Promise<Response> => {
        try {
            const {id} = req.params;
            await Vertexs.deleteByProject(id);
            return res.status(200).send('Vertexs deleted.');
        } catch(error) {return res.status(400).send(error);}
    }
}
