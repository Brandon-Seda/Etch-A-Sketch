import style from "./Etch-A-Sketch/style.css";


const gridContainer =  document.querySelector('.grid-container'); 

//creates divs based on size given from user
function createGrid(size){

    for(let i=0; i < size; i++){
        const gridBox = createElement('div');
        gridBox.setAttribute('id', 'box');
        gridBox.addEventListener('hover', changeColor)

        gridContainer.appendChild(gridBox);
    }
}

//changes grid box color based on event happening
function changeColor(event){
    if (event.propertyName == 'hover'){
       
    }

}

//draws when mouse event is clicked
function draw(){

}

//clears the screen on button click
function clear(){

}

