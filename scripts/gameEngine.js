class GameEngine {
  constructor() {
    this.selectedBoard = null;
    this.squares = [];
    this.rooms = [];
    this.draw = new Drawing();;

    this.player = new Player(playerColours[3], [1,9]);;
    this.players = [this.player, null];

    this.currentRandomChips = [];
    this.selectedChip = null;
    this.endGame = false;

    var selectedBoardInfo = game_boards.board1;
    this.selectedBoard = new Board(selectedBoardInfo.dimensions, 
                                    selectedBoardInfo.numPlayers, 
                                    selectedBoardInfo.rooms, 
                                    selectedBoardInfo.startingPositions);
  }

  addEventListener(){
    this.draw.getCanvas().addEventListener('click',e => {
      xClick = e.clientX;
      yClick = e.clientY;

      var coordinates = this.getClickCoordinates(xClick,yClick);
      if(coordinates) {
        var x = coordinates[0];
        var y = coordinates[1];
        if (x>=0 && x<=gameBoardWidth && y>=0 && y<=gameBoardHeight) {
          if(this.selectedChip) {
            this.placeChip(x,y, this.player, this.selectedChip);
            
            // clean objects so player can't place same chip over and over
            this.currentRandomChips = [];
            this.selectedChip = null;

            this.draw.clearRandomChips(1,11);
          }
        }

        // Check for click on Chip choice
        if(y === 11 && this.currentRandomChips.length > 0){
          var deSelectedChip;
          if(x === 1) {
            this.selectedChip = this.currentRandomChips[0];
            deSelectedChip = this.currentRandomChips[1];
            deSelectedChip.isHighlighted = false;
          } else if(x === 2) {
            this.selectedChip = this.currentRandomChips[1];
            deSelectedChip = this.currentRandomChips[0];
            deSelectedChip.isHighlighted = false;
          } 

          if(x === 1 || x === 2) {
            this.selectedChip.isHighlighted = true;
            this.draw.chipsHighlights(this.selectedChip, deSelectedChip);
          }
        }
      }
    } , false);
  }

  /**
   * Create and draw the game board, room and placed chips (if it is redrawing)
   * @param  {Board}  selectedBoard   - the selected board in play
   * @param  {array}  players         - the array of players in play
   * @param  {boolean} redraw         - flag if it is creating the board for the first time (false) or redrawing (true)
   */
  createGameBoard(redraw = false) {
    this.draw.gameBoardFrame(this.selectedBoard.getBoardWidth(),this.selectedBoard.getBoardHeight(),squareSize);

    // Draw all the squares from the board
    for (var i=1; i<=this.selectedBoard.getBoardWidth();i++) {
      for (var j=1; j<=this.selectedBoard.getBoardHeight();j++) {
        this.draw.gameSquare(i,j);
        if(!redraw){
          this.squares.push({
            xCoordinate: i,
            yCoordinate: j,
            roomNumber: 0,
            activeChip: null,
            bottomChip: null,
            startingTile: ""
          });
        }
      }
    }

    // Draw all the lightened squares for the rooms
    this.selectedBoard.getRooms().forEach(room => {
      var roomNumber = room.roomNum;
      room.roomSquares.forEach(roomSquare => {
        var x = roomSquare[0], y = roomSquare[1];
        this.draw.rooms(x,y);
        if(!redraw){
          (this.getBoard().find(square => {
            if(square.xCoordinate === x && square.yCoordinate === y) return true;
          })).roomNumber = roomNumber;
        }
      });
    });

    // Draw Starting tiles
    this.createStartingTiles(this.players);

    // Draw all the chips played on that board
    if(redraw){
      this.squares.forEach(square => {
        if(square.bottomChip) this.draw.bottomChip(square.bottomChip, 3);
        if(square.activeChip) this.draw.chip(square.activeChip);
    });
    }
  }

  /**
   * Create and draw starting tiles for the players in game
   * @param  {array} player  - array of players in play
   */
  createStartingTiles(players){
    players.forEach(player => {
      (this.getBoard().find(square => {
        var squareCoordinates = [square.xCoordinate, square.yCoordinate].toString();
        var startingPosCoodinates = this.player.getStartingPosition().toString();

        if(squareCoordinates == startingPosCoodinates) return true;
      })).startingTile = this.player;

      this.draw.startingTile(this.player.getStartingPosition(), this.player.getColour());
    }); 
  }

  /**
   * Get a random Chip from the current player
   */
  getRandomChip(){
    if(!this.endGame && this.currentRandomChips.length <= 0){
      var chipValues = this.player.getRandomChipType();

      if(chipValues.length > 0){
        var chip1 = new Chip(this.player.getColour(), chipValues[0], [1, 11]);
        var chip2 = new Chip(this.player.getColour(), chipValues[1], [2, 11]);

        this.currentRandomChips = [chip1, chip2];

        this.draw.chip(chip1);
        this.draw.chip(chip2);
      } else {
        this.draw.gameOver(1,11);
        this.endGame = true;
      }
    }
  }

  getBoard(){
    return this.squares;
  }

  placeChip(x,y, player, chip){
    var boardSquare = this.squares.find(square => {
      if(square.xCoordinate === x && square.yCoordinate === y) return true;
    });

    if(boardSquare.bottomChip === null){
      if(boardSquare.activeChip != null) {
        boardSquare.bottomChip = boardSquare.activeChip;
        this.draw.bottomChip(boardSquare.bottomChip, 3);
      }

      //TODO get rid of this from here
      var playedChip = player.playChip(x, y, chip.value);
      this.draw.chip(playedChip);
      boardSquare.activeChip = playedChip;
    }
  }


  getClickCoordinates(xClick,yClick) {
    var border = gameBoardFrameSize*2;

    var x = Math.floor((xClick-border)/squareSize)+1;
    var y = Math.floor((yClick-border)/squareSize)+1;
    var xInSquare = ((x*(squareSize))+border-5) - xClick;
    var yInSquare = ((y*(squareSize))+border-5) - yClick;

    // If clicked on the edges of the square, do NOT draw the Chip (square == [40, 40])
    if(xInSquare <= 5 || xInSquare >= 35 || yInSquare <= 5 || yInSquare >= 35){
      return null;
    }

    return [x,y];
  }

}
