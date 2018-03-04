function createGameBoard(i, j) {
  ctx.save();
  drawGameBoardFrame(gameBoardWidth,gameBoardHeight,squareSize);
  for (i=1; i<=gameBoardWidth;i++) {
    for (j=1; j<=gameBoardHeight;j++) {
      drawGameSquare(i,j);
      board.push({
        xCoordinate: i,
        yCoordinate: j,
        roomNumber: 0,
        activeTile: null,
        bottomTile: null
      });
    }
  }

  rooms.forEach(function(el) {
    el.forEach(function(element) {
      var x = element[0], y = element[1], roomNumber = element[2];
      drawRooms(x,y);
      (board.find(square => {
        if(square.xCoordinate === x && square.yCoordinate === y) return true;
      })).roomNumber = roomNumber;
    });
  });
  console.log(board);

  ctx.restore();
}

function drawGameSquare(xPosition,yPosition,) {
  ctx.fillStyle = squareBorderColour;
  ctx.fillRect((xPosition-1)*squareSize,(yPosition-1)*squareSize,squareSize,squareSize);
  ctx.fillStyle = squareColour;
  ctx.fillRect((xPosition-1)*squareSize+squareBorderSize,(yPosition-1)*squareSize+squareBorderSize,squareSize-2*squareBorderSize,squareSize-2*squareBorderSize);
}

function drawGameBoardFrame(width, height, fieldSize) {
  ctx.strokeStyle=gameBoardFrameColour;
  ctx.lineWidth=gameBoardFrameSize;
  ctx.strokeRect(gameBoardFrameSize/2,gameBoardFrameSize/2,width*fieldSize+gameBoardFrameSize,height*fieldSize+gameBoardFrameSize);
  ctx.translate(gameBoardFrameSize,gameBoardFrameSize);
}

function drawRooms(xPosition,yPosition) {
  ctx.fillStyle = squareRoomBorderColour;
  ctx.fillRect((xPosition-1)*squareSize,(yPosition-1)*squareSize,squareSize,squareSize);
  ctx.fillStyle = squareRoomColour;
  ctx.fillRect((xPosition-1)*squareSize+squareBorderSize,(yPosition-1)*squareSize+squareBorderSize,squareSize-2*squareBorderSize,squareSize-2*squareBorderSize);
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function reloadPage() {
  window.location.reload(false);
}

function drawClickedTile(x,y) {
  var value = Math.floor(Math.random() * Math.floor(6)+1);
  var colour = colours[Math.floor(Math.random() * Math.floor(4))];

  var boardSquare = board.find(square => {
    if(square.xCoordinate === x && square.yCoordinate === y) return true;
  });

  if(boardSquare.bottomTile === null){
    if(boardSquare.activeTile != null) {
      boardSquare.bottomTile = boardSquare.activeTile;
      drawBottomTile(x,y, boardSquare.bottomTile.colour);
    }

    drawTile(x,y, colour, value);
    boardSquare.activeTile = {
      colour: colour,
      value: value
    };
  }

  console.log(boardSquare);
}

function getClickCoordinates(xClick,yClick) {
  var boarder = gameBoardFrameSize*2;
  var xLimit = (boarder+(squareSize*gameBoardWidth)-2);
  var yLimit = (boarder+(squareSize*gameBoardHeight)-2);

  if(xClick <= boarder || yClick <= boarder || xClick >= xLimit || yClick >= yLimit){
    return [-1, -1];
  }

  var x = Math.floor((xClick-boarder)/squareSize)+1;
  var y = Math.floor((yClick-boarder)/squareSize)+1;
  var xInSquare = ((x*(squareSize))+boarder-5) - xClick;
  var yInSquare = ((y*(squareSize))+boarder-5) - yClick;

  // If clicked on the edges of the square, do NOT draw the Tile (square == [40, 40])
  if(xInSquare <= 7 || xInSquare >= 33 || yInSquare <= 7 || yInSquare >= 33){
    return [-1, -1];
  }

  return [x,y];
}

canvas.addEventListener('click',e => {
  xClick = e.clientX;
  yClick = e.clientY;
  var coordinates = getClickCoordinates(xClick,yClick);
  var x = coordinates[0];
  var y = coordinates[1];
  if (x>=0 && x<=gameBoardWidth && y>=0 && y<=gameBoardHeight) {
    drawClickedTile(x,y);
  }

} , false);
