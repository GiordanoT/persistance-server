import {Request, Response} from 'express';
import {News, Projects, Users} from '../../db';

export class AdminController {
    static news = async (req: Request, res: Response): Promise<Response> => {
        try {
            const news = await News.getAll();
            return res.status(200).send(news);
        } catch (error) {return res.status(400).send(error);}
    }
    static createNews = async(req: Request, res: Response): Promise<Response> => {
        try {
            const token = String(req.headers['auth-token']);
            if(token !== process.env['ADMIN_TOKEN'])
                return res.status(401).send('Only the admin is authorized to do this.');
            const {id, data, text} = req.body;
            if (!id || !data || !text) return res.status(400).send('Missing required parameters.');
            await News.create({id, data, text});
            return res.status(200).send('News Created.');
        } catch (error) {return res.status(400).send(error);}
    }
    static deleteNews = async (req: Request, res: Response): Promise<Response> => {
        try {
            const token = String(req.headers['auth-token']);
            if(token !== process.env['ADMIN_TOKEN'])
                return res.status(401).send('Only the admin is authorized to do this.');
            const {id} = req.params;
            const news = await News.getById(id);
            if(!news) return res.status(400).send('News Not Found.');
            await News.delete(id);
            return res.status(200).send('News Deleted.');
        } catch (error) {return res.status(400).send(error);}
    }
    static users = async (req: Request, res: Response): Promise<Response> => {
        try {
            const token = String(req.headers['auth-token']);
            if(token !== process.env['ADMIN_TOKEN'])
                return res.status(401).send('Only the admin is authorized to do this.');
            const users = await Users.getAll();
            return res.status(200).send(users);
        } catch (error) {return res.status(400).send(error);}
    }
    static projects = async (req: Request, res: Response): Promise<Response> => {
        try {
            const token = String(req.headers['auth-token']);
            if(token !== process.env['ADMIN_TOKEN'])
                return res.status(401).send('Only the admin is authorized to do this.');
            const projects = await Projects.getAll();
            return res.status(200).send(projects);
        } catch (error) {return res.status(400).send(error);}
    }

}
