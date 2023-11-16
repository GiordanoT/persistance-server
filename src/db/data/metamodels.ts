import {Schema, model} from 'mongoose';
import Schemas from '../../common/schemas';

export class Metamodels {
    protected static Schema = new Schema({
        ...Schemas.Named,
        isMetamodel: {type: Boolean},
        instanceof: {type: String}
    });
    protected static Model = model(this.name.slice(0, -1), this.Schema);
    static keys = this.Schema.paths;

    static create = (values: Record<string, unknown>) => new this.Model(values).save().then(entity => entity.toObject());
    static getByProject = (projectId: string) => this.Model.find({projectId});
    static deleteByProject = (projectId: string) => this.Model.deleteMany({projectId});
}
