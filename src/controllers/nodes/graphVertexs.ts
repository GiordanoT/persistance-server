import {Request, Response} from 'express';
import {GraphVertexs, VoidVertexs, Vertexs} from '../../db';
import U from '../../common/u';

export class GraphVertexsController {
    static get = async(req: Request, res: Response): Promise<Response> => {
        try {
            const {id} = req.params;
            const DBGraphVertexs = await GraphVertexs.getByProject(id);
            const graphVertexs = [];
            for(const DBGraphVertex of DBGraphVertexs) {
                const graphVertex = {};
                for(const key in GraphVertexs.keys)
                    graphVertex[key] = DBGraphVertex[key] || U.defaultValue(GraphVertexs.keys[key]);
                const subElements = await Promise.all([
                    // GraphVertexs.getByFather(DBGraphVertex.id),
                    VoidVertexs.getByFather(DBGraphVertex.id),
                    Vertexs.getByFather(DBGraphVertex.id)
                ]);
                graphVertex['subElements'] = subElements.flatMap(r => r.map(se => se.id));
                graphVertexs.push(U.clean(graphVertex));
            }
            return res.status(200).send(graphVertexs);
        } catch(error) {return res.status(400).send(error);}
    }

    static create = async (req: Request, res: Response): Promise<Response> => {
        try {
            const {id} = req.params; const body = req.body;
            const element = GraphVertexs.create({...body, projectId: id});
            return res.status(200).send(element);
        } catch(error) {return res.status(400).send(error);}
    }

    static delete = async(req: Request, res: Response): Promise<Response> => {
        try {
            const {id} = req.params;
            await GraphVertexs.deleteByProject(id);
            return res.status(200).send('GraphVertexs deleted.');
        } catch(error) {return res.status(400).send(error);}
    }
}
