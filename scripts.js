let black = '#000000';
let white = '#FFFFFF';
let color = black;


const gridContainer =  document.querySelector('.grid-container'); 
const clearBtn = document.querySelector('#clear');
const blueBtn = document.querySelector('#blue');
const blackBtn = document.querySelector('#black');
const whiteBtn = document.querySelector('#white');

clearBtn.addEventListener('click', clearGrid);

blueBtn.addEventListener('click', function(){
    console.log("blue button clicked");
    color = 'blue';
});
blackBtn.addEventListener('click', function(){
    console.log("black button clicked");
    color = black;

});
whiteBtn.addEventListener('click', function(){
    console.log("white button clicked");
    color = white;
});

let gridSize = 16;
let cells = []


//creates divs based on grid size or creates a default 16x16
function createGrid(size){

    let cellTotal = size * size;
    gridContainer.style.gridTemplateColumns = ('repeat(${size}, 1fr') ;
    gridContainer.style.gridTemplateRows = ('repeat(${size}, 1fr') ;

    for(let i=0; i < cellTotal; i++){
  
        cells[i] = document.createElement('div');
        cells[i].classList.add('box');
        cells[i].addEventListener('mouseover', draw);
        cells[i].addEventListener('click', clearCell);
        
        gridContainer.appendChild(cells[i]);
    }
}

createGrid(5);

//changes grid box color based on event happening
function draw(e){
    e.target.style.background = color;
    
}

//clears the screen on button click
function clearGrid(){
    cells.forEach(item => {
        item.style = 'background-color: #FFFFFF';
    });

}

function clearCell(e){
    e.target.style.background = white;
}

