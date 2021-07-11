const initGameState = (player1, player2) => {
  player1.cells = [];
  player2.cells = [];
  const cells = [];
  for (let i = 1; i <= 8; i++) {
    cells.push(i);
  }
  const gameState = {
    players: [player1, player2],
    turn: player1.uid,
    state: undefined,
    winner: undefined,
    cells: cells
  }
  saveGameState(gameState);
}

const saveGameState = (state) => {
  localStorage.setItem('gameState', JSON.stringify(state));
}

const getGameState = () => {
  return JSON.parse(localStorage.getItem('gameState'));
}