class GLCircleBrush extends GLBrush{
    constructor(glContext, canvas) {
        super(glContext, canvas);

        this.anchorPos = [0,0];
        this.endPos = [0,0];
        this.mutable = false;
    }

    strokeBegin(obj, pos) {
        this.anchorPos[0] = pos.x;
        this.anchorPos[1] = pos.y;
        obj.primitiveType = (this.filled) ? this.ctx.TRIANGLE_FAN : this.ctx.LINE_STRIP;
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

        var p = [];

        var density = 200;
        var r = Math.sqrt(Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2));
        for(var i = 0; i <= density; i++) {
            var px = a[0] + (r * Math.cos(i * 2 * Math.PI / density));
            var py = a[1] + (r * Math.sin(i * 2 * Math.PI / density));

            p.push(px);
            p.push(py);
        }

        //p = p.concat(a, b);

        return p;
    }
};