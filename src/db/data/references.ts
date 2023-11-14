import {Schema, model} from 'mongoose';
import Schemas from '../../common/schemas';

export class References {
    protected static Schema = new Schema({
        ...Schemas.Feature,
        containment: {type: Boolean, required: true},
        container: {type: Boolean, required: true},
        resolveProxies: {type: Boolean, required: true},
        opposite: {type: String, required: false},
        // target: {type: [String], required: false},
        // edges: {type: [String], required: false},
    });
    protected static Model = model(this.name.slice(0, -1), this.Schema);
    static keys = this.Schema.paths;

    static create = (values: Record<string, unknown>) => new this.Model(values).save().then(entity => entity.toObject());
    static getByProject = (projectId: string) => this.Model.find({projectId});
    static getByFather = (father: string) => this.Model.find({father});
    static deleteByProject = (projectId: string) => this.Model.deleteMany({projectId});
}
