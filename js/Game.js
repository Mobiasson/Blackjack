import { createDeck, getShuffledDeck, shuffle, getCard } from './Deck.js';

const playerHandContainer = document.getElementById('player-hand');
const dealerHandContainer = document.getElementById('dealer-hand');
const deck = getShuffledDeck();
let playerHand = [];
let dealerHand = [];

function displayPlayerCards(card, container) {
  const img = document.createElement('img');
  img.src = card.image;
  container.appendChild(img);
}

function updateCards() {
  playerHandContainer.innerHTML = '';
  dealerHandContainer.innerHTML = '';
  dealerHand.forEach(card => displayPlayerCards(card, dealerHandContainer));
  playerHand.forEach(card => displayPlayerCards(card, playerHandContainer));

}

function startNewGame() {
  playerHand = [deck.pop(), deck.pop()];
  dealerHand = [deck.pop(), deck.pop()];
  updateCards();
}

startNewGame();
