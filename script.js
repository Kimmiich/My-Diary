// Vi utvecklar en dagbok för oss själva. Våra dagboksinlägg skall sparas i localStorage så att vi kan återkomma till sidan vid ett senare tillfälle och skriva nya inlägg. 

// När vi skapar ett inlägg så skall vi kunna ändra och skriva datum, rubrik samt en text.

// Alla skriva inlägg skall sedan visas i kronologiskt ordning på sidan under formuläret.

// skapa ett fieldset med legend och input
// inputfält för datum rubrik och text 
//skapa knapp som sparar inlägget till sidan som en article. senaste inlägget ska sparas i localstorage och visas överst på sidan.

console.log("Nu kör vi");
//Hämta våra element
const header = document.getElementById("header");
const main = document.getElementById("main");

//skapa element/templates
header.insertAdjacentHTML("afterbegin", `<h1>Min dagbok</h1>`);

main.insertAdjacentHTML("afterbegin",`
<fieldset>
    <legend>Kära dagbok...</legend>
    <input id="textHeadline" type="text" placeholder="Rubrik">
    <input id="textDate" type="date">
    <input id="textContent" type="text" placeholder="Text...">
    <button id="btnSave">Spara</button>
</fieldset>
<h2>Livet i text</h2>
<section id="savedContent">
</section>` );

//Hämtar skapade element
const textHeadline = document.getElementById("textHeadline");
const textDate = document.getElementById("textDate");
const textContent = document.getElementById("textContent");
const btnSave = document.getElementById("btnSave");
const savedContent = document.getElementById("savedContent");
const newContent = document.getElementById("newContent");

// Initiera local om den är tom 
if (localStorage.getItem("arraySaved") == null) {
    setStartArray = [];
    localStorage.setItem("arraySaved", JSON.stringify(setStartArray));
};

// Spara inlägg som object array med keys - savedheadline, savedDate & savedContent
let arraySavedTexts = [];

    let newTextContent;
    let newTextHeadline;
    let newTextDate;

btnSave.addEventListener("click", function(){
    newTextContent = textContent.value;
    newTextHeadline = textHeadline.value;
    newTextDate = textDate.value
    console.log(newTextHeadline + newTextDate + newTextContent);
    
    addingArrayToLocal();
    // sortArray(arraySavedTexts);
});

//Funktion för att spara till local
function addingArrayToLocal() {
    let newArray = {
        "Headline": newTextHeadline,
        "Date": newTextDate,
        "Text": newTextContent
    }
   let getSaved = JSON.parse(localStorage.getItem("arraySaved"))
   getSaved.push(newArray);
//    sortArray(arraySavedTexts);
   localStorage.setItem("arraySaved", JSON.stringify(getSaved));
   console.log(getSaved);
   printingPage();
};

//Funktion för att skriva ut inlägg på sidan
function printingPage() {

    // Tömm innehåll innan vi printar igen
    savedContent.innerHTML = "";

    if (localStorage.getItem("arraySaved")) {
        getContent = JSON.parse(localStorage.getItem("arraySaved", "value"))
    
        for (let i = 0; i < getContent.length; i++) {
            // sortArray(arraySavedTexts);
            
            //Printa ut på sidan vad vi har i localstorage
            savedContent.insertAdjacentHTML("beforeend", `<article id="newContent"><h3> ${getContent[i].Headline}<span>${getContent[i].Date}</span></h3><p> ${getContent[i].Text}</p></article>`);
            
            };
    };
};

// KÖR FUNKTION PRINTINGPAGE I SLUTET AV VARJE LIFECYCLE FÖR ATT PRINTA DET SOM FINNS
printingPage();

//Kod för att sortera lista
// myArray.sort((function(a, b)return b - a));

