import {Request, Response} from 'express';
import {Graphs, GraphVertexs, VoidVertexs, Vertexs, Edges} from '../../db';
import U from '../../common/u';

export class GraphsController {
    static get = async(req: Request, res: Response): Promise<Response> => {
        try {
            const {id} = req.params;
            const DBGraphs = await Graphs.getByProject(id);
            const graphs = [];
            for(const DBGraph of DBGraphs) {
                const graph = {};
                for(const key in Graphs.keys)
                    graph[key] = DBGraph[key] || U.defaultValue(Graphs.keys[key]);
                const subElements = await Promise.all([
                    // Graphs.getByFather(DBGraph.id),
                    GraphVertexs.getByFather(DBGraph.id),
                    VoidVertexs.getByFather(DBGraph.id),
                    Vertexs.getByFather(DBGraph.id),
                    Edges.getByFather(DBGraph.id)
                ]);
                graph['subElements'] = subElements.flatMap(r => r.map(se => se.id));
                graphs.push(U.clean(graph));
            }
            return res.status(200).send(graphs);
        } catch(error) {return res.status(400).send(error);}
    }

    static create = async (req: Request, res: Response): Promise<Response> => {
        try {
            const {id} = req.params; const body = req.body;
            const element = Graphs.create({...body, projectId: id});
            return res.status(200).send(element);
        } catch(error) {return res.status(400).send(error);}
    }

    static delete = async(req: Request, res: Response): Promise<Response> => {
        try {
            const {id} = req.params;
            await Graphs.deleteByProject(id);
            return res.status(200).send('Graphs deleted.');
        } catch(error) {return res.status(400).send(error);}
    }
}
