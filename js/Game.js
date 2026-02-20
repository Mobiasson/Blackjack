import { createDeck, getShuffledDeck, shuffle, getCard } from './Deck.js';

const playerHandContainer = document.getElementById('player-hand');
const deck = getShuffledDeck();
let playerHand = []

function displayPlayerCards(card, container) {
  const img = document.createElement('img');
  img.src = card.image;
  container.appendChild(img);
}

function updateCards() {
  playerHandContainer.innerHTML = '';
  playerHand.forEach(card => displayPlayerCards(card, playerHandContainer));

}

function startNewGame() {
  
  playerHand = [deck.pop(), deck.pop()];
  updateCards();  
}

startNewGame();
