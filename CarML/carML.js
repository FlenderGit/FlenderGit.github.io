const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

const MAX_SPEED = 9;

canvas.width = innerWidth;
canvas.height = innerHeight;

const radians = toRadians(45)

class Car{
    constructor(x,y){
        this.x = x
        this.y = y
        this.rotation = 0
        this.velocity = 0
        this.accelarate = false
        this.rotateL = false
        this.rotateR = false
        this.lsRay = [new Ray(0,0,0),new Ray(0,0,0),new Ray(0,0,0),new Ray(0,0,0),new Ray(0,0,0),new Ray(0,0,0),new Ray(0,0,0),new Ray(0,0,0)]
    }

    tick(){
        if(this.accelarate == true && this.velocity < MAX_SPEED){
            this.velocity += .05;
        }
        if(this.accelarate==false){
            if(this.velocity > 0.1){
                this.velocity -= .05;
            }else{
                this.velocity = 0;
            }
        }
        if(this.rotateL == true){
            this.rotation -= .03;
        }
        if(this.rotateR == true){
            this.rotation += .03;
        }

        this.rotation %= 360;


        this.x += Math.cos(this.rotation) * this.velocity;
        this.y += Math.sin(this.rotation) * this.velocity;

        let add = 0


        this.lsRay.forEach(element => {
            element.x = this.x
            element.y = this.y
            element.rotation = this.rotation + add
            element.project()
            if(getDistance(this.x,this.y,element.x,element.y)<5){
                car = new Car(100,200)
            }
            add += radians;
        });

    }

    render(){
        ctx.fillStyle = 'red'
        ctx.beginPath();
        ctx.arc(this.x, this.y, 5, 0, 2 * Math.PI);
        ctx.stroke();
        this.lsRay.forEach(element => {
            ctx.beginPath();
            ctx.moveTo(this.x,this.y)
            ctx.lineTo(element.x,element.y)
            //ctx.arc(element.x, element.y, 3, 0, 2 * Math.PI);
            ctx.stroke();
        });
    }



}

class Point{
    constructor(x,y){
        this.x = x
        this.y = y
    }

    render(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, 3, 0, 2 * Math.PI);
        ctx.stroke();
    }
}

class Segment{
    constructor(p1,p2){
        this.start = p1
        this.end = p2
    }

    render(){
        ctx.beginPath();
        ctx.moveTo(this.start.x,this.start.y)
        ctx.lineTo(this.end.x,this.end.y)
        ctx.stroke();
    }
}

class Ray{
    constructor(x,y,rotation){
        this.x = x
        this.y = y
        this.rotation = rotation
        this.touch = false
    }

    project(){
        this.touch = true
        while( this.touch ){
            if(this.x < 0 || this.x > innerWidth || this.y < 0 || this.y > innerHeight){
                this.touch = false
            }
            lsSegments.forEach(element => {
                if(intersects(element.start.x,element.start.y,element.end.x,element.end.y,this.x,this.y,car.x,car.y) == true){
                    this.touch = false
                }
            });
            
            this.x += Math.cos(this.rotation) * 2;
            this.y += Math.sin(this.rotation) * 2;
        }
    }
}

class NeutralNetwork{
    constructor(){
        this.inputSize = 2
        this.hiddenSize = 3
        this.outputSize = 1

        this.W1 = makeMatrixRandom(this.inputSize,this.hiddenSize)
        this.W2 = makeMatrixRandom(this.hiddenSize,this.outputSize)




    }

    forward(X){

        this.z = matrixDot(X,this.W1)
        this.z2 = this.sidgmoid(this.z)
        this.z3 = matrixDot(this.z2,this.W2)
        this.outPut = this.sidgmoid(self.z3)
        return this.outPut
    }

    sidgmoid(s){
        return 1/(1+Math.exp(s))
    }


}




window.onkeydown = function(event) {
    let key = event.key.toUpperCase();
    if ( key == 'Z' ) {
        car.accelarate = true
    }else if ( key == 'Q' ) {
        car.rotateL = true;
    }else if ( key == 'D' ) {
        car.rotateR = true;
    }
}

window.onkeyup = function(event) {
    let key = event.key.toUpperCase();
    if ( key == 'Z' ) {
        car.accelarate = false
    }else if ( key == 'Q' ) {
        car.rotateL = false;
    }else if ( key == 'D' ) {
        car.rotateR = false;
    }
}



function toRadians(degrees){
  return degrees * (Math.PI/180);
}

function animate(){
    requestAnimationFrame(animate)
    ctx.clearRect(0,0,canvas.width,canvas.height)
    car.tick();
    car.render()
    lsSegments.forEach(element => {
        element.render()
    });
    lsPoints.forEach(element => {
        element.render()
    });
}

function intersects(a,b,c,d,p,q,r,s) {
    var det, gamma, lambda;
    det = (c - a) * (s - q) - (r - p) * (d - b);
    if (det === 0) {
      return false;
    } else {
      lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
      gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;
      return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
    }
  };

let firstPoint = null 
let oldPoint = null
let newPoint = null

  canvas.addEventListener('click',(e)=>{

    e.preventDefault();
    
    if (firstPoint == null){
        firstPoint = new Point(e.offsetX,e.offsetY)
        newPoint = firstPoint
        lsPoints.push(firstPoint)
    }else{
        oldPoint = newPoint
        newPoint = new Point(e.offsetX,e.offsetY)
        if ( getDistance(firstPoint.x,firstPoint.y,newPoint.x,newPoint.y)>20){
            lsSegments.push(new Segment(oldPoint,newPoint))
            lsPoints.push(newPoint)
        }else{
            lsSegments.push(new Segment(oldPoint,newPoint))
            console.log('Poly termi')
            firstPoint = null
        }

    }

    console.log(e.offsetX,e.offsetY,oldPoint,lsSegments)





});

//  -------------------- Function Matrix --------------------  // 

function equalMatrix(ls){
    let max = ls[0]
    for(let i = 0 ; i < ls.length ; i++){
        if ( ls[i] > max){
            max = ls[i]
        }
    }

    for(let i = 0 ; i < ls.length ; i++){
        ls[i] /= max
    }
    return ls
}

function makeMatrixRandom(nb1,nb2){
    let matrix = []
    for(let i = 0 ; i < nb1 ; i++){
        let row = []
        for(let j = 0 ; j < nb2 ; j++){
            row.push(Math.random())
        }
        matrix.push(row)
    }
    return matrix
}

function makeMatrixZeroes(nb1,nb2){
    let matrix = []
    for(let i = 0 ; i < nb2 ; i++){
        let row = []
        for(let j = 0 ; j < nb1 ; j++){
            row.push(0)
        }
        matrix.push(row)
    }
    return matrix
}

function matrixDot(matrix1,matrix2){
    console.log(matrix1[0].length , matrix2.length)
    if (matrix1[0].length == matrix2.length){
        newMatrix = makeMatrixZeroes(matrix2[0].length,matrix1.length)
        for(let i = 0;i<matrix1.length;i++){
            for(let j = 0;j<matrix2[0].length;j++){
                for(let k = 0;k<matrix1[0].length;k++){
                    newMatrix[i][j] += matrix1[i][k] * matrix2[k][j]
                }
            }
        }
    }

    return newMatrix
}
/*
def produit( a : np.array , b : np.array) -> np.array:
    if np.shape(a)[1] == np.shape(b)[0]:
        oth = np.zeros((np.shape(a)[0] , np.shape(b)[1]))
        for i in range(np.shape(a)[0]):
            for j in range(np.shape(b)[1]):
                for k in range(np.shape(a)[1]):
                    oth[i,j] += a[i,k] * b[k,j]
        return oth
*/
//  -------------------- Test --------------------  // 


let X = [[100,30,],[40,150],[200,121],[20,40]]
//console.log('test equal matric : ' ,equalMatrix(lsTest))

function getDistance(x1,y1,x2,y2){
    return Math.sqrt( Math.pow(x1 - x2,2) + Math.pow(y1 - y2,2)  )
}

let car = new Car(100,200)

//console.log('test equal matric : ' ,equalMatrix(lsTest))
//matrixRd1 = makeMatrixRandom(2,8)
//matrixRd2 = makeMatrixRandom(3,2)
//console.log(matrixRd1)
//console.log(matrixRd2)
//console.log(matrixDot(matrixRd1,matrixRd2))

let NN = new NeutralNetwork()

console.log(X)
console.log(NN.W1)

o = NN.forward(X)
console.log(o)

let lsSegments = []
let lsPoints = []

animate()