/**
 * Class for drawing in the canvas.
 */
class Drawing {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");
    this.squareSize = squareSize;
    this.squareBorderSize = squareBorderSize;
    this.squareBorderColour = "#e3698e";
    this.squareColour = "#030b3e";
    this.squareRoomBorderColour = "#ffffff";
    this.squareRoomColour = "#69d4fc";
    this.chipRadius = 17;
    this.gameBoardFrameSize = 10;
    this.chipBorderColour="#636262";
    this.chipBorderWidth = 1;
    this.chipValueColour = "#ffffff";
    this.chipValueOffset =7;
  }

  getCanvas(){
    return this.canvas;
  }

  /**
   * Draw the gameboard Frame
   * @param  {int} width     [relative number of the column]
   * @param  {int} height    [relative number of the row]
   * @param  {int} fieldSize [the size of each square in pixels]
   */
  gameBoardFrame(width, height, fieldSize) {
    console.log(width, height, fieldSize);
    this.ctx.lineWidth=this.gameBoardFrameSize;
    this.ctx.strokeRect(this.gameBoardFrameSize/2,this.gameBoardFrameSize/2,width*fieldSize+this.gameBoardFrameSize,height*fieldSize+this.gameBoardFrameSize);
    this.ctx.translate(this.gameBoardFrameSize,this.gameBoardFrameSize);
  }

  /**
   * Draw the individual game square
   * @param  {int} xPosition [relative x position]
   * @param  {int} yPosition [relative y position]
   *
   * Ex: gameSquare(1,1) will draw the first square, gameSquare(1,5) will draw the 5th square in the first row (x)
   */
  gameSquare(xPosition,yPosition,) {
    this.ctx.fillStyle = this.squareBorderColour;
    this.ctx.fillRect((xPosition-1)*this.squareSize,(yPosition-1)*this.squareSize,this.squareSize,this.squareSize);
    this.ctx.fillStyle = this.squareColour;
    this.ctx.fillRect((xPosition-1)*this.squareSize+this.squareBorderSize,(yPosition-1)*this.squareSize+this.squareBorderSize,this.squareSize-2*this.squareBorderSize,this.squareSize-2*this.squareBorderSize);
  }

  /**
   * Draw the individual square representing a room, in a different colour
   * @param  {int} xPosition [relative x position]
   * @param  {int} yPosition [relative y position]
   */
  rooms(xPosition,yPosition) {
    this.ctx.fillStyle = this.squareRoomBorderColour;
    this.ctx.fillRect((xPosition-1)*squareSize,(yPosition-1)*squareSize,squareSize,squareSize);
    this.ctx.fillStyle = this.squareRoomColour;
    this.ctx.fillRect((xPosition-1)*squareSize+squareBorderSize,(yPosition-1)*squareSize+squareBorderSize,squareSize-2*squareBorderSize,squareSize-2*squareBorderSize);
  }

  gameOver(x,y){
    // TODO
  }

  /**
   * Draw the chip
   * @param  {Chip} chip [chip object with positions, colour and value]
   */
  chip(chip) {
    this.ctx.save();
    this.ctx.translate(((chip.xPosition()-0.5)*squareSize), ((chip.yPosition()-0.5)*squareSize));
    this.ctx.beginPath();
    this.ctx.arc(0,0,this.chipRadius,0,2*Math.PI);
    this.ctx.fillStyle = chip.colour;
    this.ctx.fill();
    this.drawChipBorder();
    this.ctx.restore();
    this.drawChipValue(chip.xPosition(), chip.yPosition(), chip.value);
  }

  /**
   * Draw the bottom chip, when a chip is place on top of it
   * @param  {Chip} chip [chip object with positions, colour and value]
   * @param  {int} offset       [offset from the center, where the chip will be draw]
   */
  bottomChip(chip, offset) {
    this.ctx.save();
    this.ctx.translate(((chip.xPosition()-0.5)*squareSize)+offset, ((chip.yPosition()-0.5)*squareSize)+offset);
    this.ctx.beginPath();
    this.ctx.arc(0,0,this.chipRadius,0,2*Math.PI);
    this.ctx.fillStyle = chip.colour;
    this.ctx.fill();
    this.drawChipBorder();
    this.ctx.restore();
  }


  /**
   * ********** Private Methods ************
   */

  /**
   * Draw the chip border
   */
  drawChipBorder(){
    this.ctx.lineWidth = this.chipBorderWidth;
    this.ctx.strokeStyle = this.chipBorderColour;
    this.ctx.stroke();
  }

  /**
   * Draw the chip value
   * @param  {int} x     [relative x position]
   * @param  {int} y     [relative y position]
   * @param  {int} value [chip value]
   */
  drawChipValue(x, y, value){
    switch(value) {
      case 1:
        this.drawValueOffset(x, y, 0, 0);
        break;
      case 2:
        this.drawValueOffset(x, y, this.chipValueOffset, -this.chipValueOffset);
        this.drawValueOffset(x, y, -this.chipValueOffset, this.chipValueOffset);
        break;
      case 3:
        this.drawValueOffset(x, y, this.chipValueOffset, -this.chipValueOffset);
        this.drawValueOffset(x, y, -this.chipValueOffset, this.chipValueOffset);
        this.drawValueOffset(x, y, 0, 0);
        break;
      case 4:
        this.drawValueOffset(x, y, this.chipValueOffset, -this.chipValueOffset);
        this.drawValueOffset(x, y, -this.chipValueOffset, this.chipValueOffset);
        this.drawValueOffset(x, y, -this.chipValueOffset, -this.chipValueOffset);
        this.drawValueOffset(x, y, this.chipValueOffset, this.chipValueOffset);
        break;
      case 5:
        this.drawValueOffset(x, y, 0, 0);
        this.drawValueOffset(x, y, this.chipValueOffset, -this.chipValueOffset);
        this.drawValueOffset(x, y, -this.chipValueOffset, this.chipValueOffset);
        this.drawValueOffset(x, y, -this.chipValueOffset, -this.chipValueOffset);
        this.drawValueOffset(x, y, this.chipValueOffset, this.chipValueOffset);
        break;
      case 6:
        this.drawValueOffset(x, y, this.chipValueOffset, -this.chipValueOffset);
        this.drawValueOffset(x, y, -this.chipValueOffset, this.chipValueOffset);
        this.drawValueOffset(x, y, -this.chipValueOffset, -this.chipValueOffset);
        this.drawValueOffset(x, y, this.chipValueOffset, this.chipValueOffset);
        this.drawValueOffset(x, y, this.chipValueOffset, 0);
        this.drawValueOffset(x, y, -this.chipValueOffset, 0);
        break;
      default:
        break;
    }
  }

  /**
   * Draw each pip individualy, given it's position
   * @param  {int} x       [relative x position]
   * @param  {int} y       [relative y position]
   * @param  {int} offsetX [offset x for the given pip]
   * @param  {int} offsetY [offset y for the given pip]
   */
  drawValueOffset(x, y, offsetX, offsetY) {
    this.ctx.save();
    this.ctx.fillStyle = this.chipValueColour;
    this.ctx.translate((x-0.5)*squareSize + offsetX, (y-0.5)*squareSize + offsetY);
    this.ctx.beginPath();
    this.ctx.arc(0,0,3,0,2*Math.PI);
    this.ctx.fill();
    this.ctx.restore();
  }
}
