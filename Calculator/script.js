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
/*
let view;
clearPrev = () => {
    view = screen.innerText;
    view = view.substring(0, view.length - 1)
    if(view.length !== 0){
        if(operation === ''){
            firstValue = view;
            screen.innerText = firstValue;
        }
        else if(firstValue !== '' && operation !== ''){
            secondValue = view;
            screen.innerText = secondValue;
        }
        
    }else {
        firstValue = '0';
        secondValue = '';
        operation = '';
        screen.innerText = firstValue;;
    }
}*/

//функция для полной очистки screen от данных
clearAll = () => {
    firstValue = '';
    secondValue = '';
    operation = '';
    screen.innerText = '.';
}

//функция позволяет взять % (разделить на 100) от введенного числа
doPercent = () => {
    if (firstValue !== '' && percentResult == '%' && secondValue === ''){
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
roundTheInteger = () => {
        if(firstValue % 1 === 0){
            firstValue = Math.round(firstValue);
            firstValue = String(firstValue);
        }
}
//функция для исключения повтора одинаковых строк в каждой операции функции makeOperation
roundAndShow = () => {
    roundTheInteger();
    screen.innerText = firstValue;
    secondValue = '';
}

//функция выбирает арифметическую операция в зависимости от введеннного знака в переменную "operation"
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
    let point = event.target.textContent;
    //чтобы не было двух точек подряд у первого числа
    if(firstValue.includes('.') && operation === '' && secondValue === ''){
        return;
    }else if(!firstValue.includes('.') && operation === '' && secondValue === ''){
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
})

//функция для работы с +/- (не позволяет написать -0)
document.querySelector('.row__grey_plusMinus').addEventListener('click', () => {
    if(operation === '' && firstValue !== '0' && firstValue !== '-0' && screen == '.'){
        screen == '.';//фиксит возможность написания нескольких нулей подряд
        firstValue = -firstValue;
        screen.innerText = firstValue;
    }else if(firstValue !== '' && operation !== '' && secondValue !== '0' && secondValue !== '-0'){
        secondValue = -secondValue;
        screen.innerText = secondValue;
    }
})

/*document.querySelector('.btn-clearPrev').addEventListener('click', clearPrev)*/

document.querySelector('.row__grey_clearAll').addEventListener('click', clearAll)


// функция позволяет сохранить два введенных значения в соответствующие переменные firstValue и secondValue
document.querySelector('.buttons').addEventListener('click', (event) => {
    const key = event.target.textContent;
    if(numbers.includes(key)){  
        if (operation === '' && firstValue !== '0'){
            firstValue += key;
            screen.innerText = firstValue;
        }
        else if(firstValue === '0' && key !== '0'){
            firstValue = '';
            firstValue += key;
            screen.innerText = firstValue;
        }else if(firstValue === '0' && key === '0'){
            firstValue = '0';
            screen.innerText = firstValue;
        }
        else if(firstValue !== '' && operation !== '' && secondValue !== '0'){
            secondValue += key;
            screen.innerText = secondValue;
        }
        else if(secondValue === '0' && key !== '0'){
            secondValue = '';
            secondValue += key;
            screen.innerText = secondValue;
        }
        else if(secondValue === '0' && key === '0'){
            secondValue = '0';
            screen.innerText = secondValue;
        }
        else if(secondValue !== '' && operation !== ''){
            secondValue += key;
            screen.innerText = secondValue;
        }
    }
    else if(signs.includes(key) && firstValue !== ''){
        operation = key;
        screen.innerText = operation;
        makeOperation();
    } 
    else if(key === '%'){
        percentResult = '%';
        doPercent();
    }
}
)
//функция для отображение результата операции
document.querySelector('.row__orange_result').addEventListener('click', () => {
    makeOperation();
    operation = '';
})

