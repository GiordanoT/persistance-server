import {Schema, model} from 'mongoose';
import Schemas from '../../common/schemas';

export class Packages {
    protected static Schema = new Schema({
        ...Schemas.Named,
        uri: {type: 'string', required: false},
        prefix: {type: 'string', required: false}
    });
    protected static Model = model(this.name.slice(0, -1), this.Schema);
    static keys = this.Schema.paths;

    static create = (values: Record<string, unknown>) => new this.Model(values).save().then(entity => entity.toObject());
    static getByProject = (projectId: string) => this.Model.find({projectId});
    static getByFather = (father: string) => this.Model.find({father});
    static deleteByProject = (projectId: string) => this.Model.deleteMany({projectId});
}
