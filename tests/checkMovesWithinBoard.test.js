import GameEngineChipMoves from "../scripts/gameEngineChipMoves";
import Chip from "../scripts/chip";
import * as globals from "../scripts/globals";

import * as testConstants from "./testConstants";

test("chip null should return undefined", () => {
  expect(GameEngineChipMoves.checkMovesWithinBoard(null, 2, 2)).toBe(undefined);
});

test("gameBoardWidth < 1 should return undefined", () => {
  expect(GameEngineChipMoves.checkMovesWithinBoard(null, 0, 2)).toBe(undefined);
});

test("gameBoardHeight < 1 should return undefined", () => {
  expect(GameEngineChipMoves.checkMovesWithinBoard(null, 2, 0)).toBe(undefined);
});

test("chip(1) on [2,2] should return [[2,1],[3,2],[2,3],[1,2]]", () => {
  expect(GameEngineChipMoves.checkMovesWithinBoard(testConstants.chipThree, 3, 3)).toEqual([
    [2, 1],
    [3, 2],
    [2, 3],
    [1, 2]
  ]);
});
