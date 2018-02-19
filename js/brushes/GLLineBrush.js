class GLLineBrush extends GLBrush{
    constructor(glContext, canvas) {
        super(glContext, canvas);

        this.anchorPos = [0,0];
        this.endPos = [0,0];
        this.mutable = false;
    }

    strokeBegin(obj, pos) {
        this.anchorPos[0] = pos.x;
        this.anchorPos[1] = pos.y;
        obj.primitiveType = this.ctx.LINES;
        super.strokeBegin(obj);
    }
    strokeEnd(pos) {
        super.strokeEnd(pos);
        //Finalize buffer
    }
    stroke(pos) {
        this.endPos[0] = pos.x;
        this.endPos[1] = pos.y;
        super.stroke(pos);
    }

    construct() {
        var a = [this.anchorPos[0], this.anchorPos[1]];
        var b = [this.endPos[0], this.endPos[1]];

        return [
            a[0], a[1], b[0], b[1]
        ];
    }
};