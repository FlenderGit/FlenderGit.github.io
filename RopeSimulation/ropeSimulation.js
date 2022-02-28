//  -------------------- Constants --------------------  // 

const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

const nbBoid = document.getElementById("lRope");
const dFlock = document.getElementById("lSeg");
const gravity = document.getElementById("gravity");
const physics = document.getElementById("physics");
const pin = document.getElementById("pin");
const powGravity = document.getElementById("powGravity");

canvas.width = innerWidth
canvas.height = innerHeight


//  -------------------- Variables --------------------  // 

let cursorX = -10
let cursorY = -10

class Particle{
    constructor(x,y){
        this.oldX = x
        this.oldY = y
        this.nowX = x
        this.nowY = y
    }
}


//  -------------------- Classs --------------------  // 

class Rope{

    constructor(length,distanceParticle){
        this.lsParticle = []
        this.distanceParticle = distanceParticle
        let startParticle = new Particle(200,30)
        for ( let i = 0 ; i < length ; i++){
            this.lsParticle.push(new Particle(startParticle.nowX,startParticle.nowY))
            startParticle.nowY += distanceParticle;
        }
    }

    simulate(){
        
        if (!(pin.checked)){
            this.lsParticle[0].nowX = cursorX
            this.lsParticle[0].nowY = cursorY
        }

        
        
        for ( let i = 1 ; i < this.lsParticle.length ; i++){

            let current = this.lsParticle[i]

            if ( physics.checked){
            
                let velX = (current.nowX - current.oldX) * 1
                let velY = (current.nowY - current.oldY) * 1

                current.oldX = current.nowX
                current.oldY = current.nowY

                current.nowX += velX
                current.nowY += velY

            }

            if (gravity.checked){
                current.nowY += (0.01 * powGravity.value)
            }
            
            

        }

        

        for ( let i = 0 ; i < 200 ; i++){
            this.constraint()
        }



        
    }

    constraint(){

        for ( let i = 0 ; i < this.lsParticle.length-1 ; i++){
            
            let firstSegment = this.lsParticle[i]
            let secondSegment = this.lsParticle[i+1]
            
            let distance = getDistance(firstSegment.nowX,firstSegment.nowY,secondSegment.nowX,secondSegment.nowY)
            let error = Math.abs(distance-this.distanceParticle) * .3

            let changeDirectionX = 0
            let changeDirectionY = 0

            if(distance > this.distanceParticle){
                changeDirectionX = (firstSegment.nowX - secondSegment.nowX) / distance
                changeDirectionY = (firstSegment.nowY - secondSegment.nowY) / distance
            }else if (distance < this.distanceParticle){
                changeDirectionX = (secondSegment.nowX - firstSegment.nowX) / distance
                changeDirectionY = (secondSegment.nowY - firstSegment.nowY) / distance
            }

            let changeAmountX = changeDirectionX * error;
            let changeAmountY = changeDirectionY * error;

            if ( i != 0){
                firstSegment.nowX -= changeAmountX 
                firstSegment.nowY -= changeAmountY 
                secondSegment.nowX += changeAmountX
                secondSegment.nowY += changeAmountY
                }else{
                secondSegment.nowX += changeAmountX
                secondSegment.nowY += changeAmountY
            }



        }
    }

    render(ctx){
        for ( let i = 0 ; i < this.lsParticle.length-1 ; i++){  
            ctx.beginPath();
            ctx.moveTo(this.lsParticle[i].nowX,this.lsParticle[i].nowY)
            ctx.lineTo(this.lsParticle[i+1].nowX,this.lsParticle[i+1].nowY)
            ctx.stroke();
        }    
    }

}


//  -------------------- Functions Canvas --------------------  // 

function animate(){
    requestAnimationFrame(animate)
    ctx.clearRect(0,0,canvas.width,canvas.height)
    rope.simulate()
    rope.render(ctx)
}


//  -------------------- Functions Canvas --------------------  // 

function changeDistanceParticle(value){
    rope.distanceParticle = value
}

function changeLengthRope(value){
    console.log('start')
    if ( value < rope.lsParticle.length){
        rope.lsParticle = rope.lsParticle.slice(0,value)
    } else if ( value > rope.lsParticle.length){
        console.log(rope.lsParticle.length,value,value - rope.lsParticle.length)
        let add = value - rope.lsParticle.length
        for ( let i = 0 ; i < add ; i++){
            rope.lsParticle.push(new Particle(rope.lsParticle[rope.lsParticle.length-1].nowX,rope.lsParticle[rope.lsParticle.length-1].nowY))
        }
    }

}

function tellPos(p){
    cursorX = p.pageX
    cursorY = p.pageY
}

function getDistance(x1,y1,x2,y2){
    return Math.sqrt( Math.pow(x1 - x2,2) + Math.pow(y1 - y2,2)  )
}


///  -------------------- Listeners --------------------  // 

addEventListener('mousemove', tellPos, true);

window.onkeydown = function(event) {
    let key = event.key.toUpperCase();
    if ( key == 'A' ) {
        if(pin.checked){
            pin.checked = false
        }else{
            pin.checked = true
        }
    }
}


///  -------------------- Program --------------------  // 

let rope = new Rope(30,5)

animate()