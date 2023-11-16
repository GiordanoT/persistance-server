import {Schema, model} from 'mongoose';

export class Projects {
    protected static Schema = new Schema({
        id: {type: String},
        className: {type: String},
        pointedBy: {type: Schema.Types.Mixed},
        name: {type: String},
        author: {type: String}
    });

    protected static Model = model(this.name.slice(0, -1), this.Schema);
    static keys = this.Schema.paths;

    static getAll = () => this.Model.find();
    static getById = (id: string) => this.Model.findOne({id});
    static getByAuthor = (author: string) => this.Model.find({author});
    static create = (values: Record<string, unknown>) => new this.Model(values).save().then(entity => entity.toObject());
    static delete = (id: string) => this.Model.findOneAndDelete({id});
    static update = (id, values: Record<string, unknown>) => this.Model.findOneAndUpdate({id}, values);
}
