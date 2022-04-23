
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

const btn_createVertices = document.getElementById('createVertices');
const btn_mouse = document.getElementById('mouse');
const btn_createEdge = document.getElementById('createEdge');



const txt_edge = document.getElementById('infobar-edge');
const txt_edgeWeigth = document.getElementById('infobar-edge-weigth');
const txt_edgeOriented = document.getElementById('infobar-edge-oriented');

txt_edgeWeigth.placeholder = "";
txt_edge.style.display = "none";


const txt_vertice = document.getElementById('infobar-vertice');
const txt_verticeName = document.getElementById('infobar-vertice-name');
const txt_verticeColor = document.getElementById('infobar-vertice-color');

txt_vertice.style.display = "none";

let lsVertice = [];
let lsEdges = [];

let matrix = [];

canvas.height = innerHeight
canvas.width = innerWidth

let state = 0
let mouseState = false;
let selected = null;


class Edges {

    constructor(start , end , oriented){
        this.start = start;
        this.end = end;
        this.weight = 1;
        this.oriented = oriented;
        this.distance = getDistance(start.x,start.y,end.x,end.y)
        this.dx = (start.x - end.x) / this.distance
        this.dy = (start.y - end.y) / this.distance
        this.color = '#CD4EE6'
    }

    

    render(){

        this.distance = getDistance(this.start.x,this.start.y,this.end.x,this.end.y)

        this.dx = (this.start.x - this.end.x) / this.distance
        this.dy = (this.start.y - this.end.y) / this.distance

        if ( this.oriented){

            ctx.strokeStyle = this.color
            ctx.fillStyle = this.color
            drawHead(ctx,this.end.x+this.dx*20 , this.end.y+this.dy*20 , this.end.x+this.dx*10 , this.end.y+this.dy*10 ,true )
    
        }else{
            ctx.strokeStyle = '#CD4EE6';
            ctx.fillStyle = '#CD4EE6'
        }

        ctx.beginPath();
        ctx.moveTo(this.start.x-this.dx*10,this.start.y-this.dy*10)
        ctx.lineTo(this.end.x+this.dx*10,this.end.y+this.dy*10)
        ctx.stroke();

        if ( this.weight > 1){
            ctx.fillStyle = '#CD4EE6';
            ctx.fillText(this.weight,(this.start.x + this.end.x)/2 , (this.start.y + this.end.y)/2 - 10 , 30); 
        }

        
    }

    isEqual(e){
        return ( this.start.isEqual(e.start) && this.end.isEqual(e.end))
    }

}

function drawHead(context, x1, y1, x2, y2, filled) {
    var dx = x2 - x1;
    var dy = y2 - y1;
    context.beginPath();
      context.moveTo(x1 + 0.5 * dy, y1 - 0.5 * dx);
    context.lineTo(x1 - 0.5 * dy, y1 + 0.5 * dx);
    context.lineTo(x2, y2);
    context.closePath();
    filled ? context.fill() : context.stroke();
}

class Vertice {

    constructor(x,y){
        this.x = x
        this.y = y
        this.name = ''
        this.color = '#CD4EE6'
    }

    getColor(){
        return this.color
    }

    getX(){
        return this.x
    }

    getY(){
        return this.y
    }

    render(){
        
        ctx.strokeStyle = this.color;
        ctx.fillStyle = this.color;

        if ( this.name != '' ){
            ctx.fillText(this.name,this.x - 10 , this.y - 15 , 30); 
        }

        

        ctx.beginPath();
        ctx.arc(this.x, this.y, 10, 0, 2 * Math.PI);
        ctx.stroke();
    }

    isEqual(p){
        return (this.x == p.x && this.y == p.y )
    }
}


function animate(){
    requestAnimationFrame(animate)
    ctx.clearRect(0,0,canvas.width,canvas.height)
    advance()
}

function advance(){

    if ( state == 2 && selected != null && mouseState == true ){

        let distance = getDistance(selected.x,selected.y,cursorX,cursorY);

        if ( distance > 10){

            let dx = (cursorX - selected.x ) / distance
            let dy = (cursorY -selected.y ) / distance 
    
            ctx.fillStyle = '#CD4EE6'

            ctx.beginPath();
            ctx.moveTo(selected.x+dx*10,selected.y+dy*10)
            ctx.lineTo(cursorX,cursorY)
            ctx.stroke();

        }


        

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


function bellman(matrix){

    let matrixCopy = [...matrix];
    let path = []

    for ( let i = 0 ; i < matrix.length ; i++){
        for ( let j = 0 ; j < matrix.length ; j++){
            if(matrixCopy[j][i] == 0) matrixCopy[j][i] = Infinity;
        }
    }

    let lsDistance = [0];
    let change = true;
    for ( let i = 1 ; i < matrix.length ; i++){
        lsDistance.push(Infinity)
        path.push(null)
    }

    while (change){
        change = false;
        for ( let i = 0 ; i < matrix.length ; i++){
            for ( let j = 0 ; j < matrix.length ; j++){
                if (lsDistance[i] + matrix[i][j] < lsDistance[j]){
                    lsDistance[j] = lsDistance[i] + matrix[i][j];
                    change = true
                    //console.log(path)
                    path[j] = i
                }
            }
        }
    }

    path[0] = 0
    path.push(lsVertice.length-1)

    path = path.filter( (ele,pos)=>path.indexOf(ele) == pos);


    //console.log(path)

    for ( let i = 1 ; i < path.length ; i++){
        if (path[i] == 0){
            path[i] = path[i-1]
        }
    }

    for ( let i = 0 ; i < path.length - 1 ; i++){
        

        lsVertice[path[i]].color = 'green';

        lsEdges.forEach(edge => {


            //console.log(edge.start.x , edge.start.y , edge.end.x , edge.end.y )
            
            if(edge.start.isEqual(lsVertice[path[i]]) && edge.end.isEqual(lsVertice[path[i+1]]) ){
                edge.color = 'green'
            }
        });

    }

    console.log(path)

    
    return lsDistance;   
}




canvas.addEventListener('mousedown',(e)=>{
    mouseState = true;


    // Ajouter Point
    if( state == 0){
        lsVertice.push(new Vertice(e.offsetX,e.offsetY))
        addRowMatrix()
    }

    // Selected
    if( state == 1 || state == 2 ) {


        selected = null

        lsVertice.forEach(vertice => {

            if ( Math.abs(e.offsetX-vertice.getX()) < 10 && Math.abs(e.offsetY-vertice.getY())  ){

                if( getDistance(e.offsetX , e.offsetY , vertice.getX() , vertice.getY() ) < 10)  {
                    selected = vertice
    
                    txt_vertice.style.display = "";
                    txt_edge.style.display = "none";
    
                    txt_verticeColor.placeholder = selected.color;
                    txt_verticeColor.value = ""
    
                    txt_verticeName.placeholder = selected.name;
                    txt_verticeName.value = ""
                }

            }

            
        });
        if ( selected == null){

            let i = 0
            let state = false

            while ( i < lsEdges.length && !(state)){

                let edge = lsEdges[i]

                if ( distToSegment({x:e.offsetX,y:e.offsetY} , edge.start,edge.end) < 20 ){
                    selected = edge

                    txt_vertice.style.display = "none";
                    txt_edge.style.display = '';
    
                    
                    txt_edgeWeigth.placeholder = selected.weight;
                    txt_edgeWeigth.value = '';

                    txt_edgeOriented.checked = selected.oriented
                }

                i++
            }
        }
    }
});

function changeWeigth (value){
    selected.weight = value
    let indSelected = getIndex(lsEdges,selected)
    let indStart = getIndex(lsVertice,lsEdges[indSelected].start) 
    let indEnd = getIndex(lsVertice,lsEdges[indSelected].end) 
    if ( !(selected.oriented) ) {
        matrix[indEnd][indStart] = parseInt(value)
    }
    matrix[indStart][indEnd] = parseInt(value)
}

function changeName (value){
    selected.name = value
}

function changeColor (value){
    selected.color = value
}

function changeOriented (){
    selected.oriented = txt_edgeOriented.checked;
    let indSelected = getIndex(lsEdges,selected)
    let indStart = getIndex(lsVertice,lsEdges[indSelected].start) 
    let indEnd = getIndex(lsVertice,lsEdges[indSelected].end) 
    if ( selected.oriented ) {
        if ( indStart != null && indEnd != null){
            matrix[indEnd][indStart] = 0    
        }
    }else{
        if ( indStart != null && indEnd != null){
            matrix[indEnd][indStart] = selected.weight    
        }
    }
}

window.onkeydown = function(event) {
    let key = event.key.toUpperCase();
    if ( key == 'A' ) {

        if ( selected instanceof Vertice){

            let ind = getIndex(lsVertice,selected)
            lsVertice.splice(ind, 1)



        }else{

            indSelected = getIndex(lsEdges,selected)

            let indStart = getIndex(lsVertice,lsEdges[indSelected].start) 
            let indEnd = getIndex(lsVertice,lsEdges[indSelected].end) 
    
            if ( indStart != null && indEnd != null){
    
                matrix[indStart][indEnd] = 0
                matrix[indEnd][indStart] = 0
                lsEdges.splice(indSelected, 1)
    
            }

        }

        selected = null;

    }

    if ( key == 'Z' ) {
        console.log(bellman(matrix))
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

canvas.addEventListener('mousemove', e => {

    if( state == 1 && selected != null && mouseState== true) {
        selected.x = e.offsetX
        selected.y = e.offsetY
    }

    cursorX = e.offsetX
    cursorY = e.offsetY
    
  });

canvas.addEventListener('mouseup',(e)=>{

    // Créer liaison
    if (state == 2){
        let end = null;
        lsVertice.forEach(vertice => {
            if ( Math.abs(e.offsetX-vertice.getX()) < 10 && Math.abs(e.offsetY-vertice.getY())  ){
                if( getDistance(e.offsetX , e.offsetY , vertice.getX() , vertice.getY() ) < 10)  {
                    end = vertice
                }
            }
            
        });

        if ( end != null && !(end.isEqual(selected))){
            lsEdges.push(new Edges(selected,end,false))

            let indSelected = getIndex(lsVertice,selected) 
            let indEnd = getIndex(lsVertice,end) 

            if ( indSelected != null && indEnd != null){

                matrix[indSelected][indEnd] = 1
                matrix[indEnd][indSelected] = 1
                selected = null;

            }
        }


    }

    

    

    mouseState = false;
});




animate()


