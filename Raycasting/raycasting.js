const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

class Personnage{
    constructor(x,y){
        this.x = x
        this.y = y
        this.rotation = 0
        this.walking = false
        this.walkingLeft = false
        this.walkingRight = false
        this.turnLeft = false
        this.turnRight = false
    }

    tick(){

        if ( this.turnLeft){
            this.rotation -= toRadians(1) 
        }else if ( this.turnRight){
            this.rotation += toRadians(1)
        }

        if ( this.walking){
            this.x += Math.cos(this.rotation);
            this.y += Math.sin(this.rotation);
        }
        
        if ( this.walkingLeft){
            this.x += Math.cos(this.rotation+toRadians(90));
            this.y += Math.sin(this.rotation+toRadians(180));
        }
        
        if ( this.walkingRight){
            this.x += Math.cos(this.rotation+toRadians(90));
            this.y += Math.sin(this.rotation);
        }
        
        
    }

    render(){
        ctx.beginPath();
        ctx.arc(this.x,this.y,15,0,2*Math.PI);
        ctx.fillStyle = 'black'
        ctx.fill();
        ctx.stroke();
    }
}

function animate(){
    requestAnimationFrame(animate)
    ctx.clearRect(0,0,canvas.width,canvas.height)
    p.tick()
    p.render()

}

window.onkeydown = function(event) {
    let key = event.key.toUpperCase();
    if ( key == 'Z' ) {
        p.walking = true;
    }else if ( key == 'A' ) {
        p.turnLeft = true;
    }else if ( key == 'E' ) {
        p.turnRight = true;
    }else if ( key == 'Q' ) {
        p.walkingLeft = true;
    }else if ( key == 'D' ) {
        p.walkingRight = true;
    }
}

function toRadians(degrees){
    return degrees * (Math.PI/180);
  }

window.onkeyup = function(event) {
    let key = event.key.toUpperCase();
    if ( key == 'Z' ) {
        p.walking = false
    }else if ( key == 'A' ) {
        p.turnLeft = false;
    }else if ( key == 'E' ) {
        p.turnRight = false;
    }else if ( key == 'Q' ) {
        p.walkingLeft = false;
    }else if ( key == 'D' ) {
        p.walkingRight = false;
    }
}

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

let p = new Personnage(100,200)

animate()