// Функция меняет инструкцию на ALERT
function alert() {
  const instruction = document.getElementById('instruction');
  instruction.classList.add("alert");
  instruction.innerHTML = 'Please input only numbers from 0 to 100!';
  setTimeout(() => {
    instruction.classList.remove("alert");
    instruction.innerHTML = 'You can input numbers from 0 to 100 here.';
  }, 3000);
}

// Основная функция
function execution() {
  const input1Value = document.getElementById('input1').value;
  const input2Value = document.getElementById('input2').value;
  const input3Value = document.getElementById('input3').value;
  const input4Value = document.getElementById('input4').value;
  const inputValues = [];
  inputValues.push(input1Value, input2Value, input3Value, input4Value);
  let bar1Value = 0;
  let bar2Value = 0;
  let bar3Value = 0;
  let bar4Value = 0;
  const barValues = [];
  barValues.push(bar1Value, bar2Value, bar3Value, bar4Value);

  // Функция проверяет Input на isNAN и диапазон от 0 до 100
  function checkInputs(element) {
    const notAnumber =  isNaN(element);
    const lessZero = element < 0;
    const moreHundred = element > 100;
    if (notAnumber || lessZero || moreHundred) return true;
  }
  
  // Если Input не прошел проверку, то Alert, иначе Input округляем вниз и загоняем в Bars переменные. Если Input не задан, то 0.
  if (inputValues.some(checkInputs)) alert()
  else {
    for (let i=0; i < 4; i++) {
      if (inputValues[i] !== "")
      barValues[i] = parseInt(inputValues[i],10);
    }
  };

  const barFillings = document.getElementsByClassName('bar__item__filling');
  const barFillingsPercentage = document.getElementsByClassName('bar__item__filling__percentage');
  for (let i=0; i < 4; i++) {
    barFillings[i].style.left = `${barValues[i]-100}%`;
    barFillingsPercentage[i].innerHTML = barValues[i];  
    barFillings[i].style.backgroundColor = `rgb(${Math.random()*255},${Math.random()*255},${Math.random()*255})`;
    barFillings[i].style.opacity = `${barValues[i]/50}`
  }
}

const button = document.getElementById('button');
button.addEventListener('click', execution);
document.addEventListener('keydown', (event) => {
  const keyName = event.key;
  if (keyName === 'Enter') execution();
})