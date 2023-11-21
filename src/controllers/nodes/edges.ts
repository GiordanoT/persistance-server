import {Request, Response} from 'express';
import {Edges, EdgePoints} from '../../db';
import U from '../../common/u';

export class EdgesController {
    static get = async(req: Request, res: Response): Promise<Response> => {
        try {
            const {id} = req.params;
            const DBEdges = await Edges.getByProject(id);
            const edges = [];
            for(const DBEdge of DBEdges) {
                const edge = {};
                for(const key in Edges.keys)
                    edge[key] = DBEdge[key] || U.defaultValue(Edges.keys[key]);
                    edge['subElements'] = (await EdgePoints.getByFather(DBEdge.id)).map(ep => ep.id);
                edges.push(U.clean(edge));
            }
            return res.status(200).send(edges);
        } catch(error) {return res.status(400).send(error);}
    }

    static create = async (req: Request, res: Response): Promise<Response> => {
        try {
            const {id} = req.params; const body = req.body;
            const element = Edges.create({...body, projectId: id});
            return res.status(200).send(element);
        } catch(error) {return res.status(400).send(error);}
    }

    static delete = async(req: Request, res: Response): Promise<Response> => {
        try {
            const {id} = req.params;
            await Edges.deleteByProject(id);
            return res.status(200).send('Edges deleted.');
        } catch(error) {return res.status(400).send(error);}
    }
}
