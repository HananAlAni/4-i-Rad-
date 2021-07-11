
const game = (player1, player2) => {
  gameState = getGameState();
  const wrap = document.createElement('div');
  wrap.classList.add('game__game-container', 'animate__animated', 'animate__fadeIn');
  wrap.appendChild(score(player1, player2));
  const turnContainer = document.createElement('div');
  turnContainer.classList.add('game__player-turn-container');
  const player = document.createElement('h3');
  player.setAttribute('id', 'player-turn');
  player.classList.add('red-turn');
  player.innerText = 'Röds tur';
  const timeContainer = document.createElement('div');
  const timeCounter = document.createElement('span');
  timeCounter.setAttribute('id', 'time');
  timeCounter.innerText = 30;

  const timeText = document.createElement('small');
  timeText.innerText = 'remaining time';
  const borderBottom = document.createElement('div');
  borderBottom.classList.add('game__border-bottom');

  const board = document.createElement('div');
  board.classList.add('game__board');
  let boardRow = null;
  for (let i = 64; i > 0; i--) {
    if (i % 8 === 0) {
      boardRow = document.createElement('div');
      boardRow.classList.add('game__board-row');
      board.appendChild(boardRow);
    }
    const boardCell = document.createElement('div');
    boardCell.classList.add('game__board-cell');
   
      const cellN = document.createElement('span');
      cellN.innerText = i;
      boardCell.appendChild(cellN);

    boardCell.setAttribute('cell', i);
    cellsEvents(boardCell);
    boardRow.appendChild(boardCell);
  }
  const surrenderBtn = document.createElement('button');
  surrenderBtn.classList.add('btn', 'btn-phone');
  surrenderBtn.innerText = 'Surrender';
  gameEvents(surrenderBtn);

  timeContainer.appendChild(timeCounter);
  timeContainer.appendChild(timeText);

  turnContainer.appendChild(player);
  turnContainer.appendChild(timeContainer);
  turnContainer.appendChild(borderBottom);

  wrap.appendChild(turnContainer);
  wrap.appendChild(board);
  wrap.appendChild(surrenderBtn);
  setTimeout(() => {
    time = setTime();
  }, 500);
  return wrap;
}

const gameEvents = (btnSurrender) => {
  btnSurrender.addEventListener('click', () => {
    const surrendered = gameState.turn;
    if (surrendered === 601) {
      endGame(602);
    } else if(surrendered === 602) {
      endGame(601);
    }
  })
}

const cellsEvents = (boardCell) => {
  boardCell.addEventListener('click', (e) => {
    const cell = e.target,
    cellNumber = Number(cell.attributes['cell'].value);
    const token = setToken(cellNumber);
    if (token) {
      cell.appendChild(token);
      removeCell(cellNumber);
      time = setTime();
      saveGameState(gameState);
    }
  });
}

let time = undefined;

const setToken = (cellNumber) => {
  if (gameState.cells.includes(cellNumber)) {
    const token = document.createElement('div');
    token.classList.add('game__token');
    if (gameState.turn === 601) {
      token.classList.add('game__token-red');
      gameState.players[0].cells.push(cellNumber);
      if (gameState.players[0].cells.length > 3) {
        if (verticalLine(gameState.players[0].cells)  || horizontalLine(gameState.players[0].cells) || diagonalLineRight(gameState.players[0].cells) || diagonalLineLeft(gameState.players[0].cells)) {
          return endGame(601);
        };
      }
      setTurn(602);
    } else if (gameState.turn === 602) {
      token.classList.add('game__token-blue');
      gameState.players[1].cells.push(cellNumber);
      if (gameState.players[1].cells.length > 3) {
        if (verticalLine(gameState.players[1].cells) || horizontalLine(gameState.players[1].cells) || diagonalLineRight(gameState.players[1].cells) || diagonalLineLeft(gameState.players[1].cells)) {
          return endGame(602);
        };
      }
      setTurn(601);
    }

    return token;
  }
}

const endGame = (uidWinner) => {
  if (uidWinner) {
    gameState.winner = gameState.players.find(player => {
      if (player.uid === uidWinner) {
        player.score++;
        return player;
      }
    }).name;
    gameState.state = 'Vinnaren är ';
  } else {
    gameState.state = 'Tie';
  }
  saveGameState(gameState);
  resetTime();
  setComponent(gameEnded(gameState.players[0], gameState.players[1]));
}

const setTurn = (newTurn) => {
  gameState.turn = newTurn;  const player = gameState.players.find(player => player.uid === newTurn);
  if (player.uid === 601) {
    document.getElementById('player-turn').innerText = 'Röds tur';
    document.getElementById('player-turn').classList.remove('blue-turn');
    document.getElementById('player-turn').classList.add('red-turn');
  } else if (player.uid === 602) {
    document.getElementById('player-turn').innerText = 'Blus tur';
    document.getElementById('player-turn').classList.remove('red-turn');
    document.getElementById('player-turn').classList.add('blue-turn');
  }
}

const removeCell = (cellNumber) => {
  gameState.cells = gameState.cells.filter(cell => cell !== cellNumber);
  if (cellNumber < 57) {
    gameState.cells.push(cellNumber + 8);
  }
  if (gameState.cells.length === 0) {
    endGame(null);
  }
}

const setTime = () => {
  resetTime();
  if (time) {
    document.getElementById('time').innerText = 30;
  }
  return setInterval(() => {
    let turnTime = Number(document.getElementById('time').innerText);
    if (turnTime > 0) {
      turnTime = turnTime - 1;
    } else {
      turnTime = 30;
   
      if (gameState.turn === 601) {
        setTurn(602);
      } else if (gameState.turn === 602) {
        setTurn(601);
      }
    }
    document.getElementById('time').innerText = turnTime;
  }, 1000);
}

const resetTime = () => {
  if (time) {
    clearInterval(time);
  }
}
