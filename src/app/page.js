'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [isWon, setIsWon] = useState(null)
  
  const [figureToPlace, setFigureToPlace] = useState(
    useEffect(() => {
      const randnum = Math.random();
      
      if (randnum > 0.5) {
        setFigureToPlace("X");
      } else {
        setFigureToPlace("0");
      }
    }, [])
  );
  
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
    for (let i = 0; i<9; i++) {
      if (board[i] === element) {
        boardCopy[i] = 1;
      } else {
        boardCopy[i] = 2;
      };
    }

  return winningCombinations.some((winCombo) =>
    winCombo.every((val, index) => val === boardCopy[index])
  )};


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

  const swapElement = (currentElement) => {
    if (currentElement == "X") {
      return "0"
    } else {
      return "X"
    }
  }


  const onClickHandler = (cellIndex) => {
    const updateCells = cells.map((element, elementIndex) => {
      if (elementIndex === cellIndex && element === "_") {
        setFigureToPlace(swapElement(figureToPlace))
        return figureToPlace;
      };
      return element;
    });
    setCells(updateCells)
    if (checkWinningCombination(figureToPlace, updateCells) == true) {
      setIsWon(true)
    } else {
      setIsWon(false)
    }
  };

  return (
    <div className="flex flex-col min-h-screen justify-center items-center gap-5">
      <h1 className="font-bold text-4xl">
          {isWon ? `${swapElement(figureToPlace)} won!` : `${figureToPlace}'s Turn`}
      </h1>
      {isWon ? null : (
         <div className="game-grid">
        <div className="game-row flex flex-row space-x-2 text-8xl">
          <div onClick={() => onClickHandler(0)}>{cells[0]}</div>
          <div onClick={() => onClickHandler(1)}>{cells[1]}</div>
          <div onClick={() => onClickHandler(2)}>{cells[2]}</div>
        </div>
        <div className="game-row flex flex-row space-x-2 text-8xl">
          <div onClick={() => onClickHandler(3)}>{cells[3]}</div>
          <div onClick={() => onClickHandler(4)}>{cells[4]}</div>
          <div onClick={() => onClickHandler(5)}>{cells[5]}</div>
        </div>
        <div className="game-row flex flex-row space-x-2 text-8xl">
          <div onClick={() => onClickHandler(6)}>{cells[6]}</div>
          <div onClick={() => onClickHandler(7)}>{cells[7]}</div>
          <div onClick={() => onClickHandler(8)}>{cells[8]}</div>
        </div>
      </div>
      )}
     
    </div>
  );
} 