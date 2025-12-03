const numberOfPairs = 9; 
let foundPairs = 0;
let firstCardTurned = null;

let canTurnCards = true;

document.getElementById("generateCards").addEventListener('click', () => {
    let cards = [];
    for (i = 0; i < numberOfPairs; i++) {
        cards.push(i, i);
    }
    cards = shuffle(cards);

    cards.forEach(n => {
        createCard(n);
    });
});


document.addEventListener("click", (event) => {
    if (event.target.closest(".flippable") !== null && canTurnCards) { //check if card is still flippable and if we are not in an animation
        const card = event.target.closest(".card");
        flipCard(card);
        if (firstCardTurned === null) {
            firstCardTurned = card;
        }
        else {
            if (firstCardTurned.dataset.number === card.dataset.number) {
                console.log("hit");
                foundPairs += 1;
                firstCardTurned = null;
            }
            else {
                canTurnCards  = false;
                setTimeout(() => {
                    flipCard(firstCardTurned);
                    flipCard(card);
                    firstCardTurned = null;
                    canTurnCards = true;
                }, 500);
            }
        }
    }
});


/**
 * create a card and add it to the div
 * @param {int} number the hidden value of the card. another one of this should exist.
 */
function createCard(number) {
    const col = document.createElement('div');
    col.className = 'col-sm-2';

    const card = document.createElement('div');
    card.className = 'card flippable p-3 memoryCardBG';
    card.dataset.number = number;
    card.innerHTML = `
    <img src="/static/monthink.jpg"></img>
        
    `;

    // building the hierarchy of html
    col.appendChild(card);
    cardContainer.appendChild(col);
}

/**
 * flips a card on the play field
 * @param {*} card 
 */
function flipCard(card) {
    if (card.classList.contains('flippable')) {
        card.innerHTML = card.dataset.number;
        card.classList.add("turned");
        card.classList.remove("flippable");
    }
    else {        
        card.innerHTML = `<img src="/static/monthink.jpg"></img>`
        card.classList.remove("turned");
        card.classList.add("flippable");
    }
}


/**
 * Shuffles the array using Fisher-Yates Algorithm
 * @param {Array} array 
 * @returns shuffled array
 */
function shuffle(array) { 
  for (let i = array.length - 1; i > 0; i--) { 
    const j = Math.floor(Math.random() * (i + 1)); 
    [array[i], array[j]] = [array[j], array[i]]; 
  } 
  return array; 
}; 

// Usage 
/*
const myArray = ["apple", "banana", "cherry", "date", "elderberry"]; 
const shuffledArray = shuffle(myArray); 

console.log(shuffledArray);
*/