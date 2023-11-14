import {Schema, model} from 'mongoose';
import Schemas from '../../common/schemas';

export class Classes {
    protected static Schema = new Schema({
        ...Schemas.Classifier,
        abstract: {type: Boolean, required: true},
        interface: {type: Boolean, required: true},
        extends: {type: [String], required: true},
        isPrimitive: {type: Boolean, required: true},
        implements: {type: [String], required: true},
        partial: {type: Boolean, required: true}
    });
    protected static Model = model(this.name.slice(0, -1), this.Schema);
    static keys = this.Schema.paths;

    static create = (values: Record<string, unknown>) => new this.Model(values).save().then(entity => entity.toObject());
    static getByProject = (projectId: string) => this.Model.find({projectId});
    static getByFather = (father: string) => this.Model.find({father});
    static deleteByProject = (projectId: string) => this.Model.deleteMany({projectId});
}
