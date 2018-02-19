class CursorInput {
    constructor(clicked, x, y) {
        this.x = x;
        this.y = y;
        this.clicked = clicked;
    }
}

class GLCursor {
    constructor(canvas) {
        this.clicked = false;
        this.canvas = canvas;
        this.htmlcanvas = this.canvas.canvas;
        var self = this;
        this.htmlcanvas.addEventListener("mousemove", (event) => {self.onMouseMove(event);});
        this.htmlcanvas.addEventListener("mousedown", (event) => { self.onMouseButtonChange(true, self.translateEventCoordinates(event)); });
        this.htmlcanvas.addEventListener("mouseup", (event) => {self.onMouseButtonChange(false, self.translateEventCoordinates(event));}); 

        this.aggregatedInput = [];
        this.drawing = false;
        this.onPolygonStart = (pos) => {console.log("Polygon Start");};
        this.onPolygonEnd = (pos) => {console.log("Polygon End");};
    }

    /*
        1920, 1080
        300, 500
        GLX = (300 - (1920/2)) / (1920/2)
        GLY = ((1080/2) - 500) / (1080/2)
        (-0.6875, 0.074)
    */

    translateEventCoordinates(event) {
        var x = event.clientX; // x coordinate of a mouse pointer
        var y = event.clientY; // y coordinate of a mouse pointer
        var rect = event.target.getBoundingClientRect();
        var canvas = this.htmlcanvas;
        x = ((x - rect.left) - canvas.width/2)/(canvas.width/2);
        y = (canvas.height/2 - (y - rect.top))/(canvas.height/2);

        return {
            x: x,
            y: y
        };
    }

    normalizeCoordinates(pos) {
        var width = this.canvas.width;
        var height = this.canvas.height;
        return {
            x: pos.x / width,
            y: pos.y / height
        };
    }

    onMouseMove(event) {
        //var x = 2 * event.clientX / this.canvas.width - 1;
        //var y = 2 * (this.canvas.height - event.clientY) / this.canvas.height - 1;
        
        //if(this.clicked) alert("X: " + x + " Y: " + y);
        var pos = this.translateEventCoordinates(event);
        var input = new CursorInput(this.clicked, pos.x, pos.y);
        this.aggregatedInput.push(input);
    }

    onMouseButtonChange(down, pos) {
        if(down == false) {
            while(this.aggregatedInput.length) {
                this.aggregatedInput.pop();
            }
            this.drawing = false;
            this.onPolygonEnd(pos);
        }
        if(down == true && !this.drawing) {
            this.drawing = true;
            this.onPolygonStart(pos);
        }
        this.clicked = down;
    }
};