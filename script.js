const defaultBackground = "rgb(255, 255, 255)";
const clear = document.querySelector(".clear");
let cells = null;
const penBtns = document.querySelectorAll(".options button");
const penOptions = {
    "PEN": "black",
    "MRKR": [
        "rgba(0, 0, 0, 0.2)",
        "rgba(0, 0, 0, 0.4)",
        "rgba(0, 0, 0, 0.6)",
        "rgba(0, 0, 0, 0.8)",
        "black"
    ],
    "RNBW": [
        'rgb(255, 0, 0)',     // Red
        'rgb(255, 165, 0)',   // Orange
        'rgb(255, 255, 0)',   // Yellow
        'rgb(0, 255, 0)',     // Green
        'rgb(0, 0, 255)',     // Blue
        'rgb(75, 0, 130)',    // Indigo
        'rgb(148, 0, 211)'    // Violet
      ]
};
let setPen = "PEN";
const drawingArea = document.querySelector(".drawing-area");
const sizeBtns = document.querySelectorAll(".sizes button");
const sizes = {
    //no. of pixels per row per column
    "small": 16,
    "medium": 18,
    "large": 32
}



/*Initial option*/
showDrawingArea(16, 16);
addPropertiesToCells();


/*EVENT LISTENERES*/ 

clear.addEventListener("click", clearCells);

penBtns.forEach(pen => {
    pen.addEventListener("click", () => {
        if(setPen != pen.innerText){
            //clearCells();
            setPen = pen.innerText;
        }
    });
});
sizeBtns.forEach(size => {
    size.addEventListener("click", () =>{
        drawingArea.textContent = '';
        switch(size.id){
            case "small": showDrawingArea(sizes.small, sizes.small); break;
            case "medium": showDrawingArea(sizes.medium, sizes.medium); break;
            case "large": showDrawingArea(sizes.large, sizes.large); break;
        }
        addPropertiesToCells();
    });
});


/*FUNCTIONS*/
function setCellColor(){
    cells.forEach(cell => cell.style.background = defaultBackground);
}
function clearCells(){
    cells.forEach(cell => cell.style.background = defaultBackground);
}

function selectRandomRnbwColor(){
    let ran = Math.floor(Math.random() * 7);

    return penOptions.RNBW[ran];
}
function mrkrColor(backgroundColor){
    let colorIndex = penOptions.MRKR.map(color => color == backgroundColor).indexOf(true) + 1;

    return penOptions.MRKR[colorIndex];
}

function checkBackground(backgroundColor, penType){
    switch(penType){
        case "MRKR": 
            if(backgroundColor != "black") 
                return true; 
            break;
        case "RNBW": 
            if(penOptions.RNBW.indexOf(backgroundColor) < 0)
                return true;
            break;
    }
    return false;
}

function showDrawingArea(x, y){
    if(x < 1){
        return;
    }

    drawingArea.appendChild(generateRowOfCells(y));

    showDrawingArea(x - 1, y);
}

function generateRowOfCells(cellsNum){
     let row = document.createElement("div");
     row.classList.add("row");

    for(let i = 0; i < cellsNum; i++){
        row.appendChild(generateCell());
    }

    return row;
}

function generateCell(){
    let cell = document.createElement("div");
    cell.classList.add("cell");

    return cell;
}

function addPropertiesToCells(){
    cells = document.querySelectorAll(".cell");
    console.log(cells);
    setCellColor(cells);
    cells.forEach(cell => {
        cell.addEventListener("mouseover", ()=>{
            if(setPen == "RNBW"){
                if(checkBackground(cell.style.background, setPen))
                    cell.style.background = selectRandomRnbwColor();
            }else if(setPen == "MRKR"){
                if(checkBackground(cell.style.background, setPen)){
                    cell.style.background = mrkrColor(cell.style.background);
                }
            }else{
                cell.style.background = "black";
            }
            
        });
    });
}