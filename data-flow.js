const selectedCellElement = document.querySelector(".selected-cell");
const form = document.querySelector("form");
let state = {};
let totalSheet = 1, activSheetName = "sheet1";

const defaultStyle = {
    fontFamily: "monospace",
    fontSize: 16,
    bold: false,
    italic: false,
    underlined: false,
    align: "left",
    bgColor: "#ffffff",
    textColor: "#00000"
}
function applyStylesToElement(element, styles) {
    element.style.fontFamily = styles.fontFamily;
    element.style.fontSize = `${styles.fontSize}px`;
    element.style.textAlign = styles.align;

    element.style.fontWeight = styles.bold ? "bold" : "Lighter";
    element.style.fontStyle = styles.italic ? "italic" : "normal";
    element.style.textDecoration = styles.underline ? "underline" : "none";

    element.style.color = styles.textColor;
    element.style.backgroundColor = styles.bgColor;
} 

form.addEventListener("change", () => {
    let selectedValues = {
        fontFamily: form.fontFamily.value,
        fontSize: Number(form.fontSize.value),
        bold: form.bold.checked,
        italic: form.italic.checked,
        underline: form.underline.checked,
        align: form.align.value,
        textColor: form.textColor.value,
        bgColor: form.bgColor.value,
    }
    console.log(selectedValues);


    //applay style to the selected cell

    const selectedCellElement = document.getElementById(selectedCell);
    //apply style to the selected cell
    applyStylesToElement(selectedCellElement, selectedValues)
    // selectedCellElement.style.fontFamily = selectedValues.fontFamily;
    // selectedCellElement.style.fontSize = `${selectedValues.fontSize}px`;
    // selectedCellElement.style.textAlign = selectedValues.align;

    // selectedCellElement.style.fontWeight = selectedValues.bold ? "bold" : "Lighter";
    // selectedCellElement.style.fontStyle = selectedValues.italic ? "italic" : "normal";
    // selectedCellElement.style.textDecoration = selectedValues.underline ? "underline" : "none";

    // selectedCellElement.style.color = selectedValues.textColor;
    // selectedCellElement.style.backgroundColor = selectedValues.bgColor;

    state[selectedCell] = selectedValues;
})

let selectedCell = null;
function onCellFocus(event) {
    if (selectedCell) {
        document.getElementById(selectedCell).classList.remove("active-cell");
    }
    // console.log(event.target);
    selectedCell = event.target.id;
    selectedCellElement.innerText = selectedCell;

    if (!state[selectedCell]) {
        //when the cell is focused on first time
        state[selectedCell] = defaultStyle;
    }
    document.getElementById(selectedCell).classList.add("active-cell");

    applyCurrentCellStylesToForm()
}

function applyCurrentCellStylesToForm() {
    // apply styles of the current selectedcell to the form
    // form.bold.checked = state[selectedCell].bold;
    // form.italic.checked = state[selectedCell].italic;
    // form.underline.checked = state[selectedCell].underline;

    // form.align.value = state[selectedCell].align;
    // form.fontFamily.value = state[selectedCell].fontSize;
    // form.fontFamily = state[selectedCell].fontFamily;
    // form.textColor.value = state[selectedCell].textColor;
    // form.bgColor.value = state[selectedCell].bgColor;

    for (let key in state[selectedCell]) {
        form[key].type === "checkbox" ?
            (form[key].checked = state[selectedCell][key]) :
            (form[key].value = state[selectedCell][key]);
    }
}

// expression evalution

const fx = document.getElementById("fx");
fx.addEventListener("keyup", (e) => {
    if ("Enter" === e.code && selectedCell) {
        let expression = fx.value;
        let result = eval(expression);
        document.getElementById(selectedCell).innerText = result;
        fx.value = "";
    }
})




/**
New Sheet flow
when user switches to new sheet
1.save the old sheet data
2.clear all the cells which are effected in previous sheet
    1)remove active cell class
    2)remove style arribute
    3)remove innertext
    4)reset the form
*/
let footForm = document.querySelector(".foot-form");

footForm.addEventListener("change", (event) => {
    let newSheetName = event.target.value;
    console.log(activSheetName, state);
    localStorage.setItem(activSheetName, JSON.stringify(state));
    console.log("save above key value pair");
    //clear all the effected in current sheet
    for (let cellId in state) {
        clearCell(cellId);

    }
    //reset the state object
    let existingData = localStorage.getItem(newSheetName);
    if (existingData) {
        state = JSON.parse(existingData);
        for(let cellId in state){
            const cellElement = document.getElementById(cellId);
            applyStylesToElement(cellElement, state[cellId]);
        } 
    } else {
        //as there is no existing data
        state = {};
    }
    //update the active sheet name to be the selected one 
    activSheetName = newSheetName;
})

function createNewSheet() {
    totalSheet++;
    let newSheetName = `Sheet ${totalSheet}`
    const inputContainer = document.createElement("div");
    inputContainer.innerHTML =
        `
     <div class="foot-form">
        <input type="radio" id="${newSheetName}" name="sheet" value="${newSheetName}">
        <label for="${newSheetName}">${newSheetName}</label>
    </div>`
    footForm.appendChild(inputContainer);
}
function clearCell(cellId) {
    let cell = document.getElementById(cellId);
    cell.innerText = '';
    cell.removeAttribute("style");
    cell.classList.remove("active-cell");
}