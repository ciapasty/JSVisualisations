canvasWidth = 800
canvasHeight = 800

let dots = [];
let quadTree

function setup() {
    createCanvas(canvasWidth, canvasHeight);

    for (i = 0; i < 150; i++) {
        dots.push(new Dot(
            random(0, canvasWidth),
            random(0, canvasHeight)
        ))
    }
}

function draw() {
    background(255);

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