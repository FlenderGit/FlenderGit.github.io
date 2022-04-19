const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

const DISTANCE_SENSOR_FORWARD = 12;

const SIDE_SENSOR = 6;
const MIDDLE_SIDE_SENSOR = SIDE_SENSOR / 2;
const VIEW_RANGE = 50;
const VIEW_ANGLE = 120;
const PICKUP_DISTANCE = 7;
const TIME_MAX_BEFORE_PHEROMONE = 50;
const LIFE_TIME_PHEROMONE = 3000;

let lsAnt = []
let lsFood = []
let lsPheromone = []

let test = false


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
        this.x *= multiplier;
        this.y *= multiplier;
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

}


class Ant {

    constructor ( x , y ) {

        this.maxSpeed = 2;

        this.directionStrength = 2;
        this.wanderStrength = .06;

        this.coordonate = new Vector2 ( x , y );

        this.vector = new Vector2 ( 0 , 0 )
        this.desiredDirection = new Vector2 ( 0 , 0 );

        this.leftSensor = new Sensor ();
        this.middleSensor = new Sensor ();
        this.rightSensor = new Sensor ();

        this.target = null;
        this.haveFood = false;

        this.timeBeforePheromone = TIME_MAX_BEFORE_PHEROMONE;

        this.i = lsAnt.length
    
        this.updateSensor();
    }

    update () {

        let randomDirection = randomPointInsideUnitCircle();
        randomDirection.multiply( this.wanderStrength );
        
        this.desiredDirection.add( randomDirection );
        this.desiredDirection.normalize();

        let desiredVector = this.desiredDirection.copy();
        desiredVector.multiply(this.maxSpeed);

        let desirateDirectionStrength = desiredVector.copy();
        desirateDirectionStrength.substract(this.vector);
        desirateDirectionStrength.multiply(this.directionStrength);

        let acceleration = desirateDirectionStrength.copy();
        acceleration.setMagnitude(this.directionStrength);


        acceleration.multiply(1/10)
        this.vector.add(acceleration);
        this.vector.setMagnitude(this.maxSpeed);

        this.vector.multiply(1/10)
        this.coordonate.add(this.vector);

        this.coordonate.x %= canvas.width
        this.coordonate.y %= canvas.height

        this.timeBeforePheromone--;

        

    }

    updateSensor () {

        let vector = this.vector.copy();
        vector.setMagnitude( DISTANCE_SENSOR_FORWARD );

        this.middleSensor.coordonate.x = this.coordonate.x + vector.x;
        this.middleSensor.coordonate.y = this.coordonate.y + vector.y;
        this.middleSensor.update(this.haveFood);

        this.leftSensor.coordonate.x = this.coordonate.x + vector.x *.8 - vector.y * .6;
        this.leftSensor.coordonate.y = this.coordonate.y + vector.y *.8 + vector.x * .6;
        this.leftSensor.update(this.haveFood);

        this.rightSensor.coordonate.x = this.coordonate.x + vector.x *.8 + vector.y * .6;
        this.rightSensor.coordonate.y = this.coordonate.y + vector.y *.8 - vector.x * .6;
        this.rightSensor.update(this.haveFood);

    }

    boundOff(){
        if ( ( this.coordonate.x > canvas.width || this.coordonate.x < 0) || ( this.coordonate.y > canvas.height || this.coordonate.y < 0)) {
            this.desiredDirection.invert()
            this.desiredDirection.multiply(100)
        }
    }

    handlerFood () {

        if ( this.target == null ) {

            // Get food near in the perception
            let lsFoodNear = [];
            lsFood.forEach(food => {
                if ( this.coordonate.getDistanceTo(food.coordonate) < VIEW_RANGE ) {
                    lsFoodNear.push(food);
                }
            });




            if ( lsFoodNear.length > 0 ) {
                
                let target = lsFoodNear[getRandomInt(lsFoodNear.length)];
                let directionToFood = target.coordonate.copy();
                directionToFood.substract(this.coordonate);
                directionToFood.normalize();

                if ( radiansToDegrees(getAngle( this.vector , directionToFood )) < VIEW_ANGLE / 2 ) {
                    this.target = target;
                }

            }

        }else{
            
            this.desiredDirection = this.target.coordonate.copy();
            this.desiredDirection.substract(this.coordonate);
            this.desiredDirection.normalize();

            if ( this.coordonate.getDistanceTo(this.target.coordonate ) < PICKUP_DISTANCE ) {
                let i = getIndex(lsFood,this.target)
                if ( i != null) {
                    lsFood.splice(i,1);
                    this.haveFood = true;
                    this.desiredDirection.invert();
                    this.desiredDirection.multiply(100)

                    test = true

                }
                this.target = null;
            }


        }

    }

    handlerNest() {

        if ( this.target == null ) {

            if ( this.coordonate.getDistanceTo(nest.coordonate) < VIEW_RANGE ) {
                
                let target = nest;
                let directionToNest = target.coordonate.copy();
                directionToNest.substract(this.coordonate);
                directionToNest.normalize();

                if ( radiansToDegrees(getAngle( this.vector , directionToNest )) < VIEW_ANGLE / 2 ) {
                    this.target = target;
                }


            }
        
        }else{
            
            this.desiredDirection = this.target.coordonate.copy();
            this.desiredDirection.substract(this.coordonate);
            this.desiredDirection.normalize();

            if ( this.coordonate.getDistanceTo(this.target.coordonate ) < PICKUP_DISTANCE ) {
                nest.nbFood++;
                this.haveFood = false;
                this.target = null;
                this.desiredDirection.invert();
                this.desiredDirection.multiply(100)
            }



        }


    }

    followPheromone(){

        let vector = null;

        //console.log ( this.leftSensor.power , this.middleSensor.power )

        if ( ( this.leftSensor.power  > this.middleSensor.power ) && ( this.leftSensor.power  > this.rightSensor.power) ) {

            vector = this.leftSensor.coordonate.copy();

        }else{

            if ( this.middleSensor.power > this.rightSensor.power ) {

                vector = this.middleSensor.coordonate.copy();
                

            }else if ( this.middleSensor.power < this.rightSensor.power) {

                vector = this.rightSensor.coordonate.copy();

            }


        }

        if ( vector != null ){

            vector.substract(this.coordonate);
            vector.multiply(3)
            this.desiredDirection.add(vector);

        }

        



    }



    renderSensor( ctx ) {
        ctx.fillStyle = 'black';
        this.leftSensor.render(ctx);
        this.middleSensor.render(ctx);
        this.rightSensor.render(ctx);
    }

    render ( ctx ) {

        if ( this.haveFood ){
            ctx.fillStyle = 'blue';
        }else{
            ctx.fillStyle = 'black';
        }
        
        ctx.beginPath();
        ctx.arc(this.coordonate.x , this.coordonate.y , 4 , 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
    }

}

class Nest {

    constructor ( x ,y ) {
        this.coordonate = new Vector2 ( x , y );
        this.nbFood = 0;
    }

    render ( ctx ) {
        ctx.beginPath();
        ctx.arc(this.coordonate.x , this.coordonate.y , 10 , 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = 'black';
        ctx.fillText(this.nbFood , this.coordonate.x - 5 , this.coordonate.y +5);
    }



}

class Sensor {

    constructor () {
        this.coordonate = new Vector2 ( 0 , 0 );
        this.power = 0;
    }

    update( haveFood ){
        this.power = 0;
        lsPheromone.forEach(pheromone => {

            //console.log( pheromone.goHome == this.haveFood)

            
            if ( (pheromone.goHome != haveFood) ) {


                if ( rectangleIntersect(this.coordonate.x - MIDDLE_SIDE_SENSOR , this.coordonate.y - MIDDLE_SIDE_SENSOR , SIDE_SENSOR , SIDE_SENSOR , pheromone.coordonate.x , pheromone.coordonate.y ) ){
                    this.power++;

                }
/*
                if ( pheromone.coordonate.getDistanceTo(this.coordonate) < MIDDLE_SIDE_SENSOR ){
                }*/


            }

        });
        //console.log(this.power)

    }

    render ( ctx ) {
        ctx.fillRect( this.coordonate.x - MIDDLE_SIDE_SENSOR , this.coordonate.y - MIDDLE_SIDE_SENSOR , SIDE_SENSOR , SIDE_SENSOR );
    }

}

class Pheromone {

    constructor ( x , y , goHome ) {
        this.coordonate = new Vector2 ( x , y );
        this.lifeTime = LIFE_TIME_PHEROMONE;
        this.goHome = goHome;
    }

    update() {
        this.lifeTime--;
        if ( this.lifeTime == 0) {
            lsPheromone.splice(getIndex(lsPheromone,this), 1)
        }
    }

    equal( pheromone ){
        return (this.coordonate.equal(pheromone.coordonate)) && (this.lifeTime == pheromone.lifeTime)
    }

    render() {

        if ( this.goHome ){
            ctx.fillStyle = 'blue';
        }else{
            ctx.fillStyle = 'purple';
        }


        ctx.beginPath();
        ctx.arc(this.coordonate.x , this.coordonate.y , 1 , 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
    }

}

class Food {

    constructor ( x , y ) {
        this.coordonate = new Vector2 ( x , y );
    }

    equal( food ){
        return (this.coordonate.equal(food.coordonate))
    }

    render ( ctx ) {
        ctx.beginPath();
        ctx.arc(this.coordonate.x , this.coordonate.y , 2 , 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
    }

}


function getAngle ( vector1 , vector2 ) {
    return Math.acos( vector1.dotProduct(vector2) / ( vector1.getDistance() * vector2.getDistance() ))
}

function rectangleIntersect(x1, y1, w1, h1, x2, y2) {
    if (x2 > w1 + x1 || x1 > x2 || y2 > h1 + y1 || y1 > y2){
        return false;
    }
    return true;
}

function randomPointInsideUnitCircle () {
    let vector = new Vector2 ( Math.random() * 2 - 1 , Math.random() * 2 - 1 );
    if ( vector.getDistance() > 1 ) {
        vector.normalize();
    }
    return vector;
}

function radiansToDegrees(radians) {
  return radians * (180/Math.PI);
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function getIndex(ls,value){
    let i = 0
    let state = false;
    let r = null
    while ( i < ls.length && !(state) ){
        if ( value.equal(ls[i]) ){
            r = i
            state = true;
        }

        i++;
    }
    return r;
}


function init(){
    
    for ( let i = 0 ; i < 200 ; i++ ) {
        lsFood.push(new Food(550 +getRandomInt(100) , 500 + getRandomInt(100)));
    }
    /*
    for ( let i = 0 ; i < 100 ; i++ ) {
        lsFood.push(new Food(400 +getRandomInt(100) , 50 + getRandomInt(100)));
    }
    for ( let i = 0 ; i < 100 ; i++ ) {
        lsFood.push(new Food(500 +getRandomInt(100) , 400 + getRandomInt(100)));
    }
    */
    

    for ( let i = 0 ; i < 50 ; i++ ) {
        lsAnt.push(new Ant( innerWidth/2 , innerHeight/2));
    }

}

let nest = new Nest(innerWidth/2,innerHeight/2);

function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,canvas.width,canvas.height);

    lsAnt.forEach(ant => {
        
        if ( !(ant.haveFood)){
            ant.handlerFood();
        }else{
            ant.handlerNest();
        }

        ant.followPheromone();
        ant.update();
        ant.updateSensor();

        

        //ant.boundOff();
        ant.render(ctx);
        //ant.renderSensor(ctx);

        if ( ant.timeBeforePheromone == 0 ) {
            lsPheromone.push(new Pheromone(ant.coordonate.x,ant.coordonate.y,ant.haveFood));
            ant.timeBeforePheromone = TIME_MAX_BEFORE_PHEROMONE;
        }

        
    });

    

    
    
    

    
    

    ctx.fillStyle = 'green';

    lsFood.forEach(food => {
        food.render(ctx);
    });

    lsPheromone.forEach(pheromone => {
        pheromone.update();
        pheromone.render(ctx);
    });

    nest.render(ctx );
}

init();
animate();

/*
let vector = new Vector2(1,1)
vector.setMagnitude(3);
console.log(vector)
*/