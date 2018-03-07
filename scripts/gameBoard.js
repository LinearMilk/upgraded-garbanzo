let board = [];

function createGameBoard(i, j) {
  draw.gameBoardFrame(gameBoardWidth,gameBoardHeight,squareSize);
  for (i=1; i<=gameBoardWidth;i++) {
    for (j=1; j<=gameBoardHeight;j++) {
      draw.gameSquare(i,j);
      //TODO create method to add info the the board object
      board.push({
        xCoordinate: i,
        yCoordinate: j,
        roomNumber: 0,
        activeChip: null,
        bottomChip: null
      });
    }
  }

  rooms.forEach(function(el) {
    el.forEach(function(element) {
      var x = element[0], y = element[1], roomNumber = element[2];
      draw.rooms(x,y);
      (board.find(square => {
        if(square.xCoordinate === x && square.yCoordinate === y) return true;
      })).roomNumber = roomNumber;
    });
  });
  console.log(board);
}

function reloadPage() {
  window.location.reload(false);
}

function getClickCoordinates(xClick,yClick) {
  var boarder = gameBoardFrameSize*2;
  var xLimit = (boarder+(squareSize*gameBoardWidth)-2);
  var yLimit = (boarder+(squareSize*gameBoardHeight)-2);

  if(xClick <= boarder || yClick <= boarder || xClick >= xLimit || yClick >= yLimit){
    return null;
  }

  var x = Math.floor((xClick-boarder)/squareSize)+1;
  var y = Math.floor((yClick-boarder)/squareSize)+1;
  var xInSquare = ((x*(squareSize))+boarder-5) - xClick;
  var yInSquare = ((y*(squareSize))+boarder-5) - yClick;

  // If clicked on the edges of the square, do NOT draw the Chip (square == [40, 40])
  if(xInSquare <= 5 || xInSquare >= 35 || yInSquare <= 5 || yInSquare >= 35){
    return null;
  }

  return [x,y];
}

draw.getCanvas().addEventListener('click',e => {
  xClick = e.clientX;
  yClick = e.clientY;
  var coordinates = getClickCoordinates(xClick,yClick);
  if(coordinates) {
    var x = coordinates[0];
    var y = coordinates[1];
    if (x>=0 && x<=gameBoardWidth && y>=0 && y<=gameBoardHeight) {
      handleRandomClickedChip(x,y);
    }
  }
} , false);

function handleRandomClickedChip(x,y) {
  var value = Math.floor(Math.random() * Math.floor(6)+1);
  var colour = colours[Math.floor(Math.random() * Math.floor(4))];

  var boardSquare = board.find(square => {
    if(square.xCoordinate === x && square.yCoordinate === y) return true;
  });

  if(boardSquare.bottomChip === null){
    if(boardSquare.activeChip != null) {
      boardSquare.bottomChip = boardSquare.activeChip;
      draw.bottomChip(x,y, boardSquare.bottomChip.colour, 3);
    }

    //TODO get rid of this from here
    var chip = player.playChip(x, y, value);

    draw.chip(chip);
    boardSquare.activeChip = chip;
  }

  console.log(boardSquare);
}
