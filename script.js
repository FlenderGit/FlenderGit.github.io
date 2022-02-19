const boidButton = document.querySelector('.boidButton');
const perlinButton = document.querySelector('.perlinButton');
const carMLButton = document.querySelector('.carMLButton');
const asciiButton = document.querySelector('.asciiArtButton');
const minecraftButton = document.querySelector('.minecraftButton');

const expliProject = document.querySelector('.expliProject');





const cube = document.querySelector('.cube');
console.log("Test" , carMLButton);

boidButton.addEventListener('click',(e)=>{
    e.preventDefault();
    cube.classList = 'cube'
    cube.classList.add('boid');
    expliProject.classList.add('show')
    let expli = document.getElementById('id')
    expli.style.backgroundColor = 'green' ;
    expli.innerHTML = "<a href='Boids\\boid.html'>Boid Simulation</a><p>Une simulation de boid est ...</p><p>Pour plus d'information : ...<p/>";
});

perlinButton.addEventListener('click',(e)=>{
    e.preventDefault();
    cube.classList = 'cube'
    cube.classList.add('perlin');
    expliProject.classList.add('show')
    let expli = document.getElementById('id')
    expli.style.backgroundColor = 'red' ;
    expli.innerText = 'Perlin';
});

carMLButton.addEventListener('click',(e)=>{
    e.preventDefault();
    cube.classList = 'cube'
    cube.classList.add('carML');
    document.getElementById('id').style.backgroundColor = 'blue' ;
});

asciiButton.addEventListener('click',(e)=>{
    e.preventDefault();
    cube.classList = 'cube'
    cube.classList.add('ascii');
    document.getElementById('id').style.backgroundColor = 'yellow' ;
});

minecraftButton.addEventListener('click',(e)=>{
    e.preventDefault();
    cube.classList = 'cube'
    cube.classList.add('minecraft');
    document.getElementById('id').style.backgroundColor = 'purple' ;
});