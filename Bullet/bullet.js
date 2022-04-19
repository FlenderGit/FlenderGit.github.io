const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

const ratio = innerWidth / innerHeight

let cursorX = innerWidth
let cursorY = innerHeight


class Propertie{

    constructor(){
        this.vitesseBullet = 3
    }

}

class Bullet {
    constructor(x,y,velX,velY,radius){
        this.x = x
        this.y = y
        this.velX = velX
        this.velY = velY
        this.radius = radius
        this.lifetime = 100
    }

    render(ctx) {
        ctx.beginPath();
        ctx.arc( this.x , this.y , this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = 'black'
        ctx.fill();
        ctx.stroke();
    }

    tick(){
        this.x += this.velX
        this.y += this.velY
        this.lifetime--;
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
        if ( distance > 0){
            vec.x /= distance
            vec.y /= distance
        }
        //vec.x *= speed
        //vec.y *= speed
        this.x += vec.x
        this.y += vec.y
        camera.x = this.x - innerWidth/2
        camera.y = this.y - innerHeight/2
    }

    render(ctx) {
        ctx.beginPath();
        ctx.arc(this.x , this.y  , this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = this.color
        ctx.fill();
        ctx.stroke();
    }
}


let lsBullet = []
let blob = new Blob(innerWidth/2, innerHeight/2, 64, 'blue');

function animate(){
    requestAnimationFrame(animate)
    ctx.clearRect(0,0,canvas.width,canvas.height)
    blob.render(ctx);

    let newLsBullet = []

    lsBullet.forEach(bullet => {
        bullet.tick()
        bullet.render(ctx);
        if (bullet.lifetime > 0) {
            newLsBullet.push(bullet)
        }
    });

    lsBullet = newLsBullet


}

canvas.addEventListener('click',(e)=>{
    e.preventDefault();

    let distance = getDistanceTo0(cursorX , cursorY)

    let velX = ( e.offsetX - innerWidth/2 ) / distance * propertie.vitesseBullet
    let velY = ( e.offsetY - innerHeight/2 ) / distance * propertie.vitesseBullet

    lsBullet.push(new Bullet(innerWidth/2,innerHeight/2,velX,velY,10))

});




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


function init(){
    //gun = new Blob(innerWidth/2 , innerHeight/2)
    propertie = new Propertie()
}

init()
animate();