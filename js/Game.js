import { createDeck, getShuffledDeck, shuffle, getCard } from './Deck.js';

const playerHandContainer = document.getElementById('player-hand');
const dealerHandContainer = document.getElementById('dealer-hand');
const hitButton = document.getElementById('hit-button');
const deck = getShuffledDeck();
let playerHand = [];
let dealerHand = [];

function displayPlayerCards(card, container) {
  const img = document.createElement('img');
  img.src = card.image;
  container.appendChild(img);
}

function displayHandValue(hand) {
  let standing = 0;
  hand.forEach(card => {
    standing += card.value;
  })
  return standing;
}

function updateDisplay() {
  playerHandContainer.innerHTML = '';
  dealerHandContainer.innerHTML = '';
  dealerHand.forEach(card => displayPlayerCards(card, dealerHandContainer));
  playerHand.forEach(card => displayPlayerCards(card, playerHandContainer));
  const playerValue = document.getElementById('player-standing');
  playerValue.textContent = displayHandValue(playerHand);

}

function startNewGame() {
  playerHand = [deck.pop(), deck.pop()];
  dealerHand = [deck.pop(), deck.pop()];
  console.log(playerHand);
  updateDisplay();
}

hitButton.onclick = function() {
  let newCard = deck.pop();
  playerHand.push(newCard);
  updateDisplay();
}

startNewGame();
