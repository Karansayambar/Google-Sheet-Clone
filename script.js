const header = document.querySelector(".header");
const snoContainer = document.querySelector(".sno-container");
const rowsContainer = document.querySelector(".rows-container");

// function onCellFocus(event){
//     console.log(event.target);
// }

let column = 27;
for(let i = 0; i < column; i++){
    const cell = document.createElement("div");
    i != 0 && (cell.innerText = String.fromCharCode(64+ i));
    i === 0 ? (cell.className = "first-cell") : (cell.className = "cell");
    header.appendChild(cell);
}

function createRow(rowNumber){
    const row = document.createElement("row");
    row.className = "row";
    for(let i = 1; i < column; i++){
        const cell = document.createElement("div");
        cell.contentEditable = true;
        cell.id = `${String.fromCharCode(64 + i)}${rowNumber}`;
        cell.addEventListener("focus",onCellFocus);
        cell.className = "cell";
        row.appendChild(cell);
    }
    return row;
}

let rows = 50;
for(let i = 1 ; i <= rows; i++){
    const snocell = document.createElement("div");
    snocell.innerText = i;
    snoContainer.appendChild(snocell);
    snocell.className = "snocell";
    let rowElement = createRow(i);
    rowsContainer.appendChild(rowElement);

}