import {Request, Response} from 'express';
import {Users, Projects, Metamodels, Models, Views} from '../../db';
import U from '../../common/u';

export class UsersController {
    static getOne = async(req: Request, res: Response): Promise<Response> => {
        try {
            const {id} = req.params;
            const user = await Users.getById(id);
            return res.status(200).send(user);
        } catch(error) {
            return res.status(400).send(error);
        }
    }

    static getAll = async(req: Request, res: Response): Promise<Response> => {
        try {
            const users = await Users.getAll();
            return res.status(200).send(users);
        } catch(error) {
            return res.status(400).send(error);
        }
    }

    static update = async(req: Request, res: Response): Promise<Response> => {
        try {
            const {id} = req.params;
            const {username} = req.body;
            await Users.update(id, {username});
            return res.status(200).send('User updated.');
        } catch(error) {
            return res.status(400).send(error);
        }
    }

    static delete = async(req: Request, res: Response): Promise<Response> => {
        try {
            const {id} = req.params;
            await Users.delete(id);
            return res.status(200).send('User deleted.');
        } catch(error) {
            return res.status(400).send(error);
        }
    }

    static projects = async(req: Request, res: Response): Promise<Response> => {
        try {
            const {id} = req.params;
            const DBProjects = await Projects.getByAuthor(id); const projects = [];
            for(const DBProject of DBProjects) {
                const project = {}; for(const key in Projects.keys) project[key] = DBProject[key];
                const metamodels = (await Metamodels.getByProject(DBProject.id)).map(m => m.id);
                const models = (await Models.getByProject(DBProject.id)).map(m => m.id);
                const graphs = [];
                const views = (await Views.getByProject(DBProject.id)).map(v => v.id);
                projects.push(U.clean({...project, metamodels, models, graphs, views}));
            }
            return res.status(200).send(projects);
        } catch(error) {return res.status(400).send(error);}
    }
}
