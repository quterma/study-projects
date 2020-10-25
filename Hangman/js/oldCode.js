// Функция генерирует слово с учетом инпутов (topic & level)
// function getWord() {
//   const choosenTopic = document.getElementById('topic').value;
//   const request = new XMLHttpRequest();
//   const url = `https://api.datamuse.com/words?topics=${choosenTopic}&md=pn`;
//   request.open('GET', url);
//   request.onload = function () {
//     const data = JSON.parse(this.response);
//     const receivedWords = data.map(element => element.word);
//     const level = document.getElementById('level').value;
//     let filteredWords;
//     if (level == 1) {
//       filteredWords = receivedWords.filter(word => word.length > 2 && word.length < 5);
//     } else if (level == 2) {
//       filteredWords = receivedWords.filter(word => word.length > 4 && word.length < 8);
//     } else if (level == 3) {
//       filteredWords = receivedWords.filter(word => word.length > 7);
//     }
//     randomWord = filteredWords[Math.floor(Math.random()*filteredWords.length)];
//   }
//   request.send();
// }

/* html { 
  background: url(../images/paper-1920x1080.jpg) no-repeat center center; 
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
} */