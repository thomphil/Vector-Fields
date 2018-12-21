class FlowField {

    constructor(r = 100) {
        this.resolution = r;
        this.rows = height / this.resolution;
        this.cols = width / this.resolution;
        this.field = [];

        this.init();
    }

    init() {
        for (let i = 0; i < this.cols; i++) {
            this.field.push([]);
            for (let x = 0; x < this.rows; x++) {
                this.field[i].push(createVector(0, 0));
            }
        }

        noiseSeed(Math.floor(random(10000)));
        let yoff = 0;
        for (let i = 0; i < this.cols; i++) {
            let xoff = 0;
            for (let j = 0; j < this.rows; j++) {
                let theta = noise(xoff, yoff) * TWO_PI * 2;
                //let theta = random() * TWO_PI;
                this.field[i][j] = createVector(cos(theta), sin(theta));
                xoff += 0.1;
            }
            yoff += 0.1;
        }

    }

    render() {
        for (let i = 0; i < this.cols; i++) {
            for (let j = 0; j < this.rows; j++) {
                this.drawVector(this.field[i][j], i * this.resolution, j * this.resolution, this.resolution - 2);
            }
        }
    }

    lookUp(lookup) {
        let column = floor(constrain(lookup.x / this.resolution, 0, this.cols - 1));
        let row = floor(constrain(lookup.y / this.resolution, 0, this.rows - 1));
        return this.field[column][row].copy();
    }

    drawVector(v, x, y, scayl) {
        push();
        //Translate to location of cell
        translate(x, y);
        stroke(200, 200);
        //Get direction of vector and rotate arrow to face it.
        rotate(v.heading());

        //calculate the length of the vector and scale it to be bigger or smaller
        let len = v.mag() * scayl;
        line(0, 0, len, 0);

        pop();
    }
}