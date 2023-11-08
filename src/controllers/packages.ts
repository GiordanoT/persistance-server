import {Request, Response} from 'express';
import {Packages, Classes, Enumerators} from '../db';

export class PackagesController {
    static get = async(req: Request, res: Response): Promise<Response> => {
        try {
            const {id} = req.params;
            const DBPackages = await Packages.getByProject(id);
            const packages = [];
            // Building subpackages & classifiers.
            for(const DBPackage of DBPackages) {
                const pkg = {}; for(const key in Packages.keys) pkg[key] = DBPackage[key];
                /* Subpackages */
                pkg['subpackages'] = (await Packages.getByFather(DBPackage.id)).map(p => p.id);
                /* Classifiers */
                const classes = (await Classes.getByFather(DBPackage.id)).map(c => c.id);
                const enumerators = (await Enumerators.getByFather(DBPackage.id)).map(e => e.id);
                pkg['classifiers'] = [...classes, ...enumerators];
                packages.push(pkg);
            }
            return res.status(200).send(packages);
        } catch(error) {return res.status(400).send(error);}
    }

    static create = async (req: Request, res: Response): Promise<Response> => {
        try {
            const {id} = req.params; const body = req.body;
            const element = Packages.create({...body, projectId: id});
            return res.status(200).send(element);
        } catch(error) {return res.status(400).send(error);}
    }

    static delete = async(req: Request, res: Response): Promise<Response> => {
        try {
            const {id} = req.params;
            await Packages.deleteByProject(id);
            return res.status(200).send('Packages deleted.');
        } catch(error) {return res.status(400).send(error);}
    }
}
