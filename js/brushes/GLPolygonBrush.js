class GLPolygonBrush extends GLBrush{
    constructor(glContext, canvas) {
        super(glContext, canvas);

        this.startPos = [0,0];
        this.anchorPos = [0,0];
        this.endPos = [0,0];
        this.mutable = true;
        this.first = false;
        this.finalize = false;
    }

    interceptKeyEvent(event) {
        if(event.keyCode == 13) {
            this.vertices.push(this.endPos[0]);
            this.vertices.push(this.endPos[1]);
            this.vertices.push(this.startPos[0]);
            this.vertices.push(this.startPos[1]);
            this.activeObject.primitiveType = (this.filled) ? this.ctx.TRIANGLE_FAN : this.ctx.LINES
            this.finalize = true;
            super.finalizeStroke();
            this.activeObject = null;
        }
    }

    strokeBegin(obj, pos) {
        this.first = this.activeObject == null;
        this.anchorPos[0] = (this.activeObject == null) ? pos.x : this.endPos[0];
        this.anchorPos[1] = (this.activeObject == null) ? pos.y : this.endPos[1];
        obj.primitiveType = this.ctx.LINES;
        super.strokeBegin(obj);
        if(this.first) {
            this.startPos[0] = pos.x;
            this.startPos[1] = pos.y;
            this.finalize = false;
            super.stroke(pos);
        }
    }
    strokeEnd(pos) {
        this.vertices = this.construct();
        //Finalize buffer
    }
    stroke(pos) {
        if(this.finalize) return;
        if(this.first) {
            super.stroke(pos);
            this.first = false;
        }
        this.endPos[0] = pos.x;
        this.endPos[1] = pos.y;
        //this.activeObject.positionBuffer.overrideVertex(pos, 1);
        //super.stroke(pos);
    }

    construct() {
        var a = [this.anchorPos[0], this.anchorPos[1]];
        var b = [this.endPos[0], this.endPos[1]];

        return [
            a[0], a[1], b[0], b[1]
        ];
    }
};