"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [isWon, setIsWon] = useState(null);
  const [isTie, setIsTie] = useState(null);

  const [cells, setCells] = useState([
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
  ]);

  const [figureToPlace, setFigureToPlace] = useState();

  const restartGame = () => {
    setCells(["_", "_", "_", "_", "_", "_", "_", "_", "_"]);
    setIsWon(null);
    setIsTie(null);
  }

  useEffect(() => {
    const randnum = Math.random();
    if (randnum > 0.5) {
      setFigureToPlace("X");
    } else {
      setFigureToPlace("0");
    }
  }, []);

  const winningCombinations = [
    [1, 1, 1, 2, 2, 2, 2, 2, 2], // Top row
    [2, 2, 2, 1, 1, 1, 2, 2, 2], // Middle row
    [2, 2, 2, 2, 2, 2, 1, 1, 1], // Bottom row
    [1, 2, 2, 1, 2, 2, 1, 2, 2], // Left column
    [2, 1, 2, 2, 1, 2, 2, 1, 2], // Middle column
    [2, 2, 1, 2, 2, 1, 2, 2, 1], // Right column
    [1, 2, 2, 2, 1, 2, 2, 2, 1], // Main diagonal
    [2, 2, 1, 2, 1, 2, 1, 2, 2], // Anti-diagonal
  ];

  const checkWinningCombination = (element, board) => {
    const boardCopy = [...board];
    for (let i = 0; i < 9; i++) {
      if (board[i] === element) {
        boardCopy[i] = 1;
      } else { 
        boardCopy[i] = 2;
      }
    }

    return winningCombinations.some((winCombo) =>
      winCombo.every((val, index) => val === boardCopy[index])
    );
  };

  const GameRow = ({ cells, onClickHandler, rowIndex }) => (
    <div className="game-row flex flex-row space-x-2 text-8xl">
      {cells.slice(rowIndex * 3, rowIndex * 3 + 3).map((cell, index) => (
        <div key={index} onClick={() => onClickHandler(rowIndex * 3 + index)}>
          {cell}
        </div>
      ))}
    </div>
  );

  const GameBoard = ({ cells, onClickHandler }) => (
    <div>
      {Array.from({ length: 3 }, (_, index) => (
        <GameRow
          key={index}
          cells={cells}
          onClickHandler={onClickHandler}
          rowIndex={index}
        />
      ))}
    </div>
  );

  const swapElement = (currentElement) => {
    if (currentElement == "X") {
      return "0";
    } else {
      return "X";
    }
  };

  const checkTie = (cells) => {
    for (let i = 0; i < 9; i++) {
      if (cells[i] == "_") {
        return false;
      }
    }
    return true;
  };

  const onClickHandler = (cellIndex) => {
    const updateCells = cells.map((element, elementIndex) => {
      if (elementIndex === cellIndex && element === "_") {
        setFigureToPlace(swapElement(figureToPlace));
        return figureToPlace;
      }
      return element;
    });
    setCells(updateCells);

    if (checkWinningCombination(figureToPlace, updateCells) == true) {
      setIsWon(true);
    } else {
      if (checkTie(updateCells) == true) {
        setIsTie(true);
      }
      setIsWon(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen justify-center items-center gap-5">
      <h1 className="font-bold text-4xl">
        {isWon
          ? `${swapElement(figureToPlace)} won!`
          : null}
        {isTie
          ? "Tie!"
          : null}
        {isWon || isTie ? null : `Turn: ${figureToPlace}`}
      </h1>
      {isWon || isTie ? (
        <button
          onClick={() => restartGame()}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Play Again
        </button>
      ) : (
        <GameBoard cells={cells} onClickHandler={onClickHandler} />
      )}
    </div>
  );
}
