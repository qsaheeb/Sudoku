import React from "react";
import { FormControl } from "react-bootstrap";
import sudokuService from "../sudokuService";

function Square({ id, value, disabled, style, onChange, iniGrid, grid }) {
  const pos = {
    i: Number(id[0]),
    j: Number(id[2]),
  };
  return (
    <FormControl
      className="square"
      id={id}
      type="text"
      value={value}
      onChange={(e) => onChange(e, id)}
      disabled={disabled}
      maxLength="1"
      style={
        iniGrid[pos.i][pos.j] === 0 && grid[pos.i][pos.j] !== 0
          ? sudokuService.isSafe(grid, pos.i, pos.j, value)
            ? { background: "#74c69d" }
            : { background: "#da5552" }
          : style
      }
      autoComplete="off"
    />
  );
}
export default Square;
