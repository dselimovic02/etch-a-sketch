const defaultBackground = "rgb(255, 255, 255)";
const cells = document.querySelectorAll(".cell");
const clear = document.querySelector(".clear");
const penBtns = document.querySelectorAll(".options button");
const penOptions = {
    "PEN": "black",
    "MRKR": [
        "rgb(255, 255, 255)",
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



setCellColor();




/*EVENT LISTENERES*/ 

/*Paint cells*/
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

clear.addEventListener("click", clearCells);

penBtns.forEach(pen => {
    pen.addEventListener("click", () => {
        if(setPen != pen.innerText){
            //clearCells();
            setPen = pen.innerText;
        }
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
     console.log(backgroundColor);
     console.log(penOptions.RNBW.indexOf(backgroundColor));
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