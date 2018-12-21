var debug = true;

var flowfield;
var vehicles = [];
var v;

function setup() {
    createCanvas(windowWidth, windowHeight);

    flowfield = new FlowField(30);
    flowfield.init();
}

function draw() {
    // background(255);
    if (debug) flowfield.render();
    for (const v of vehicles) {
        v.follow(flowfield);
        v.run();
    }


}

function mouseDragged() {
    vehicles.push(new Vehicle(mouseX, mouseY));
}

function keyPressed() {
    if (key == ' ') {
        background('#282c34');
        debug = !debug;
    }
}

function keyTyped() {
    if (key === 'r') {
        if (debug) {
            background('#282c34');
        }
        flowfield.init();
    }
}
