const app = document.createElement("div");
app.classList.add("app");

const header = document.createElement("header");
header.classList.add("game-header");

const title = document.createElement("h1");
title.classList.add("game-title");
title.textContent = "Memory Game";

const gameControls = document.createElement("div");
gameControls.classList.add("game-controls");

const newGameButton = document.createElement("button");
newGameButton.type = "button";
newGameButton.classList.add("new-game-button");
newGameButton.textContent = "New game";

const leaderboardButton = document.createElement("button");
leaderboardButton.type = "button";
leaderboardButton.classList.add("leaderboard-button");
leaderboardButton.textContent = "Leaderboard";

const main = document.createElement("main");
main.classList.add("game-main");

app.append(header, main);
header.append(title, gameControls);
gameControls.append(newGameButton, leaderboardButton);

const statistics = document.createElement("div");
statistics.classList.add("game-stats");

const moves = document.createElement("p");
moves.classList.add("moves-counter");
moves.textContent = "Moves: 0";

const pairs = document.createElement("p");
pairs.classList.add("pairs-counter");
pairs.textContent = "Pairs: 0 / 8";

const gameBoard = document.createElement("div");
gameBoard.classList.add("game-board");

statistics.append(moves, pairs);
main.append(statistics, gameBoard);

document.body.append(app);

const cardsData = [
  { pairId: 1, name: "chalet", image: "./assets/images/chalet.png" },
  { pairId: 2, name: "cow", image: "./assets/images/cow.png" },
  { pairId: 3, name: "edelweiss", image: "./assets/images/edelweiss.png" },
  { pairId: 4, name: "fondue", image: "./assets/images/fondue.png" },
  { pairId: 5, name: "matterhorn", image: "./assets/images/matterhorn.png" },
  {
    pairId: 6,
    name: "saint-bernard",
    image: "./assets/images/saint-bernard.png",
  },
  { pairId: 7, name: "swiss-flag", image: "./assets/images/swiss-flag.png" },
  { pairId: 8, name: "swiss-train", image: "./assets/images/swiss-train.png" },
];

const deck = [];

for (let i = 0; i < cardsData.length; i++) {
  deck.push({ ...cardsData[i], cardId: `${cardsData[i].pairId}a` });
  deck.push({ ...cardsData[i], cardId: `${cardsData[i].pairId}b` });
}

function shuffleDeck(deck) {
  let shuffledDeck = [...deck];
  for (let i = shuffledDeck.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    const firstElement = shuffledDeck[i];
    const secondElement = shuffledDeck[randomIndex];
    shuffledDeck[i] = secondElement;
    shuffledDeck[randomIndex] = firstElement;
  }
  console.log(shuffledDeck);
  return shuffledDeck;
}

const readyDeck = shuffleDeck(deck);

for (const card of readyDeck) {
  const cardButton = document.createElement("button");
  cardButton.type = "button";
  cardButton.classList.add("game-card");
  cardButton.dataset.pairId = card.pairId;
  cardButton.dataset.cardId = card.cardId;

  const cardBack = document.createElement("div");
  cardBack.classList.add("card-back");

  const cardFront = document.createElement("div");
  cardFront.classList.add("card-front");

  const cardImage = document.createElement("img");
  cardImage.classList.add("card-image");
  cardImage.src = card.image;
  cardImage.alt = card.name;

  cardFront.append(cardImage);
  cardButton.append(cardBack, cardFront);
  gameBoard.append(cardButton);
}
let firstCard = null;
let secondCard = null;

let isLocked = false;
let isGameOver = false;

let movesCount = 0;
let matchedPairsCount = 0;

gameBoard.addEventListener("click", function (event) {
  if (isLocked || isGameOver) {
    return;
  }
  const card = event.target.closest(".game-card");

  if (!card) {
    return;
  }

  if (card.classList.contains("is-flipped")) {
    return;
  }

  card.classList.add("is-flipped");

  if (firstCard === null) {
    firstCard = card;
    console.log(firstCard);
    return;
  }

  secondCard = card;
  movesCount++;
  moves.textContent = `Moves: ${movesCount}`;

  isLocked = true;

  console.log(firstCard, secondCard);

  if (firstCard.dataset.pairId === secondCard.dataset.pairId) {
    matchedPairsCount++;
    pairs.textContent = `Pairs: ${matchedPairsCount} / ${cardsData.length}`;
    firstCard = null;
    secondCard = null;
    isLocked = false;
    if (matchedPairsCount === cardsData.length) {
      isGameOver = true;
      console.log("You win!");
    }
  } else {
    console.log("no match");
    setTimeout(function () {
      firstCard.classList.remove("is-flipped");
      secondCard.classList.remove("is-flipped");
      firstCard = null;
      secondCard = null;
      isLocked = false;
    }, 1000);
  }
});
