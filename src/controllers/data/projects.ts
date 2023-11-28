import {Request, Response} from 'express';
import {
    Projects,
    Metamodels,
    Models,
    Packages,
    Classes,
    Enumerators,
    Attributes,
    References,
    Literals,
    Operations,
    Parameters,
    Objects,
    Values,
    Views,
    Viewpoints,
    Graphs,
    GraphVertexs,
    VoidVertexs,
    Vertexs,
    GraphElements,
    Edges,
    EdgePoints
} from '../../db';
import U from "../../common/u";

export class ProjectsController {
    static getOne = async(req: Request, res: Response): Promise<Response> => {
        try {
            const {id} = req.params;
            const DBProject = await Projects.getById(id);
            if(!DBProject) return res.status(404).send('Project Not Found.');
            const project = {}; for(const key in Projects.keys) project[key] = DBProject[key];
            const metamodels = (await Metamodels.getByProject(DBProject.id)).map(m => m.id);
            const models = (await Models.getByProject(DBProject.id)).map(m => m.id);
            const graphs = (await Graphs.getByProject(DBProject.id)).map(g => g.id);
            const views = (await Views.getByProject(DBProject.id)).map(v => v.id);
            const viewpoints = (await Viewpoints.getByProject(DBProject.id)).map(v => v.id);
            return res.status(200).send(U.clean({...project, metamodels, models, graphs, views, viewpoints}));
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
                Operations.deleteByProject(id),
                Parameters.deleteByProject(id),
                Objects.deleteByProject(id),
                Values.deleteByProject(id),
                /* VIEWS */
                Views.deleteByProject(id),
                Viewpoints.deleteByProject(id),
                /* NODES */
                Graphs.deleteByProject(id),
                GraphVertexs.deleteByProject(id),
                VoidVertexs.deleteByProject(id),
                Vertexs.deleteByProject(id),
                GraphElements.deleteByProject(id),
                Edges.deleteByProject(id),
                EdgePoints.deleteByProject(id),
                /* PROJECT */
                Projects.delete(id)
            ]);
            return res.status(200).send('Project deleted.');
        } catch(error) {return res.status(400).send(error);}
    }
}
