//selecting elements from DOM

const userInput = document.querySelector(".user-input");
const key = document.querySelectorAll(".key");
const resetKey = document.querySelector(".reset-key");
const answerKey = document.querySelector(".answer-key");
const deleteKey = document.querySelector(".delete-key");

let lastKeyIsOperator = false;
let decimalAdded = false;

deleteKey.addEventListener("click", ()=>{
    let initialValue = userInput.value;
    let updatedValue = initialValue.substring(0/*inclusive*/, initialValue.length-1/*exclusive*/);
    userInput.value = updatedValue;
})

answerKey.addEventListener("click", ()=>{
    const expression = userInput.value;
    const formattedExpression = expression.replace("X","*"); //javascript uses multiplication as '*'.
    const result = eval(formattedExpression);
    userInput.value = result;
})

resetKey.addEventListener("click", ()=>{
    userInput.value = ""; //clears the inputValue
});

const keyArray = Array.from(key)
keyArray.forEach((key)=>key.addEventListener("click",(event)=>{
    const value = event.target.innerText; //it retrieves the text content of the clicked key

    if(value === '.' && decimalAdded){  /* one number can not have multiple decimals (multiple decimal are avoided)*/
        return;
    }
    if('+-/*'.includes(value)){
        if(lastKeyIsOperator){ // handle cases where the user clicks multiple elements in succession
            let initialValue = userInput.value;
            let updatedValue = 
            initialValue.substring(0, initialValue.length-1)+value;
            userInput.value = updatedValue;
            return;
        }
        lastKeyIsOperator = true;
        decimalAdded = false; //after adding the operator, there will be a new number with decimalAdded= false
    }
    else {
        lastKeyIsOperator = false;
        if(value === '.'){
            decimalAdded = true;
        }
    }
    // Append the clicked key value to the user input
    userInput.value += value;
}))