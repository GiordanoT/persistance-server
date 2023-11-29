import {Request, Response} from 'express';
import {Users, Projects, Metamodels, Models, Views, Viewpoints, Graphs} from '../../db';
import U from '../../common/u';

export class UsersController {
    static getById = async(req: Request, res: Response): Promise<Response> => {
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
            const {email} = req.query;
            const DBUsers = (email) ? [await Users.getByEmail(email as string)] : await Users.getAll();
            if(!DBUsers) return res.status(404).send('User not found.');
            const users = [];
            for(const DBUser of DBUsers) {
                const user = {}; for (const key in Users.keys) user[key] = DBUser[key];
                users.push(U.clean(user, 'DUser'));
            }
            return res.status(200).send(users.length > 1 ? users : users[0]);
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
            const DBProjects = [...await Projects.getByAuthor(id), ... await Projects.getByCollaborator(id)];
            const projects = [];
            for(const DBProject of DBProjects) {
                const project = {}; for(const key in Projects.keys) project[key] = DBProject[key];
                const metamodels = (await Metamodels.getByProject(DBProject.id)).map(m => m.id);
                const models = (await Models.getByProject(DBProject.id)).map(m => m.id);
                const graphs = (await Graphs.getByProject(DBProject.id)).map(g => g.id);
                const views = (await Views.getByProject(DBProject.id)).map(v => v.id);
                const viewpoints = (await Viewpoints.getByProject(DBProject.id)).map(v => v.id);
                projects.push(U.clean({...project, metamodels, models, graphs, views, viewpoints}));
            }
            return res.status(200).send(projects);
        } catch(error) {return res.status(400).send(error);}
    }
}
