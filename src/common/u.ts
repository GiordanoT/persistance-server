import crypto from 'crypto';
import {Request} from 'express';
import {
    Users,
    Projects
} from '../db';
import {Dictionary, Primitive} from './types';
import {SchemaType} from 'mongoose';

class U {
    static random(): string {
        return crypto.randomBytes(128).toString('base64');
    }
    static encrypt(password: string): string {
        return crypto.createHmac('sha256', password).update('SECRET_KEY').digest('hex');
    }
    static async existingId(id: string): Promise<boolean> {
        const user = await Users.getById(id);
        const project = await Projects.getById(id);
        return !!(user || project);

    }
    static getToken(req: Request): string {
        return req.cookies['AUTH-TOKEN'] || '';
    }
    static clean(e: Dictionary): Dictionary {
        delete e['_id']; delete e['__v']; delete e['projectId'];
        return e;
    }
    static defaultValue(schema: SchemaType): Primitive|Primitive[] {
        switch (schema.instance) {
            case 'Number': return 0;
            case 'Boolean': return false;
            case 'String': return '';
            default : return [];
        }
    }
}

export default U;
