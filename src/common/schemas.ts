import {Schema} from 'mongoose';

class Schemas {
    static PointerTargetable  = {
        id: {type: String},
        projectId: {type: String},
        className: {type: String},
        pointedBy: {type: [Schema.Types.Mixed]},
        father: {type: String},
    };
    static Named = {
        ...this.PointerTargetable,
        name: {type: String}
    };
    static Classifier = {
        ...this.Named,
        defaultValue: {type: String}
    };
    static Feature = {
        ...this.Named,
        type: {type: String},
        ordered: {type: Boolean},
        unique: {type: Boolean},
        lowerBound: {type: Number},
        upperBound: {type: Number},
        changeable: {type: Boolean},
        volatile: {type: Boolean},
        transient: {type: Boolean},
        unsettable: {type: Boolean},
        derived: {type: Boolean},
        defaultValue: {type: String}
    };
    static Instantiable = {
        ...this.Named,
        instanceof: {type: String},
    }
    static GraphElement = {
        ...this.PointerTargetable,
        graph: {type: String},
        model: {type: String},
        isSelected: {type: Schema.Types.Mixed},
        state: {type: Schema.Types.Mixed},
        x: {type: Number},
        y: {type: Number},
        height: {type: Number},
        h: {type: Number},
        width: {type: Number},
        w: {type: Number},
        zIndex: {type: Number},
        view: {type: String},
        zoom: {type: Schema.Types.Mixed},
        graphSize: {type: Schema.Types.Mixed},
        favoriteNode: {type: Boolean}
    }
}

export default Schemas;
