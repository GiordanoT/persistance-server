import {Request, Response} from 'express';
import {Projects, Metamodels, Models, Packages, Classes, Enumerators, Attributes, References, Literals, Objects, Values, Views} from '../../db';

export class ProjectsController {
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
            await Promise.all([
                /* DATA */
                Metamodels.deleteByProject(id),
                Models.deleteByProject(id),
                Packages.deleteByProject(id),
                Classes.deleteByProject(id),
                Enumerators.deleteByProject(id),
                Attributes.deleteByProject(id),
                References.deleteByProject(id),
                Literals.deleteByProject(id),
                Objects.deleteByProject(id),
                Values.deleteByProject(id),
                /* VIEWS */
                Views.deleteByProject(id),
                Projects.delete(id)
            ]);
            return res.status(200).send('Project deleted.');
        } catch(error) {return res.status(400).send(error);}
    }
}
