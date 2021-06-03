// Part 1: Number Facts
let baseURL = "http://numbersapi.com/";
const numberFactsDiv = document.querySelector('#number-facts')
const fourFactsDiv = document.querySelector('#number4-facts')

// Get a fact about the number 4
axios
  .get(`${baseURL}4?json`)
  .then(p1 => {
    console.log(`The number fact is ${p1.data.text}`);
  })
  .catch(err => {
    console.log(`There was a problem ${err}`);
  });

// get facts from a number range and add them to the page
axios
  .get(`${baseURL}1..4?json`)
  .then(nums => {
    for (let i = 1; i < 5; i++) {
        const fact = document.createElement('h3');
        fact.innerText = nums.data[`${i}`];
        numberFactsDiv.appendChild(fact);
    }
  })
  .catch(err => {
    console.log(`There was a problem ${err}`);
  });


// Add facts about the number 4
axios
  .get(`${baseURL}4?json`)
  .then(p1 => {
    createFact(p1.data.text)
    return axios.get(`${baseURL}4?json`);
  })
  .then(p2 => {
    createFact(p2.data.text)
    return axios.get(`${baseURL}4?json`);
  })
  .then(p3 => {
    createFact(p3.data.text)
    return axios.get(`${baseURL}4?json`);
  })
  .then(p4 => {
    createFact(p4.data.text)
  })
  .catch(err => {
    console.log(`There was a problem ${err}`);
  });

  function createFact(factText){
    const fact = document.createElement('h3');
    fact.innerText = `${factText}`;
    fourFactsDiv.appendChild(fact);
  }

  // Part 2: Deck of Cards

// Draw one card and console.log value and suit
axios
  .get(`https://deckofcardsapi.com/api/deck/new/shuffle/`, {params: {deck_count: 1}})
  .then(d => {
    return axios.get(`https://deckofcardsapi.com/api/deck/${d.data.deck_id}/draw/`, {params: {count: 1}});
  })
  .then(c => {
    console.log(`${c.data.cards[0].value} of ${c.data.cards[0].suit}`);
  })
  .catch(err => {
    console.log(`There was a problem ${err}`);
  });

  // draw two cards and console.log value and suit

  axios
  .get(`https://deckofcardsapi.com/api/deck/new/shuffle/`, {params: {deck_count: 1}})
  .then(d => {
    return axios.get(`https://deckofcardsapi.com/api/deck/${d.data.deck_id}/draw/`, {params: {count: 2}});
  })
  .then(c => {
    console.log(`${c.data.cards[0].value} of ${c.data.cards[0].suit}`);
    console.log(`${c.data.cards[1].value} of ${c.data.cards[1].suit}`);
  })
  .catch(err => {
    console.log(`There was a problem ${err}`);
  });

// Card drawing application

let deckID = "";
const newCardBtn = document.querySelector('#new-card');
const cardDiv = document.querySelector('#card-stack')
axios
.get(`https://deckofcardsapi.com/api/deck/new/shuffle/`, {params: {deck_count: 1}})
.then(d => {
  deckID = d.data.deck_id;
  newCardBtn.addEventListener('click', addCard)
})
.catch(err => {
    console.log(`There was a problem ${err}`);
});

function addCard(){
    axios
    .get(`https://deckofcardsapi.com/api/deck/${deckID}/draw/`, {params: {count: 1}})
    .then(c => {
        const cardImg = document.createElement('img');
        cardImg.setAttribute("src", `${c.data.cards[0].image}`);
        cardDiv.appendChild(cardImg);
        if (c.data.remaining === 0){
            newCardBtn.style.display = 'none';
        }
    })
    .catch(err => {
        console.log(`There was a problem ${err}`);
    });
}

