const alphabetLetters = document.getElementsByClassName('alphabet__letter');
const drawing = document.getElementById('drawing');
const wordSynsContainer = document.getElementById('wordSyns');

const drawingsArray = {
  "1":"./images/hang-1.png",
  "2":"./images/hang-2.png",
  "3":"./images/hang-3.png",
  "4":"./images/hang-4.png",
  "5":"./images/hang-5.png",
  "6":"./images/hang-6.png",
  "7":"./images/hang-7.png",
  "8":"./images/hang-8.png",
  "hang-win":"./images/hang-win.png",
  "hang-lose":"./images/hang-lose.png"
};

// Функция генерирует алфавит и заполняет соответствующий div-container
function createLetter () {
  const alphabetContainer = document.getElementById('alphabet');
  const letters = [];
  for (let i=97; i<123; i++) {
  const char = String.fromCodePoint(i);
  letters.push(char);
  }
  for (let i=0; i<letters.length; i++) {
  const alphabetItem = document.createElement("div");
  alphabetItem.classList.add('alphabet__letter');
  alphabetItem.innerHTML = letters[i];
  const vowels = ['a','e','i','o','u','y'];
  if (vowels.includes(letters[i])) alphabetItem.classList.add('vowel');
  alphabetContainer.append(alphabetItem.cloneNode(true));
  }
}

let randomWord;
let randomWordDefinition;

// Функция генерирует слово с учетом инпутов (topic & level)
async function fetchWord() {
  const choosenTopic = document.getElementById('topic').value;
  const url = `https://api.datamuse.com/words?topics=${choosenTopic}&md=dpn`;
  const response = await fetch(url); //{mode: 'no-cors'}
  const data = await response.json();
  const receivedWords = data.map(element => {
    const word = element.word;
    const definition = element.defs;
    return {word, definition};
  });
  
  const level = document.getElementById('level').value;
  
  function defineRandomWord(minLength, maxLength) {
    const filteredWords = receivedWords.filter(element => element.word.length >= minLength && element.word.length <= maxLength);
    const randomIndex = Math.floor(Math.random()*filteredWords.length);
    randomWord = filteredWords[randomIndex].word;

    if (filteredWords[randomIndex].definition) {   
      let firstWord = filteredWords[randomIndex].definition[0].split('').splice(0,1).join(''); 
      if (firstWord === 'n') {
        firstWord = '(noun) - ';
        const otherWords = filteredWords[randomIndex].definition[0].split('').splice(2).join('');
        randomWordDefinition = `${firstWord}${otherWords}`;
      } else if (firstWord === 'a') {
        firstWord = '(adjective) - ';
        const otherWords = filteredWords[randomIndex].definition[0].split('').splice(3).join('');
        randomWordDefinition = `${firstWord}${otherWords}`;
      } else if (firstWord === 'v') {
        firstWord = '(verb) - ';
        const otherWords = filteredWords[randomIndex].definition[0].split('').splice(2).join('');
        randomWordDefinition = `${firstWord}${otherWords}`;
      }
    }
  }

  if (level == 1) {
    defineRandomWord(3,4);
  } else if (level == 2) {
    defineRandomWord(5,7);
  } else if (level == 3) {
    defineRandomWord(6,14);
  }
}

// document.getElementById('wordContainer').innerHTML = Array.from(randomWord).map(letter => `<div class="word__letter">${letter}</div>`).join('')

function makeClue () {
  if (!randomWord) return;
  const wordLetter = document.createElement('div');
  wordLetter.classList.add('word__letter');
  document.getElementById('wordContainer').innerHTML = '';
  for (let i=0; i<randomWord.length; i++) {
    if (randomWord[i] === ' ') {
      wordLetter.innerHTML = ' ';
      document.getElementById('wordContainer').append(wordLetter.cloneNode(true));
    } else {
      wordLetter.innerHTML = '_';
      document.getElementById('wordContainer').append(wordLetter.cloneNode(true));
    }
  }
}

function reset() {
  for (let i=0; i<alphabetLetters.length;i++) {
    alphabetLetters[i].classList.remove('alphabet--unClickable');
  }
  const endgameContainer = document.getElementById('endgameContainer');
  const endgameText = document.getElementById('endgame');
  endgameContainer.style.top = '-900px';
  endgameContainer.style.right = '0';
  endgameText.innerHTML = '';
  drawing.src = drawingsArray["1"];
  drawing.alt = '1';
  document.getElementById('boy').classList.remove('show');
  document.getElementById('wordContainer').innerHTML = '';
}

async function start() {
  reset();
  if (document.getElementById('topic').value === '') {
    document.getElementById('topic').value = 'test';
  }
  await fetchWord();
  makeClue();
}

function checkWin() {
  // const clueDashes = [];
  // const clueArray = document.getElementById('wordContainer').childNodes;

  if (!document.getElementById('wordContainer').innerText.includes('_')) youWin();
  // for (let i=0; i<randomWord.length; i++) {
  //   clueDashes.push(clueArray[i].innerHTML);
  // }
  // if (!clueDashes.includes('_')) {
  //   youWin();
  // }
}

function youWin() {
  const endgameContainer = document.getElementById('endgameContainer');
  const endgameText = document.getElementById('endgame');
  endgameContainer.style.top = '30px';
  endgameContainer.style.right = '240px';
  endgameText.innerHTML = 'you win!';
  drawing.src = drawingsArray["hang-win"];
  drawing.alt = '9';

  document.getElementById('boy').src = './images/boy-1.png';
  document.getElementById('boy').classList.add('show');

  if (randomWordDefinition !== undefined) wordSynsContainer.innerHTML = `${randomWord}: ${randomWordDefinition}`;
}

function youLose() {
  const endgameContainer = document.getElementById('endgameContainer');
  const endgameText = document.getElementById('endgame');
  endgameContainer.style.top = '30px';
  endgameContainer.style.right = '250px';
  endgameText.innerHTML = 'you lost!';
  drawing.src = drawingsArray["hang-lose"];
  drawing.alt = '10';

  document.getElementById('boy').src = './images/boy-2.png';
  document.getElementById('boy').classList.add('show');

  const clueArray = document.getElementById('wordContainer').childNodes;
  const wordArray = randomWord.split('');
  for (let i=0; i<randomWord.length; i++) {
    if (clueArray[i].innerHTML === '_') {
      clueArray[i].innerHTML = wordArray[i];
      clueArray[i].style.color = "black";
      clueArray[i].style.opacity = 0.7;
    }
  }

  if (randomWordDefinition !== undefined) wordSynsContainer.innerHTML = `${randomWord}: ${randomWordDefinition}`;
}

function checkLetter(letter) {
  if (letter.classList.contains('alphabet--unClickable')) return;
  letter.classList.add('alphabet--unClickable');
  if (randomWord.includes(letter.innerHTML)) {
    const clueArray = document.getElementById('wordContainer').childNodes;
    const wordArray = randomWord.split('');
    for (let i=0; i<randomWord.length; i++) {
      if (wordArray[i] === letter.innerHTML) {
        clueArray[i].innerHTML = wordArray[i];
      }
    }
    checkWin();
  } else {
    if (drawing.alt == "8") {
      youLose();
    } else 
    if (parseInt(drawing.alt) > 0 && parseInt(drawing.alt) < 8) {
      drawing.alt = parseInt(drawing.alt) + 1;
      drawing.src = drawingsArray[drawing.alt];
    }
  }
}

createLetter();

const startButtonClick = document.getElementById('startButton').addEventListener('click', start);

document.addEventListener('keydown', (event) => {
  const keyName = event.key;
  if (keyName === 'Enter') start();
})

for (let i=0; i<alphabetLetters.length; i++) {
  alphabetLetters[i].addEventListener('click', event => {
    if (document.getElementById('wordContainer').innerHTML === '') return;
    checkLetter(alphabetLetters[i]);
  });
}

