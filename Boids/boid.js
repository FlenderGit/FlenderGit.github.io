const canvas = document.querySelector('canvas')
const cvx = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const nbBoid = document.getElementById("nbBoid");
const dFlock = document.getElementById("dFlock");
const dAlign = document.getElementById("dAlign");
const dAvoid = document.getElementById("dAvoid");
const dPredate = document.getElementById("dPredate");


let pad = 30
let turn = 0.5

let minSpeed = 1
let maxSpeed = 5

let cursorX = -1
let cursorY = -1

let lsBirds = []


class Bird {

    constructor( x , y){
        this.x = x
        this.y = y
        this.xVel = Math.random()*2-1
        this.yVel = Math.random()*2-1
    }

    getX(){
        return this.x
    }

    getY() {
        return this.y
    }

    getXvel(){
        return this.xVel
    }

    getYvel() {
        return this.yVel
    }

    moveForward(){

        let speed = Math.sqrt(Math.pow(this.xVel,2)+Math.pow(this.yVel,2))

        if (speed > maxSpeed){
            this.xVel = ( this.xVel / speed) * maxSpeed
            this.yVel = ( this.yVel / speed) * maxSpeed
        }else if ( speed < minSpeed){
            this.xVel = ( this.xVel / speed) * minSpeed
            this.yVel = ( this.yVel / speed) * minSpeed
        }

        this.x += this.xVel
        this.y += this.yVel

        

    }

    bounceOffWalls(){
        if (this.x < pad){
            this.xVel += turn
        }
        if (this.x > innerWidth - pad){
            this.xVel -= turn;
        }
        if (this.y < pad){
            this.yVel += turn;
        }
        if (this.y > innerHeight - pad){
            this.yVel -= turn;
        }
    }

    render(){
        cvx.fillStyle = 'red'
        cvx.beginPath();
        cvx.arc(this.x, this.y, 5, 0, 2 * Math.PI);
        cvx.stroke();
        //drawLine(cvx,[this.x,this.y],[this.x-this.xVel,this.y+this.yVel],'green',50)
        

    }

}

function tellPos(p){
    cursorX = p.pageX
    cursorY = p.pageY
}



class Field{
    constructor(width,height,boidCount){
        this.width = width
        this.height = height
        this.boidCount = boidCount

        for ( let i = 0 ; i < boidCount ; i++){
            lsBirds[i] = new Bird(getRandomInt(innerWidth),getRandomInt(innerHeight))
        }
    }
}

function advance(){
    lsBirds.forEach(bird => {
        

        let flock = Flock(bird,dFlock.value,0.0003)
        let align = Align(bird,dAlign.value,0.01)
        let avoid = Avoid(bird,dAvoid.value,0.001)
        let predate = predator(bird,dPredate.value,.00005)

        bird.xVel += flock[0] + align[0] + avoid[0] + predate[0]
        bird.yVel += flock[1] + align[1] + avoid[1] + predate[1]

        bird.bounceOffWalls()
        bird.moveForward()
        bird.render()

    });
}

function Flock(bird,distance,power){
    
    let lsNeighbors = getNeighbors(bird,distance)
    let length = lsNeighbors.length

    let meanX = getSumX(lsNeighbors) / length
    let meanY = getSumY(lsNeighbors) / length

    let deltaX = meanX - bird.getX()
    let deltaY = meanY - bird.getY()

    return [deltaX * power , deltaY * power]

}

function Align(bird,distance,power){
    
    let lsNeighbors = getNeighbors(bird,distance)
    let length = lsNeighbors.length

    let meanXvel = getSumXvel(lsNeighbors) / length
    let meanYvel = getSumYvel(lsNeighbors) / length

    let dXvel = meanXvel - bird.getXvel()
    let dYvel = meanYvel - bird.getYvel()

    return [dXvel * power , dYvel * power]

}

function Avoid(bird,distance,power){
    
    let lsNeighbors = getNeighbors(bird,distance)

    let lsCloseNess = [0,0]

    lsNeighbors.forEach(other => {
        let closeNess = distance - getDistance(bird,other)
        lsCloseNess[0] += (bird.getX() - other.getX()) * closeNess
        lsCloseNess[1] += (bird.getY() - other.getY()) * closeNess
    });

    return [lsCloseNess[0] * power , lsCloseNess[1] * power]

}

addEventListener('mousemove', tellPos, true);

function getNeighbors(bird,distance){
    let lsNeighbors = []
    lsBirds.forEach(other => {
        if (getDistance(bird,other) < distance){
            lsNeighbors.push(other)
        }
    });
    return lsNeighbors
}

function getSumX(ls){
    let sum = 0
    ls.forEach(el => {
        sum+=el.getX()
    });
    return sum
}

function getSumY(ls){
    let sum = 0
    ls.forEach(el => {
        sum+=el.getY()
    });
    return sum
}

function getSumXvel(ls){
    let sum = 0
    ls.forEach(el => {
        sum+=el.getXvel()
    });
    return sum
}

function getSumYvel(ls){
    let sum = 0
    ls.forEach(el => {
        sum+=el.getYvel()
    });
    return sum
}

function getDistance(bird , other){
    return Math.sqrt( Math.pow(bird.getX() - other.getX(),2) + Math.pow(bird.getY() - other.getY(),2)  )
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

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function changeNbBoid(nb){
    console.log(nb)
    if ( nb < lsBirds.length){
        lsBirds = lsBirds.slice(0,nb)
    } else if ( nb > lsBirds.length){
        for ( let i = 0 ; i < nb - lsBirds.length ; i++){
            lsBirds.push(new Bird(getRandomInt(innerWidth),getRandomInt(innerHeight)))
        }
    }
}

function predator(bird,distance,power){
    console.log(distance)
    let lsCloseNess = [0,0]
    let distanceTo = Math.sqrt( Math.pow(bird.getX() - cursorX,2) + Math.pow(bird.getY() - cursorY,2)  )
    if ( distanceTo < distance ){
        let closeNess = distance - distanceTo
        lsCloseNess[0] = (bird.getX() - cursorX) * closeNess * power
        lsCloseNess[1] = (bird.getY() - cursorY) * closeNess * power
    }
    return lsCloseNess
}


function animate(){
    requestAnimationFrame(animate)
    cvx.clearRect(0,0,canvas.width,canvas.height)
    advance()
}

let field = new Field(canvas.width,canvas.height,nbBoid.value)

animate()