"use client";
import React, { useRef, useState } from "react";
import Canvas from "./Canvas";
import draw from "./draw/draw";
import UseGameLogic from "./UseGameLogic";
import { GameState } from "../types/types";

const Game = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<GameState>(GameState.PAUSED);

  const onGameOver = () => {
    setGameState(GameState.GAME_OVER);
  };

  const { snakeBody, onKeyDownHandler, foodPosition, resetGameState } =
    UseGameLogic({
      canvasWidth: canvasRef.current?.width,
      canvasHeight: canvasRef.current?.height,
      onGameOver,
      gameState,
    });
  const drawGame = (ctx: CanvasRenderingContext2D) => {
    draw({ ctx, snakeBody, foodPosition });
  };

  return (
    <div
      tabIndex={0}
      onKeyDown={onKeyDownHandler}
      className="w-auto flex flex-col items-center outline-none"
    >
      <Canvas draw={drawGame} ref={canvasRef} />
      <div className="flex w-full justify-evenly pt-4">
        {gameState === GameState.GAME_OVER ? (
          <button
            onClick={() => {
              setGameState(GameState.RUNNING);
              resetGameState();
            }}
            className="px-2 py-1 bg-green-500 rounded-md font-bold"
          >
            Play Again
          </button>
        ) : (
          <button
            onClick={() => {
              setGameState(
                gameState === GameState.RUNNING
                  ? GameState.PAUSED
                  : GameState.RUNNING
              );
            }}
            className="px-2 py-1 bg-green-500 rounded-md font-bold uppercase"
          >
            {gameState === GameState.RUNNING ? "pause" : "play"}
          </button>
        )}
        <div>{`Your score: ${(snakeBody.length - 1) * 10} `}</div>
      </div>
    </div>
  );
};

export default Game;
