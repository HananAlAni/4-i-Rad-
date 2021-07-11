const horizontalLine = (playerCells) => {
  let counter = 0;
  const cellsArray = [...playerCells];
  for (let i = 0; i < cellsArray.length; i++) {
    counter = 1;
    let numberCell = cellsArray[i] + 1;
    for (let j = 0; j < 3; j++) {
      if ((residue(cellsArray[i]) === 0 || residue(numberCell) === 0) && counter > 3) {
        break;
      }
      if (cellsArray.includes(numberCell)) {
        counter++;
        numberCell += 1;
      } else {
        j = 3;
      }
    }
    if (counter === 4) {
      break;
    }
  }
  return (counter === 4) ? true : false;
}

const verticalLine = (playerCells) => {
  let counter = 0;
  const cellsArray = [...playerCells];
  for (let i = 0; i < cellsArray.length; i++) {
    counter = 1;
    let numberCell = cellsArray[i] + 8;
    for (let j = 0; j < 3; j++) {
      if (cellsArray.includes(numberCell)) {
        counter++;
        cellsArray.splice(i, 1);
        numberCell += 8;
      } else {
        j = 3;
      }
    }
    if (counter === 4) {
      break;
    }
  }
  return (counter === 4) ? true : false;
}

const diagonalLineRight = (playerCells) => {
  let counter = 0;
  const cellsArray = [...playerCells];
  for (let i = 0; i < cellsArray.length; i++) {
    counter = 1;
    let numberCell = cellsArray[i] + 7;
    for (let j = 0; j < 3; j++) {
      if ((residue(cellsArray[i]) < 4 && residue(cellsArray[i]) !== 0)) break;
      if (residue(numberCell) === 1 && counter > 3) {
        break;
      }
      if (cellsArray.includes(numberCell)) {
        counter++;
        numberCell += 7;
      } else {
        j = 3;
      }
    }
    if (counter === 4) {
      break;
    }
  }
  return (counter === 4) ? true : false;
}

const diagonalLineLeft = (playerCells) => {
  let counter = 0;
  const cellsArray = [...playerCells];
  for (let i = 0; i < cellsArray.length; i++) {
    counter = 1;
    let numberCell = cellsArray[i] + 9;
    for (let j = 0; j < 3; j++) {
      debugger
      if (residue(cellsArray[i]) === 0 || residue(cellsArray[i]) > 5) break;
      if (residue(numberCell) === 0 && counter > 3) {
        break;
      }
      if (cellsArray.includes(numberCell)) {
        counter++;
        numberCell += 9;
      } else {
        j = 3;
      }
    }
    if (counter === 4) {
      break;
    }
  }
  return (counter === 4) ? true : false;
}

const residue = (number) => {
  return number % 8;
}
