import {Request, Response} from 'express';
import {EdgePoints} from '../../db';
import U from '../../common/u';

export class EdgePointsController {
    static get = async(req: Request, res: Response): Promise<Response> => {
        try {
            const {id} = req.params;
            const DBEdgePoints = await EdgePoints.getByProject(id);
            const edgePoints = [];
            for(const DBEdgePoint of DBEdgePoints) {
                const edgePoint = {};
                for(const key in EdgePoints.keys)
                    edgePoint[key] = DBEdgePoint[key] || U.defaultValue(EdgePoints.keys[key]);
                edgePoints.push(U.clean(edgePoint));
            }
            return res.status(200).send(edgePoints);
        } catch(error) {return res.status(400).send(error);}
    }

    static create = async (req: Request, res: Response): Promise<Response> => {
        try {
            const {id} = req.params; const body = req.body;
            const element = EdgePoints.create({...body, projectId: id});
            return res.status(200).send(element);
        } catch(error) {return res.status(400).send(error);}
    }

    static delete = async(req: Request, res: Response): Promise<Response> => {
        try {
            const {id} = req.params;
            await EdgePoints.deleteByProject(id);
            return res.status(200).send('EdgePoints deleted.');
        } catch(error) {return res.status(400).send(error);}
    }
}
