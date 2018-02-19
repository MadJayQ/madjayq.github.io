var MatrixBuilder = (() => {
    return {
        projection: (width, height, depth) => {
            return [
                2 / width, 0, 0, 0,
                0, -2 / height, 0, 0,
                0, 0, 2 / depth, 0,
               -1, 1, 0, 1,
             ];
        },
        identity: () => {
            return [
                1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1
            ];
        }
    };
})();
class GLMatrix {
    constructor(m = undefined) {
        if(m == undefined) {
            this.m = [
                0,0,0,0,
                0,0,0,0,
                0,0,0,0,
                0,0,0,0
            ];
        } else {
            this.m = m;
        }
    }

}