const actions = document.getElementById('actions');
const input = document.getElementById('input');

function writeInput(str, p=1) {
    let value = input.value;
    let position = input.selectionStart;

    value = value.slice(0, position) + str + value.slice(position);
    input.value = value;

    input.selectionStart = position + p;
    input.selectionEnd = position + p;
}

actions.addEventListener('click', e => {
    const element = e.target;

    if (element.matches('.pow2')) {
        writeInput('^2', 2);
    }
    if (element.matches('.pow')) {
        writeInput('^');
    }
    if (element.matches('.sqrt')) {
        writeInput('√');
    }
    if (element.matches('.multiplication')) {
        writeInput('x');
    }
    if (element.matches('.division')) {
        writeInput('÷');
    }
    if (element.matches('.parenthesis')) {
        writeInput('()');
    }
    input.focus();
});

function format(string) {
    string = string.replace(/ /g, "");
    string = string.split('');

    for (let i = 0; i < string.length; i++) {
        const str = string[i];
        
        if (str === '+') {
            string.splice(i, 1, ' + ');
        }
        if (str === '-') {
            string.splice(i, 1, ' - ');
        }
        if (str === 'x') {
            string.splice(i, 1, ' * ');
        }
        if (str === '÷') {
            string.splice(i, 1, ' / ');
        }
        if (str === '^') {
            string.splice(i, 1, ' ** ');
        }
        if (str === '√') {
            string.splice(i, 1, ' √ ');
        }
        if (str === '(') {
            string.splice(i, 1, ' *( ');
        }
    }
    return string.join('');
}

function sqrtRoot(string) {
    string = string.split(' ');

    for (let i = 0; i < string.length; i++) {
        const item = string[i];

        if (item === '√') {
            // Remove
            let indexAfter = i + 1;
            let elementAfter = string[indexAfter];
            string.splice(indexAfter, 1);
            // Add
            let str = `Math.sqrt(${elementAfter})`;
            string.splice(i, 1, str);
        }
    }
    return string.join('');
}

function operation() {
    let op = input.value;
    let result = format(op);
    result = sqrtRoot(result);

    return result;
}

const calculate = document.getElementById('calculate');
calculate.addEventListener('click', () => {
    const result = document.getElementById('result');
    result.textContent = eval(operation());
})