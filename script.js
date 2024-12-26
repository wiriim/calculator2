function add(a, b){
    return a + b;
}
function subtract(a, b){
    return a - b;
}
function multiply(a, b){
    return a * b;
}
function divide(a, b){
    return a / b;
}
function updateDisplay(display){
    displayContainer.textContent = +display;
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
}
function reset(){
    num1 = null;
    num2 = null;
    operator = null;
    display = 0;
    firstTimeInput = true;
    resetDisplay = false;
}

let num1 = null;
let num2 = null;
let operator = null;
let display = 0;
let firstTimeInput = true;
let resetDisplay = false;

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
        if (firstTimeInput)
        {
            display += content;
            num1 = +display;
            updateDisplay(display);
        }
        else if (!firstTimeInput)
        {
            display += content;
            num2 = +display;
            updateDisplay(display);
        }
        resetDisplay = false;
    }
    else if (!isNumber)
    {
        num1 === null ? firstTimeInput = true : firstTimeInput = false;
        resetDisplay = true;
        //special operator
        if (content === "AC")
        {
            operate(num1, num2, content);
        }


        //basic operator
        if (num2 === null)
        {
            operator = content;
        }
        else if (num2 !== null)
        {
            display = updateDisplay(operate(num1, num2, operator));
            num1 = +display;
            num2 = null;
            operator = content;
        }
    }

    // console.log("num1: " + num1);
    // console.log("num2: " + num2);
    // console.log("-------------")
}

