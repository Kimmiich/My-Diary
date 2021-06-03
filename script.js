//Hämta våra element
const header = document.getElementById('header');
const main = document.getElementById('main');

//skapa element/templates
header.insertAdjacentHTML('afterbegin', `<h1>Min dagbok</h1>`);

main.insertAdjacentHTML(
  'afterbegin',
  `
<fieldset>
    <legend>Kära dagbok...</legend>
    <input id="textHeadline" type="text" placeholder="Rubrik">
    <input id="textDate" type="date">
    <input id="textContent" type="text" placeholder="Text...">
    <button id="btnSave">Spara</button>
</fieldset>
<h2>Livet i text</h2>
<section id="savedContent">
</section>`
);

//Hämtar skapade element
// const textHeadline = document.getElementById('textHeadline');
// const textDate = document.getElementById('textDate');
// const textContent = document.getElementById('textContent');
const btnSave = document.getElementById('btnSave');
const savedContent = document.getElementById('savedContent');
const newContent = document.getElementById('newContent');

// Initiera local om den är tom
if (localStorage.getItem('arraySaved') == null) {
  setStartArray = [];
  localStorage.setItem('arraySaved', JSON.stringify(setStartArray));
}

// Spara inlägg som object array med keys - savedheadline, savedDate & savedContent
let arraySavedTexts = [];

// let newTextContent;
// let newTextHeadline;
// let newTextDate;

btnSave.addEventListener('click', function () {
  //   newTextContent = textContent.value;
  //   newTextHeadline = textHeadline.value;
  //   newTextDate = textDate.value;
  //   console.log(newTextHeadline + newTextDate + newTextContent);

  let newArray = {
    headline: document.getElementById('textHeadline').value,
    date: document.getElementById('textDate').value,
    text: document.getElementById('textContent').value,
  };

  console.log(newArray);

  savingContentToDB(newArray);

  //   addingArrayToLocal();
  // sortArray(arraySavedTexts);
});

//Funktion för att spara till local
function addingArrayToLocal() {
  let newArray = {
    Headline: newTextHeadline,
    Date: newTextDate,
    Text: newTextContent,
  };
  let getSaved = JSON.parse(localStorage.getItem('arraySaved'));
  getSaved.push(newArray);
  localStorage.setItem('arraySaved', JSON.stringify(getSaved));
  console.log(getSaved);
  printingPage();
}

//Function with a fetch post to backend that saves incerts
function savingContentToDB() {
  fetch('', {
    method: 'post',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(newArray),
  })
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data);
      printingContent(data);
    });
}

//Function with a fetch that prints incerts
function printingContent(data) {
  savedContent.innerHTML = '';
  sortByDate(data);
  for (let i = 0; i < data.length; i++) {
    //Printa ut på sidan vad vi har i localstorage
    savedContent.insertAdjacentHTML(
      'beforeend',
      `<article id="newContent"><h3> ${data[i].Headline}<span>${data[i].Date}</span></h3><p> ${data[i].Text}</p></article>`
    );
  }
}

//Funktion för att skriva ut inlägg på sidan
function printingPage() {
  // Tömm innehåll innan vi printar igen
  savedContent.innerHTML = '';

  if (localStorage.getItem('arraySaved')) {
    getContent = JSON.parse(localStorage.getItem('arraySaved', 'value'));
    console.log(getContent);
    sortByDate(getContent);
    for (let i = 0; i < getContent.length; i++) {
      //Printa ut på sidan vad vi har i localstorage
      savedContent.insertAdjacentHTML(
        'beforeend',
        `<article id="newContent"><h3> ${getContent[i].Headline}<span>${getContent[i].Date}</span></h3><p> ${getContent[i].Text}</p></article>`
      );
    }
  }
}

//Funktion för att sortera inlägg
function sortByDate(arraySaved) {
  arraySaved.sort((a, b) => {
    if (a.Date > b.Date) {
      return -1;
    }
  });
}

// KÖR FUNKTION PRINTINGPAGE I SLUTET AV VARJE LIFECYCLE FÖR ATT PRINTA DET SOM FINNS
printingPage();

//Kod för att sortera lista
// myArray.sort((function(a, b)return b - a));
