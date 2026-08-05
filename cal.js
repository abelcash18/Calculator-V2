const display = document.getElementById('display');
const expressionDisplay = document.getElementById('displayy');
const showMenuButton = document.getElementById('showMenu');
const scientificPad = document.getElementById('scientificPad');
const toggleScienceButton = document.getElementById('toggleScience');
const themeToggle = document.getElementById('themeToggle');
const modeToggle = document.getElementById('modeToggle');
const installBtn = document.getElementById('installBtn');

let angleMode = 'deg';
let deferredPrompt;

const setDisplayValue = (value) => {
    display.value = value;
};

const appendToDisplay = (value) => {
    const current = display.value;
    const lastChar = current.slice(-1);

    if (value === '.' && current === '') {
        setDisplayValue('0.');
        return;
    }

    if (value === '.' && lastChar === '.') {
        return;
    }

    if (['+', '-', '*', '/', '%'].includes(value) && ['+', '-', '*', '/', '%'].includes(lastChar)) {
        setDisplayValue(current.slice(0, -1) + value);
        return;
    }

    setDisplayValue(current + value);
};

const clearAll = () => {
    setDisplayValue('');
    expressionDisplay.textContent = '';
};

const clearEntry = () => {
    setDisplayValue('');
};

const deleteLast = () => {
    setDisplayValue(display.value.slice(0, -1));
};

const sanitizeExpression = (expression) => {
    return expression
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/%/g, '/100');
};

const evaluateExpression = () => {
    const rawExpression = display.value.trim();
    if (!rawExpression) {
        expressionDisplay.textContent = '';
        return;
    }

    try {
        const sanitizedExpression = sanitizeExpression(rawExpression);
        const result = Function('"use strict"; return (' + sanitizedExpression + ')')();
        if (!Number.isFinite(result)) {
            throw new Error('Invalid result');
        }
        expressionDisplay.textContent = `${rawExpression} =`;
        setDisplayValue(String(result));
    } catch (error) {
        expressionDisplay.textContent = 'Error';
        setDisplayValue('');
    }
};

const applyFunction = (callback) => {
    const rawValue = display.value.trim();
    if (!rawValue) {
        return;
    }

    try {
        const value = Number(rawValue);
        const result = callback(value);
        expressionDisplay.textContent = `${rawValue}`;
        setDisplayValue(String(result));
    } catch (error) {
        expressionDisplay.textContent = 'Error';
        setDisplayValue('');
    }
};

const insertConstant = (value) => {
    appendToDisplay(String(value));
};

const toggleScientificPad = () => {
    scientificPad.classList.toggle('hidden');
    toggleScienceButton.textContent = scientificPad.classList.contains('hidden') ? 'Sci' : 'Hide';
};

const toggleTheme = () => {
    document.body.classList.toggle('light-theme');
    themeToggle.textContent = document.body.classList.contains('light-theme') ? '☾' : '☀';
};

const toggleAngleMode = () => {
    angleMode = angleMode === 'deg' ? 'rad' : 'deg';
    modeToggle.textContent = angleMode === 'deg' ? 'Deg' : 'Rad';
};

const convertAngle = (value) => (angleMode === 'deg' ? (value * Math.PI) / 180 : value);

const handleScientificAction = (action) => {
    switch (action) {
        case 'square':
            applyFunction((value) => value * value);
            break;
        case 'power':
            appendToDisplay('**');
            break;
        case 'sqrt':
            applyFunction((value) => Math.sqrt(value));
            break;
        case 'pow10':
            applyFunction((value) => 10 ** value);
            break;
        case 'factorial':
            applyFunction((value) => {
                if (value < 0 || !Number.isInteger(value)) {
                    throw new Error('Only non-negative integers');
                }
                let result = 1;
                for (let i = 2; i <= value; i += 1) {
                    result *= i;
                }
                return result;
            });
            break;
        case 'sin':
            applyFunction((value) => Math.sin(convertAngle(value)));
            break;
        case 'cos':
            applyFunction((value) => Math.cos(convertAngle(value)));
            break;
        case 'tan':
            applyFunction((value) => Math.tan(convertAngle(value)));
            break;
        case 'log':
            applyFunction((value) => Math.log10(value));
            break;
        case 'ln':
            applyFunction((value) => Math.log(value));
            break;
        case 'exp':
            applyFunction((value) => Math.exp(value));
            break;
        case 'pi':
            insertConstant(Math.PI);
            break;
        case 'e':
            insertConstant(Math.E);
            break;
        case 'negate':
            if (display.value.startsWith('-')) {
                setDisplayValue(display.value.slice(1));
            } else {
                setDisplayValue(`-${display.value}`);
            }
            break;
        case 'percent':
            appendToDisplay('%');
            break;
        default:
            break;
    }
};

showMenuButton.addEventListener('click', () => {
    document.querySelector('.sideNav').classList.toggle('showSideNav');
});

document.addEventListener('click', (event) => {
    const sideNav = document.querySelector('.sideNav');
    if (!showMenuButton.contains(event.target) && !sideNav.contains(event.target)) {
        sideNav.classList.remove('showSideNav');
    }
});

document.querySelectorAll('.key.number').forEach((button) => {
    button.addEventListener('click', () => appendToDisplay(button.dataset.value));
});

document.querySelectorAll('.key.operator').forEach((button) => {
    button.addEventListener('click', () => {
        if (button.dataset.action === 'equals') {
            evaluateExpression();
        } else {
            appendToDisplay(button.dataset.value);
        }
    });
});

document.querySelectorAll('.key.action').forEach((button) => {
    button.addEventListener('click', () => {
        const action = button.dataset.action;
        if (action === 'clear-all') {
            clearAll();
        } else if (action === 'clear-entry') {
            clearEntry();
        } else if (action === 'delete') {
            deleteLast();
        } else if (action === 'parenthesis') {
            const current = display.value;
            const openCount = (current.match(/\(/g) || []).length;
            const closeCount = (current.match(/\)/g) || []).length;
            appendToDisplay(openCount > closeCount ? ')' : '(');
        }
    });
});

document.querySelectorAll('.key.sci').forEach((button) => {
    button.addEventListener('click', () => handleScientificAction(button.dataset.action));
});

toggleScienceButton.addEventListener('click', toggleScientificPad);
themeToggle.addEventListener('click', toggleTheme);
modeToggle.addEventListener('click', toggleAngleMode);

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('./service-worker.js').then(function (registration) {
            console.log('[PWA] Service worker registered', registration.scope);
        }).catch(function (error) {
            console.log('[PWA] Service worker registration failed', error);
        });
    });
}

window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    deferredPrompt = event;
    installBtn.style.display = 'block';
    installBtn.onclick = async () => {
        installBtn.style.display = 'none';
        if (!deferredPrompt) {
            return;
        }
        deferredPrompt.prompt();
        const choiceResult = await deferredPrompt.userChoice;
        if (choiceResult.outcome === 'accepted') {
            console.log('[PWA] User accepted the install prompt');
        }
        deferredPrompt = null;
    };
});
