//  -------------------- Constants --------------------  // 

const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

canvas.width = innerWidth;
canvas.height = innerHeight;

//  -------------------- Variables --------------------  // 

let scal = 0
let turn = .5
let middleCube;
let margeSide = .25;

// Test to adapt the cube to the screen
if ( canvas.width > canvas.height ) {
    middleCube = canvas.height * margeSide
}else{
    middleCube = canvas.width * margeSide
}

let pad = middleCube * .02

const MAX_SPEED_BIRD = middleCube / 100
const MIN_SPEED_BIRD = MAX_SPEED_BIRD / 4


//  -------------------- Classs --------------------  // 


// Class vector use to store point and vector 3d //
class Vector3 {

    constructor ( x , y , z ) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    add ( vector ) {
        this.x += vector.x;
        this.y += vector.y;
        this.z += vector.z;
    }

    substract ( vector ) {
        this.x -= vector.x;
        this.y -= vector.y;
        this.z -= vector.z;
    }

    multiply ( multiplier ) {
        this.x *= multiplier;
        this.y *= multiplier;
        this.z *= multiplier;
    }

    invert(){
        this.multiply(-1);
    }

    getDistance() {
        return Math.sqrt( Math.pow(this.x,2) + Math.pow(this.y,2) + Math.pow(this.z,2))
    }

    getDistanceTo ( vector ) {
        return Math.sqrt( Math.pow(this.x - vector.x,2) + Math.pow(this.y-vector.y,2)+ Math.pow(this.z-vector.z,2))
    }

    setMagnitude ( magnitude ) {
        this.normalize();
        this.multiply(magnitude);
    }

    dotProduct ( vector ) {
        return this.x * vector.x + this.y * vector.y + this.z * vector.z
    }

    normalize() {
        this.multiply(1/this.getDistance())
    }

    equal( vector ){
        return (this.x == vector.x ) && (this.y == vector.y) && (this.z == vector.z)
    }

    copy() {
        return new Vector3( this.x , this.y , this.z);
    }

}

// Class use to display a 3d point in 2d
class Point2d {
    constructor( x , y) {
        this.x = x
        this.y = y
    }

    copy(){
        return new Point2d(this.x,this.y)
    }

    render(){
        ctx.fillRect(this.x,this.y,10,10)
    }
}

// Class mouse to store data about the mouse and the distance traveling
class Mouse {
    constructor(x,y){
        this.oldPosition = new Point2d(x,y)
        this.newPosition = new Point2d(x,y)
        this.mousePress = false
    }

    update(x,y){
        this.oldPosition.x = this.newPosition.x;
        this.oldPosition.y = this.newPosition.y;
        this.newPosition.x = x
        this.newPosition.y = y
    }

    getDX(){
        return this.newPosition.x - this.oldPosition.x
    }

    getDY(){
        return this.newPosition.y - this.oldPosition.y
    }

    getState(){
        return this.mousePress
    }
}

// Class use to store and render a list of vertice in 3d
class Polygon {
    constructor(vertices,normal){
        this.vertices = vertices
        this.normal = normal
    }

    render(){
        let firstPoint2d = convertPoint(this.vertices[0])
        let oldPoint2d = firstPoint2d.copy()
        let point2d;
        for ( let i = 1 ; i < this.vertices.length ; i++){
            point2d = convertPoint(this.vertices[i])
            ctx.beginPath();
            ctx.moveTo(oldPoint2d.x,oldPoint2d.y)
            ctx.lineTo(point2d.x,point2d.y)
            ctx.stroke();
            oldPoint2d = point2d
        }
        ctx.beginPath();
        ctx.moveTo(point2d.x,point2d.y)
        ctx.lineTo(firstPoint2d.x,firstPoint2d.y)
        ctx.stroke();
    }

    renderNormal(){
        let mean = new Vector3(0,0,0)
        this.vertices.forEach(point => {
            mean.add(point)
        });
        mean.multiply(1/this.vertices.length)
        let point2d = convertPoint(mean)
        let endPoint = this.normal.copy()
        endPoint.multiply(10)
        endPoint.add(mean)
        let point2dEnd = convertPoint(endPoint)
        ctx.beginPath();
        ctx.moveTo(point2d.x,point2d.y)
        ctx.lineTo(point2dEnd.x,point2dEnd.y)
        ctx.stroke();
    }
}

// Class use to extend Boids and Predator
class Entity{

    constructor( x,y,z){
        this.coordinate = new Vector3(x,y,z)
        this.velocity = new Vector3(Math.random()*2-1,Math.random()*2-1,Math.random()*2-1)
    }

    moveForward(minSpeed,maxSpeed,boids){
        let flock = this.Flock(boids,400,0.0003)
        let align = this.Align(boids,150,0.01)
        let avoid = this.Avoid(boids,15,0.001)
        this.velocity.add(flock)
        this.velocity.add(align)
        this.velocity.add(avoid)
        let speed = this.velocity.getDistance()
        if (speed > maxSpeed){
            this.velocity.setMagnitude(maxSpeed)
        }else if ( speed < minSpeed){
            this.velocity.setMagnitude(minSpeed)
        }
        this.coordinate.x += this.velocity.x
        this.coordinate.y += this.velocity.y
        this.coordinate.z += this.velocity.z
    }

    bounceOffWalls(){
       handler.lsPolygon.forEach(polygon => {
           let p = interectLineToPlane(this.velocity,this.coordinate,polygon.normal,polygon.vertices[0])
           if (this.coordinate.getDistanceTo(p) < pad){
                let n = polygon.normal.copy()
                n.multiply(1.1)
                this.velocity.add(n)
           }
       })
    }
}

// Class use to create , calcul vectors , and render Boids
class Boid extends Entity {

    constructor( x , y , z){
        super(x,y,z)
    }

    render(){
        ctx.beginPath();
        let point2d = convertPoint(this.coordinate)
        ctx.arc(point2d.x, point2d.y, (this.coordinate.x + middleCube) / middleCube + 3 , 0, 2 * Math.PI);
        ctx.fillStyle = '#983BBF'
        ctx.fill();
        ctx.stroke();
    }

    renderVector(){
        let point2d = convertPoint(this.coordinate)
        let endPoint = this.velocity.copy()
        endPoint.multiply(10)
        endPoint.add(this.coordinate)
        let point2dEnd = convertPoint(endPoint)
        ctx.beginPath();
        ctx.moveTo(point2d.x,point2d.y)
        ctx.lineTo(point2dEnd.x,point2dEnd.y)
        ctx.stroke();
    }

    Flock(boids,distance,power){
        let vector = new Vector3(0,0,0)
        let length = 0
        boids.forEach(boid => {
            if ( this.coordinate.getDistanceTo(boid.coordinate) <= distance) {
                vector.add(boid.coordinate)
                length++
            } 
        });
        vector.multiply(1/length)
        vector.substract(this.coordinate)
        vector.multiply(power)
        return vector
    }
    
    Align(boids,distance,power){
        let vector = new Vector3(0,0,0)
        let length = 0
        boids.forEach(boid => {
            if ( this.coordinate.getDistanceTo(boid.coordinate) <= distance) {
                vector.add(boid.velocity)
                length++
            } 
        });
        vector.multiply(1/length)
        vector.multiply(power)  
        return vector
    }
    
    Avoid(boids,distance,power){
        let vector = new Vector3(0,0,0)
        boids.forEach(boid => {
            if ( this.coordinate.getDistanceTo(boid.coordinate) <= distance) {
                let closeNess = distance - this.coordinate.getDistanceTo(boid.coordinate)
                let v = this.coordinate.copy()
                v.substract(boid.coordinate)
                v.multiply(closeNess)
                vector.add(v)
            } 
        });
        vector.multiply(power)  
        return vector
    }
    
    Predate(bird,distance,power){
        let lsCloseNess = [0,0]
        lsPredate.forEach(predate => {
            let distanceTo = Math.sqrt( Math.pow(bird.getX() - predate.getX(),2) + Math.pow(bird.getY() - predate.getY(),2));
            if ( distanceTo < distance ){
                let closeNess = distance - distanceTo
                lsCloseNess[0] = (bird.getX() - predate.getX()) * closeNess * power
                lsCloseNess[1] = (bird.getY() - predate.getY()) * closeNess * power
            }
        });
        if (mPredate.checked){
            let distanceTo = Math.sqrt( Math.pow(bird.getX() - cursorX,2) + Math.pow(bird.getY() - cursorY,2));
            if ( distanceTo < distance ){
                let closeNess = distance - distanceTo
                lsCloseNess[0] = (bird.getX() - cursorX) * closeNess * power
                lsCloseNess[1] = (bird.getY() - cursorY) * closeNess * power
            }
        }
        return lsCloseNess
    }
}

// Class use to create, rotate and render, the cube and Boids
class Handler{
    constructor(){
        let p1 = new Vector3(middleCube,-middleCube,-middleCube) 
        let p2 = new Vector3(middleCube,middleCube,-middleCube)
        let p3 = new Vector3( middleCube,middleCube,middleCube)
        let p4 = new Vector3(middleCube,-middleCube,middleCube)
        let p5 = new Vector3(-middleCube,-middleCube,-middleCube)
        let p6 = new Vector3(-middleCube,middleCube,-middleCube) 
        let p7 = new Vector3(-middleCube,middleCube,middleCube)
        let p8 = new Vector3(-middleCube,-middleCube,middleCube)
        this.lsPoint = [p1,p2,p3,p4,p5,p6,p7,p8]
        this.lsPolygon = [
            new Polygon([p5,p6,p7,p8],new Vector3(1,0,0)),
            new Polygon([p1,p2,p6,p5],new Vector3(0,0,1)),
            new Polygon([p1,p5,p8,p4],new Vector3(0,1,0)),
            new Polygon([p2,p6,p7,p3],new Vector3(0,-1,0)),
            new Polygon([p4,p3,p7,p8],new Vector3(0,0,-1)),
            new Polygon([p1,p2,p3,p4],new Vector3(-1,0,0))
        ]
        this.lsBoid = []
        for ( let i = 0 ; i < 100 ; i++ ){
            this.lsBoid.push(new Boid(getRandomInt(middleCube/2)-middleCube/2,getRandomInt(middleCube/2)-middleCube/2,getRandomInt(middleCube/2)-middleCube/2))
        }
    }

    rotate(CW,xDegrees,yDegrees,zDegrees){
        // Rotate boid and vector
        this.lsBoid.forEach(point => {
            this.rotateAxisX(point.coordinate,CW,xDegrees)
            this.rotateAxisY(point.coordinate,CW,yDegrees)
            this.rotateAxisZ(point.coordinate,CW,zDegrees)
            this.rotateAxisX(point.velocity,CW,xDegrees)
            this.rotateAxisY(point.velocity,CW,yDegrees)
            this.rotateAxisZ(point.velocity,CW,zDegrees)
        });
        // Rotate points of the cube
        this.lsPoint.forEach(point => {
            this.rotateAxisX(point,CW,xDegrees)
            this.rotateAxisY(point,CW,yDegrees)
            this.rotateAxisZ(point,CW,zDegrees)
        });
        // Rotate normals of the cube
        this.lsPolygon.forEach(polygon=>{
            this.rotateAxisX(polygon.normal,CW,xDegrees)
            this.rotateAxisY(polygon.normal,CW,yDegrees)
            this.rotateAxisZ(polygon.normal,CW,zDegrees)
        })
        
    }

    rotateAxisX( point , CW , degrees){
        let radius = Math.sqrt(Math.pow(point.y,2) + Math.pow(point.z,2))
        let theta = Math.atan2(point.z,point.y);
        theta += 2 * Math.PI / 360 * degrees * (CW?-1:1)
        point.y = radius * Math.cos(theta)
        point.z = radius * Math.sin(theta)
    }

    rotateAxisY( point , CW , degrees){
        let radius = Math.sqrt(Math.pow(point.x,2) + Math.pow(point.z,2))
        let theta = Math.atan2(point.z,point.x);
        theta += 2 * Math.PI / 360 * degrees * (CW?1:-1)
        point.x = radius * Math.cos(theta)
        point.z = radius * Math.sin(theta)
    }

    rotateAxisZ( point , CW , degrees){
        let radius = Math.sqrt(Math.pow(point.x,2) + Math.pow(point.y,2))
        let theta = Math.atan2(point.y,point.x);
        theta += 2 * Math.PI / 360 * degrees * (CW?1:-1)
        point.y = radius * Math.sin(theta)
        point.x = radius * Math.cos(theta)
    }
}


//  -------------------- Functions Canvas --------------------  // 

function animate(){
    requestAnimationFrame(animate)
    ctx.clearRect(0,0,canvas.width,canvas.height)
    ctx.fillStyle = '#262240';
    ctx.fillRect(0,0,canvas.width,canvas.height)
    advance()
}


//  -------------------- Functions Animation --------------------  // 

function advance(){
    ctx.fillStyle = 'white'
    handler.lsPolygon.forEach(polygon=>{
        polygon.renderNormal()
        polygon.render()
    })
    handler.lsBoid.forEach(boid => {
        boid.moveForward(MIN_SPEED_BIRD,MAX_SPEED_BIRD,handler.lsBoid)
        boid.bounceOffWalls()
        boid.render()
        boid.renderVector()
    });
}


///  -------------------- Functions Utils --------------------  // 

function convertPoint(point){
    let newVal = scale(point.y , point.z , point.x)
    let x2d = innerWidth / 2 + newVal[0]
    let y2d = innerHeight / 2 + newVal[1]
    return new Point2d(x2d,y2d)
}

function scale( x3d , y3d , depth){
    let distance = Math.sqrt(Math.pow(x3d,2)+Math.pow(y3d,2))
    let theta = Math.atan2(y3d,x3d)
    let depth2 = 15 - depth
    let localScale = Math.abs(1400/(depth2+1400))
    distance *= localScale
    return [ distance * Math.cos(theta) , distance * Math.sin(theta) ]
}

function DegreesToRadians(degrees){
  return degrees * (Math.PI/180);
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function interectLineToPlane(rayDirection,rayPoint,planeNormal,planePoint){
    let r = rayPoint.copy()
    let l = rayDirection.copy()
    let j = rayPoint.copy()
    j.substract(planePoint)
    l.multiply(j.dotProduct(planeNormal))
    l.multiply(rayDirection.dotProduct(planeNormal))
    r.substract(l)
    return r
}


///  -------------------- Listeners --------------------  // 

canvas.addEventListener('mousemove', e => {
    mouse.update(e.offsetX,e.offsetY);
    if(mouse.mousePress){
        handler.rotate(true,0,mouse.getDY(),mouse.getDX())
    }
});

canvas.addEventListener('mousedown', e => {
    mouse.mousePress = true;
});

canvas.addEventListener('mouseup',e=>{
    mouse.mousePress = false
    mouse.oldPosition = mouse.newPosition.copy()
});

canvas.addEventListener("touchstart", e => {
    mouse.mousePress = true;
    mouse.oldPosition.x = e.touches[0].pageX - e.touches[0].target.offsetLeft
    mouse.oldPosition.y = e.touches[0].pageY - e.touches[0].target.offsetTop
    mouse.newPosition = mouse.oldPosition.copy()
    console.log(mouse.oldPosition)
});

canvas.addEventListener("touchend", e => {
    mouse.mousePress = false;
});
canvas.addEventListener("touchmove", e =>{
    mouse.update(e.touches[0].pageX - e.touches[0].target.offsetLeft, e.touches[0].pageY - e.touches[0].target.offsetTop);
    if(mouse.mousePress){
        handler.rotate(true,0,mouse.getDY(),mouse.getDX())
    }
});


///  -------------------- Program --------------------  // 

let mouse = new Mouse(0,0)
let handler = new Handler()

animate()