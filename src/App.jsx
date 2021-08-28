import React from "react";
import Typer from "./components/typer";
import { Container } from "react-bootstrap";
import SudokuSolver from "./components/SudokuSolver";

function App() {
  return (
    <Container className="text-center">
      <Typer
        className="typerr"
        heading="Sudoku"
        dataText={["Solver!", "Game!", "Challenge!", "Backtracking!"]}
      ></Typer>
      <hr />
      <SudokuSolver />
    </Container>
  );
}

export default App;
