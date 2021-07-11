const score = (player1, player2) => {
  const wrap = document.createElement('div');
  wrap.classList.add('score__score-container');
  const playerRed = document.createElement('h3');
  playerRed.innerText = player1.name;
  const playerBlue = document.createElement('h3');
  playerBlue.innerText = player2.name;
  const redToken = document.createElement('div');
  redToken.classList.add('score__player-color');
  redToken.setAttribute('id', 'red-player');
  const blueToken = document.createElement('div');
  blueToken.classList.add('score__player-color');
  blueToken.setAttribute('id', 'blue-player');
  const score = document.createElement('div');
  score.classList.add('score__score');
  const redCounter = document.createElement('span');
  redCounter.setAttribute('id', 'red-player-counter');
  redCounter.innerText = player1.score;
  const blueCounter = document.createElement('span');
  blueCounter.setAttribute('id', 'blue-player-counter');
  blueCounter.innerText = player2.score;
  const line = document.createElement('span');
  line.innerText = '-';

  score.appendChild(redCounter);
  score.appendChild(line);
  score.appendChild(blueCounter);

  wrap.appendChild(playerRed);
  wrap.appendChild(redToken);
  wrap.appendChild(score);
  wrap.appendChild(blueToken);
  wrap.appendChild(playerBlue);

  return wrap;
}