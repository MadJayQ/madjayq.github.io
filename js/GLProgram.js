class GLProgram {
    constructor(glContext) {
        this.ctx = glContext;
        this.innerProgram = glContext.createProgram();
        self = this;
        this.shaders = new Map();
    }

    attachShader(shader) {
        self.ctx.attachShader(this.innerProgram, shader);
    }

    attachAndLink() {
        var p = this.innerProgram;
        this.shaders.forEach((value, index, array) => {
            self.ctx.attachShader(p, value.compile());
        });

        this.link();
    }

    enable() {
        this.ctx.useProgram(this.innerProgram);
    }
    getAttributeLocation(name) {
        return this.ctx.getAttribLocation(this.innerProgram, name);
    }
    getUniformLocation(name) {
        return this.ctx.getUniformLocation(this.innerProgram, name);
    }

    link(cleanup = true) {
        this.ctx.linkProgram(this.innerProgram);
        var success = this.ctx.getProgramParameter(this.innerProgram, this.ctx.LINK_STATUS);
        var info = this.ctx.getProgramInfoLog(this.innerProgram);
        if(success) {
            console.log("[GLPROGRAM]: Link status: OK");
            return this.innerProgram;
        }
        console.error("[GLPROGRAM]: Link status: " + info);
        if(cleanup) {
            this.ctx.deleteProgram(this.innerProgram);
        }
    }
};