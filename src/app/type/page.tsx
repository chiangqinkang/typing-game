"use client";

import React, { useState } from "react";
import Header from "@/app/components/header";
import {words} from "../../../next.config";
import Game from "@/app/components/game";

export default function Type() {
    const [usedWordList, setUsedWordList] = useState<string[]>([]);
    const [timer, setTimer] = useState<number>(30)
    const [gameIsOver, setGameisOver] = useState<boolean>(false);

    function randomWord() {
        const randomIndex = Math.floor(Math.random() * words.length);
        return words[randomIndex];
    }

    function initGame() {
        return Array.from({ length: 299 }, () => randomWord());
    }

    function newGame() {
        const newWords: string[] = initGame();
        setUsedWordList(newWords);
    }

    function countDown() {
        window.timer = setInterval(() => {
            if (!window.startTime) {
                window.startTime = (new Date()).getTime();
            }
            const currentTime = new Date().getTime();
            const timePassed = (currentTime - window.startTime);
            const secondsLeft = Math.round((30000 - timePassed) / 1000);
            if (secondsLeft <= 0) {
                gameOver();
                setTimer(30);
            }
            setTimer(secondsLeft);
        }, 1000);
    }

    function gameOver() {
        if (window.timer) {
            clearInterval(window.timer);
        }
    }
    if (gameIsOver) {
        setGameisOver(true);
        console.log("Game is over");
        return (<>

        </>);
    } else {
        return (<>
            <Header onRestart={newGame} time={timer} />
            <Game wordListToUse={usedWordList} countDown={countDown} gameIsOver={gameIsOver} />
        </>);
    }
}
