import React from "react";
import Square from "./Square";

function Board({ startGrid, grid, onChange, disabled, solved, iniGrid }) {
  const renderSquares = () => {
    const squares = [];
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        const index = `${i},${j}`;
        squares.push(
          <Square
            style={
              startGrid[i][j] === 0
                ? { color: "green", backgroundColor: "#74c69d" }
                : { color: "black", backgroundColor: "#8ecae6" }
            }
            key={index}
            id={index}
            onChange={onChange}
            value={grid[i][j] === 0 ? "" : grid[i][j]}
            disabled={disabled || iniGrid[i][j] !== 0}
            grid={grid}
            iniGrid={iniGrid}
          />
        );
      }
    }
    return squares;
  };

  return <div className="sudoku-grid shadow">{renderSquares()}</div>;
}

export default Board;
