import {Request, Response} from 'express';
import {GraphElements} from '../../db';
import U from '../../common/u';

export class GraphElementsController {
    static get = async(req: Request, res: Response): Promise<Response> => {
        try {
            const {id} = req.params;
            const DBGraphElements = await GraphElements.getByProject(id);
            const graphElements = [];
            for(const DBGraphElement of DBGraphElements) {
                const graphElement = {};
                for(const key in GraphElements.keys)
                    graphElement[key] = DBGraphElement[key] || U.defaultValue(GraphElements.keys[key]);
                graphElements.push(U.clean(graphElement));
            }
            return res.status(200).send(graphElements);
        } catch(error) {return res.status(400).send(error);}
    }

    static create = async (req: Request, res: Response): Promise<Response> => {
        try {
            const {id} = req.params; const body = req.body;
            const element = GraphElements.create({...body, projectId: id});
            return res.status(200).send(element);
        } catch(error) {return res.status(400).send(error);}
    }

    static delete = async(req: Request, res: Response): Promise<Response> => {
        try {
            const {id} = req.params;
            await GraphElements.deleteByProject(id);
            return res.status(200).send('GraphElements deleted.');
        } catch(error) {return res.status(400).send(error);}
    }
}
