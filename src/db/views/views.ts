import {Schema, model} from 'mongoose';
import Schemas from '../../common/schemas';

export class Views {
    protected static Schema = new Schema({
        ...Schemas.Named,
        jsxString: {type: String, required: false},
        forceNodeType: {type: String, required: false},
        scalezoomx: {type: Boolean, required: false},
        scalezoomy: {type: Boolean, required: false},
        storeTemporaryPositions: {type: Boolean, required: false},
        appliedToClasses: {type: [String], required: false},
        appliedTo: {type: String, required: false},
        subViews: {type: [String], required: false},
        oclCondition: {type: String, required: false},
        explicitApplicationPriority: {type: Number, required: false},
        defaultVSize: {type: Schema.Types.Mixed, required: false},
        adaptHeight: {type: Boolean, required: false},
        adaptWidth: {type: Boolean, required: false},
        height: {type: Number, required: false},
        width: {type: Number, required: false},
        draggable: {type: Boolean, required: false},
        resizable: {type: Boolean, required: false},
        viewpoint: {type: String, required: false},
        display: {type: String, required: false},
        constraints: {type: Schema.Types.Mixed, required: false},
        onDataUpdate: {type: String, required: false},
        onDragStart: {type: String, required: false},
        onDragEnd: {type: String, required: false},
        whileDragging: {type: String, required: false},
        onResizeStart: {type: String, required: false},
        onResizeEnd: {type: String, required: false},
        whileResizing: {type: String, required: false},
        onRotationStart: {type: String, required: false},
        onRotationEnd: {type: String, required: false},
        whileRotating: {type: String, required: false},
        bendingMode: {type: String, required: false},
        edgeGapMode: {type: String, required: false},
        storeSize: {type: Boolean, required: false},
        size: {type: Schema.Types.Mixed, required: false},
        lazySizeUpdate: {type: Boolean, required: false},
        edgeStartOffset: {type: Schema.Types.Mixed, required: false},
        edgeEndOffset: {type: Schema.Types.Mixed, required: false},
        edgeStartOffset_isPercentage: {type: Boolean, required: false},
        edgeEndOffset_isPercentage: {type: Boolean, required: false},
        edgeStartOffsetAtBoundaries: {type: Boolean, required: false},
        edgeEndOffsetAtBoundaries: {type: Boolean, required: false},
        edgePointCoordMode: {type: String, required: false},
        edgeHeadSize: {type: Schema.Types.Mixed, required: false},
        edgeTailSize: {type: Schema.Types.Mixed, required: false}
    });

    protected static Model = model(this.name.slice(0, -1), this.Schema);
    static keys = this.Schema.paths;

    static create = (values: Record<string, unknown>) => new this.Model(values).save().then(entity => entity.toObject());
    static getByProject = (projectId: string) => this.Model.find({projectId});
    static getByFather = (father: string) => this.Model.find({father});
    static deleteByProject = (projectId: string) => this.Model.deleteMany({projectId});
}
