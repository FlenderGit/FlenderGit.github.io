//  -------------------- Constants --------------------  // 

const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

const RESTITUTION = .9
const GRAVITY = 9.8

canvas.height = innerHeight
canvas.width = innerWidth


//  -------------------- Variables --------------------  // 

let gravity = true

let pad = 30
let turn = 0.5
let lsEntity = []

let lsColor = ['black','red','blue','green','purple','yellow']

class Entity {
    constructor(x,y,velX,velY,mass){
        this.x = x
        this.y = y
        this.velX = velX
        this.velY = velY
        this.collision = false
        this.mass = mass
    }   
}


//  -------------------- Classs --------------------  // 

class Circle extends Entity{
    constructor(x,y,velX,velY,radius){
        super(x,y,velX,velY,8*radius)
        this.degrees =null
        this.radius = radius
        this.color = getRandomFromArray()
    }

    bounceOffWalls(){
        if (this.x <  this.radius){
            this.velX *=-1
            this.x = this.radius
        }
        if (this.x > innerWidth  - this.radius){
            this.velX *=-1;
            this.x = innerWidth - this.radius
        }
        if (this.y <  this.radius){
            this.velY *=-1;
        }
        if (this.y > innerHeight - this.radius){
            this.velY *=-RESTITUTION;
            this.y = innerHeight - this.radius;
        }
    }

    tick(){
        this.bounceOffWalls()
        
        if(!(this.collision)){
            this.velY += GRAVITY * .001
        }
        //this.velY += GRAVITY * .003


        this.x += this.velX
        this.y += this.velY

        let radians = Math.atan2(this.vy, this.vx);
        this.degrees = 180 * radians / Math.PI;
    }

    render(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.stroke();
        //drawLine(ctx,[this.x,this.y],[this.x+this.velX*30,this.y+this.velY*30],2,0)
    }
}


//  -------------------- Functions Gravity --------------------  // 

function detectCollision(){
    lsEntity.forEach(entity => {
        entity.collision = false;
    });

    for ( let i = 0 ; i < lsEntity.length ; i++){
        entity = lsEntity[i]
        for ( let j = i+1 ; j < lsEntity.length ; j++){
            other = lsEntity[j]
            if(circleIntersect(entity.x,entity.y,entity.radius,other.x,other.y,other.radius)){
                entity.collision = true;
                other.collision = true;

                let velX = other.x - entity.x
                let velY = other.y - entity.y
                let distance = getDistance(entity.x,entity.y,other.x,other.y)
                let colXnorm = velX / distance
                let colYnorm = velY / distance
                let velXrel = entity.velX - other.velX
                let velYrel = entity.velY - other.velY
                let speed = colXnorm * velXrel + colYnorm * velYrel

                if (speed < 0){
                    break;
                }
                speed *= RESTITUTION
                let impulse = 2 * speed / (entity.mass + other.mass);

                entity.velX -= (impulse * colXnorm * other.mass) * RESTITUTION;
                entity.velY -= (impulse * colYnorm * other.mass) * RESTITUTION;
                other.velX += (impulse * colXnorm * entity.mass) * RESTITUTION;
                other.velY += (impulse * colYnorm * entity.mass) * RESTITUTION;
            }
            
        }
    }

    
}

function rectangleIntersect(x1, y1, w1, h1, x2, y2, w2, h2) {
    if (x2 > w1 + x1 || x1 > w2 + x2 || y2 > h1 + y1 || y1 > h2 + y2){
        return false;
    }
    return true;
}

 function circleIntersect(x1, y1, r1, x2, y2, r2) {
    return getDistance(x1,y1,x2,y2) <= r1 + r2
}


//  -------------------- Functions Canvas --------------------  // 

function animate(){
    requestAnimationFrame(animate)
    ctx.clearRect(0,0,canvas.width,canvas.height)
    advance()
}


//  -------------------- Functions Advance --------------------  // 

function advance(){
    detectCollision()
    lsEntity.forEach(entity => {
        entity.tick()
        entity.render()
    });
}


//  -------------------- Functions Utils --------------------  // 

function drawLine(ctx, begin, end, stroke = 'black', width = 1) {
    if (stroke) {
        ctx.strokeStyle = stroke;
    }
    if (width) {
        ctx.lineWidth = width;
    }
    ctx.beginPath();
    ctx.moveTo(...begin);
    ctx.lineTo(...end);
    ctx.stroke();
}

function getRandomFromArray(){
    return lsColor[getRandomInt(lsColor.length-1)]
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function getDistance(x1,y1,x2,y2){
    return Math.sqrt( Math.pow(x1 - x2,2) + Math.pow(y1 - y2,2)  )
}


///  -------------------- Listeners --------------------  // 

canvas.addEventListener('click',(e)=>{
    e.preventDefault();
    lsEntity.push(new Circle(e.offsetX,e.offsetY,0,0,getRandomInt(30)+10))   
});


///  -------------------- Program --------------------  // 

animate()