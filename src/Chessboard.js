import React, { useState } from "react";
import Chess from "chess.js";

import { formatBoard, formatMove, getNextMove, fromMoveToObject } from './api';

import { Chessboard } from "react-chessboard";

let moveHistory = [[0, 1, 2, 2], [2, 3, 4, 5]];

const boardWrapper = {
  width: `70vw`,
  maxWidth: "70vh",
  margin: "3rem auto",
};

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export const GameHistory = () => {
    return (
      <div>
        <p>Game History: </p>
        {moveHistory.map((move, index) => (
          <div key={index}>
            {move.map((element, innerIndex) => (
              <span key={innerIndex}>
                {element}
                {innerIndex !== move.length - 1 && ", "} {/* Add comma if it's not the last element */}
              </span>
            ))}
            <br /> {/* Add line break after each move */}
          </div>
        ))}
      </div>
    );
}


  ///////////////////////////////////
////////// PlayVsRandom ///////////
///////////////////////////////////
export const PlayVsRandom = () => {
    const [game, setGame] = useState(new Chess());
    const [board, setBoard] = useState(null);
    const [isLoading, setIsLoading] = useState(0)

    const [gameId, setGameId] = useState(String(getRandomInt(100000)));

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

      const formattedBoard = formatBoard(board);
      const formattedMove = formatMove(lastMove);
      moveHistory.push(formattedMove);

      return getNextMove(formattedBoard, formattedMove, gameId).then((response) => {
        const apiMove = fromMoveToObject(response['AI move']);
        safeGameMutate((game) => {
          game.move(apiMove);
        });
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

      setTimeout(() => {
        setIsLoading(true);
        makeNextMove(move)
          .then(() => {
            setIsLoading(false);
          })
          .catch(() => {
            setIsLoading(false);
            alert('API call failed, try again later');
            safeGameMutate((game) => {
              game.undo();
            });
          });
      }, 200);
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
        {Boolean(isLoading) && 'Loading...'}
      </div>
    );
  };