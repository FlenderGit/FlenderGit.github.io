const leftButton = document.querySelector('.leftButton');
const rightButton = document.querySelector('.rightButton');

const expliProject = document.querySelector('.expliProject');
const expliCloseBtn = document.querySelector('.expli-close-btn');

const cube = document.querySelector('.cube');


let i = 0



rightButton.addEventListener('click',(e)=>{

    e.preventDefault();
    if ( i <5){
        i++;
    }else{
        i = 0;
    }

    console.log(i)
    
    makeChange();

});

leftButton.addEventListener('click',(e)=>{

    e.preventDefault();
    if ( i >0){
        i--;
    }else{
        i = 5;
    }

    
    makeChange();

});

function makeChange(){

    expliProject.classList.remove('show')

    switch (i){
        
        case 0:
            cube.classList = 'cube'
            cube.classList.add('boid');
            expliProject.classList.add('show')
            document.getElementById('expli').style.backgroundColor = 'rgba(0,175,150)' ;
            document.getElementById('expli-txt').innerHTML = "<a href='Boids\\boid.html'>Boid Simulation</a><p>Un Boid est une simulation de vol d'oiseau. </p><p> Pour plus d'information : ...</p>"
            break;
        case 1:
            cube.classList = 'cube'
            cube.classList.add('perlin');
            expliProject.classList.add('show')
            document.getElementById('expli').style.backgroundColor = 'rgba(150,0,175)' ;
            document.getElementById('expli-txt').innerHTML = "<a href='CubeWorld\\cubeWorld.html'>CubeWorld</a><p>CubeWorld est un mini jeu disponible sur navigateur. La map est générée grace au bruit de Perlin.</p><p> Pour plus d'information : ...</p>"
            break;

        case 2:
            cube.classList = 'cube'
            cube.classList.add('carML');
            expliProject.classList.add('show')
            document.getElementById('expli').style.backgroundColor = 'blue' ;
            break;

        case 3:
            cube.classList = 'cube'
            cube.classList.add('ascii');
            expliProject.classList.add('show')
            document.getElementById('expli').style.backgroundColor = 'yellow' ;
            break;

        case 4:
            cube.classList = 'cube'
            cube.classList.add('ascii');
            expliProject.classList.add('show')
            document.getElementById('expli').style.backgroundColor = 'purple' ;
            break;

        case 5:
            cube.classList = 'cube'
            cube.classList.add('ascii');
            expliProject.classList.add('show')
            document.getElementById('expli').style.backgroundColor = 'grey' ;
            break;


    }

}



expliCloseBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    expliProject.classList.remove('show')
    document.getElementById('expli').style.backgroundColor ='black';
    document.getElementById('expli-txt').innerHTML = ""
});