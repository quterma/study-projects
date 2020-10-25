const loadField = document.getElementById('loadField');
const dice = document.getElementsByClassName('dice__image');
const modifierSelectList = document.getElementById('modifierSelect');
let loadArray = [];
let chosenModifier = 0;

function fillLoadArray(value) {
  const checkLoad1 = loadArray.filter(item => item === value);
  const checkLoad2 = Array.from(new Set(loadArray));
  if (checkLoad1.length < 3 && checkLoad2.length < 3) loadArray.push(value);
  if (checkLoad1.length < 3 && checkLoad2.length == 3 && checkLoad2.includes(value)) loadArray.push(value);
}

function fillLoadField() {
  const uniqueDice = Array.from(new Set(loadArray));
  const loadFieldFillingArray = [];
  for (let i=0; i < uniqueDice.length; i++) {
    const numberOfDice = loadArray.filter(item => item === uniqueDice[i]).length;
    loadFieldFillingArray.push(` ${numberOfDice}d${uniqueDice[i]} `);
  }
  
  loadField.innerHTML = loadFieldFillingArray;
}

function clearLoad() {
  loadField.innerHTML = '';
  loadArray = [];
}

function calculateRoll() {
  const results = [];
  let sum;
  loadArray.forEach(element => {
    if (element < 100) {
      const result = Math.floor(Math.random()*element) + 1;
      results.push(result);
    } else {
      const result = (Math.floor(Math.random()*(element/10)) + 1) * 10;
      results.push(result);
    }
  });
  if (results.length > 0) {
    sum = results.reduce((a,b) => a+b) + parseInt(chosenModifier);
    const resultsDrawing = results.join(' + ');
    document.getElementById('resultField').innerHTML = `${resultsDrawing} + (${chosenModifier}) = ${sum}`;
  }
}

function reset() {
  document.getElementById('resultField').innerHTML = '';
  clearLoad();
}

function chooseModifier() {
  chosenModifier = modifierSelectList.value;
  
}

// по клику на кубике парсится число кубика и записывается в выбранные кубики
for (let i=0; i<dice.length; i++) {
  dice[i].addEventListener('click', event => {
    let currentDice = parseInt(dice[i].alt);
    fillLoadArray(currentDice);
    fillLoadField();
  })
}

document.getElementById('loadClear').addEventListener('click', event => {
  clearLoad();
})

document.getElementById('roll').addEventListener('click', event => {
  calculateRoll();
})

document.getElementById('reset').addEventListener('click', event => {
  reset();
})

modifierSelectList.addEventListener('change', () => {
  chooseModifier();
})
