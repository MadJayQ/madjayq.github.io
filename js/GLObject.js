class GLObject {
    constructor(glContext) {
        this.ctx = glContext;
        this.primitiveType = this.ctx.POINTS;
        this.positionBuffer = new GLBuffer(
            glContext, 
            2,
            glContext.FLOAT,
            false,
            0,
            0 
        );

        this.colorBuffer = new GLBuffer(
            glContext,
            4,
            glContext.FLOAT,
            false,
            0,
            0
        );
    }

    setupBufferAttributes(attribute, buffer) {
        this.ctx.enableVertexAttribArray(attribute);
        buffer.bind();
        this.ctx.vertexAttribPointer(
            attribute,
            buffer.size,
            buffer.type,
            buffer.normalize,
            buffer.stride,
            buffer.offset 
        );
    }

    draw() {
        this.ctx.drawArrays(this.primitiveType, 0, this.positionBuffer.data.length / this.positionBuffer.size);
    }
}