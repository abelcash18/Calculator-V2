const display = document.getElementById('display')
const sumdisplay = document.getElementById('displayy')
const sunBtn = document.getElementById('sunBtn')
// const moonBtn = document.getElementById('moonBtn')
let showMenu = document.getElementById('showMenu')
showMenu.addEventListener('click', ()=>{
    document.querySelector('.sideNav').classList.toggle('showSideNav')
})
document.addEventListener('click', (e)=>{
    if(!showMenu.contains(e.target) &&!document.querySelector('.sideNav').contains(e.target)){
        document.querySelector('.sideNav').classList.remove('showSideNav')
    }

})

const calContainer = document.querySelector('.calContainer')
sunBtn.addEventListener('click', ()=> {
    calContainer.style.backgroundColor = 'white'
    display.style.backgroundColor = 'white'
    display.style.color = 'black'
    sumdisplay.style.backgroundColor = 'white'
    sumdisplay.style.color = 'black'
    document.getElementById('key').style.backgroundColor = "#f8f9fa"
    document.querySelector('.themeBtn').style.color = 'black'
    sunBtn.style.color = "black"
    // document.getElementsByTagName('button').style.backgroundColor = "green"

})
// moonBtn.addEventListener('click', ()=>{
//     calContainer.style.backgroundColor = ''
//     display.style.backgroundColor = ''
//     display.style.color = ''
//     sumdisplay.style.backgroundColor = ''
//     sumdisplay.style.color = ''
//     document.getElementById('key').style.backgroundColor = ""
//     document.querySelector('.theme').style.backgroundColor = ''
//     document.querySelector('.theme').style.color = ''
// })
const appendToDisplay = (val) =>{
    display.value += val;
}
const clearfunc = ()=>{
    display.value = "";
    sumdisplay.value = "";
}
const clearfun = ()=>{
    display.value = "";
}
const calculate =()=>{
    if(display.value!==""){
        try{
            sumdisplay.value = eval(display.value)
        }
        catch{
            sumdisplay.value = "Error"
        }
    }else{
        sumdisplay.value = ""
    }
}

const deleteLast = () =>{
    display.value = display.value.slice(0, -1);
}

// function for scientific calculations
let sciFunc = document.getElementById('sciFunc')
let changeBtn = document.getElementById('changeBtn')
let changeValue = document.querySelectorAll('.changeValue')
let valueArr = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"]

let originalContent = [];
let newContent = [
    `<button class="changeValue">&xfr;<sup>3</sup></button>`,
    `<button><small>&Sqrt;&xfr;</small></button>`,
    `<button><small>sin<sup><small>-1</small></sup></small></button>`,
    `<button><small>cos<sup><small>-1</small></sup></small></button>`,
    `<button><small>tan<sup><small>-1</small></sup></small></button>`,
    `<button><small>&frac12;</small></button>`,
    `<button><small>e<sup>&xfr;</sup></small></button>`,
    `<button><small>ln</small></button>`,
    `<button><small>dms</small></button>`,
    `<button><small>deg</small></button>`
  ];

let isChanged = false;

// Store original content
changeValue.forEach((element, index) => {
  originalContent.push(element.innerHTML);
});

changeBtn.addEventListener('click', () => {
  changeValue.forEach((element, index) => {
    if (!isChanged) {
      element.innerHTML = newContent[index];
    } else {
      element.innerHTML = originalContent[index];
    }
  });
  isChanged = !isChanged;
});

sciFunc.addEventListener('click', ()=>{
    document.querySelector('.sciCal').classList.add("sciCalShow")
    document.getElementById('methodName').textContent = "Scientific"
})
document.getElementById('sciFunc2').addEventListener('click', ()=>{
    document.querySelector('.sciCal').classList.toggle("sciCalShow")
    document.getElementById('methodName').textContent = "Standard"
})

// function for square root
const squareRoot = () =>{
    sumdisplay.value = Math.sqrt(display.value)
}

//function for logarithm
const logarithm = () =>{
    sumdisplay.value = Math.log(display.value)
}

//function for sin
const sin = () =>{
    sumdisplay.value = Math.sin(display.value)
}

//function for cos
const cos = () =>{
    sumdisplay.value = Math.cos(display.value)
}

//function for tan
const tan = () =>{
    sumdisplay.value = Math.tan(display.value)
}

// function for 10 raise to the power of value inputted
const tenRaise = () =>{
    sumdisplay.value = 10**(display.value)
}
// function for exponentiation
const exponent = () =>{
    sumdisplay.value = display.value**2
}

// function for factorial
const factorial = () =>{
    let result = 1
    for(let i = 2; i <= display.value; i++){
        result *= i
    }
    sumdisplay.value = result
}

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        console.log('[PWA] Attempting service worker registration...');
        navigator.serviceWorker.register('./service-worker.js').then(function(registration) {
            console.log('[PWA] Service Worker registered with scope:', registration.scope);
            console.log('[PWA] SW controller (null means first load):', navigator.serviceWorker.controller);
        }, function(err) {
            console.log('[PWA] Service Worker registration failed:', err);
        });
    });
} else {
    console.log('[PWA] serviceWorker not supported in this browser');
}

// Handle Install Prompt
let deferredPrompt;
let installBtn = document.getElementById('installBtn')

console.log('[PWA] install button initial display:', installBtn?.style?.display);

window.addEventListener('beforeinstallprompt', (e) => {
    console.log('[PWA] beforeinstallprompt fired');

    // Only allow prompting if we have a real deferred prompt
    e.preventDefault();
    deferredPrompt = e;

    // Show button whenever the browser says the app is installable
    installBtn.style.display = 'block';

    // Remove any previous handler so we don't stack listeners across events
    installBtn.onclick = null;

    installBtn.onclick = async () => {
        console.log('[PWA] Install button clicked');
        installBtn.style.display = 'none';

        if (!deferredPrompt) return;

        deferredPrompt.prompt();
        try {
            const choiceResult = await deferredPrompt.userChoice;
            if (choiceResult.outcome === 'accepted') {
                console.log('[PWA] User accepted the install prompt');
            } else {
                console.log('[PWA] User dismissed the install prompt');
            }
        } catch (err) {
            console.log('[PWA] userChoice failed:', err);
        } finally {
            deferredPrompt = null;
        }
    };
});

// Debug/diagnostics: if prompt never fires, log after a short delay
setTimeout(async () => {
    if (!deferredPrompt) {
        console.log('[PWA] beforeinstallprompt did not fire (app may not be installable).');

        if (navigator.getInstalledRelatedApps) {
            try {
                const related = await navigator.getInstalledRelatedApps();
                console.log('[PWA] getInstalledRelatedApps result:', related);
            } catch (e) {
                console.log('[PWA] getInstalledRelatedApps failed:', e);
            }
        }
    }
}, 5000);

