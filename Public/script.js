// Seleção dos elementos do display
const previousOperandTextElement = document.getElementById('previous-operand');
const currentOperandTextElement = document.getElementById('current-operand');

// Variáveis para armazenar o estado da calculadora
let currentOperand = '0';
let previousOperand = '';
let operation = undefined;
let shouldResetScreen = false;

// Função para atualizar o display da calculadora
function updateDisplay() {
    currentOperandTextElement.innerText = currentOperand.replace('.', ',');
    if (operation != null) {
        previousOperandTextElement.innerText = `${previousOperand.replace('.', ',')} ${operation}`;
    } else {
        previousOperandTextElement.innerText = '';
    }
}

// Funções para manipular a lógica da calculadora
function appendNumber(number) {
    if (currentOperand === '0' || shouldResetScreen) {
        currentOperand = number.toString();
        shouldResetScreen = false;
    } else {
        // Limite de caracteres para não estourar a tela
        if(currentOperand.length > 12) return;
        currentOperand = currentOperand.toString() + number.toString();
    }
}

// Adiciona vírgula decimal
function appendDecimal() {
    if (shouldResetScreen) {
        currentOperand = '0.';
        shouldResetScreen = false;
        return;
    }
    if (currentOperand.includes('.')) return;
    currentOperand = currentOperand.toString() + '.';
}

// Escolhe a operação matemática
function chooseOperation(selectedOperation) {
    if (currentOperand === '') return;
    if (previousOperand !== '') {
        calculate();
    }
    operation = selectedOperation;
    previousOperand = currentOperand;
    currentOperand = '';
    updateDisplay();
}

// Realiza o cálculo
function calculate() {
    let calculation;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    
    if (isNaN(prev) || isNaN(current)) return;
    
    switch (operation) {
        case '+': calculation = prev + current; break;
        case '-': calculation = prev - current; break;
        case '×':
        case '*': calculation = prev * current; break;
        case '÷':
        case '/': calculation = prev / current; break;
        default: return;
    }
    
    currentOperand = calculation.toString();
    operation = undefined;
    previousOperand = '';
    shouldResetScreen = true;
}

// Limpa o display
function clearDisplay() {
    currentOperand = '0';
    previousOperand = '';
    operation = undefined;
}

// Deleta o último caractere
function deleteLast() {
    if (shouldResetScreen) {
        clearDisplay();
        return;
    }
    if (currentOperand.length === 1) {
        currentOperand = '0';
    } else {
        currentOperand = currentOperand.toString().slice(0, -1);
    }
}

// Event Listeners (Clique)
document.querySelector('.buttons-grid').addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;

    if (btn.dataset.number) appendNumber(btn.dataset.number);
    if (btn.dataset.operator) chooseOperation(btn.dataset.operator);
    if (btn.dataset.action === 'decimal') appendDecimal();
    if (btn.dataset.action === 'clear') clearDisplay();
    if (btn.dataset.action === 'ce') clearDisplay(); // Por enquanto CE faz o mesmo que C
    if (btn.dataset.action === 'backspace') deleteLast();
    if (btn.dataset.action === 'calculate') calculate();
    
    updateDisplay();
});

// Event Listeners (Teclado)
window.addEventListener('keydown', (e) => {
    let key = e.key;
    if (key >= '0' && key <= '9') appendNumber(key);
    if (key === '.' || key === ',') appendDecimal();
    if (key === '=' || key === 'Enter') calculate();
    if (key === 'Backspace') deleteLast();
    if (key === 'Escape') clearDisplay();
    if (key === '+' || key === '-') chooseOperation(key);
    if (key === '*') chooseOperation('×');
    if (key === '/') { e.preventDefault(); chooseOperation('÷'); }
    updateDisplay();
});

updateDisplay();