import {Request, Response} from 'express';
import {Views} from '../../db';
import U from '../../common/u';

export class ViewsController {
    static get = async(req: Request, res: Response): Promise<Response> => {
        try {
            const {id} = req.params;
            const DBViews = await Views.getByProject(id);
            const views = [];
            for(const DBView of DBViews) {
                const view = {};
                for(const key in Views.keys)
                    view[key] = DBView[key] || U.defaultValue(Views.keys[key]);
                views.push(U.clean(view));
            }
            return res.status(200).send(views);
        } catch(error) {return res.status(400).send(error);}
    }

    static create = async (req: Request, res: Response): Promise<Response> => {
        try {
            const {id} = req.params; const body = req.body;
            const element = Views.create({...body, projectId: id});
            return res.status(200).send(element);
        } catch(error) {return res.status(400).send(error);}
    }

    static delete = async(req: Request, res: Response): Promise<Response> => {
        try {
            const {id} = req.params;
            await Views.deleteByProject(id);
            return res.status(200).send('Views deleted.');
        } catch(error) {return res.status(400).send(error);}
    }
}
