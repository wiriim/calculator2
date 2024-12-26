function add(a, b){
    return +(a + b).toFixed(9);
}
function subtract(a, b){
    return +(a - b).toFixed(9);
}
function multiply(a, b){
    return +(a * b).toFixed(1);
}
function divide(a, b){
    return +(a / b).toFixed(9);
}
function updateDisplay(display){
    if (display[0] === "0" && String(display).length > 1 && display[1] !== ".")
        displayContainer.textContent = String(display).slice(1);
    else
        displayContainer.textContent = display;
    return display;
}

function operate(a, b, op){
    if (op === "/"){
        return divide(a, b);
    }
    else if (op === "X"){
        return multiply(a, b);
    }
    else if (op === "-"){
        return subtract(a, b);
    }
    else if (op === "+"){
        return add(a, b);
    }
    else if (op === "="){
        display = operate(a, b, operator);
        updateDisplay(display);
        reset();
        return;
    }
    else if (op === "AC"){
        updateDisplay(0);
        reset();
        return 0;
    }
    else if (op === "placeholder"){
        if (num2 === null) return num1;
        else return num2;
    }
    else if (op === "+/-"){
        return +display * -1;
    }
    else if (op === "B"){

        if (String(display).length === 1)
            return 0;
        else{
            return +(String(display).slice(0, String(display).length-1));
        }
            
    }
}
function reset(){
    num1 = null;
    num2 = null;
    operator = null;
    display = 0;
    firstTimeInput = true;
    resetDisplay = false;
    commaIsNotClicked = true;
}

let num1 = null;
let num2 = null;
let operator = null;
let display = 0;
let firstTimeInput = true;
let resetDisplay = false;
let commaIsNotClicked = true;

const displayContainer = document.querySelector(".display");
displayContainer.textContent = display;

const buttons = document.querySelectorAll(".button");
buttons.forEach(button => {
    button.addEventListener("click", e => exec(e.target));
});

function exec(target){
    const isNumber = /\d/.test(target.textContent);
    const content = target.textContent;
    
    if (isNumber)
    {
        resetDisplay === true ? display = 0 : display;
        content === "0" && String(display).length === 1 ? 
        display = content : display += content;

        if (display.length > 13){
            return;
        }
        
        if (firstTimeInput)
        {
            num1 = +display;
        }
        else if (!firstTimeInput)
        {
            num2 = +display;
        }
        updateDisplay(display);
        resetDisplay = false;
    }
    else if (!isNumber)
    {
        
        //special operator
        if (content === "AC")
        {
            operate(num1, num2, content);
        }
        else if (content === ".")
        {
            if (commaIsNotClicked === true && resetDisplay === false) {
                commaIsNotClicked = false;
                display += "." 
                updateDisplay(display);
                resetDisplay = false;
                return;
            }
            else if (commaIsNotClicked === true && resetDisplay === true){
                commaIsNotClicked = false;
                display = "0.";
                updateDisplay(display);
                resetDisplay = false;
                return
            }
            else{
                return;
            }
        }
        else if (content === "+/-"){
            display = operate(num1, num2, content);
            updateDisplay(display);
            num2 === null ? num1 = display : num2 = display;
            return;
        }
        else if (content === "B"){
            display = operate(num1, num2, content);
            updateDisplay(display);
            if (num2 === null){
                display === 0 ? num1 = null : num1 = display;
            }
            else {
                display === 0 ? num2 = null : num2 = display;
            }
            return;
        }
        
        num1 === null ? firstTimeInput = true : firstTimeInput = false;
        resetDisplay = true;
        commaIsNotClicked = true;
        //basic operator
        if (num2 === null)
        {
            operator = content;
            content === "=" ? operator = "placeholder" : operator = operator;
        }
        else if (num2 !== null)
        {
            display = updateDisplay(operate(num1, num2, operator));
            num1 = +display;
            num2 = null;
            content === "=" ? operator = "placeholder" : operator = content;
        }
    }

    console.log(`${num1},${operator},${num2}`);
    console.log("-------------");
}

