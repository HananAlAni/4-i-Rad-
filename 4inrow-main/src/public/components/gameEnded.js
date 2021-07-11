const gameEnded = (player1, player2) => {
  gameState = getGameState();
  const wrap = document.createElement('div');
  wrap.classList.add('gameEnded__ended-container', 'animate__animated', 'animate__fadeIn');
  const titleScore = document.createElement('h2');
  titleScore.classList.add('gameEnded__score');
  titleScore.innerText = 'Poäng';
  wrap.appendChild(titleScore);
  wrap.appendChild(score(player1, player2));
  const titleGameState = document.createElement('h2');
  titleGameState.classList.add('gameEnded__winner');
  titleGameState.innerText = gameState.state;
  wrap.appendChild(titleGameState);
  const winner = document.createElement('h1');
  winner.innerText = gameState.winner || '';
  wrap.appendChild(winner);
  const buttonContainer = document.createElement('div');
  buttonContainer.classList.add('gameEnded__btn-container');
  const btnPlayAgain = document.createElement('button');
  btnPlayAgain.classList.add('btn', 'btn-primary');
  btnPlayAgain.innerText = 'Spela igen';
  const btnBackMainMenu = document.createElement('button');
  btnBackMainMenu.classList.add('btn', 'btn-phone');
  btnBackMainMenu.innerText = 'Tillbaka';

  gameEndedEvents(btnPlayAgain, btnBackMainMenu);

  buttonContainer.appendChild(btnPlayAgain);
  buttonContainer.appendChild(btnBackMainMenu);

  wrap.appendChild(buttonContainer);

  return wrap;
}

const gameEndedEvents = (btnPlayAgain, btnBackMainMenu) => {
  btnPlayAgain.addEventListener('click', () => {
    initGameState(gameState.players[0], gameState.players[1]);
    setComponent(game(gameState.players[0], gameState.players[1]));
  });

  btnBackMainMenu.addEventListener('click', () => {
    setComponent(mainMenu());
  })
}