import { getShuffledDeck } from './Deck.js';

const playerHandContainer = document.getElementById('player-hand');
const dealerHandContainer = document.getElementById('dealer-hand');
const hitButton = document.getElementById('hit-button');
const stayButton = document.getElementById('stay-button');
const dealButton = document.getElementById('deal-button');
const deck = getShuffledDeck();
let isRoundActive = false;
let credits = 1000;
let currentBet = 0;
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
  const dealerScore = calculateCards(dealerHand);
  const message = document.getElementById('message');

  if (playerScore > 21) {
    hitButton.disabled = true;
    stayButton.disabled = true;
    message.textContent = "Player busts! Dealer wins!";
  } else if (dealerScore > 21) {
    hitButton.disabled = true;
    stayButton.disabled = true;
    message.textContent = "Dealer busts! Player wins!";
  } else if (playerScore > dealerScore) {
    hitButton.disabled = true;
    stayButton.disabled = true;
    message.textContent = "Player wins!";
  } else if (dealerScore > playerScore) {
    hitButton.disabled = true;
    stayButton.disabled = true;
    message.textContent = "Dealer wins!";
  } else {
    hitButton.disabled = true;
    stayButton.disabled = true;
    message.textContent = "Push! It's a tie!";
  }
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
}

function startNewGame() {
  isRoundActive = true;
  playerHand = [deck.pop(), deck.pop()];
  dealerHand = [deck.pop(), deck.pop()];
  if (isRoundActive) {
    updateDisplay();
  }
}

function updateCredits() {
  document.getElementById('credits-amount').textContent = credits;
}

hitButton.onclick = function() {
  playerHand.push(deck.pop());
  updateDisplay();

  const playerScore = calculateCards(playerHand);
  if (playerScore > 21) {
    checkWinnerOrLoser();
  }
}

stayButton.onclick = function() {
  while (calculateCards(dealerHand) < 17) {
    dealerHand.push(deck.pop());
  }
  updateDisplay();
  checkWinnerOrLoser();
}

dealButton.onclick = function() {
  currentBet = parseInt(document.getElementById('bet-input').value);
  if (currentBet > credits) {
    message.textContent = "Unsufficient credits";
    return;
  }
  credits -= currentBet;
  updateCredits();
}

startNewGame();
