var buttons = document.querySelectorAll('button');
var input = document.querySelector('#input');
var value = "0";
var valueStore = 0;
var operator; /* undefined */
var operators = ["%", "AC", "+", "-", "/", "*", "="]
var chaining = false;

//maybe add object for key events

buttons.forEach(function(button){
    button.addEventListener('click', calculateField);
});

// clearing and resetting
function clearField(){
    input.textContent = "0";
    value = "0";
    valueStore = 0;
    operator = undefined;
}

// when an operator key is pressed
function operatorsLogic(keyValue){
    if(operator === undefined){
        operator = keyValue;
        valueStore = value;
        value = operator;
    }

    else if(operator){
        valueStore = valueStore + operator + value;
        operator = keyValue;
        value = operator;
    }  

    if(keyValue === "="){
        calculateTotal();
        operator = "=";
    }

    if(keyValue === "AC"){
        clearField();
    }
    
}

// logic for '=' calc
function calculateTotal(){
    value = eval(valueStore);

}

function calculateField(){
    // what key was pressed
    var keyValue = this.textContent;

    // if the last button pressed was an operator set value to "0" so that logic works
    if(operators.includes(input.textContent) ){
        value = "0";
    }

    if(operator === "="){
        clearField();
    }

    //if there's no value in input field and it's not an operator key
    if(value === "0" && !operators.includes(keyValue)){
        value = keyValue;
    }
    
    else if(operators.includes(keyValue)){
        operatorsLogic(keyValue);
    }          

    else if(keyValue === "+/-"){
        value = value * -1;
    }

    else{
        value += keyValue;
    }

    // all equations adjust the input to 'value'
    input.textContent = value;
}