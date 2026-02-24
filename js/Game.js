import { getShuffledDeck } from './Deck.js';

const playerHandContainer = document.getElementById('player-hand');
const dealerHandContainer = document.getElementById('dealer-hand');
const hitButton = document.getElementById('hit-button');
const deck = getShuffledDeck();
let isRoundActive = false;
let playerHand = [];
let dealerHand = [];

function displayPlayerCards(card, container) {
  const img = document.createElement('img');
  img.src = card.image;
  container.appendChild(img);
}

function calculateCards(hand) {
  let standing = 0;
  hand.forEach(card => {
    standing += card.value;
  })
  return standing;
}

function checkWinnerOrLoser() {
  const playerScore = calculateCards(playerHand);
  const message = document.getElementById('message');
  message.textContent = playerScore > 21 ? 'You lose' : playerScore === 21 ? 'Blackjack' : '';
  if (playerScore > 21) hitButton.disabled = true;

}

function updateDisplay() {
  playerHandContainer.innerHTML = '';
  dealerHandContainer.innerHTML = '';
  dealerHand.forEach(card => displayPlayerCards(card, dealerHandContainer));
  playerHand.forEach(card => displayPlayerCards(card, playerHandContainer));
  const playerValue = document.getElementById('player-standing');
  const dealerValue = document.getElementById('dealer-standing');
  playerValue.textContent = calculateCards(playerHand);
  dealerValue.textContent = calculateCards(dealerHand);
  checkWinnerOrLoser();
}

function startNewGame() {
  isRoundActive = true;
  playerHand = [deck.pop(), deck.pop()];
  dealerHand = [deck.pop(), deck.pop()];
  if (isRoundActive) {
    updateDisplay();
  }
}

hitButton.onclick = function() {
  let newCard = deck.pop();
  playerHand.push(newCard);
  updateDisplay();
}

startNewGame();
