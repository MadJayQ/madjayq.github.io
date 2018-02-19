class GLMutableObject extends GLObject {
    constructor(glContext) {
        super(glContext);
        this.positionBuffer = new GLStreamableBuffer(
            glContext, 
            2,
            glContext.FLOAT,
            false,
            0,
            0 
        );
        this.colorBuffer = new GLStreamableBuffer(
            glContext,
            4,
            glContext.FLOAT,
            false,
            0,
            0
        );
        this.primitiveType = glContext.LINE_STRIP;
    }
};