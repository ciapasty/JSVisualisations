class Dot {
    constructor(x, y) {
	    this.coords = new Point(x, y, null)
        
        this.acceleration = createVector(0, 0)
        this.velocity = createVector(random(-1, 1), random(-1, 1))
        this.velocityMag = this.velocity.mag()
        this.velocity.limit(this.velocityMag);
        
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
        stroke(0)
        fill(0)
        strokeWeight(2)
        ellipse(this.coords.x, this.coords.y, 1, 1)
    }
}
