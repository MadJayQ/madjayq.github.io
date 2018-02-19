class GLBuffer {
    constructor(glContext, size, type, normalize, stride, offset) {
        this.data = [];
        this.ctx = glContext;
        this.size = size;
        this.type = type;
        this.normalize = normalize;
        this.stride = stride;
        this.offset = offset;
        this.bufferHandle = this.ctx.createBuffer();
    }

    dump() { 
        this.ctx.deleteBuffer(this.bufferHandle);
    }
    initializeFromArray(arr) {  
        this.data = arr;
        this.ctx.bindBuffer(this.ctx.ARRAY_BUFFER,this.bufferHandle);
        this.ctx.bufferData(
            this.ctx.ARRAY_BUFFER,
            arr, 
            this.ctx.STATIC_DRAW
        );
    }

    bufferSize() {
        return this.ctx.getBufferParameter(this.ctx.ARRAY_BUFFER, this.ctx.BUFFER_SIZE);
    }

    bind() {
        this.ctx.bindBuffer(this.ctx.ARRAY_BUFFER, this.bufferHandle);
    }
};