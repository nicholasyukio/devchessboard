import React, { useState } from "react";
import Chess from "chess.js";

import { formatBoard, formatMove, getNextMove, fromMoveToObject } from './api';

import { Chessboard } from "react-chessboard";

const buttonStyle = {
    cursor: "pointer",
    padding: "10px 20px",
    margin: "10px 10px 0px 0px",
    borderRadius: "6px",
    backgroundColor: "#f0d9b5",
    border: "none",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.5)",
  };
  
  const boardWrapper = {
    width: `70vw`,
    maxWidth: "70vh",
    margin: "3rem auto",
  };


  ///////////////////////////////////
////////// PlayVsRandom ///////////
///////////////////////////////////
export const PlayVsRandom = () => {
    const [game, setGame] = useState(new Chess());
    const [board, setBoard] = useState(null);
    const [currentTimeout, setCurrentTimeout] = useState();

    const handlePieceDragBegin = () => {
        const board = game.board();
        setBoard(JSON.parse(JSON.stringify(board)));
    }

    function safeGameMutate(modify) {
      setGame((g) => {
        const update = { ...g };
        modify(update);
        return update;
      });
    }
  
    async function makeNextMove(lastMove) {
      const possibleMoves = game.moves();
  
      // exit if the game is over
      if (game.game_over() || game.in_draw() || possibleMoves.length === 0)
        return;

      console.log('possibleMoves', possibleMoves)

      const formattedBoard = formatBoard(board);
      const formattedMove = formatMove(lastMove);

      const response = await getNextMove(formattedBoard, formattedMove);
      const apiMove = fromMoveToObject(response['AI move']);

      console.log('apiMove', apiMove);

      safeGameMutate((game) => {
        game.move(apiMove);
      });
    }
  
    function onDrop(sourceSquare, targetSquare, piece) {
      const gameCopy = { ...game };
      const move = gameCopy.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: piece[1].toLowerCase() ?? "q",
      });
      setGame(gameCopy);
  
      // illegal move
      if (move === null) return false;

      console.log('done move', move);
  
      // store timeout so it can be cleared on undo/reset so computer doesn't execute move
      const newTimeout = setTimeout(() => {
        makeNextMove(move)
      }, 200);
      setCurrentTimeout(newTimeout);
      return true;
    }
  
    return (
      <div style={boardWrapper}>
        <Chessboard
          id="PlayVsRandom"
          position={game.fen()}
          onPieceDrop={onDrop}
          onPieceDragBegin={handlePieceDragBegin}
          customBoardStyle={{
            borderRadius: "4px",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
          }}
        />
        <button
          style={buttonStyle}
          onClick={() => {
            safeGameMutate((game) => {
              game.reset();
            });
            clearTimeout(currentTimeout);
          }}
        >
          reset
        </button>
        <button
          style={buttonStyle}
          onClick={() => {
            safeGameMutate((game) => {
              game.undo();
            });
            clearTimeout(currentTimeout);
          }}
        >
          undo
        </button>
      </div>
    );
  };