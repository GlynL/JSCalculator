var buttons = document.querySelectorAll('button');
var input = document.querySelector('#input');
var value = input.textContent;
var valueStore  ;
var operator; /* undefined */
var newCalc = true;
var chaining = false;
var operators = ["C", "%", "+", "-", "X", "÷"]

//maybe add object for key events

buttons.forEach(function(button){
    button.addEventListener('click', calculateField);
});

function calculateField(){
    // what key was pressed
    var keyValue = this.textContent;
    
    //if it's a new calulation
    if(newCalc){
        value = "0";
    }

    //if there's no value in input field and it's not an operator key
    if(value === "0" && operators.indexOf(keyValue) === -1 && keyValue !== "="){
        value = keyValue;
        newCalc = false;
    }

    else if(chaining === true && operators.indexOf(keyValue)=== -1 && keyValue !== '='){
        value = keyValue;
    }

    // below all operators & '='

    //if clear button clicked
    else if(keyValue === "C"){
        value = "0";
        valueStore = undefined;
        operator = undefined;
        newCalc = true;
        chaining = false;
    }

    //if dividing
    else if(keyValue === "÷"){
        valueStore = value;
        operator = "÷";
        value = "";
    }

    // if multiplying
    else if(keyValue === "X"){
        valueStore = value;
        operator = "X";
        value = "";
    }

    // if subtracting
    else if(keyValue ==="-"){
        if(chaining){
            value = valueStore - value;
            valueStore = value;
        }
        else{
            valueStore = value;
            value = "";
            chaining =true;
        }

        operator = "-";
        
    }

    //if adding
    else if(keyValue === "+"){
        if(chaining){
            value = Number(value) + Number(valueStore);    
            valueStore = value;     
        }
        else{
            valueStore = value;
            value = "";
            chaining = true;
        }   
        operator = "+";   
    }
        
    

    // if %
    else if(keyValue === "%"){
        value = value/100;
        newCalc = true;
        operator = "%";
    }

    // if +/-
    else if(keyValue ==="+/-"){
        value = value*-1;
    }

    // calculating
    else if(keyValue === "="){
        
        if(operator === undefined){
            value = "0"; /* do we need? */
        }
        // if dividing
        else if(operator === "÷"){
            value = valueStore/value;
        }
        //if multiplying
        else if(operator === "X"){
            value = valueStore*value;
        }

        // if subtracting
        else if(operator ==="-"){
            value = valueStore - value;
        }

        // if adding
        else if(operator === "+"){
            value = Number(valueStore) + Number(value);
        }
    }

    // above all operators & '='

    //for inputting 2+ digits
    else{
        value += keyValue;
    }

    // all equations adjust the input to 'value'
    input.textContent = value;
}


// make chaining equations work
// converting to number?


// can we create a function for the operators in calculating section
    // valuestore + operator + value ????
    // operator needs to be a value and not a string

