
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

const btn_createVertices = document.getElementById('createVertices');
const btn_mouse = document.getElementById('mouse');
const btn_createEdge = document.getElementById('createEdge');


let cursorX = 0
let cursorY = 0

let lsVertice = [];
let lsEdges = [];

let matrix = [];

canvas.height = innerHeight
canvas.width = innerWidth

let state = 0
let mouseState = false;
let selected = null;


class Edges {

    constructor(start , end){
        this.start = start;
        this.end = end;
    }

    render(){
        ctx.beginPath();
        ctx.strokeStyle = '#CD4EE6';
        ctx.moveTo(this.start.x,this.start.y)
        ctx.lineTo(this.end.x,this.end.y)
        ctx.stroke();
    }

}

class Vertice {

    constructor(x,y){
        this.x = x
        this.y = y
    }

    getX(){
        return this.x
    }

    getY(){
        return this.y
    }

    render(){
        ctx.beginPath();
        ctx.strokeStyle = '#CD4EE6';
        ctx.arc(this.x, this.y, 10, 0, 2 * Math.PI);
        ctx.stroke();
    }
}


function animate(){
    requestAnimationFrame(animate)
    ctx.clearRect(0,0,canvas.width,canvas.height)
    advance()
}

function advance(){

    if( state == 1 && selected != null) {
        selected.x = cursorX
        selected.y = cursorY
    }

    if ( state == 2 && selected != null && mouseState == true){
        
        ctx.beginPath();
        ctx.moveTo(selected.x,selected.y)
        ctx.lineTo(cursorX,cursorY)
        ctx.stroke();

    }
    
    lsVertice.forEach(vertice => {
        vertice.render()
    });

    lsEdges.forEach(edge => {
        edge.render()
    });
}

function addRowMatrix(){
    matrix.forEach(row => {
        row.push(0)
    });

    let row = []
    for ( let i = 0 ; i<matrix.length+1 ; i++){
        row.push(0)
    }
    matrix.push(row)
}

btn_createVertices.addEventListener('click',(e)=>{
    state = 0;
});

btn_mouse.addEventListener('click',(e)=>{
    state = 1;
});

btn_createEdge.addEventListener('click',(e)=>{
    state = 2;
});

canvas.addEventListener('mousedown',(e)=>{
    mouseState = true;
    if( state == 0){
        lsVertice.push(new Vertice(e.offsetX,e.offsetY))

        addRowMatrix()
        
    }
    if( state == 1 || state == 2 ) {
        lsVertice.forEach(vertice => {
            if( getDistance(e.offsetX , e.offsetY , vertice.getX() , vertice.getY() ) < 10)  {
                selected = vertice
            }
        });
        if ( selected == null){

            let i = 0
            let state = false

            while ( i < lsEdges.length && !(state)){

                let edge = lsEdges[i]

                if ( distToSegment({x:e.offsetX,y:e.offsetY} , edge.start,edge.end) < 20 ){
                    selected = i
                }

                i++
            }
        }
    }
});

window.onkeydown = function(event) {
    let key = event.key.toUpperCase();
    if ( key == 'A' ) {
        console.log()
        let indSelected = getIndex(lsVertice,lsEdges[selected].start) 
        let indEnd = getIndex(lsVertice,lsEdges[selected].end) 

        if ( indSelected != null && indEnd != null){

            matrix[indSelected][indEnd] = 0
            matrix[indEnd][indSelected] = 0
            lsEdges.splice(selected, 1)
            selected = null;

        }
    }
}


function distToSegment(p, v, w) {
    var l2 = getDistanceSquare(v.x,v.y,w.x,w.y);


        
    if (l2 == 0) return getDistanceSquare(p.x,p.y,v.x,v.y);
        
    var t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2;
        

    if (t < 0) return getDistanceSquare(p.x,p.y,v.x,v.y);
    if (t > 1) return getDistanceSquare(p.x,p.y,w.x,w.y);
    


    return Math.sqrt(getDistanceSquare(p.x,p.y, v.x + t * (w.x - v.x), v.y + t * (w.y - v.y)));
}



function getDistance(x1,y1,x2,y2){
    return Math.sqrt( Math.pow(x1 - x2,2) + Math.pow(y1 - y2,2)  )
}

function getDistanceSquare(x1,y1,x2,y2){
    return Math.pow(x1 - x2,2) + Math.pow(y1 - y2,2)
}

function getIndex(ls,value){
    let i = 0
    let state = false;
    let r = null
    while ( i < ls.length && !(state) ){
        if ( ls[i] == value ){
            r = i
        }

        i++;
    }
    return r;
}

canvas.addEventListener('mouseup',(e)=>{
    if (state == 2){
        let end = null;
        lsVertice.forEach(vertice => {
            if( getDistance(e.offsetX , e.offsetY , vertice.getX() , vertice.getY() ) < 10)  {
                end = vertice
            }
        });

        if ( end != null && end != selected){
            lsEdges.push(new Edges(selected,end))

            let indSelected = getIndex(lsVertice,selected) 
            let indEnd = getIndex(lsVertice,end) 

            if ( indSelected != null && indEnd != null){

                matrix[indSelected][indEnd] = 1
                matrix[indEnd][indSelected] = 1
                selected = null;

            }
        }
    }

    if ( state == 1) {
        selected = null;
    }

    mouseState = false;
});

canvas.addEventListener('mousemove',(e)=>{
    cursorX = e.offsetX
    cursorY = e.offsetY
});

animate()


