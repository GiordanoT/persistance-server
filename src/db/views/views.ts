import {Schema, model} from 'mongoose';
import Schemas from '../../common/schemas';

export class Views {
    protected static Schema = new Schema({
        ...Schemas.Named,
        jsxString: {type: String},
        forceNodeType: {type: String},
        scalezoomx: {type: Boolean},
        scalezoomy: {type: Boolean},
        storeTemporaryPositions: {type: Boolean},
        appliedToClasses: {type: [String]},
        appliedTo: {type: String},
        subViews: {type: [String]},
        oclCondition: {type: String},
        explicitApplicationPriority: {type: Number},
        defaultVSize: {type: Schema.Types.Mixed},
        adaptHeight: {type: Boolean},
        adaptWidth: {type: Boolean},
        height: {type: Number},
        width: {type: Number},
        draggable: {type: Boolean},
        resizable: {type: Boolean},
        viewpoint: {type: String},
        display: {type: String},
        constraints: {type: Schema.Types.Mixed},
        onDataUpdate: {type: String},
        onDragStart: {type: String},
        onDragEnd: {type: String},
        whileDragging: {type: String},
        onResizeStart: {type: String},
        onResizeEnd: {type: String},
        whileResizing: {type: String},
        onRotationStart: {type: String},
        onRotationEnd: {type: String},
        whileRotating: {type: String},
        bendingMode: {type: String},
        edgeGapMode: {type: String},
        storeSize: {type: Boolean},
        size: {type: Schema.Types.Mixed},
        lazySizeUpdate: {type: Boolean},
        edgeStartOffset: {type: Schema.Types.Mixed},
        edgeEndOffset: {type: Schema.Types.Mixed},
        edgeStartOffset_isPercentage: {type: Boolean},
        edgeEndOffset_isPercentage: {type: Boolean},
        edgeStartOffsetAtBoundaries: {type: Boolean},
        edgeEndOffsetAtBoundaries: {type: Boolean},
        edgePointCoordMode: {type: String},
        edgeHeadSize: {type: Schema.Types.Mixed},
        edgeTailSize: {type: Schema.Types.Mixed}
    });

    protected static Model = model(this.name.slice(0, -1), this.Schema);
    static keys = this.Schema.paths;

    static create = (values: Record<string, unknown>) => new this.Model(values).save().then(entity => entity.toObject());
    static getByProject = (projectId: string) => this.Model.find({projectId});
    static getByFather = (father: string) => this.Model.find({father});
    static deleteByProject = (projectId: string) => this.Model.deleteMany({projectId});
}
