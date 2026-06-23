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
    if(display.value!=""){
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
        navigator.serviceWorker.register('/service-worker.js').then(function(registration) {
            console.log('Service Worker registered with scope:', registration.scope);
        }, function(err) {
            console.log('Service Worker registration failed:', err);
        });
    });
}

// Handle Install Prompt
let deferredPrompt;
let installBtn = document.getElementById('installBtn')
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installBtn.style.display = 'block';

    installBtn.addEventListener('click', () => {
        installBtn.style.display = 'none';
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the install prompt');
            } else {
                console.log('User dismissed the install prompt');
            }
            deferredPrompt = null;
        });
    });
});
