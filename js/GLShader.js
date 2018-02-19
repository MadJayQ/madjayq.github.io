class Shader {
    constructor(type, src, glContext) {
        this.type = type;
        this.data = "";
        this.ctx = glContext;
        this.src = src;
        var self = this;
        $.ajax({
            url: src,
            async: false,
            success: (data, textStatus, xhr) => { 
                console.log("[SHADER]: Loaded: " + src + " status: (" + xhr.status + ")" + textStatus);
                self.data = data; 
            },
            error: (msg) => { console.error("You don screwed up! ");} 
        });
    }

    compile() {
        var s = this.ctx.createShader(this.type);
        this.ctx.shaderSource(s, this.data);
        this.ctx.compileShader(s);
        var success = this.ctx.getShaderParameter(s, this.ctx.COMPILE_STATUS);
        if (success) {
            console.log("[SHADER]: (" + this.src + "): Compile status: OK");
            return s;
        }
        console.error(this.ctx.getShaderInfoLog(s));
        return undefined;
    }
};