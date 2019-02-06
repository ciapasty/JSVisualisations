canvasWidth = 800
canvasHeight = 800

let dots = [];
let quadTree

function setup() {
    var canvas = createCanvas(canvasWidth, canvasHeight)
    canvas.parent('dots')

    for (i = 0; i < 150; i++) {
        dots.push(new Dot(
            random(0, canvasWidth),
            random(0, canvasHeight)
        ))
    }
}

function draw() {
    background(200);

    quadTree = new QuadTree(
        10,
        new Square(new Point(canvasWidth/2, canvasHeight/2), canvasHeight/2)
    )

    for (let dot of dots) {
        quadTree.insert(new Point(dot.coords.x, dot.coords.y, dot))
    }

    for (let dot of dots) {
        dot.connect(quadTree)
        dot.update()
        dot.draw()
    }
}

function interact() {
    points = quadTree.querryRange(new Square(new Point(mouseX, mouseY), 100))
    for (let p of points) {
        direction = createVector(p.x - mouseX, p.y - mouseY)
        p.data.acceleration = direction.normalize()
    }
}

function mouseMoved() {
    interact()
}

function touchMoved() {
    interact()
}