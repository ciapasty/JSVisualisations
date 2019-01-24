class Dot {
    constructor(x, y) {
	    this.coords = new Point(x, y, null)
        this.velocity = createVector(random(-1, 1), random(-1, 1))
        
        this.RANGE = 70

        this.visibility = new Square(this.coords, this.RANGE)
    }

    connect(quadTree) {
        var points = quadTree.querryRange(this.visibility)
        for (var i in points) {
            if (dist(this.coords.x, this.coords.y, points[i].x, points[i].y) < this.RANGE) {
                stroke(200,100,100,50)
                strokeWeight(1)
                line(this.coords.x, this.coords.y, points[i].x, points[i].y);
            }
        }
    }
	
	update() {
        this.coords.x += this.velocity.x
        this.coords.y += this.velocity.y

        if (this.coords.x < 0 || this.coords.x > canvasWidth) {
            this.velocity.x = -this.velocity.x
        }
        if (this.coords.y < 0 || this.coords.y > canvasWidth) {
            this.velocity.y = -this.velocity.y
        }

        this.visibility.center = this.coords;

        this.draw();
    }

    draw() {
        stroke(0)
        fill(0)
        strokeWeight(2)
        ellipse(this.coords.x, this.coords.y, 1, 1)
    }
}
