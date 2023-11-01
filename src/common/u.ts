import crypto from 'crypto';
import {Request} from 'express';
import {
    Users,
    Projects
} from '../db';

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
}

export default U;
