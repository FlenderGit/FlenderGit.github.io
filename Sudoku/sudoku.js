const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

const side = 50

canvas.height = side * 9
canvas.width = side * 9


function animate(){
    requestAnimationFrame(animate)
    ctx.clearRect(0,0,canvas.width,canvas.height)
    /*
    for ( let i = 0 ; i < 9 ; i ++){
        for ( let j = 0 ; j < 9 ; j ++){
            ctx.fillStyle = 'black'
            ctx.fillRect(i*side,j*side,side-1,side-1)
            ctx.fillStyle = 'red'
            ctx.fillText(1,i*side+side/2,j*side+side/2)
        }
    }*/
}

function divEucli(nb,div){
    return ~~(nb / div);
}

function isInGrid(x,y){
    return (x >= 0 && x < 9 && y >= 0 && y < 9)
}

function coordToInt(x,y){
    return x%9 + y * 9
}

function intToCoord(nb){
    return {x :nb % 9 , y : divEucli(nb,9)}
}

function makeSudoku(ls){
    let matrice = []
    for ( let j = 0 ; j < 9 ; j ++){
        let row = []
        for ( let i = 0 ; i < 9 ; i ++){
            row.push(ls[coordToInt(i,j)])
        }
        matrice.push(row)
    }
    return matrice
}

function makeMatrice(){
    let matrice = []

    for ( let j = 0 ; j < 9**2 ; j ++){
        let row = []
        for ( let i = 0 ; i < 9**2 ; i ++){
            row.push(0)
        }
        matrice.push(row)
    }

    for ( let j = 0 ; j < 9**2 ; j ++){
        
        let coord = intToCoord(j)
        let row = matrice[j]
        
        // Horizontal

        for ( let i = 0 ; i < 9 ; i ++){
            row[coordToInt(divEucli(coord.x,9)+i,coord.y)] = 1
        }

        // Vertical
        for ( let i = 0 ; i < 9 ; i ++){
            row[coordToInt(coord.x,i)] = 1
        }

        // Voisins

        for ( let i = 0 ; i < 3 ; i ++){
            for ( let k = 0 ; k < 3 ; k ++){
                if (isInGrid(divEucli( coord.x , 3) , divEucli( coord.y , 3) )){
                    row[coordToInt(divEucli( coord.x , 3)+i,divEucli( coord.y , 3)+k)] = 1
                }
            }
        }

        
    }
    for ( let i = 0 ; i < 9**2 ; i ++){
        matrice[i][i] = 0
    }
    return matrice
}

function isIn(ls,nb){
    let i = 0
    let state = false
    while(!(state) && i < ls.length){
        if(ls[i] == nb){
            state = true
        }
        i++
    }
    return state
}

function DSATUR(matrice,lsNumber){
    let n = matrice[0].length
    let number = lsNumber

    let sommetsOrd = triDegres(matrice)    

    while (isIn(lsNumber,0) == false){

        let dsat = [0,0,0,0,0,0,0,0,0]
        let degreSatMax = 0
        let sommetChoisi = sommetsOrd[0]

        sommetsOrd.forEach(sommet => {
            
            if (number[sommet] == 0){

                let voisin = voisin(matrice,i)
                let numberVoisins = []

                voisin.forEach(voisin => {
                    
                    if ( number[voisins] > 0){
                        numberVoisins.push(number[voisins])
                    }
                    dsat[sommet] = 1

                });

                for ( let j = 0 ; j < voisin.length ; j++){



                }


            }

        });

        for ( let i = 0 ; i < n ; i++){

            

        }


    }
}


console.log(makeMatrice())

console.log(coordToInt(3,6) , intToCoord(62))



animate()