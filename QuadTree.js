class QuadTree {
    constructor(capacity, boundary) {
        this.capacity = capacity
        this.boundary = boundary

        // Points in the quad tree
        this.points = []

        // Children
        this.northWest = undefined
        this.northEast = undefined
        this.southWest = undefined
        this.southEast = undefined
    }

    insert(point) {
        // Point is outside boundary
        if (!this.boundary.containsPoint(point)) {
            return false;
        }

        // Is not subdivided and has capacity
        if (this.points.length < this.capacity) {
            this.points.push(point)
            return true;
        } else {
            // Is not subdivided, does not have capacity
            if (this.northWest === undefined) {
                this.subdivide()
            }

            // Insert into children
            if (this.northWest.insert(point)) return true;
            if (this.northEast.insert(point)) return true;
            if (this.southWest.insert(point)) return true;
            if (this.southEast.insert(point)) return true;
        }

        return false;
    }

    subdivide() {
        // North West
        var boundary = new Square(
            new Point(
                this.boundary.center.x - (this.boundary.halfDimention / 2),
                this.boundary.center.y - (this.boundary.halfDimention / 2)
            ),
            this.boundary.halfDimention / 2
        )
        this.northWest = new QuadTree(this.capacity, boundary)

        // North East
        boundary = new Square(
            new Point(
                this.boundary.center.x + (this.boundary.halfDimention / 2),
                this.boundary.center.y - (this.boundary.halfDimention / 2)
            ),
            this.boundary.halfDimention / 2
        )
        this.northEast = new QuadTree(this.capacity, boundary)

        // South West
        boundary = new Square(
            new Point(
                this.boundary.center.x - (this.boundary.halfDimention / 2),
                this.boundary.center.y + (this.boundary.halfDimention / 2)
            ),
            this.boundary.halfDimention / 2
        )
        this.southWest = new QuadTree(this.capacity, boundary)

        // South East
        boundary = new Square(
            new Point(
                this.boundary.center.x + (this.boundary.halfDimention / 2),
                this.boundary.center.y + (this.boundary.halfDimention / 2)
            ),
            this.boundary.halfDimention / 2
        )
        this.southEast = new QuadTree(this.capacity, boundary)
    }

    querryRange(range, pointsArray) {
        if (!pointsArray) {
            pointsArray = []
        }

        // Return empty array if range does not intersect the boundary
        if(!this.boundary.intersectsSquare(range)) {
            return pointsArray;
        }

        // Check if points in this node are in range
        for (var i = 0; i < this.points.length; i++) {
            if (range.containsPoint(this.points[i])) {
                pointsArray.push(this.points[i]);
            }
        }

        // Check if is subdivided
        if (this.northEast === undefined) {
            return pointsArray
        }

        // Check child nodes
        this.northWest.querryRange(range, pointsArray);
        this.northEast.querryRange(range, pointsArray);
        this.southWest.querryRange(range, pointsArray);
        this.southEast.querryRange(range, pointsArray);

        return pointsArray
    }

    // Debug
    draw() {
        this.boundary.draw()
        if (this.northWest !== undefined) {
            this.northWest.draw()
            this.northEast.draw()
            this.southWest.draw()
            this.southEast.draw()
        }
    }
}

class Point {
    constructor(x, y, data) {
        this.x = x
        this.y = y
        this.data = data
    }
}

class Square {
    constructor(center, halfDimention) {
        this.center = center
        this.halfDimention = halfDimention
    }

    containsPoint(point) {
        return (
            point.x >= this.center.x - this.halfDimention &&
            point.x < this.center.x + this.halfDimention &&
            point.y >= this.center.y - this.halfDimention &&
            point.y < this.center.y + this.halfDimention
        )
    }

    intersectsSquare(square) {
        var A = new Point(
            this.center.x - this.halfDimention,
            this.center.y - this.halfDimention
        )
        var ALen = this.halfDimention * 2
        var B = new Point(
            square.center.x - square.halfDimention,
            square.center.y - square.halfDimention
        )
        var BLen = square.halfDimention * 2
        
        return (
            A.x < (B.x + BLen) && (A.x + ALen) > B.x &&
            A.y < (B.y + BLen) && (A.y + ALen) > B.y
        )
    }

    draw() {
        push()
        stroke(100, 100, 100, 100)
        strokeWeight(1)
        noFill()
        rectMode(CENTER)
        rect(
            this.center.x,
            this.center.y,
            this.halfDimention * 2,
            this.halfDimention * 2
        )
        pop()
    }
}