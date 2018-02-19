class GLTriangleBrush extends GLBrush{
    constructor(glContext, canvas) {
        super(glContext, canvas);

        this.anchorPos = [0,0];
        this.endPos = [0,0];
        this.mutable = false;
        this.points = [];
        this.pointIdx = 0;
    }

    strokeBegin(obj, pos) {
        if(this.activeObject == null) {
            this.points.push(pos.x);
            this.points.push(pos.y);
            this.pointIdx = 0;
        }
        this.pointIdx++;    
        this.anchorPos[0] = pos.x;
        this.anchorPos[1] = pos.y;
        super.strokeBegin(obj);
    }
    strokeEnd(pos) {
        if(this.points.length == (3 * this.activeObject.positionBuffer.size)) {
            super.finalizeStroke();
            super.strokeEnd(pos);
            this.points = [];
        }
        //Finalize buffer
    }
    stroke(pos) {
        this.endPos[0] = pos.x;
        this.endPos[1] = pos.y;
        var idx = this.pointIdx * 2;
        this.points[idx] = pos.x;
        this.points[idx + 1] = pos.y;
        super.stroke(pos);
    }

    construct() {
        this.activeObject.primitiveType = (this.points.length == 6) ? ((this.filled) ? this.ctx.TRIANGLES : this.ctx.LINE_LOOP) : this.ctx.LINES;
        return this.points;
    }
}; 