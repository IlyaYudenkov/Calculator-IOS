let screen = document.querySelector('.screen p');
let firstValue = '';
let secondValue = '';
let operation = '';
let firstValuePoint;
let secondValuePoint;
let resultRound;
let percentResult;
const numbers = ['1','2','3','4','5','6','7','8','9','0'];
const signs = ['+','–','X','÷'];

//функция для полной очистки screen от данных
clearAll = () => {
    firstValue = '';
    secondValue = '';
    operation = '';
    screen.innerText = '.';
    screen.style.fontSize = '90px';
}
//функция для уменьшения шрифта на screen (чтобы не было двухстрочного результата)
shrinkTheFont = () => {
    if(screen.innerText.length == 8 ){
        screen.style.fontSize = '70px';
    }
    else if(screen.innerText.length > 8 && screen.innerText.length <= 9){
        screen.style.fontSize = '60px';
    }
    else if(screen.innerText.length > 9 && screen.innerText.length < 14){
        screen.style.fontSize = '50px';
    }
    else if(screen.innerText.length >= 14 && screen.innerText.length < 19){
        screen.style.fontSize = '37px';
    }
    else if(screen.innerText.length >= 19){
        screen.style.fontSize = '29px';
    }
}
//функция позволяет взять % (разделить на 100) от введенного числа
doPercent = () => {
    if (firstValue !== '' && firstValue !== '0' && percentResult == '%' && secondValue === '' ){
        firstValue = firstValue / 100;
        screen.innerText = firstValue;
        percentResult = '';
    }
    else if(percentResult == '%' && secondValue !== ''){
        secondValue = secondValue / 100;
        screen.innerText = secondValue;
        percentResult = '';
    }
}

//функция позволяет узнать, какое из введенных чисел является дробным (или оба), для того,
//чтобы в дальнейшем округлять результат до n знаков после запятой,
//где n - количество знаков после запятой у самого длинного введенного дробного числа
roundTheFloat = () => {
    firstValue = String(firstValue);
    secondValue = String(secondValue);
    if(firstValue.includes('.') && !secondValue.includes('.')){
        firstValuePoint = firstValue.split('.');
        resultRound = firstValuePoint[1].length;
    }
    else if(!firstValue.includes('.') && secondValue.includes('.')){
        secondValuePoint = secondValue.split('.');
        resultRound = secondValuePoint[1].length;
    }
    else if(firstValue.includes('.') && secondValue.includes('.')){
        firstValuePoint = firstValue.split('.');
        secondValuePoint = secondValue.split('.');
        if(firstValuePoint[1].length > secondValuePoint[1].length){
            resultRound = firstValuePoint[1].length;
        }
        else{
            resultRound = secondValuePoint[1].length;
        }
    }
}

//функция позволяет избавиться от 0 в дробной части, если результат вычисления - целое число
//так же позволяет при делении адекватно округлять числа, не позволяя дробной части выходить за пределы screen
roundTheInteger = () => {
    if(operation === '+' || operation === '–' || operation === 'X'){
        if(firstValue % 1 === 0){//если остатка при делении на 1 нет, то число округляется до целого
            firstValue = Math.round(firstValue);
        }
        firstValue = String(firstValue);
        }
        else if(operation === '÷'){//если остатка при делении на 1 нет, то число округляется до целого
            if(firstValue % 1 === 0){
                firstValue = Math.round(firstValue);
            }
            else{
                if(secondValue === '0'){// при делении на 0
                    firstValue = `Can't divide by zero`;
                    secondValue = '';
                }
                else{
                    firstValuePoint = String(firstValue).split('.');
                    resultRound = firstValuePoint[1].length;
                    firstValue = (+firstValue).toFixed(resultRound);
                } 
            } 
            firstValue = String(firstValue);
        } 
    }

//функция для исключения повтора одинаковых строк в каждой операции функции "makeOperation"
roundAndShow = () => {
    roundTheInteger();
    screen.innerText = firstValue;
    secondValue = '';
}
//функция выбирает арифметическую операция в зависимости от введенного знака в переменную "operation"
makeOperation = () => {
    if (firstValue !== '' && secondValue !== '' && operation !== ''){
        switch (operation) {
            case '+':
                if(!Number.isInteger(+firstValue) || !Number.isInteger(+secondValue)){
                   roundTheFloat();
                   firstValue = (+firstValue) + (+secondValue);
                   firstValue = firstValue.toFixed(resultRound);
                }
                else{
                    firstValue = (+firstValue) + (+secondValue);
                }
                roundAndShow();
                break;
            case '–':
                if(!Number.isInteger(+firstValue) || !Number.isInteger(+secondValue)){
                    roundTheFloat();
                    firstValue = firstValue - secondValue;
                    firstValue = firstValue.toFixed(resultRound);
                }
                else{
                    firstValue = firstValue - secondValue;
                }
                roundAndShow();
                break;
            case 'X':
                if(!Number.isInteger(+firstValue) || !Number.isInteger(+secondValue)){
                    roundTheFloat();
                    firstValue = firstValue * secondValue;
                    firstValue = firstValue.toFixed(resultRound);
                }
                else{
                    firstValue = firstValue * secondValue;
                }
                roundAndShow();
                break;
            case '÷':
                if(!Number.isInteger(+firstValue) || !Number.isInteger(+secondValue)){
                    roundTheFloat();
                    firstValue = firstValue / secondValue;
                }
                else{
                    firstValue = firstValue / secondValue;
                }
                roundAndShow();
                break;
            default:
                break;
        }
        screen.innerText = firstValue; 
    };
} 
//функция для работы с числами с точкой
document.querySelector('.row__darkgrey__point').addEventListener('click', (event) => {
    if(screen.innerText.length <= 9){
    let point = event.target.textContent;
    //чтобы не было двух точек подряд у первого числа
    if(firstValue.includes('.') && operation === '' && secondValue === ''){
        return;
    }
    else if(!firstValue.includes('.') && operation === '' && secondValue === ''){
        firstValue += point;
        screen.innerText = firstValue;
    }
    else if(!secondValue.includes('.')){
        secondValue += point;
        screen.innerText = secondValue;
    }
    //чтобы не было двух точек подряд у второго числа
    else if(secondValue.includes('.') && operation !== ''){
        return;
    } 
}}
)

//функция для работы с +/- (не позволяет написать -0)
document.querySelector('.row__grey_plusMinus').addEventListener('click', () => {
    if(operation === '' && firstValue !== '0' && firstValue !== '-0' && firstValue !== ''){
        firstValue = -firstValue;
        screen.innerText = firstValue;
    }
    else if(firstValue !== '' && operation !== '' && secondValue !== '0' && secondValue !== '-0'){
        secondValue = -secondValue;
        screen.innerText = secondValue;
    }
})

document.querySelector('.row__grey_clearAll').addEventListener('click', clearAll)

// функция позволяет сохранить два введенных значения в соответствующие переменные firstValue и secondValue
document.querySelector('.buttons').addEventListener('click', (event) => {
    let key = event.target.textContent;
    if(screen.innerText.length == 8 ){
        screen.style.fontSize = '70px';
    }
    else if(screen.innerText.length > 8){
        screen.style.fontSize = '60px';
    }
    if(numbers.includes(key)){  
        if(screen.innerText.length <= 8){
        if (operation === '' && firstValue === ''){
            firstValue += key;
            screen.innerText = firstValue;
            screen.style.fontSize = '90px';
        }
        else if(operation === '' && firstValue !== ''){
            if(firstValue === '0' && key === '0'){
                firstValue = '0';
                screen.innerText = firstValue;
            }   
            else if(firstValue === '0' && key !== '0'){
                firstValue = '';
                firstValue += key;
                screen.innerText = firstValue;
            }
            else{
                firstValue += key;
                screen.innerText = firstValue;
            }
            screen.style.fontSize = '90px';
        } 
        else if(firstValue !== '' && operation !== '' && secondValue !== '0'){
            secondValue += key;
            screen.innerText = secondValue;
            screen.style.fontSize = '90px';
        }
        else if(secondValue === '0' && key !== '0'){
            secondValue = '';
            secondValue += key;
            screen.innerText = secondValue;
            screen.style.fontSize = '90px';
        }
        else if(secondValue === '0' && key === '0'){
            secondValue = '0';
            screen.innerText = secondValue;
            screen.style.fontSize = '90px';
        }
        else if(secondValue !== '' && operation !== ''){
            secondValue += key;
            screen.innerText = secondValue;
            screen.style.fontSize = '90px';
        }
    }
}
    else if(signs.includes(key) && firstValue !== ''){
        screen.innerText = '';
        operation = key;
        screen.innerText = operation;
        makeOperation();
        screen.style.fontSize = '90px';
    } 
    else if(key === '%' && firstValue !== '.'){
        percentResult = '%';
        doPercent();
        screen.style.fontSize = '90px';
    }
    if(screen.innerText !== '.'){
        document.querySelector('.row__grey_clearAll').innerHTML = 'C';
    }
    else{
        document.querySelector('.row__grey_clearAll').innerHTML = 'AC';
    }
    shrinkTheFont(); 
}
)
//функция для отображение результата операции
document.querySelector('.row__orange_result').addEventListener('click', () => {
    makeOperation();
    operation = '';
}
)