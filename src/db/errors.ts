import {Schema, model} from 'mongoose';

export class Errors {
    protected static Schema = new Schema({
        user: {type: String},
        timestamp: {type: Number},
        data: {type: String}
    });

    protected static Model = model(this.name.slice(0, -1), this.Schema);
    static keys = this.Schema.paths;

    static getAll = () => this.Model.find();
    static create = (values: Record<string, unknown>) => new this.Model(values).save().then(entity => entity.toObject());
}
