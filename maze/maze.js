//  -------------------- Constants --------------------  // 

const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

canvas.height = innerHeight
canvas.width = innerWidth

const addMargeX = (innerWidth / 1.05 * .05)
const addMargeY = (innerHeight / 1.05 * .05)


//  -------------------- Variables --------------------  // 

let lsWall = []
let side = 40
let maxX = divEucli(innerWidth,side) + 1
let maxY = divEucli(innerHeight,side) + 1

let cursorX
let cursorY


let poseBlock = false

let start = null
let end = null

let lsClose = []
let lsOpen = []

//  -------------------- Classs --------------------  // 

class Cell{
    constructor(x,y,state,cout,heuris){
        this.x = x
        this.y = y
        this.state = state
        this.cout = cout
        this.heuris = heuris
    }

    render(){

        if ( this.state == 0){
            ctx.fillStyle = 'black'
        }else if (this.state == 1){
            ctx.fillStyle = 'green'
        }else if (this.state == 2){
            ctx.fillStyle = 'red'
        }else if (this.state == 3){
            ctx.fillStyle = 'purple'
        }else if (this.state == 4){
            ctx.fillStyle = 'yellow'
        }
        ctx.fillRect(this.x * side , this.y * side , side , side)
    }
}


//  -------------------- Functions Maze --------------------  // 

function isPresentWall(x,y){
    let i = 0
    let state = true
    while ( state && i < lsWall.length ){
        if (lsWall[i].x == x && lsWall[i].y == y){
            state = false
        }
        i++;
    }
    return state
}

function isPresentOpen(x,y){
    let i = 0
    let state = true
    while ( state && i < lsOpen.length ){
        if (lsOpen[i].x == x && lsOpen[i].y == y){
            state = false
        }
        i++;
    }
    return state
}

function isWall(x,y){
    let state = false
    let i = 0
    while ( !(state) && i < lsWall.length ){
        if ((lsWall[i].x == x && lsWall[i].y == y)&& !(lsWall[i].state == 2)){
            state = true
        }
        i++;
    }
    return state
}

function isPresentOpenCout(cell){
    let i = 0
    let state = false
    while ( !(state) && i < lsOpen.length ){
        if (lsOpen[i].x == cell.x && lsOpen[i].y == cell.y && lsOpen[i].cout < cell.cout){
            state = true
        }
        i++;
    }
    return state
}

function isPresentClose(x,y){
    let i = 0
    let state = false
    while ( !(state) && i < lsClose.length ){
        if (lsClose[i].x == x && lsClose[i].y == y){
            state = true
        }
        i++;
    }
    return state
}

function voisin(cell){
    ls = []
    if(cell.y - 1 >= 0 && !(isWall(cell.x,cell.y - 1)) && isPresentOpen(cell.x,cell.y - 1)) ls.push(new Cell(cell.x,cell.y - 1,3,null,null))
    if(cell.y + 1 < maxY && isPresentOpen(cell.x,cell.y + 1)&& !(isWall(cell.x,cell.y + 1))) ls.push(new Cell(cell.x,cell.y + 1,3,null,null))
    if(cell.x - 1 >= 0 && isPresentOpen(cell.x - 1,cell.y)&& !(isWall(cell.x-1,cell.y))) ls.push(new Cell(cell.x - 1,cell.y,3,null,null))
    if(cell.x + 1 < maxX &&isPresentOpen(cell.x + 1,cell.y)&& !(isWall(cell.x + 1,cell.y))) ls.push(new Cell(cell.x + 1,cell.y,3,null,null))
    return ls
}

function voisinBackward(cell){
    ls = []

    lsClose.forEach(other => {
        
        if(cell.y - 1 == other.y && cell.x == other.x){
            ls.push(other)
        }
        if(cell.y + 1 == other.y && cell.x == other.x){
            ls.push(other)
        }
        if(cell.y == other.y && cell.x - 1 == other.x){
            ls.push(other)
        }
        if(cell.y == other.y && cell.x + 1 == other.x){
            ls.push(other)
        }
    });
    return ls
}

function backward(){
    current = end
    let state = false
    while(!(state)) {
        if(current.x == start.x && current.y == start.y){
            state = true
        }else{
            let i = 0
            let find = false
    
            let voisin = voisinBackward(current)
        
            while(!(find) && i < voisin.length){
        
                if(voisin[i].cout == current.cout-1){
                    current = voisin[i]
                    current.state = 4
                }
                i++;
            }
        }
    }
}

function resolveMaze(){
    lsOpen.push(start)
    let state = false
    while(lsOpen.length >= 0 && !(state)){
        current = lsOpen.shift()
        
        if ( current.x == end.x && current.y == end.y){
            console.log('End solving')
            state = true
            end.heuris = 0
            end.cout = current.cout
        }else{
            voisin(current).forEach(cell => {
                if (!(isPresentClose(cell.x,cell.y) || isPresentOpenCout(cell))){
                    cell.cout = current.cout+1
                    cell.heuris = cell.cout + getDistance(cell.x,cell.y,end.x,end.y)
                    lsOpen.push(cell)
                }
            });
            lsClose.push(current)
            lsOpen.sort(compare);
        }
    }
    backward();
    console.log('End backward')
}


//  -------------------- Functions Canvas --------------------  // 

function animate(){
    requestAnimationFrame(animate)
    ctx.clearRect(0,0,canvas.width,canvas.height)
    lsClose.forEach(cell => {
        cell.render()
    });
    lsWall.forEach(cell => {
        cell.render()
    });
    advance()
}


//  -------------------- Functions Advance --------------------  // 

function advance(){
    if(poseBlock == true){
        console.log(cursorX,cursorY)
        if(isPresentWall(cursorX,cursorY) == true){
            lsWall.push(new Cell(cursorX,cursorY,0,null,null))
        }
    }
}


//  -------------------- Functions Utils --------------------  // 

function tellPos(p){

    cursorX = divEucli( (p.pageX - addMargeX) * 1.11  , side )
    cursorY = divEucli( (p.pageY - addMargeY) * 1.11 , side )
}

function divEucli(nb,div){
    return ~~(nb / div);
}
function getDistance(x1,y1,x2,y2){
    return Math.sqrt( Math.pow(x1 - x2,2) + Math.pow(y1 - y2,2)  )
}

function compare( a, b ) {
    if ( a.heuris < b.heuris ){
      return -1;
    }
    if ( a.heuris > b.heuris ){
      return 1;
    }
    return 0;
}


///  -------------------- Listeners --------------------  // 

addEventListener('mousemove', tellPos, true);

canvas.addEventListener('click',(e)=>{

    e.preventDefault();

    lsWall.push(new Cell(cursorX,cursorY,0))
})

window.onkeydown = function(event) {
    let key = event.key.toUpperCase();

    if ( key == 'A' ) {
        start = new Cell(cursorX,cursorY,1,0,null)
        lsWall.push(start)
    }else if ( key == 'Z' ) {
        end = new Cell(cursorX,cursorY,2)
        lsWall.push(end)
    }else if ( key == 'E' ) {
        start.heuris = getDistance(cursorX,cursorY,end.x,end.y)
        lsOpen = []
        lsClose = []
        resolveMaze()
    }else if ( key == 'W' ) {
        poseBlock = true
    }
}

window.onkeyup = function(event) {
    let key = event.key.toUpperCase();

    if ( key == 'W' ) {
        poseBlock = false
    }
};


///  -------------------- Program --------------------  // 

animate()