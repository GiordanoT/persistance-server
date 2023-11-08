class Schemas {
    static PointerTargetable  = {
        id: {type: 'string', required: true},
        projectId: {type: 'string', required: true},
        className: {type: 'string', required: true},
        pointedBy: {type: 'mixed', required: true},
        father: {type: 'string', required: false},
    };
    static Named = {
        ...this.PointerTargetable,
        name: {type: String, required: true}
    };
    static Classifier = {
        ...this.Named,
        defaultValue: {type: String, required: false}
    };
    static Feature = {
        ...this.Named,
        type: {type: String, required: true},
        ordered: {type: Boolean, required: true},
        unique: {type: Boolean, required: true},
        lowerBound: {type: Number, required: true},
        upperBound: {type: Number, required: true},
        changeable: {type: Boolean, required: true},
        volatile: {type: Boolean, required: true},
        transient: {type: Boolean, required: true},
        unsettable: {type: Boolean, required: true},
        derived: {type: Boolean, required: true},
        defaultValue: {type: String, required: false}
    };
}

export default Schemas;
