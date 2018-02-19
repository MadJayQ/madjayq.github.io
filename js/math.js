/*
    Javascript Singleton Pattern
    Math Helper
*/

class _MathHelper_
{
    generateRandom(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    scalePath(path, scalarx, scalary) {
        var arr = path;
        var ret = new Array(path.length);
        arr.forEach(function(item, index, array) {
            ret[index] = new Vector2D(
                (item.x * scalarx) + (scalarx / 2),
                (item.y * scalary) + (scalary / 2)
            );
        });
        return ret;
    }
    boxContains(box, pos) {
        var p = pos;
        var valx = box.x <= pos.x && pos.x <= box.x + parseInt(box.width);
        var valy = box.y <= pos.y && pos.y <= box.y + parseInt(box.height);
        
        return valx && valy;
    }
    lerp(v0, v1, dt) {
        return v0 + dt * (v1 - v0);
    }

    toRadians(degrees) {
        return degrees * Math.PI / 180;
    }

    toDegrees(radians) {
        return radians * 180 / Math.PI;
    }

    rotateY(angle) {
        var rad = this.toRadians(angle);
        var c = Math.cos(rad);
        var s = Math.sin(rad);

        return [
            c,  0, -s,  0,
            0,  1,  0,  0,
            s,  0,  c,  0,
            0,  0,  0,  1,
        ];
    }

    translate(x, y, z) {
        return [
            1,  0,  0,  0,
            0,  1,  0,  0,
            0,  0,  1,  0,
            x,  y,  z , 1,
         ];
    }

    projection(width, height, depth) {
        return [
            2 / width, 0, 0, 0,
            0, -2 / height, 0, 0,
            0, 0, 2 / depth, 0,
           -1, 1, 0, 1,
         ];
    }

    perspective(fovy, aspect, near, far) {
        var f = 1.0 / Math.tan(fovy / 2);
        var nf = 1 / (near - far);
        return [
            f / aspect, 0, 0, 0,
            0, f, 0, 0,
            0, 0, (far + near) * nf, -1,
            0, 0, 2 * far * near * nf, 0
        ];
    }

    identity() {
        return [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ];
    }

    matrixMultiply(a, b) {
        var a00 = a[0 * 4 + 0];
        var a01 = a[0 * 4 + 1];
        var a02 = a[0 * 4 + 2];
        var a03 = a[0 * 4 + 3];
        var a10 = a[1 * 4 + 0];
        var a11 = a[1 * 4 + 1];
        var a12 = a[1 * 4 + 2];
        var a13 = a[1 * 4 + 3];
        var a20 = a[2 * 4 + 0];
        var a21 = a[2 * 4 + 1];
        var a22 = a[2 * 4 + 2];
        var a23 = a[2 * 4 + 3];
        var a30 = a[3 * 4 + 0];
        var a31 = a[3 * 4 + 1];
        var a32 = a[3 * 4 + 2];
        var a33 = a[3 * 4 + 3];
        var b00 = b[0 * 4 + 0];
        var b01 = b[0 * 4 + 1];
        var b02 = b[0 * 4 + 2];
        var b03 = b[0 * 4 + 3];
        var b10 = b[1 * 4 + 0];
        var b11 = b[1 * 4 + 1];
        var b12 = b[1 * 4 + 2];
        var b13 = b[1 * 4 + 3];
        var b20 = b[2 * 4 + 0];
        var b21 = b[2 * 4 + 1];
        var b22 = b[2 * 4 + 2];
        var b23 = b[2 * 4 + 3];
        var b30 = b[3 * 4 + 0];
        var b31 = b[3 * 4 + 1];
        var b32 = b[3 * 4 + 2];
        var b33 = b[3 * 4 + 3];
        return [
          b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30,
          b00 * a01 + b01 * a11 + b02 * a21 + b03 * a31,
          b00 * a02 + b01 * a12 + b02 * a22 + b03 * a32,
          b00 * a03 + b01 * a13 + b02 * a23 + b03 * a33,
          b10 * a00 + b11 * a10 + b12 * a20 + b13 * a30,
          b10 * a01 + b11 * a11 + b12 * a21 + b13 * a31,
          b10 * a02 + b11 * a12 + b12 * a22 + b13 * a32,
          b10 * a03 + b11 * a13 + b12 * a23 + b13 * a33,
          b20 * a00 + b21 * a10 + b22 * a20 + b23 * a30,
          b20 * a01 + b21 * a11 + b22 * a21 + b23 * a31,
          b20 * a02 + b21 * a12 + b22 * a22 + b23 * a32,
          b20 * a03 + b21 * a13 + b22 * a23 + b23 * a33,
          b30 * a00 + b31 * a10 + b32 * a20 + b33 * a30,
          b30 * a01 + b31 * a11 + b32 * a21 + b33 * a31,
          b30 * a02 + b31 * a12 + b32 * a22 + b33 * a32,
          b30 * a03 + b31 * a13 + b32 * a23 + b33 * a33,
        ];
    }
};
var MathHelper = (function(){
    function MathHelper() {

    }
    var instance;
    return {
        getInstance: function(){
            if (null == instance) {
                instance = new _MathHelper_();             
                instance.constructor = null;
            }
            return instance; 
        }
   };
})();