const imageStorage = [
  'url("../images/slide_1.jpg")',
  'url("../images/slide_2.jpg")',
  'url("../images/slide_3.jpg")',
  'url("../images/slide_4.jpg")',
  'url("../images/slide_5.jpg")'
];

const sliderContainer = document.getElementById('sliderContainer');
const backContainer = document.getElementById('backContainer');
let clickable = true;

function slideRight() {
  if (!clickable) return;
  clickable = false;
  const sliderImage = sliderContainer.style.backgroundImage; // Почему нельзя вывести в globalScope?
  let imageIndex = imageStorage.indexOf(sliderImage);
  if (imageIndex === imageStorage.length - 1) imageIndex = -1;
  let backImageIndex = imageIndex + 1;
  if (backImageIndex === imageStorage.length - 1) backImageIndex = -1;
  backContainer.style.backgroundImage = imageStorage[backImageIndex];
  sliderContainer.classList.add("fade");
  setTimeout(() => {
    sliderContainer.style.backgroundImage = imageStorage[imageIndex + 1];
    sliderContainer.classList.remove("fade");
    backContainer.style.backgroundImage = imageStorage[backImageIndex + 1];
    clickable = true;
  }, 1500);
}

function slideLeft() {
  if (!clickable) return;
  clickable = false;
  const sliderImage = sliderContainer.style.backgroundImage; // Почему нельзя вывести в globalScope?
  let imageIndex = imageStorage.indexOf(sliderImage);
  if (imageIndex === 0) imageIndex = imageStorage.length;
  let backImageIndex = imageIndex - 1;
  if (backImageIndex === 0) backImageIndex = imageStorage.length;
  backContainer.style.backgroundImage = imageStorage[backImageIndex];
  sliderContainer.classList.add("fade");
  setTimeout(() => {
    sliderContainer.style.backgroundImage = imageStorage[imageIndex - 1];
    sliderContainer.classList.remove("fade");
    backContainer.style.backgroundImage = imageStorage[backImageIndex - 1];
    clickable = true;
  }, 1500);
}

sliderContainer.style.backgroundImage = imageStorage[0];

const sliderButtonRightClick = document.getElementById('sliderButtonRight');
sliderButtonRightClick.onclick = slideRight; // А почему работает без ()???

const sliderButtonLeftClick = document.getElementById('sliderButtonLeft');
sliderButtonLeftClick.onclick = slideLeft; // А почему работает без ()???

setInterval(slideRight,5000);