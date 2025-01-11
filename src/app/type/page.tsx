// "use client";
//
// import React, { useState } from "react";
// import Header from "@/app/components/header";
// import {words} from "../../../next.config";
// import Game from "@/app/components/game";
// import styles from "../components/components.module.css";
//
// export default function Type() {
//     const [usedWordList, setUsedWordList] = useState<string[]>([]);
//     const [timer, setTimer] = useState<number>(30)
//     const [gameIsOver, setGameisOver] = useState<boolean>(false);
//
//     function randomWord() {
//         const randomIndex = Math.floor(Math.random() * words.length);
//         return words[randomIndex];
//     }
//
//     function initGame() {
//         return Array.from({ length: 299 }, () => randomWord());
//     }
//
//     function newGame() {
//         console.log("newGame");
//         const newWords: string[] = initGame();
//         setUsedWordList(newWords);
//         setGameisOver(false);
//         setTimer(30);
//     }
//
//     function countDown() {
//         window.timer = setInterval(() => {
//             if (!window.startTime) {
//                 window.startTime = (new Date()).getTime();
//             }
//             const currentTime = new Date().getTime();
//             const timePassed = (currentTime - window.startTime);
//             const secondsLeft = Math.round((30000 - timePassed) / 1000);
//             if (secondsLeft <= 0) {
//                 gameOver();
//                 setTimer(30);
//             }
//             setTimer(secondsLeft);
//         }, 1000);
//     }
//
//     function getWpm() {
//         const allWords = Array.from(document.querySelectorAll(`.${styles.word}`));
//         const lastTypedWord = document.querySelector(
//             `[class*="${styles.word}"][class*="${styles.current}"]`
//         );
//         if (!lastTypedWord) {
//             return 0;
//         }
//         const idx = allWords.indexOf(lastTypedWord);
//         const typedWords = allWords.slice(0, idx);
//         const correctWords = typedWords.filter((word) => {
//             const letters = [...word.children];
//             const incorrect = letters.filter(letter => letter.className.includes("incorrect"));
//             const correct = letters.filter(letter => letter.className.includes("correct"));
//             return incorrect.length === 0 && correct.length === letters.length;
//         });
//         return correctWords.length * 2;
//     }
//
//     function gameOver() {
//         if (window.timer) {
//             clearInterval(window.timer);
//             setGameisOver(true);
//         }
//     }
//     if (gameIsOver) {
//         const wpm = getWpm();
//         return (<>
//             <Header onRestart={newGame} time={timer} wpm={wpm} />
//             <Game wordListToUse={usedWordList} countDown={countDown} gameIsOver={gameIsOver} />
//         </>);
//     } else {
//         return (<>
//             <Header onRestart={newGame} time={timer} />
//             <Game wordListToUse={usedWordList} countDown={countDown} gameIsOver={gameIsOver} />
//         </>);
//     }
// }


"use client";

import React, { useState, useEffect } from "react";
import Header from "@/app/components/header";
import { words } from "../../../next.config";
import Game from "@/app/components/game";
import styles from "../components/components.module.css";

export default function Type() {
    const [usedWordList, setUsedWordList] = useState<string[]>([]);
    const [timer, setTimer] = useState<number>(30);
    const [gameIsOver, setGameIsOver] = useState<boolean>(false);

    useEffect(() => {
        if (!gameIsOver && timer === 0) {
            gameOver();
        }
    }, [timer, gameIsOver]);

    useEffect(() => {
        if (!gameIsOver && usedWordList.length > 0) {
            countDown();
        }
    }, [usedWordList, gameIsOver]);

    function randomWord() {
        const randomIndex = Math.floor(Math.random() * words.length);
        return words[randomIndex];
    }

    function initGame() {
        const newWords = Array.from({ length: 299 }, () => randomWord());
        return [...newWords];
    }

    function newGame() {
        console.log("newGame");
        const newWords: string[] = initGame();
        console.log("new words " + newWords);

        setUsedWordList(newWords);
        setGameIsOver(false);
        setTimer(30);

        if (window.timer) {
            clearInterval(window.timer);
        }
    }

    function countDown() {
        if (window.timer) return; // Prevent multiple timers
        window.startTime = Date.now();
        window.timer = setInterval(() => {
            const timeElapsed = Date.now() - window.startTime!;
            const secondsLeft = Math.max(0, 30 - Math.floor(timeElapsed / 1000));
            setTimer(secondsLeft);

            if (secondsLeft <= 0) {
                clearInterval(window.timer!);
                window.timer = null;
                setGameIsOver(true);
            }
        }, 1000);
    }

    function gameOver() {
        console.log("Game over!");
        if (window.timer) {
            clearInterval(window.timer!);
            window.timer = null;
        }
        setGameIsOver(true);
    }


    function getWpm() {
        const allWords = Array.from(document.querySelectorAll(`.${styles.word}`));
        const lastTypedWord = document.querySelector(
            `[class*="${styles.word}"][class*="${styles.current}"]`
        );
        if (!lastTypedWord) {
            return 0;
        }
        const idx = allWords.indexOf(lastTypedWord);
        const typedWords = allWords.slice(0, idx);
        const correctWords = typedWords.filter((word) => {
            const letters = Array.from(word.children);
            const incorrect = letters.filter((letter: Element) => letter.className.includes("incorrect"));
            const correct = letters.filter((letter: Element) => letter.className.includes("correct"));
            return incorrect.length === 0 && correct.length === letters.length;
        });
        return correctWords.length * 2;
    }

    return (
        <>
            <Header
                onRestart={newGame}
                time={timer}
                wpm={gameIsOver ? getWpm() : undefined}
            />
            <Game
                wordListToUse={usedWordList}
                countDown={countDown}
                gameIsOver={gameIsOver}
            />
        </>
    );
}
