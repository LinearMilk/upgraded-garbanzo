import GameEngineChipMoves from "../scripts/gameEngineChipMoves";
import Chip from "../scripts/chip";

const squares = [
  {
    xCoordinate: 1,
    yCoordinate: 1,
    roomNumber: 0,
    activeChip: null,
    bottomChip: null,
    startingTile: ""
  },
  {
    xCoordinate: 1,
    yCoordinate: 2,
    roomNumber: 0,
    activeChip: null,
    bottomChip: null,
    startingTile: ""
  },
  {
    xCoordinate: 2,
    yCoordinate: 1,
    roomNumber: 0,
    activeChip: null,
    bottomChip: null,
    startingTile: ""
  },
  {
    xCoordinate: 2,
    yCoordinate: 2,
    roomNumber: 0,
    activeChip: null,
    bottomChip: null,
    startingTile: ""
  }
];

test("chip null should return no square (null)", () => {
  expect(GameEngineChipMoves.findSquare(squares, null)).toBe(null);
});

test("empty squares should return no square (null)", () => {
  const chip = new Chip("white", 1, [1, 1]);
  expect(GameEngineChipMoves.findSquare([], chip)).toBe(null);
});

test("squares=null should return no square (null)", () => {
  const chip = new Chip("white", 1, [1, 1]);
  expect(GameEngineChipMoves.findSquare(null, chip)).toBe(null);
});

test("chip on [1,1] should return square on [1,1]", () => {
  const chip = new Chip("white", 1, [1, 1]);
  squares[0].activeChip = chip;
  expect(GameEngineChipMoves.findSquare(squares, chip)).toBe(squares[0]);
});
