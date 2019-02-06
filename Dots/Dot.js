class Dot {
    constructor(p, x, y) {
        this.p = p;

	    this.coords = new Point(x, y, null)
        
        this.acceleration = this.p.createVector(0, 0)
        this.velocity = this.p.createVector(
            this.p.random(-1, 1),
            this.p.random(-1, 1)
        )
        this.velocityMag = this.velocity.mag()
        this.velocity.limit(this.velocityMag);
        
        this.RANGE = 70

        this.visibility = new Square(this.coords, this.RANGE)
    }

    connect(quadTree) {
        var points = quadTree.querryRange(this.visibility)
        for (var i in points) {
            if (this.p.dist(this.coords.x, this.coords.y, points[i].x, points[i].y) < this.RANGE) {
                this.p.stroke(200,100,100,50)
                this.p.strokeWeight(1)
                this.p.line(this.coords.x, this.coords.y, points[i].x, points[i].y);
            }
        }
    }
	
	update() {
        this.velocity.add(this.acceleration)
        this.velocity.limit(this.velocityMag)

        this.coords.x += this.velocity.x
        this.coords.y += this.velocity.y

        if (this.coords.x < 0) {
            this.coords.x = canvasWidth;
        } else if (this.coords.x > canvasWidth) {
            this.coords.x = 0;
        }
        if (this.coords.y < 0) {
            this.coords.y = canvasHeight
        } else if (this.coords.y > canvasWidth) {
            this.coords.y = 0
        }

        this.visibility.center = this.coords;

        this.draw();
    }

    draw() {
        this.p.stroke(0)
        this.p.fill(0)
        this.p.strokeWeight(2)
        this.p.ellipse(this.coords.x, this.coords.y, 1, 1)
    }
}
