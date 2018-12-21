class Vehicle {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.maxSpeed = 8;
        this.maxForce = 1;
        this.r = 3;
        this.last = createVector(x, y);
    }

    run() {
        this.update();
        this.edges();
        this.render();
    }

    update() {
        this.vel.add(this.acc);
        //Enfore max Speed limit
        this.vel.limit(this.maxSpeed);
        this.pos.add(this.vel);
        this.acc.mult(0);
    }

    applyForce(force) {
        let f = force.copy();
        this.acc.add(f);
    }

    follow(flowField) {
        let desired = flowField.lookUp(this.pos);
        desired.mult(this.maxSpeed);

        let steer = p5.Vector.sub(desired, this.vel);
        //Enforce max acceleration
        steer.limit(this.maxForce);
        this.applyForce(steer);
    }

    edges() {
        if (this.pos.x < -this.r) this.pos.x = width + this.r, this.last.x = width + this.r;
        if (this.pos.y < -this.r) this.pos.y = height + this.r, this.last.y = height + this.r;
        if (this.pos.x > width + this.r) this.pos.x = -this.r, this.last.x = -this.r;
        if (this.pos.y > height + this.r) this.pos.y = -this.r, this.last.y = -this.r;
    }

    render() {
        // Draw a triangle rotated in the direction of velocity
        // let theta = this.vel.heading() + PI / 2;
        // fill(0, 1);
        // stroke(0, 1);
        // strokeWeight(1);
        // push();
        // translate(this.pos.x, this.pos.y);
        // rotate(theta);
        // beginShape();
        // vertex(0, -this.r * 2);
        // vertex(-this.r, this.r * 2);
        // vertex(this.r, this.r * 2);
        // endShape(CLOSE);
        // pop();
        let t1 = 10;
        let t2 = 100;
        let t3 = 200;
        noiseSeed(13453453);

        stroke(noise(this.pos.x * 0.001 + t1, this.pos.y * 0.001 + t1) * 256, noise(this.pos.x * 0.001 + t2, this.pos.y * 0.001 + t2) * 256, noise(this.pos.x * 0.001 + t3, this.pos.y * 0.001 + t3) * 256, 50);
        line(this.pos.x, this.pos.y, this.last.x, this.last.y);
        this.last = this.pos.copy();
    }
}