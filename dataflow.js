const selectedCellElement = document.querySelector(".selected-cell");
const form = document.querySelector("form");

const state = {};
const defaultStyles = {
    fontFamily:"monospace",
    fontSize: 16,
    bold: false,
    italic: false,
    underlined:false,
    align: "left",
    bgColor: "#ffffff",
    textColor:"#000000",
}

form.addEventListener("change",()=>{
    const selectedValues = {
        fontFamily: form.fontFamily.value,
        fontSize: Number(form.fontSize.value),
        bold:form.bold.checked,
        italic:form.italic.checked,
        textDecoration: form.underlined.checked,
        underlined:form.underlined.checked,
        align: form.align.value,
        textColor:form.textColor.value,
        bgColor:form.bgColor.value,
    }

    console.log(selectedValues);
    // applay the style to selected cells
    const selectedCellElement = document.getElementById(selectedCell);
    selectedCellElement.style.fontFamily = selectedValues.fontFamily;
    selectedCellElement.style.fontSize = `${selectedValues.fontSize}px`;
    selectedCellElement.style.textAlign = selectedValues.align;
    selectedCellElement.style.fontWeight = selectedValues.bold ? "bold" : "Lighter";
    selectedCellElement.style.fontStyle = selectedValues.italic ? "italic" : "normal";
    selectedCellElement.style.textDecoration = selectedValues.underlined ? "underline" : "none";
    selectedCellElement.style.color = selectedValues.textColor,
    selectedCellElement.style.backgroundColor = selectedValues.bgColor;

    state[selectedCell] = selectedValues;
})
 
let selectedCell = null;

function onCellFocus(event){
    if(selectedCell){
        //remove the active-cell class for the previously focused cell
        document.getElementById(selectedCell).classList.remove("active-cell");
    }
    selectedCell = event.target.id;
    selectedCellElement.innerText = selectedCell;
    if(!state[selectedCell]){
        state[selectedCell] = defaultStyles;
    }
    //add active cell class for the newely focused element
    document.getElementById(selectedCell).classList.add("active-cell");
    applyCurrentCellStylesToForm();
} 

function applyCurrentCellStylesToForm() {
    // Apply styles to the current selected cell to the form

    form.bold.checked = state[selectedCell].bold;
    form.italic.checked = state[selectedCell].italic;
    form.underline.checked = state[selectedCell].underline;

    form.align.value = state[selectedCell].align;
    form.fontFamily.value = state[selectedCell].fontSize;
    form.fontFamily = state[selectedCell].fontFamily;
    form.textColor.value = state[selectedCell].textColor;
    form.bgColor.value = state[selectedCell].bgColor;

    // for (let key in state[selectedCell]) {
    //     const formElement = form[key];
    //     if (formElement) {
    //         if (formElement.type === "checkbox") {
    //             formElement.checked = state[selectedCell][key];
    //         } else {
    //             formElement.value = state[selectedCell][key];
    //         }
    //     }
    // }
}
