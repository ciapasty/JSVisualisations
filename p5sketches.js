canvasWidth = 800
canvasHeight = 800

//
// Connect Dots
//

var connectDots = function(p) {
    let dots = [];
    let quadTree

    p.setup = function() {
        var canvas = p.createCanvas(canvasWidth, canvasHeight)
        canvas.parent('dots')

        for (i = 0; i < 150; i++) {
            dots.push(new Dot(
                p,
                p.random(0, canvasWidth),
                p.random(0, canvasHeight)
            ))
        }
    }

    p.draw = function() {
        p.background(200);

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

    p.interact = function() {
        points = quadTree.querryRange(new Square(new Point(p.mouseX, p.mouseY), 100))
        for (let pt of points) {
            direction = p.createVector(pt.x - p.mouseX, pt.y - p.mouseY)
            pt.data.acceleration = direction.normalize()
        }
    }

    p.mouseMoved = function() {
        this.interact()
    }

    p.touchMoved = function() {
        this.interact()
    }
}
var p5connectDots = new p5(connectDots, 'dots');

//
// Text Fall
//

var textFall = function(p) {
    p.setup = function() {
        var canvas = p.createCanvas(canvasWidth, canvasHeight)
        canvas.parent('textFall')
    }
    
    p.draw = function() {
        p.background(200);
    }
}
var p5textFall = new p5(textFall, 'textFall')