import {Schema, model} from 'mongoose';

export default class Users {
    private static Schema = new Schema({
        username: {type: String, required: true},
        email: {type: String, required: true},
        authentication: {
            password: {type: String, required: true, select: false},
            token: {type: String, select: false}
        }
    });

    private static Model = model('User', this.Schema);

    static getAll = () => this.Model.find();
    static getById = (id: string) => this.Model.findById(id);
    static getByEmail = (email: string) => this.Model.findOne({email});
    static getByToken = (token: string) => this.Model.findOne({'authentication.token': token});
    static create = (values: Record<string, unknown>) => new this.Model(values).save().then(entity => entity.toObject());
    static delete = (id: string) => this.Model.findByIdAndDelete(id);
    static update = (id, values: Record<string, unknown>) => this.Model.findByIdAndUpdate(id, values);
}
