const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

const ratio = innerWidth / innerHeight

let cursorX = innerWidth
let cursorY = innerHeight

class Camera{
    constructor(x,y,width){
        this.x = x
        this.y = y
        this.width = width
        this.height = width / ratio
    }
}

class Particle {
    constructor(x,y,radius){
        this.x = x
        this.y = y
        this.radius = radius
    }

    render(ctx) {
        ctx.beginPath();
        //ctx.arc((this.x-camera.x) , (this.y-camera.y) , this.radius, 0, 2 * Math.PI);
        ctx.arc((this.x-camera.x)  * (innerWidth/camera.width) , (this.y-camera.y)  * (innerHeight/camera.height) , this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = 'black'
        ctx.fill();
        ctx.stroke();
    }
}

class Blob {
    constructor(x, y, radius, color) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
    }

    tick(){
        let vec = { x : cursorX , y : cursorY }
        let distance = getDistanceTo0(vec.x,vec.y)
        vec.x /= distance
        vec.y /= distance
        //vec.x *= (64/this.radius*3)
        //vec.y *= (64/this.radius*3)
        this.x += vec.x
        this.y += vec.y
        camera.x = this.x - innerWidth/2
        camera.y = this.y - innerHeight/2
        console.log(this.x , this.y)
    }

    render(ctx) {
        ctx.beginPath();
        ctx.arc(this.x - camera.x , this.y - camera.y , this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = this.color
        ctx.fill();
        ctx.stroke();
    }
}
let lsParticle = [new Particle(10 , 10,10) , new Particle(80 , 10,10)]
let camera = new Camera(0,0,innerWidth) 
let blob = new Blob(innerWidth/2, innerHeight/2, 64, 'blue',camera);

function animate(){
    requestAnimationFrame(animate)
    ctx.clearRect(0,0,canvas.width,canvas.height)
    blob.render(ctx);
    blob.tick()

    for ( let i = 0 ; i < lsParticle.length ; i++){
        let particle = lsParticle[i]
        
        if (particle.x >= camera.x && particle.x <= camera.x + camera.width && particle.y >= camera.y && particle.y <= camera.y + camera.height){
            if ( circleIntersect(particle.x,particle.y,particle.radius,blob.x,blob.y,blob.radius)){
                blob.radius+= 1
                lsParticle.splice(i, 1); 
                
            }
            particle.render(ctx,blob.radius)

        }
        

    
    }


}


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

addEventListener('mousemove', tellPos, true);

function tellPos(p){
        cursorX = p.pageX - innerWidth/2
        cursorY = p.pageY - innerHeight/2
}

function getDistance(x1,y1,x2,y2){
    return Math.sqrt( Math.pow(x1 - x2,2) + Math.pow(y1 - y2,2)  )
}

function getDistanceTo0(x1,y1){
    return Math.sqrt( Math.pow(x1 ,2) + Math.pow(y1 ,2)  )
}

function circleIntersect(x1, y1, r1, x2, y2, r2) {
    return getDistance(x1,y1,x2,y2) <= r1 + r2
}

function init(){
    for ( let i = 0 ; i < 100 ; i++){
        lsParticle.push(new Particle(getRandomInt(2000),getRandomInt(2000),10))
    }
}

init()
animate();