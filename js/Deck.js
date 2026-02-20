const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

function getRankName(rank) {
  const rankMap = {
    'A': 'ace',
    'J': 'jack',
    'Q': 'queen',
    'K': 'king'
  };
  return rankMap[rank] || rank;
}

function getImagePath(suit, rank) {
  const rankName = getRankName(rank).toLowerCase();
  return `assets/images/cards/${rankName}_of_${suit}.png`;
}

function getRankValue(rank) {
  if (rank === 'A') return 11;
  if (['J', 'Q', 'K'].includes(rank)) return 10;
  return parseInt(rank);
}

const createDeck = () => {
  return suits.flatMap(suit =>
    ranks.map(rank => ({
      suit,
      rank,
      value: getRankValue(rank),
      image: getImagePath(suit, rank),
      id: `${rank}_of_${suit}`
    }))
  );
};

function shuffle(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function getShuffledDeck() {
  return shuffle(createDeck());
}

function getCard(suit, rank) {
  const deck = createDeck();
  return deck.find(card => card.suit === suit && card.rank === rank);
}

export { createDeck, getShuffledDeck, shuffle, getCard };
