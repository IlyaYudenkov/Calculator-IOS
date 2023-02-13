let screen = document.querySelector('.screen p');
let view;
let firstValue = '';
let secondValue = '';
let operation = '';
const numbers = ['1','2','3','4','5','6','7','8','9','0'];
const signs = ['+','–','X','÷', '%'];
/*
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

clearAll = () => {
    firstValue = '';
    secondValue = '';
    operation = '';
    screen.innerText = '.';
}
doPercent = () => {
    if (firstValue !== '' && operation == '%'){
        firstValue = firstValue / 100;
        screen.innerText = firstValue;
        secondValue = '';
    }
}
//функция позволяет узнать кол-во знаков после запятой, чтобы потом округлить число именно до этого кол-ва знаков
splitPoint = (firstValue) => {
    firstValue = String(firstValue);
    let pointCommonAmount = firstValue.split('.');
    console.log(pointCommonAmount)
    let pointAfterAmount = pointCommonAmount[1];
    console.log(pointAfterAmount)
    let n = pointAfterAmount.length;
    firstValue = Number(firstValue).toFixed(n);
}

makeOperation = () => {
    if (firstValue !== '' && secondValue !== '' && operation !== ''){
        switch (operation) {
            case '+':
                firstValue = (+firstValue) + (+secondValue);
                // проверка, является ли число дробным, если да, то округляем
                if(!Number.isInteger(firstValue)){
                    splitPoint(firstValue); 
                }
                firstValue = String(firstValue);
                screen.innerText = firstValue;
                secondValue = '';
                break;
            case '–':
                firstValue = firstValue - secondValue;
                if(!Number.isInteger(firstValue)){
                    splitPoint(firstValue); 
                }
                firstValue = String(firstValue);
                screen.innerText = firstValue;
                secondValue = '';
                break;
            case 'X':
                firstValue = firstValue * secondValue;
                if(!Number.isInteger(firstValue)){
                    splitPoint(firstValue); 
                }
                firstValue = String(firstValue);
                screen.innerText = firstValue;
                secondValue = '';
                break;
            case '÷':
                firstValue = firstValue / secondValue;
                if(!Number.isInteger(firstValue)){
                    splitPoint(firstValue); 
                }
                firstValue = String(firstValue);
                screen.innerText = firstValue;
                secondValue = '';
                break;
            default:
                break;
        }
        screen.innerText = firstValue;
    };
} 
//числа с точкой
document.querySelector('.btn-point').addEventListener('click', (event) => {
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


document.querySelector('.btn-plusMinus').addEventListener('click', () => {
    if(operation === '' && firstValue !== '0' && firstValue !== '-0'){
        firstValue = -firstValue;
        screen.innerText = firstValue;
    }else if(firstValue !== '' && operation !== '' && secondValue !== '0' && secondValue !== '-0'){
        secondValue = -secondValue;
        screen.innerText = secondValue;
    }
})

/*document.querySelector('.btn-clearPrev').addEventListener('click', clearPrev)*/

document.querySelector('.btn-clearAll').addEventListener('click', clearAll)

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
        console.log(firstValue, secondValue)
    }else if(signs.includes(key) && firstValue !== ''){
        operation = key;
        screen.innerText = operation;
        makeOperation();
        doPercent();
    } 
}
)

document.querySelector('.btn-result').addEventListener('click', () => {
    makeOperation();
    operation = '';   
})

