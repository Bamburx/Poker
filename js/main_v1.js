const ranks = ['9', '10', 'jack', 'queen', 'king', 'ace'];
const suits = ['♥', '♣', '♦', '♠'];
let p1 = [];
let p2 = [];
//test
let p3 = [
  {id:1, rank:1, suit: '♠'},
  {id:2, rank:5, suit: '♠'},
  {id:3, rank:2, suit: '♠'},
  {id:4, rank:4, suit: '♠'},
  {id:5, rank:3, suit: '♠'}
]
// const cardValues = [
//   {card : "Ace of Hearts", id :14, color: 'heart'},{card : "9 of Hearts", id :9, color: 'heart'}, {card : "10 of Hearts", id :10, color: 'heart'}, {card: "Jack of Hearts", id : 11, color: 'heart'}, {card: "Queen of Hearts", id: 12, color: 'heart'}, {card: "King of Hearts", id: 13, color: 'heart'},
//   {card: "Ace of Diamonds", id: 14, color: 'diamond'}, {card: "9 of Diamonds",id : 9, color: 'diamond'}, {card: "10 of Diamonds",id: 10, color: 'diamond'}, {card: "Jack of Diamonds",id: 11, color: 'diamond'}, {card:"Queen of Diamonds",id: 12, color: 'diamond'}, {card:"King of Diamonds",id: 13, color: 'diamond'},
//   {card:"Ace of Clubs",id: 14, color: 'club'}, {card:"9 of Clubs",id: 9, color: 'club'}, {card:"10 of Clubs",id: 10, color: 'club'}, {card:"Jack of Clubs",id: 11, color: 'club'}, {card:"Queen of Clubs",id: 12, color: 'club'}, {card:"King of Clubs",id: 13, color: 'club'},
//   {card:"Ace of Spades",id: 14, color: 'spade'}, {card:"9 of Spades",id: 9, color: 'spade'}, {card:"10 of Spades",id: 10, color: 'spade'}, {card:"Jack of Spades",id: 11, color: 'spade'}, {card:"Queen of Spades",id: 12, color: 'spade'}, {card:"King of Spades",id: 13, color: 'spade'}
// ];


const cardValues = [];
let cardCount = 0

for (let suitsIndex = 0; suitsIndex < suits.length; suitsIndex++) {
  for (let ranksIndex = 0; ranksIndex < ranks.length; ranksIndex++) {
    cardValues.push({
      // card: `${ranks[ranksIndex]}s of ${suits[suitsIndex]}`,
      // id: Number(`${suitsIndex}${ranksIndex}`),
      id: cardCount, // rank: ranks[ranksIndex],
      rank: ranksIndex,
      suit: suits[suitsIndex], // color: ['heart', 'diamond'].includes(suits[suitsIndex]) ? 'red' : 'black'
    })
    cardCount++
  }
}

console.log(cardValues)

const PLAYER_CARDS_COUNT = 5;
const DECK_SIZE = cardValues.length;
const p2Board = document.querySelector('#player-2');
const p1Board = document.querySelector('#player-1');
const btnGame = document.querySelector('#newGame');
const btnExchange = document.querySelector('#exchange');
  btnExchange.disabled = true;

btnGame.addEventListener('click', () => {
  btnGame.disabled = true;
  btnExchange.disabled = false;

  for (let i = 0; i < DECK_SIZE; i++) {
    let card = cardValues[i];
    let randomId = Math.floor(Math.random() * DECK_SIZE)
    cardValues[i] = cardValues[randomId];
    cardValues[randomId] = card;
  }
  p1 = cardValues.splice(0, PLAYER_CARDS_COUNT)
  p1.sort((a, b) => a.rank - b.rank)


  p2 = cardValues.splice(0, PLAYER_CARDS_COUNT)
  p2.sort((a, b) => a.rank - b.rank)

  // assert that elements count === PLAYER_CARDS_COUNT
  // stworz funkcje z .this
  for (let cardValue of p2) {
    const div = document.createElement("div")
    div.id = cardValue.id;
    div.className = `card ${cardValue.rank} ${cardValue.suit}`;
    div.innerText = `${cardValue.rank} ${cardValue.suit}`
    div.addEventListener('click', () => {
      const bgColor = div.style.backgroundColor
      if (bgColor === '') {
        div.style.backgroundColor = 'rgb(9,220,191)';
        div.className = `clickedP2 card ${cardValue.rank} ${cardValue.suit}`;
      } else {
        div.style.backgroundColor = '';
        div.className = `card ${cardValue.rank} ${cardValue.suit}`;
      }
    })
    p2Board.append(div)
  }

  for (let cardValue of p1) {
    const div = document.createElement("div")
    div.id = cardValue.id;
    div.className = `card ${cardValue.rank} ${cardValue.suit}`;
    div.innerText = `${cardValue.rank} ${cardValue.suit}`
    div.addEventListener('click', () => {
      const bgColor = div.style.backgroundColor
      if (bgColor === '') {
        div.style.backgroundColor = 'rgb(9,220,191)';
        div.className = `clickedP1 card ${cardValue.rank} ${cardValue.suit}`;
      } else {
        div.style.backgroundColor = '';
        div.className = `card ${cardValue.rank} ${cardValue.suit}`;
      }
    })
    p1Board.append(div)
  }


})


btnExchange.addEventListener('click', () => {
  btnExchange.disabled = true;
  const clickedP2 = document.querySelectorAll('#player-2 .clickedP2');
  const x2 = Array.from(clickedP2);
  const clickedP1 = document.querySelectorAll('#player-1 .clickedP1');
  const x1 = Array.from(clickedP1);

  for (let click of x2){
    let NewCardP2 = cardValues.shift()
    
    for (let i = 0; i < p2.length; i++) {
      if (click.id == p2[i].id) {
        p2[i] = NewCardP2
        p2.sort((a, b) => a.rank - b.rank)
      }
    }
    click.id = NewCardP2.id
    click.className = `card ${NewCardP2.rank} ${NewCardP2.suit}`;
    click.innerText = `${NewCardP2.rank} ${NewCardP2.suit}`
    click.style.backgroundColor = ''
  }

  for (let click of x1){
    let NewCardP1 = cardValues.shift()
    
    for (let i = 0; i < p1.length; i++) {
      if (click.id == p1[i].id) {
        p1[i] = NewCardP1  
        p1.sort((a, b) => a.rank - b.rank)
      }
    }
    click.id = NewCardP1.id
    click.className = `card ${NewCardP1.rank} ${NewCardP1.suit}`;
    click.innerText = `${NewCardP1.rank} ${NewCardP1.suit}`
    click.style.backgroundColor = ''
  }

  // const clickedP1 = document.querySelectorAll('#player-1 .clickedP1')
  // clickedP1.forEach(el => el.remove());
  // for (let rejectedCard of clickedP1) {
  //   const RCIndex = p1.indexOf(rejectedCard);
  //   p1.splice(RCIndex, 1)
  // }
  // // stworz funkcje z .this
  // let NewCardsP1 = cardValues.splice(0, clickedP1.length)
  // for (let NCard of NewCardsP1) {
  //   const div = document.createElement("div")
  //   div.id = NCard.id;
  //   div.className = `card ${NCard.rank} ${NCard.suit}`;
  //   div.innerText = `${NCard.rank} ${NCard.suit}`
  //   p1Board.append(div)
  //   if (p1Board.length === PLAYER_CARDS_COUNT){break}
  // }
})
// wymiana

const btnScore = document.querySelector('#score');
btnScore.addEventListener('click', () => {
  // console.log(checkSore(p2))
  // console.log(checkSore(p1))
  result()
  // let win = checkSore(p2) >= checkSore(p1) ? "player 2 wygrał" : "player 1 wygrał";
  // console.log(win)
})


const highestCard = (deck) => {
  let highestC = deck[0];
  for (let i = 0; i < deck.length; i++) {
    if (deck[i].rank > highestC.rank) {
      highestC = deck[i]
    }
  }
  return highestC
}

const color = (deck) => {
  let sameColor = 1;
  for (let i = 0; i < 1; i++) {
    for (let j = i + 1; j < 5; j++) {
      if (i !== j) {
        if (deck[i].suit === deck[j].suit) {
          sameColor++
        }
      }
    }
  }
  if (sameColor === 5) {
    // console.log('color')
    return true
  }
  // else console.log('no color')
  return false
}

let usedCard2 = [];

const two = (deck) => {
  for (let i = 0; i < deck.length; i++) {
    for (let j = 0; j < deck.length; j++) {
      if (i !== j) {
        if (deck[i].rank === deck[j].rank) {
          // console.log(`para: ${deck[i].card} + ${deck[j].card}`)
          usedCard2.push(deck[i], deck[j])
          return true;
        }
      }
    }
  }
  // console.log('nie ma pary')
  return false;
}

const twoX2 = (deck) => {
  if (two(deck) === true) {
    let notUsed = deck.filter(element => !usedCard2.includes(element))
    let secondPair = two(notUsed)
    if (secondPair === true) {
      // console.log(`2 pary`)
      return true
    }
  }
  return false;
}

let usedCard3 = [];

const three = (deck) => {
  for (let i = 0; i < deck.length; i++) {
    for (let j = 0; j < deck.length; j++) {
      for (let k = 0; k < deck.length; k++) {
        if (i !== j && j !== k && i !== k) {
          if (deck[i].rank === deck[j].rank && deck[j].rank === deck[k].rank) {
            // console.log(`trójka: ${deck[i].card} + ${deck[j].card} + ${deck[k].card}`)
            // usedCard3.push(p2[i].card, p2[j].card, p2[k].card)
            usedCard3.push(deck[i], deck[j], deck[k])
            return true;
          }
        }
      }
    }
  }
  // console.log('nie ma trójki')
  return false;
}

const four = (deck) => {
  for (let i = 0; i < deck.length; i++) {
    for (let j = 0; j < deck.length; j++) {
      for (let k = 0; k < deck.length; k++) {
        for (let l = 0; l < deck.length; l++) {
          if (i !== j && j !== k && i !== k && i !== l && j !== l && k !== l) {
            if (deck[i].rank === deck[j].rank && deck[j].rank === deck[k].rank && deck[k].rank === deck[l].rank) {
              // console.log(`kareta: ${deck[i].card} + ${deck[j].card} + ${deck[k].card} + ${deck[l].card}`)
              return true;
            }
          }
        }
      }
    }
  }
  // console.log('nie ma karety')
  return false;
}

const ful = (deck) => {
  if (three(deck) === true) {
    let notUsed = deck.filter(element => !usedCard3.includes(element))
    let secondPair = two(notUsed)
    if (secondPair === true) {
      return true
    }
  }
  return false;
}

let checkStrit = 1;

const strit = (deck) => {
  for (let i = 0; i < deck.length; i++) {
    for (let j = 0; j < deck.length; j++) {
      if (i !== j) {
        if ((deck[j].rank - deck[i].rank) === 1) {
          checkStrit++
        }
      }
    }
  }
  if (checkStrit === 5) {
    // console.log('strit')
    return true
  } 
// else console.log('no strit')
  return false;
}

// const pocker = (deck) => strit(deck) && color(deck)

const poker = (deck) => {
  return strit(deck) && color(deck)
}


function checkSore(player) {
  
let pokerHand = [
  highestCard(player),
  two(player),
  twoX2(player),
  three(player),
  strit(player),
  color(player),
  ful(player),
  four(player),
  poker(player),
]

  for ( let i = pokerHand.length - 1; i > 0; i--){
    if (pokerHand[i] === true) {
      return i
    }
  }
    return highestCard(player)
}
  // const hand = {
  //   highestCard: highestCard(player),
  //   two: two(player),
  //   twoX2: twoX2(player),
  //   three: three(player),
  //   ful: ful(player),
  //   four: four(player),
  //   color: color(player),
  //   strit: strit(player),
  //   poker: poker(player)
  // }
  // console.log(hand)
  // return hand


function result() {
  let win = 'dupaaaa';


  if (checkSore(p1) === checkSore(p2)) {
    win = "remis"
  }
  else {
  win = checkSore(p2) >= checkSore(p1) ? "player 2 wygrał" : "player 1 wygrał";
} 
console.log(win);
return win
}


// function result() {
//   return p1 === p2 ? "remis"
//           : p2 > p1 ? "player 2 wygrał"
//           : "player 1 wygrał"
// }