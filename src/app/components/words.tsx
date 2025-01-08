"use client";
import React, {useEffect, useState} from "react";
import { words } from "../../../next.config";
import styles from "./components.module.css";
import RestartButton from "@/app/components/restart-button";


export default function Words() {
    const [usedWordList, setUsedWords] = useState<string[]>([]);

    function randomWord() {
        const randomIndex = Math.floor(Math.random() * words.length);
        return words[randomIndex];
    }


    function addClassHelper(ele: Element | null, name: string) {
        if (ele && !ele.classList.contains(name)) {
            ele.classList.add(name);
        }
    }

    function removeClassHelper(ele: Element | null, name: string) {
        if (ele) {
            ele.classList.remove(name);
        }
    }

    function initGame() {
        return Array.from({length: 30}, () => randomWord());
    }

    function newGame() {
        const newWords: string[] = initGame();
        setUsedWords(newWords);

    }

    function formatWord(word: string) {
        return word.split('').map((letter, index) => (
            <span key={index} className={`${styles.letter}`}>
                {letter}
            </span>
        ));
    }

    function isValidLetter(key: string) {
        return key && key.length == 1 && key !== " ";
    }

    function isSpace(key: string) {
        return key === " ";
    }

    function handleKeyUp(e: KeyboardEvent) {

        const currentLetter = document.querySelector(
            `[class*="${styles.letter}"][class*="${styles.current}"]`
        );

        const currentWord = document.querySelector(
            `[class*="${styles.word}"][class*="${styles.current}"]`
        );

        let expected = " ";

        if (currentLetter || currentWord) {
            expected = currentLetter?.innerHTML || " "
        }

        if (!e.key) {
            return;
        }


        const key = e.key;


        console.log({expected, key});

        if (isValidLetter(key)) {
            const adder = key === expected ? styles.correct : styles.wrong;
            addClassHelper(currentLetter, adder);
            removeClassHelper(currentLetter, styles.current);
            if (!currentLetter) {
                const extraIncorrectLetter = document.createElement("span");
                extraIncorrectLetter.innerHTML = key;
                extraIncorrectLetter.className = styles.letter;
                extraIncorrectLetter.classList.add(styles.wrong);
                // @ts-ignore
                currentWord.appendChild(extraIncorrectLetter);
                return;
            }
            const nextLetter = currentLetter.nextSibling;
            if (nextLetter && nextLetter instanceof Element) {
                addClassHelper(nextLetter, styles.current);
            }
        }

        if (isSpace(key)) {
            if (expected !== " ") {
                const toSetWrong = [
                    ...document.querySelectorAll(`.${styles.word}.${styles.current} .${styles.letter}:not(.${styles.correct})`)
                ];
                toSetWrong.forEach(letter => {
                    addClassHelper(letter, styles.wrong);
                });
            }
            removeClassHelper(currentWord, styles.current);
            if (!currentWord) {
                return;
            }
            const nextWord = currentWord.nextSibling;
            if (nextWord  && nextWord instanceof Element) {
                addClassHelper(nextWord, styles.current);
                // might shift out
                if (currentLetter) {
                    removeClassHelper(currentLetter, styles.current);
                }
                const nextLetter = nextWord.firstChild;
                if (nextLetter && nextLetter instanceof Element) {
                    addClassHelper(nextLetter, styles.current);
                }
            }
        }


        const nextLetter = document.querySelector(`.${styles.letter}.${styles.current}`)
        const caret = document.getElementById('caret');
        if (nextLetter && caret) {
            caret.style.top = nextLetter.getBoundingClientRect().top + 10 + 'px';
            caret.style.left = nextLetter.getBoundingClientRect().left + 'px';
        }

    }



    useEffect(() => {
        setUsedWords(initGame());
        window.addEventListener("keyup", e => handleKeyUp(e));
    }, []);

    useEffect(() => {
        const firstWord = document.querySelector(`.${styles.word}`);
        const firstLetter = document.querySelector(`.${styles.letter}`);

        if (firstWord) {
            addClassHelper(firstWord, styles.current);
        }
        if (firstLetter) {
            addClassHelper(firstLetter, styles.current);
        }
        // const firstLetter = document.querySelector(`.${styles.letter}`);
        // if (firstLetter) {
        //     addClassHelper(firstLetter, styles.current);
        // }
    }, [usedWordList]);


    return (
        <div>
            <RestartButton onClick={newGame} />
            <div id="words" className={styles.words}>
                {usedWordList.map((word, index) => (
                    <div key={index} className={styles.word}>
                        {formatWord(word)}
                    </div>
                ))}
            </div>
            <div id="caret" className={styles.caret}></div>
        </div>
    );
}