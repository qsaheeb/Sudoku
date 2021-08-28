import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Button,
  FormCheck,
  Card,
} from "react-bootstrap";
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";
import RangeSlider from "react-bootstrap-range-slider";
import Board from "./Board";
import sudokuService, { EMPTY_GRID, EMPTY_START_GRID } from "../sudokuService";
import storageService from "../storageService";
import Footer from "./footer";

export default function SudokuSolver() {
  const [grid, setGrid] = useState(EMPTY_GRID);
  const [startGrid, setStartGrid] = useState(EMPTY_START_GRID);
  const [isGridDisabled, setIsGridDisabled] = useState(false);
  const [isShowProcessChecked, setIsShowProcessChecked] = useState(true);
  const [isSolved, setIsSolved] = useState(false);
  const [isSolving, setIsSolving] = useState(false);
  const [progressSpeed, setProgressSpeed] = useState(100);
  const [iniGrid, setIniGrid] = useState(EMPTY_GRID);

  useEffect(() => {
    const storageBoard = storageService.getBoard();
    if (storageBoard) {
      setGrid(storageBoard);
      setIniGrid(storageBoard);
    }
  }, []);
  const handleValueChange = (e, id) => {
    const { value } = e.target;
    if ((value <= 9 && value > 0) || value === "") {
      const position = id.split(",");
      const newGrid = grid.map((arr) => arr.slice());
      if (value === "") newGrid[position[0]][position[1]] = 0;
      else newGrid[position[0]][position[1]] = Number(value);
      setGrid(newGrid);
      storageService.setBoard(newGrid);
    }
  };

  const showProgress = async (progress) => {
    setIsGridDisabled(true);
    for (const grid of progress) {
      setGrid(grid);
      await new Promise((resolve) =>
        setTimeout(resolve, 1000 - 10 * progressSpeed)
      );
    }
    setIsSolved(true);
    setIsSolving(false);
  };

  const handleSolveButtonClicked = () => {
    setIsSolving(true);
    setIsSolved(false);
    setStartGrid(iniGrid.map((arr) => arr.slice()));
    const progress = sudokuService.solve(iniGrid);
    if (isShowProcessChecked) {
      showProgress(progress);
    } else {
      setIsGridDisabled(true);
      setGrid(progress[progress.length - 1]);
      setIsSolved(true);
      setIsSolving(false);
    }
  };

  const reset = () => {
    setGrid(EMPTY_GRID);
    setStartGrid(EMPTY_START_GRID);
    setIsGridDisabled(false);
    setIsSolved(false);
    storageService.setBoard(EMPTY_GRID());
  };

  const undo = () => {
    setIsGridDisabled(false);
    setGrid(startGrid);
    setStartGrid(EMPTY_START_GRID);
    setIsSolved(false);
  };
  return (
    <>
      <Row className="mt-4">
        <Col sm={8} className="mb-5">
          <Board
            startGrid={startGrid}
            grid={grid}
            onChange={handleValueChange}
            disabled={isGridDisabled}
            solved={isSolved}
            iniGrid={iniGrid}
          />
        </Col>
        <Col lg className="mb-5">
          <Card className="shadow">
            <Card.Body>
              <Button
                variant="primary"
                disabled={isSolving}
                onClick={() => {
                  reset();
                  const randomGrid = sudokuService.getRandomExample();
                  setGrid(randomGrid);
                  setIniGrid(randomGrid);
                  storageService.setBoard(randomGrid);
                }}
              >
                New Grid
              </Button>
              {isSolving ? (
                <Button
                  className="btn"
                  variant="danger"
                  onClick={() => window.location.reload()}
                >
                  Stop
                </Button>
              ) : (
                <Button
                  className="btn"
                  variant="success"
                  onClick={handleSolveButtonClicked}
                >
                  Auto Solve
                </Button>
              )}
              <br />
              <FormCheck
                className="mt-3"
                type="checkbox"
                label="Show Backtracking process"
                disabled={isSolving}
                checked={isShowProcessChecked}
                onChange={(e) => setIsShowProcessChecked(e.target.checked)}
              />
              {isShowProcessChecked ? (
                <div>
                  <br />
                  <p className="backtrack">Set Backtracking Speed</p>
                  <RangeSlider
                    value={progressSpeed}
                    onChange={(changeEvent) =>
                      setProgressSpeed(changeEvent.target.value)
                    }
                    variant="danger"
                  />
                </div>
              ) : (
                ""
              )}
              <Button
                className="mt-3 mr-1"
                variant="primary"
                disabled={isSolving}
                onClick={reset}
              >
                Clear
              </Button>
              <Button
                className="mt-3 ml-1"
                variant="primary"
                disabled={!isSolved}
                onClick={undo}
              >
                <i className="fas fa-undo" />
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <article>
        <h1>About Sudoku</h1>
        <p>
          Sudoku is a fun puzzle game once you get the hang of it. At the same
          time, learning to play Sudoku can be a bit intimidating for beginners.
          So, if you are a complete beginner, here are a few Sudoku tips that
          you can use to improve your Sudoku skills.
          <br /> <b>Tip 1:</b> Look for rows, columns of 3×3 sections that
          contain 5 or more numbers. Work through the remaining empty cells,
          trying the numbers that have not been used. In many cases, you will
          find numbers that can only be placed in one position considering the
          other numbers that are already in its row, column, and 3×3 grid.{" "}
          <br />
          <b>Tip 2:</b> Break the grid up visually into 3 columns and 3 rows.
          Each large column will have 3, 3×3 grids and each row will have 3, 3×3
          grids. Now, look for columns or grids that have 2 of the same number.
          Logically, there must be a 3rd copy of the same number in the only
          remaining 9-cell section. Look at each of the remaining 9 positions
          and see if you can find the location of the missing number.
        </p>
      </article>
      <article>
        <h1>How to play Sudoku</h1>
        <p>
          The goal of Sudoku is to fill in a 9×9 grid with digits so that each
          column, row, and 3×3 section contain the numbers between 1 to 9. At
          the beginning of the game, the 9×9 grid will have some of the squares
          filled in. Your job is to use logic to fill in the missing digits and
          complete the grid. Don’t forget, a move is incorrect if:
          <br />
          Any row contains more than one of the same number from 1 to 9
          <br />
          Any column contains more than one of the same number from 1 to 9
          <br />
          Any 3×3 grid contains more than one of the same number from 1 to 9
        </p>
      </article>
      <article>
        <h1>Sudoku Tips</h1>
        <p>
          Sudoku is a fun puzzle game once you get the hang of it. At the same
          time, learning to play Sudoku can be a bit intimidating for beginners.
          So, if you are a complete beginner, here are a few Sudoku tips that
          you can use to improve your Sudoku skills.
          <br />
          <b>Tip 1:</b> Look for rows, columns of 3×3 sections that contain 5 or
          more numbers. Work through the remaining empty cells, trying the
          numbers that have not been used. In many cases, you will find numbers
          that can only be placed in one position considering the other numbers
          that are already in its row, column, and 3×3 grid.
          <br />
          <b>Tip 2:</b> Break the grid up visually into 3 columns and 3 rows.
          Each large column will have 3, 3×3 grids and each row will have 3, 3×3
          grids. Now, look for columns or grids that have 2 of the same number.
          Logically, there must be a 3rd copy of the same number in the only
          remaining 9-cell section. Look at each of the remaining 9 positions
          and see if you can find the location of the missing number.
        </p>
      </article>
      <Footer />
    </>
  );
}
