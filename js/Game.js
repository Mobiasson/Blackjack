import { getShuffledDeck } from './Deck.js';
import { Profile } from './Profiles.js';

const profile = Profile;

profile.getProfile();

const playerHandContainer = document.getElementById('player-hand');
const dealerHandContainer = document.getElementById('dealer-hand');
const hitButton = document.getElementById('hit-button');
const stayButton = document.getElementById('stay-button');
const dealButton = document.getElementById('deal-button');
const playButton = document.getElementById('play-button');
playButton.style.visibility = "hidden";
const deck = getShuffledDeck();
let isRoundActive = false;
let credits = profile.currentProfile.credits;
let currentBet = 0;
let potValue = 0;
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
  if (playerScore > 21) endRound("Player busts! Dealer wins!");
  else if (dealerScore > 21) endRound("Dealer busts! Player wins!");
  else if (playerScore > dealerScore) endRound("Player wins!");
  else if (dealerScore > playerScore) endRound("Dealer wins!");
  else endRound("Push! It's a tie!");
}

function endRound(message) {
  hitButton.disabled = true;
  stayButton.disabled = true;
  isRoundActive = false;
  document.getElementById('message').textContent = message;
  updateDisplay();
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
  if (!isRoundActive) {
    playButton.style.visibility = "visible";
  }
}

function startNewGame() {
  isRoundActive = true;
  hitButton.disabled = false;
  stayButton.disabled = false;
  playerHand = [deck.pop(), deck.pop()];
  dealerHand = [deck.pop(), deck.pop()];
  if (isRoundActive) {
    updateDisplay();
  }
}

function updateCredits() {
  document.getElementById('credits-amount').textContent = credits;
  profile.setCredits(credits);
}

function updatePot() {
  potValue += currentBet;
  const potElement = document.getElementById('pot');
  potElement.textContent = `Pot: $${potValue}`;
}

hitButton.onclick = function () {
  playerHand.push(deck.pop());
  updateDisplay();
  const playerScore = calculateCards(playerHand);
  if (playerScore > 21) {
    checkWinnerOrLoser();
  }
}

stayButton.onclick = function () {
  while (calculateCards(dealerHand) < 17) {
    dealerHand.push(deck.pop());
  }
  updateDisplay();
  checkWinnerOrLoser();
}

dealButton.onclick = function () {
  currentBet = parseInt(document.getElementById('bet-input').value);
  if (currentBet > credits) {
    message.textContent = "Unsufficient credits";
    return;
  } else {
    credits -= currentBet;
    updateCredits();
    updatePot();
  }
}

playButton.onclick = function () {
  startNewGame();
  playButton.style.visibility = "hidden";
}

startNewGame();
