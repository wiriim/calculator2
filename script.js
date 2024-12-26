function add(a, b){
    return +(a + b).toFixed(9);
}
function subtract(a, b){
    return +(a - b).toFixed(9);
}
function multiply(a, b){
    return +(a * b).toFixed(9);
}
function divide(a, b){
    if (b === 0){
        operate(a, b, "AC");
        displayContainer.textContent = "No division by 0";
        return;
    }
    return +(a / b).toFixed(9);
}
function updateDisplay(display){
    if (display[0] === "0" && String(display).length > 1 && display[1] !== ".")
        displayContainer.textContent = String(display).slice(1);
    else
        displayContainer.textContent = display;

    if (String(display).length > 15){
        displayContainer.style.display = "block";
    }else{
        displayContainer.style.display = "flex";
    }
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
    highlight(target);
    const isNumber = /\d/.test(target.textContent);
    const content = target.textContent;
    
    if (isNumber)
    {
        resetDisplay === true ? display = 0 : display;
        content === "0" && String(display).length === 1 ? 
        display = content : display += content;

        if (display.length > 15){
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
            if (!String(display).includes(".") && resetDisplay === false) {
                display += "." 
                updateDisplay(display);
                resetDisplay = false;
                return;
            }
            else if (!String(display).includes(".") && resetDisplay === true){
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

window.addEventListener("keydown", e => keyExec(e.key));

function keyExec(key){
    buttons.forEach(button => {
        if (button.textContent === key || button.id === key){
            console.log(button.id)
            exec(button);
        }
    });
};

function highlight(button){
    buttons.forEach(button => {
        const style = window.getComputedStyle(button);
        const rgbValue = style.getPropertyValue("background-color");
        const rgbString = rgbValue.match(/\d+/g);
        button.style.backgroundColor = 
        `rgba(${rgbString[0]}, ${rgbString[1]}, ${rgbString[2]}, 1)`;
    });
    const style = window.getComputedStyle(button);
    const rgbValue = style.getPropertyValue("background-color");
    const rgbString = rgbValue.match(/\d+/g);
    button.style.backgroundColor = 
    `rgba(${rgbString[0]}, ${rgbString[1]}, ${rgbString[2]}, 0.5)`;
}
