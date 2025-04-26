const buttons = document.getElementById('buttons');
let displayInput = document.getElementById('input');
let calculation = document.getElementById('calculation');
let displayedResult = false;

displayInput.addEventListener('input', calculateResult);

buttons.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        const buttonValue = e.target.textContent;
        handleBtnClick(buttonValue);
    }
})

let operators = ['+', '-', '/', 'x', '%'];
let containsOperator = operators.some(operator => displayInput.value.includes(operator));

function handleBtnClick(value) {
    if (value === 'C') {
        displayedResult = false;
        calculation.textContent = '';
        displayInput.value = '';
        displayInput.classList.remove('removed');
        calculation.classList.remove('active');
    } else if (value === '=') {
        if (calculation.textContent.length > 0) {
            displayedResult = true;
            displayInput.classList.add('removed');
            calculation.classList.add('active');
        } else {
            displayedResult = true;
            displayInput.value = 'error';
        }
    } else if (value === 'DEL') {
        if (displayedResult) {
            displayedResult = false;
            displayInput.classList.remove('removed');
            calculation.classList.remove('active');
        }
        
        if (displayInput.value.length > 0) {
            displayInput.value = displayInput.value.slice(0, -1);
        }
    } else {
        displayInput.classList.remove('removed');
        calculation.classList.remove('active');

        if (displayedResult && !isNaN(value)) {
            displayedResult = false;
            displayInput.value = value;
        } else if (displayedResult && isNaN(value)) {
            displayedResult = false;
            displayInput.value = calculation.textContent;
            displayInput.value += value;
        } else {
            displayedResult = false;
            displayInput.value += value;
        }

        displayInput.scrollLeft = displayInput.scrollWidth;
    }
    calculateResult();
}

function calculateResult() {
    let inputValue = displayInput.value;
    inputValue = inputValue.replace(/x/gi, '*');
    if (/[+\-*/%]\d/.test(inputValue)) {
        try {
            let result = eval(inputValue);
            if (!isNaN(result)) {
                calculation.textContent = result;
                calculation.scrollLeft = calculation.scrollWidth;
            } else {
                calculation.textContent = '';
            }
        } catch (error) {
            calculation.textContent = '';
        }
    } else {
        calculation.textContent = '';
    }
}