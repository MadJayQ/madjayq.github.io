class GLBrush {
    constructor(glContext, canvas) {
        this.canvas = canvas;
        this.ctx = glContext;
        this.activeObject = null;
        this.vertices = [];
        this.mutable = true;
        this.color = new Color(255, 0, 0, 255);
        this.colorData = [];
        onColorChange.push((newColor) => {this.onColorChange(newColor);})
        onFilledChange = (val) => {this.filled = val;}

        this.filled = false;
    }

    interceptKeyEvent(event) {
        
    }

    onColorChange(newColor) {
        this.color = new Color(
            newColor._r,
            newColor._g,
            newColor._b,
            newColor._a * 255
        );
    }
    strokeBegin(newObject, pos) {
        this.activeObject = newObject;
    }

    strokeEnd(pos) {
        this.activeObject = null;
    }

    stroke(pos) {
        this.vertices.push(pos.x);
        this.vertices.push(pos.y);
        var dat = this.color.serialize();
        this.colorData.push(dat[0]);
        this.colorData.push(dat[1]);
        this.colorData.push(dat[2]);
        this.colorData.push(dat[3]);
    }

    finalizeStroke() {
        if(this.activeObject == null) return;
        if(this.activeObject instanceof GLMutableObject) {
            this.activeObject.positionBuffer.streamDataToBuffer(this.vertices);
            this.activeObject.colorBuffer.streamDataToBuffer(this.colorData);
            this.vertices = [];
        } else {
            this.vertices = this.construct();
            this.activeObject.positionBuffer.initializeFromArray(new Float32Array(this.vertices));
            var numvertices = this.vertices.length / this.activeObject.positionBuffer.size;
            this.colorData = [];
            this.vertices = [];
            for(var i = 0; i < numvertices; i++) {
                this.colorData = this.colorData.concat(this.color.serialize());
            }
            this.activeObject.colorBuffer.initializeFromArray(new Float32Array(this.colorData));
        }
    }
};