import {Schema, model} from 'mongoose';

export class Projects {
    private static Schema = new Schema({
        id: {type: String, required: true},
        name: {type: String, required: true},
        author: {type: String, required: true},
        isPublic: {type: Boolean, required: true},
        metamodels: {type: [String], required: true},
        models: {type: [String], required: true},
        graphs: {type: [String], required: true},
        views: {type: [String], required: true}
    });

    private static Model = model('Project', this.Schema);

    static getAll = () => this.Model.find({isPublic: true});
    static getById = (id: string) => this.Model.findOne({id});
    static getByAuthor = (author: string) => this.Model.findOne({author});
    static create = (values: Record<string, unknown>) => new this.Model(values).save().then(entity => entity.toObject());
    static delete = (id: string) => this.Model.findOneAndDelete({id});
    static update = (id, values: Record<string, unknown>) => this.Model.findOneAndUpdate({id}, values);
}
