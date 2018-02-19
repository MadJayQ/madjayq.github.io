var includes = [
    "js/Color.js",
    "js/GLCanvas.js",
    "js/GLShader.js",
    "js/GLProgram.js",
    "js/GLObject.js",
    "js/GLBuffer.js",
    "js/GLStreamableBuffer.js",
    "js/GLMutableObject.js",
    "js/GLCursor.js",
    "js/GLMatrix.js",
    "js/brushes/GLBrush.js",
    "js/brushes/GLRectangleBrush.js",
    "js/brushes/GLLineBrush.js",
    "js/brushes/GLPolygonBrush.js",
    "js/brushes/GLTriangleBrush.js",
    "js/brushes/GLCircleBrush.js",
];

var start = 0;
class App {
    constructor() {
        this.glInitCallback = () => {};
    }
    onPageLoad() {
        includes.forEach((value, index, array) => {
            $.getScript(
                value, (data, status, jqxhr) => {
                    console.log("Loaded: " + value + " status: (" + jqxhr.status + ")" + status);
                }
            );
        });
        var canvas = $('#paintCanvas')[0];
        this.renderer = new GLCanvas(canvas);
        this.cursor = new GLCursor(this.renderer);
        this.activeBrush = new GLBrush(this.renderer.gl, canvas);
        console.log("Running WebGL Version: " + this.renderer.gl.getParameter(this.renderer.gl.VERSION));
        onBrushChange = (idx) => {this.onBrushChange(idx);}
        this.glInitCallback();
    }

    generateObject() {
        return this.renderer.allocateObject(this.activeBrush.mutable);
    }
    setupListener() {
        var container = $('#canvasContainer')[0];
        container.setAttribute("tabindex", 0);
        var self = this;
        container.addEventListener('keydown', function (e) { 
            self.renderer.interceptKeyEvent(e);
            self.activeBrush.interceptKeyEvent(e);
            
        });
    }
    main() {
        /*
            Do any initialization in here
        */
        start = Date.now();
        GlobalVars.getInstance().setTickrate(60);
        GlobalVars.getInstance().timescale = 1.0;
        this.cursor.onPolygonStart = (pos) => {
            var strokeObject = (this.activeBrush.activeObject != null) ? this.activeBrush.activeObject : this.generateObject();
            this.activeBrush.strokeBegin(strokeObject, pos);
        };
        this.cursor.onPolygonEnd = (pos) => {
            this.activeBrush.strokeEnd(pos);
        };

        this.setupListener();
        this.loop();
    }

    onBrushChange(idx) {
        var canvas = $('#paintCanvas')[0];
        switch(idx) {
            case 0: this.activeBrush = new GLBrush(this.renderer.gl, canvas); break;
            case 1: this.activeBrush = new GLLineBrush(this.renderer.gl, canvas); break;
            case 2: this.activeBrush = new GLRectangleBrush(this.renderer.gl, canvas); break;
            case 3: this.activeBrush = new GLTriangleBrush(this.renderer.gl, canvas); break;
            case 4: this.activeBrush = new GLCircleBrush(this.renderer.gl, canvas); break;
            case 5: this.activeBrush = new GLPolygonBrush(this.renderer.gl, canvas); break;
            default: this.activeBrush = new GLBrush(this.renderer.gl, canvas); break;
        }
    }
    loop() {
        var globals = GlobalVars.getInstance();
        
        var time = Date.now() - start;
        var delta = time - globals.lasttime;
        var targettime = globals.tickinterval * 1000;

        delta *= globals.timescale; //Boilerplate, what this has to do w/ a paint program I have no clue

        globals.lasttime = time;
        globals.frametime += delta;

        var estimatedticks = Math.ceil(globals.frametime / targettime);
        if(estimatedticks < 10) {
            while(globals.frametime >= targettime) {
                globals.tickcount++;
                globals.frametime -= targettime;
                this.tick(globals.tickinterval);
            }
        } else {
            //Reset our timer
            globals.frametime = 0; 
        }
        globals.framecount++;
        globals.curtime = time;
        globals.interpolation = globals.frametime / targettime;

        var framestart = Date.now();
        this.render();
        var frameend = Date.now();
        globals.framedelay = (frameend - framestart) / 1000;

        requestAnimationFrame(() => { this.loop(); });
    }

    tick(dt) {
        var input = this.cursor.aggregatedInput;
        var brush = this.activeBrush;
        input.filter(entry => entry.clicked).forEach((pos) => {
            brush.stroke(pos);
        });
        brush.finalizeStroke();
        this.cursor.aggregatedInput = [];
    }

    render() {
        this.renderer.draw();
    }
};