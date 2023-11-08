import {Request, Response} from 'express';
import {Projects, Metamodels, Models, Packages, Classes, Enumerators, Attributes, References} from '../db';

class ProjectsController {
    static getOne = async(req: Request, res: Response): Promise<Response> => {
        try {
            const {id} = req.params;
            const project = await Projects.getById(id);
            return res.status(200).send(project);
        } catch(error) {return res.status(400).send(error);}
    }

    static getAll = async(req: Request, res: Response): Promise<Response> => {
        try {
            const projects = await Projects.getAll();
            return res.status(200).send(projects);
        } catch(error) {return res.status(400).send(error);}
    }

    static save = async (req: Request, res: Response): Promise<Response> => {
        try {
            const body = req.body; let project;
            // Checking if the project already exist.
            if(await Projects.getById(body.id)) project = await Projects.update(body.id, body);
            else project = await Projects.create(body);
            return res.status(200).send(project);
        } catch(error) {return res.status(400).send(error);}
    }

    static delete = async(req: Request, res: Response): Promise<Response> => {
        try {
            const {id} = req.params;

            await Metamodels.deleteByProject(id);
            await Models.deleteByProject(id);
            await Packages.deleteByProject(id);
            await Classes.deleteByProject(id);
            await Enumerators.deleteByProject(id);
            await Attributes.deleteByProject(id);
            await References.deleteByProject(id);

            await Projects.delete(id);
            return res.status(200).send('Project deleted.');
        } catch(error) {return res.status(400).send(error);}
    }
}

export default ProjectsController;
