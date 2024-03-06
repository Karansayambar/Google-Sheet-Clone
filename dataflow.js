const selectedCellElement = document.querySelector(".selected-cell");
const form = document.querySelector("form");

const state = {};
const defaultStyles = {
    fontFamily:"monospace",
    fontSize:16,
    bold:false,
    italic: false,
    underlined:false,
    align: "left",
    bgColor: "transparent",
    color:"#000",
}

form.addEventListener("change",()=>{
    const selectedValues = {
        fontFamily: form.fontFamily.value,
        fontSize: Number(form.fontSize.value),
        bold:form.bold.checked,
        italic:form.italic.checked,
        underlined:form.underlined.checked,
        align: form.align.value,
        Color:form.textColor.value,
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

})
 
let selectedCell = null;

function onCellFocus(event){
    selectedCell = event.target.id;
    selectedCellElement.innerText = selectedCell;
    if(!state[selectedCell]){
        state[selectedCell] = defaultStyles;
    }
    applayCurrentCellStylesToForm();
} 

function applayCurrentCellStylesToForm(){
    // apply styles to the current selected cell to the form
    for(let key in state[selectedCell]){
        form[key].type === "checkbox" ?
        (form[key].checked = state[selectedCell][key]) :
        (form[key].value = state[selectedCell][key])    
    }
}  