// const header = document.querySelector(".header");
// const snoContainer = document.querySelector(".sno-container");
// const rowsContainer = document.querySelector(".rows-container");

// // function onCellFocus(event){
// //     console.log(event.target);
// // }
// let rows = 50;
// let columns = 27;
// for(let i = 0; i < columns; i++){
//     const cell = document.createElement("div");
//     i != 0 && (cell.innerText = String.fromCharCode(64+ i));
//     i === 0 ? (cell.className = "first-cell") : (cell.className = "cell");
//     header.appendChild(cell);
// }

// function createRow(rowNumber){
//     const row = document.createElement("div");
//     row.className = "row";
//     for(let i = 1; i < columns; i++){
//         const cell = document.createElement("div");
//         cell.className = "cell";
//         cell.contentEditable = true;
//         cell.id = `${String.fromCharCode(64 + i)}${rowNumber}`;
//         // cell.addEventListener("focus", onCellFocus);
//         cell.addEventListener("focus", applyCurrentCellStylesToForm);

//         row.appendChild(cell);
//     }
//     return row;
// }

// for(let i = 1 ; i <= rows; i++){
//     const snocell = document.createElement("div");
//     snocell.innerText = i;
//     snocell.className = "sno";
//     snoContainer.appendChild(snocell);

//     let rowElement = createRow(i);
//     rowsContainer.appendChild(rowElement);

// }

let header = document.querySelector(".header");
let snoContainer = document.querySelector(".sno-container");
let rowsContainer = document.querySelector(".rows-container");

let columns = 27, rows = 50;

// Adding each cell in header with class name "cell"  and append to header 
//loop ittrate from 0 to 27 and displaying characer to each cell by using
//String.fromCharCode(64 + i) this code  where 65 = A, 66 = B 67 = C and so on
//    i === 0 ? (cell.className = "first-cell") : (cell.className = "cell");
//above line apply for first box top most corner

for (let i = 0; i < columns; i++) {
    let cell = document.createElement("div");
    if (i != 0)
        cell.innerHTML = String.fromCharCode(64 + i);
    i === 0 ? (cell.className = "first-cell") : (cell.className = "cell");

    header.appendChild(cell);
}

//adding cell-nor to sno-container 
//creating div whose class name is "sno" and adding a nors to perticular cell
//append snoCell(div) to snocontainer
//crete one function createRow which takes one parameter "i"

for(let i = 1; i <= rows; i++){
    const snoCell = document.createElement("div");
    snoCell.innerText = i;
    snoCell.className = "sno";
    snoContainer.appendChild(snoCell);

    let rowElement = createRow(i);
    rowsContainer.appendChild(rowElement);
}

//createRow function takes i as a parameter where it create 50 rows
//and return each row with class name "row"
function createRow(rowNumber){
    let row = document.createElement("div");
    row.className = "row";
    //<div class="row"><div class="cell">there are 27 cells in each row</div></div>
    for(let i = 1; i < columns; i++){
        let cell = document.createElement("div");
        cell.className = "cell"
        cell.contentEditable = "true";
        cell.id = `${String.fromCharCode(64 + i)}${rowNumber}` // this line for identifying each row with is it value like A1,B1,A2 so on 
        cell.addEventListener("focus", onCellFocus);
        row.appendChild(cell);
    }
    return row;
}
