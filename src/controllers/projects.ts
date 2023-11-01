import {Request, Response} from 'express';
import {Users, Projects} from '../db';
import U from '../common/u';

class ProjectsController {
    static create = async (req: Request, res: Response): Promise<Response> => {
        try {
            const {id, name, isPublic} = req.body;
            const author = (await Users.getByToken(U.getToken(req)))?.id;
            if (!name || !author || !isPublic) return res.status(400).send('Missing required parameters.');
            const metamodels = []; const models = []; const graphs = []; const views = [];
            const project = await Projects.create({id, name, author, isPublic, metamodels, models, graphs, views});
            return res.status(200).send(project);
        } catch (error) {
            return res.status(400).send(error);
        }
    }

    static getOne = async(req: Request, res: Response): Promise<Response> => {
        try {
            const {id} = req.params;
            const project = await Projects.getById(id);
            return res.status(200).send(project);
        } catch(error) {
            return res.status(400).send(error);
        }
    }

    static getAll = async(req: Request, res: Response): Promise<Response> => {
        try {
            const projects = await Projects.getAll();
            return res.status(200).send(projects);
        } catch(error) {
            return res.status(400).send(error);
        }
    }

    static update = async(req: Request, res: Response): Promise<Response> => {
        try {
            const {id} = req.params;
            const {name, isPublic, metamodels, models, graphs, views} = req.body;
            // todo check if IDs point to existing object.
            await Projects.update(id, {name, isPublic, metamodels, models, graphs, views});
            return res.status(200).send('Project updated.');
        } catch(error) {
            return res.status(400).send(error);
        }
    }

    static delete = async(req: Request, res: Response): Promise<Response> => {
        try {
            const {id} = req.params;
            await Projects.delete(id);
            return res.status(200).send('Project deleted.');
        } catch(error) {
            return res.status(400).send(error);
        }
    }
}

export default ProjectsController;
