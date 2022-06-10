const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

let image = ctx.createImageData(canvas.width,canvas.height)
let data = image.data

let time = 0
let oldTime = 0
const SPPED_ROTATION = .00001 
const WALK_SPEED = .00005

let keyForward = false
let keyBackward = false
let keyLeft = false
let keyRight = false
let keyTurnLeft = false
let keyTurnRight = false

mapShowSide = 10


const map =
[
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,2,2,2,2,2,0,0,0,0,3,0,3,0,3,0,0,0,1],
  [1,0,0,0,0,0,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,2,2,2,2,2,0,0,0,0,3,0,2,0,3,0,0,0,1],
  [1,0,0,0,0,0,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,2,2,2,2,2,0,0,0,0,3,0,3,0,3,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,4,4,4,4,4,4,4,4,0,0,0,0,0,0,1,2,3,4,0,0,0,0,1],
  [1,4,0,4,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,4,0,0,0,0,5,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,4,0,4,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,4,0,4,4,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];

const red = '#FF0000'
const green = '#00FF00'
const blue = '#0000FF'
const black = '#000000'
const purple = '#A70EF0'
const cyan = '#00DFF0'


class Color {

    constructor(r,g,b,a){
        this.r = r
        this.g = g
        this.b = b
        this.a = a
    }

    toString(){
        return "#" + (this.r.toString(16) + this.g.toString(16) + this.b.toString(16) + this.a.toString(16)).toUpperCase(); 
    }

}

class Vector2 {

    constructor ( x , y ) {
        this.x = x;
        this.y = y;
    }

    add ( vector ) {
        this.x += vector.x;
        this.y += vector.y;
    }

    substract ( vector ) {
        this.x -= vector.x;
        this.y -= vector.y;
    }

    multiply ( multiplier ) {
        return new Vector2(this.x * multiplier , this.y * multiplier)
    }

    invert(){
        this.multiply(-1);
    }

    getDistance() {
        return Math.sqrt( Math.pow(this.x,2) + Math.pow(this.y,2))
    }

    getDistanceTo ( vector ) {
        return Math.sqrt( Math.pow(this.x - vector.x,2) + Math.pow(this.y-vector.y,2))
    }

    setMagnitude ( magnitude ) {
        this.normalize();
        this.multiply(magnitude);
    }

    dotProduct ( vector ) {
        return this.x * vector.x + this.y * vector.y
    }

    normalize() {
        let distance = this.getDistance();
        this.x /= distance;
        this.y /= distance;
    }

    equal( vector ){
        return (this.x == vector.x ) && (this.y == vector.y)
    }

    copy() {
        return new Vector2 ( this.x , this.y);
    }

    turn(rot){
        let oldRot = this.copy()
        this.x = oldRot.x * Math.cos(rot) - oldRot.y * Math.sin(rot)
        this.y = oldRot.x * Math.sin(rot) + oldRot.y * Math.cos(rot)
    }

}

let coordinate = new Vector2(8,5)
let direction= new Vector2(1,0)
let plane = new Vector2(0,.66)

let nbRay = canvas.width
//let nbRay = 1


function drawPixel(x, y, color) {
    var index = 4 * (canvas.width * y + x);
    data[index + 0] = color.r;
    data[index + 1] = color.g;
    data[index + 2] = color.b;
    data[index + 3] = color.a;

    //console.log(x,y,index)
}

function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = 'black'
    ctx.fillRect(0,0,canvas.width,canvas.height)

    for ( let i = 0 ; i < nbRay ; i++ ) {
        let cam = ( 2 * i ) / nbRay - 1
        let rayDir = new Vector2( direction.x + plane.x * cam , direction.y + plane.y * cam)

        let mapCoord = new Vector2 ( Math.floor(coordinate.x) , Math.floor(coordinate.y) )


        let deltaDist = new Vector2(0,0)

        if ( rayDir.x == 0 ) {
            deltaDist.x = Infinity
        }else{
            deltaDist.x = Math.abs( 1 / rayDir.x )
        }

        if ( rayDir.y == 0 ) {
            deltaDist.y = Infinity
        }else{
            deltaDist.y = Math.abs( 1 / rayDir.y )
        }

        let sideDist = new Vector2(0,0)
        let step = new Vector2(0,0)

        let hit = false
        let side

        if ( rayDir.x < 0 ) {
            step.x = -1
            sideDist.x = ( coordinate.x - mapCoord.x ) * deltaDist.x
        }else{
            step.x = 1
            sideDist.x = ( - coordinate.x + mapCoord.x + 1 ) * deltaDist.x
        }

        if ( rayDir.y < 0 ) {
            step.y = -1
            sideDist.y = ( coordinate.y - mapCoord.y ) * deltaDist.y
        }else{
            step.y = 1
            sideDist.y = ( - coordinate.y + mapCoord.y + 1 ) * deltaDist.y
        }

        while ( !(hit) ){

            if ( sideDist.x < sideDist.y){
                sideDist.x += deltaDist.x
                mapCoord.x += step.x
                side = 0
            }else{
                sideDist.y += deltaDist.y
                mapCoord.y += step.y
                side = 1
            }

            if ( map[mapCoord.x][mapCoord.y] > 0 ) {
                hit = true
            }

        }

        let wallDist

        if ( side == 0 ) {
            wallDist = sideDist.x - deltaDist.x
        }else{
            wallDist = sideDist.y - deltaDist.y
        }

        let wallHeight = Math.floor(canvas.height / wallDist)
        let startHeight = -wallHeight / 2 + canvas.height / 2
        let endHeight = wallHeight / 2 + canvas.height / 2

        if ( startHeight < 0 ) {
            startHeight = 0
        }

        if ( endHeight < 0) {
            endHeight = canvas.height
        }

        let alpha = 10 - wallDist

        if ( alpha < 0 ){
            alpha = '00'
        }else{
            alpha *= 255 / 10

            if ( side ) {
                alpha *= .8
            }

            alpha = Math.floor( alpha ).toString(16)
            
            if ( alpha.length == 1){
                alpha = '0' + alpha
            }
            
        }

        let color = getColor(mapCoord.x,mapCoord.y) + alpha
        

        if ( keyForward ) {
            if(map[Math.floor(coordinate.x + direction.x * WALK_SPEED )][Math.floor(coordinate.y)] == 0){
                coordinate.x += direction.x * WALK_SPEED
            }
            if(map[Math.floor(coordinate.x)][Math.floor(coordinate.y + direction.y * WALK_SPEED )] == 0){
                coordinate.y += direction.y * WALK_SPEED
            }
        }else if ( keyBackward) {
            if(map[Math.floor(coordinate.x - direction.x * WALK_SPEED )][Math.floor(coordinate.y)] == 0){
                coordinate.x -= direction.x * WALK_SPEED
            }
            if(map[Math.floor(coordinate.x)][Math.floor(coordinate.y - direction.y * WALK_SPEED )] == 0){
                coordinate.y -= direction.y * WALK_SPEED
            }
        }
        if ( keyTurnLeft){
            direction.turn(-SPPED_ROTATION)
            plane.turn(-SPPED_ROTATION)
        }else if ( keyTurnRight){
            direction.turn(SPPED_ROTATION)
            plane.turn(SPPED_ROTATION)
        }
        
        ctx.strokeStyle = color
        
        ctx.beginPath();
        ctx.moveTo(i, startHeight);
        ctx.lineTo(i, endHeight);
        ctx.stroke();


        /*
        ctx.strokeStyle = 'yellow'

        ctx.beginPath();
        ctx.moveTo(coordinate.x*mapShowSide,coordinate.y*mapShowSide);
        ctx.lineTo(coordinate.x * mapShowSide + sideDist.x * mapShowSide  , coordinate.y*mapShowSide + sideDist.y * mapShowSide);
        ctx.stroke();
        */

    }


    for ( let y = 0 ; y < map.length ; y++ ) {
        for ( let x = 0 ; x < map.length ; x++ ) {
            if ( map[x][y] != 0 ){
                ctx.fillStyle = getColor(x,y)
            }else{
                ctx.fillStyle = '#00000000'
            }
            ctx.fillRect(x*mapShowSide,y*mapShowSide,mapShowSide,mapShowSide)
        } 
    }

    ctx.beginPath();
    ctx.arc(coordinate.x * mapShowSide, coordinate.y * mapShowSide , 3,0, 2 * Math.PI);
    ctx.fillStyle = '#983BBF'
    ctx.fill();
    ctx.stroke();
    

}

function getColor(x,y){
    switch ( map[x][y] ) {

        case 1:
            color = red
            break;

         
        case 2:
            color = green
            break;

        case 3:
            color = blue
            break;

        case 4:
            color = purple
            break;
        
        case 5:
            color = cyan
            break;

        default:
            color = black
            break;
    }
    return color

}

window.onkeydown = function(event) {
    let key = event.key.toUpperCase();
    if ( key == 'Z' ) {
        keyForward = true
    }else if ( key == 'S' ) {
        keyBackward = true
    }else if ( key == 'Q' ) {
        keyLeft = true
    }else if ( key == 'D' ) {
        keyRight = true
    }else if ( key == 'A' ) {
        keyTurnLeft = true
    }else if ( key == 'E' ) {
        keyTurnRight = true
    }

};

window.onkeyup = function(event) {
    let key = event.key.toUpperCase();
    if ( key == 'Z' ) {
        keyForward = false
    }else if ( key == 'S' ) {
        keyBackward = false
    }else if ( key == 'Q' ) {
        keyLeft = false
    }else if ( key == 'D' ) {
        keyRight = false
    }else if ( key == 'A' ) {
        keyTurnLeft = false
    }else if ( key == 'E' ) {
        keyTurnRight = false
    }

};


let c = new Color(161,63,52,48)

console.log(c.toString(),c,purple)

animate()


