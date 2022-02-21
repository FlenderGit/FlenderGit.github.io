const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const rect = canvas.getBoundingClientRect()

side = divEucli(innerWidth,20)
const gravity = 2

const dirtTexture = new Image()
dirtTexture.src = 'dirt.png'
const grassTexture = new Image()
grassTexture.src = 'grass.png'


    w = window.innerWidth,
    h = window.innerHeight;


//linear congruential generator parameters
var M = 4294967296,
    A = 1664525,
    C = 1;

//psuedo-random number generator (linear congruential)
function PSNG(){
  this.Z = Math.floor(Math.random() * M);
  this.next = function(){
    this.Z = (A * this.Z + C) % M;
    return this.Z / M - 0.5;
  }
}

//cosine interpolation
function Interpolate(pa, pb, px){
  var ft = px * Math.PI,
    f = (1 - Math.cos(ft)) * 0.5;
  return pa * (1 - f) + pb * f;
}

//1D perlin line generator
function Perlin(amp, wl, width){
  this.x = 0;
  this.amp = amp;
  this.wl = wl;
  this.fq = 1 / wl;
  this.psng = new PSNG();
  this.a = this.psng.next();
  this.b = this.psng.next();
  this.pos = [];
  while(this.x < width){
    if(this.x % this.wl === 0){
      this.a = this.b;
      this.b = this.psng.next();
      this.pos.push(this.a * this.amp);
    }else{
      this.pos.push(Interpolate(this.a, this.b, (this.x % this.wl) / this.wl) * this.amp);
    }
    this.x++;
  }
}

//octave generator
function GenerateNoise(amp, wl, octaves, divisor, width){
  var result = [];
  for(var i = 0; i < octaves; i++){
    result.push(new Perlin(amp, wl, width));
    amp /= divisor;
    wl /= divisor;
  }
  return result;
}

//combines octaves together
function CombineNoise(pl){
  var result = {pos: []};
  for(var i = 0, total = 0, j = 0; i < pl[0].pos.length; i++){
    total = 0;
    for(j = 0; j < pl.length; j++){
      total += pl[j].pos[i];
    }
    result.pos.push(total+16);
  }
  return result;
}


let heigths = CombineNoise(GenerateNoise(20, 128, 8, 2, 100))

console.log(heigths)
console.log(innerWidth)


class World {

    constructor(width,height){
        this.width = width
        this.height = height
        this.grid = []
        for ( let i = 0 ; i < height ; i++){
            let row = []
            for ( let j = 0 ; j < width ; j++){
                if(i<heigths.pos[j]){
                    row.push(new Air(j,i))
                }else{
                    row.push(new Dirt(j, i))
                }
            }
            this.grid.push(row)
        }   
        console.log(this.grid)     
    }

    getSide(){
        return this.size
    }

    render(){
        let maxH = divEucli(player.getY()+h,side)
        let minH = divEucli(player.getY(),side)
        if (minH < 0 ){
            minH = 0
        }
        if (maxH > this.height){
            maxH = this.height
        }
        for ( let i = minH ; i < maxH ; i++){
            let maxW = divEucli(player.getX()+w,side)
            let minW = divEucli(player.getX(),side)
            if (minW < 0 ){
                minW = 0
            }
            if (maxW > this.width){
                maxW = this.width
            }
            for ( let j = minW ; j < maxW ; j++){
                this.grid[i][j].render();
            }
        }
    }
}



class Block {

    constructor(id , x , y){
        this.id = id
        this.x = x
        this.y = y
    }

    getType(){
        return this.type
    }
    

}

class Dirt extends Block {

    constructor(x , y){
        super(1,x,y)
        this.texture = grassTexture
    }

    render(){
        
        if(world.grid[this.y-1][this.x] instanceof Dirt){
            this.texture = dirtTexture
        }else{
            this.texture = grassTexture
        }
        
        ctx.drawImage(this.texture,this.x*side - player.getX(),this.y*side - player.getY(),side,side)

    }

}

class Air extends Block {

    constructor(x , y){
        super(1,x,y)
    }

    render(){
    }

}

class Player {

    constructor(x , y){
        this.x = x * side
        this.y = y
        this.walkingLeft = false
        this.walkingRight = false
        this.walkingUp = false
        this.walkingDown = false
    }

    getX(){
        return this.x
    }

    getY(){
        return this.y
    }

    tick(){
        if(this.walkingLeft == true){
            this.x--;
        }else if (this.walkingRight == true ){
            this.x++;
        }else if (this.walkingUp == true){
            this.y--;
        }else if (this.walkingDown == true){
            this.y++;
        }
        /*
        if(world.grid[~~(this.y)][divEucli(this.x,side)] instanceof Air){
            this.y += .04;
        }*/


    }

    render(){
        //ctx.fillStyle = 'red'
        //ctx.fillRect(0, (this.y-2)*side,this.width,this.height)
    }

}

class Mouse {

    constructor(){
        this.mode = 0
    }
}


canvas.addEventListener('click',(e)=>{

    e.preventDefault();
    


    let cursorX = divEucli(e.offsetX*1.11 +player.getX(),side);
    let cursorY = divEucli(e.offsetY*1.11+player.getY(),side);

    console.log(cursorX,cursorY,e.offsetY)

    if(mouse.mode == 0){
        world.grid[cursorY][cursorX] = new Air(cursorX,cursorY)
    }else{
        world.grid[cursorY][cursorX] = new Dirt(cursorX,cursorY)
    }


});



function animate(){
    requestAnimationFrame(animate)
    ctx.clearRect(0,0,canvas.width,canvas.height)
    world.render()
    player.tick()
    player.render()
}

window.onkeydown = function(event) {
    let key = event.key.toUpperCase();
    if ( key == 'D' ) {
        player.walkingRight = true
    } else if ( key == 'Q' ) {
        player.walkingLeft = true
    }else if ( key == 'Z' ) {
        player.walkingUp = true
    }else if ( key == 'S' ) {
        player.walkingDown = true
    }else if ( key == 'A' ) {
        mouse.mode = 0
    }else if ( key == 'E' ) {
        mouse.mode = 1
    }
    
}

window.onkeyup = function(event) {
    let key = event.key.toUpperCase();
    if ( key == 'D' ) {
        player.walkingRight = false
    } else if ( key == 'Q' ) {
        player.walkingLeft = false
    }else if ( key == 'Z' ) {
        player.walkingUp = false
    }else if ( key == 'S' ) {
        player.walkingDown = false
    }
}

function divEucli(nb,div){
    return ~~(nb / div);
}



let world = new World(100,50)
let player = new Player(0,20)
let mouse = new Mouse()


animate()