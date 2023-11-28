import {Request, Response} from 'express';
import {Viewpoints} from '../../db';
import U from '../../common/u';

export class ViewpointsController {
    static get = async(req: Request, res: Response): Promise<Response> => {
        try {
            const {id} = req.params;
            const DBViewpoints = await Viewpoints.getByProject(id);
            const viewpoints = [];
            for(const DBViewpoint of DBViewpoints) {
                const viewpoint = {};
                for(const key in Viewpoints.keys)
                    viewpoint[key] = DBViewpoint[key] || U.defaultValue(Viewpoints.keys[key]);
                viewpoints.push(U.clean(viewpoint));
            }
            return res.status(200).send(viewpoints);
        } catch(error) {return res.status(400).send(error);}
    }

    static create = async (req: Request, res: Response): Promise<Response> => {
        try {
            const {id} = req.params; const body = req.body;
            const element = Viewpoints.create({...body, projectId: id});
            return res.status(200).send(element);
        } catch(error) {return res.status(400).send(error);}
    }

    static delete = async(req: Request, res: Response): Promise<Response> => {
        try {
            const {id} = req.params;
            await Viewpoints.deleteByProject(id);
            return res.status(200).send('Viewpoints deleted.');
        } catch(error) {return res.status(400).send(error);}
    }
}
