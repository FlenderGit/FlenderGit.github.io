const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const rect = canvas.getBoundingClientRect()

let side = 40
const gravity = 2

const dirtTexture = new Image()
dirtTexture.src = 'dirt.jpg'

console.log(dirtTexture)

class World {

    constructor(width,height){
        this.width = width
        this.height = height
        this.grid = []
        for ( let i = 0 ; i < height ; i++){
            let row = []
            for ( let j = 0 ; j < width ; j++){
                
                if(i<5){
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
        for ( let i = 0 ; i < this.height ; i++){
            for ( let j = 0 ; j < this.width ; j++){
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
        this.texture = dirtTexture
    }

    render(){
        ctx.drawImage(dirtTexture,this.x*side - player.getX(),this.y*side,side,side)
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
        this.y = world.height - y
        this.width = 30
        this.height = 80
        this.walkingLeft = false
        this.walkingRight = false
        this.velY = 0
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
        }else if (this.walkingRight == true){
            this.x++;
        }
        
        if(world.grid[~~(this.y)][divEucli(this.x,side)] instanceof Air){
            this.y += .04;
        }

    }

    render(){
        ctx.fillStyle = 'red'
        ctx.fillRect(0, (this.y-2)*side,this.width,this.height)
    }

}

canvas.addEventListener('click',(e)=>{

    e.preventDefault();
    
    console.log(e.offsetX,e.offsetY)


    let cursorX = divEucli(e.offsetX *1.11+player.getX(),side);
    let cursorY = divEucli(e.offsetY *1.11 +player.getY(),side);

    

    world.grid[cursorY][cursorX] = new Air(cursorX,cursorY)


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
    }
}

window.onkeyup = function(event) {
    let key = event.key.toUpperCase();
    if ( key == 'D' ) {
        player.walkingRight = false
    } else if ( key == 'Q' ) {
        player.walkingLeft = false
    }
}

function divEucli(nb,div){
    return ~~(nb / div);
}



let world = new World(4,10)
let player = new Player(0,7)

animate()