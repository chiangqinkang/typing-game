"use client";
import React, {useEffect, useState} from "react";
import { words } from "../../../next.config";
import styles from "./components.module.css";


export default function Words({ wordListToUse }: { wordListToUse: string[] }) {
    const [usedWordList, setUsedWords] = useState<string[]>(wordListToUse);

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
        return Array.from({length: 299}, () => randomWord());
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

    function isBackspace(key:string) {
        return key === "Backspace";
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

        let isFirstLetter = false;

        if (currentWord) {
            isFirstLetter = currentLetter === currentWord.firstChild || false;
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


        if (isBackspace(key)) {
            if (!currentLetter && currentWord) {
                const lastLetter = currentWord.lastChild;
                if (lastLetter && lastLetter instanceof Element) {
                    addClassHelper(lastLetter, styles.current);
                    removeClassHelper(lastLetter, styles.correct);
                    removeClassHelper(lastLetter, styles.wrong);
                }
            }

            if (currentLetter && isFirstLetter) {
                removeClassHelper(currentWord, styles.current);
                if (!currentWord) {
                    return;
                }
                const previousWord = currentWord.previousSibling;
                if (previousWord && previousWord instanceof Element) {
                    addClassHelper(previousWord, styles.current);
                    removeClassHelper(currentLetter, styles.current);
                    const previousWordLastLetter = previousWord.lastChild;
                    if (previousWordLastLetter && previousWordLastLetter instanceof Element) {
                        addClassHelper(previousWordLastLetter, styles.current);
                        removeClassHelper(previousWordLastLetter, styles.correct);
                        removeClassHelper(previousWordLastLetter, styles.wrong);
                    }
                }
            }
            if (currentLetter && !isFirstLetter) {
                const previousLetter = currentLetter.previousSibling;
                if (previousLetter && previousLetter instanceof Element) {
                    removeClassHelper(currentLetter, styles.current);
                    addClassHelper(previousLetter, styles.current);
                    removeClassHelper(previousLetter, styles.correct);
                    removeClassHelper(previousLetter, styles.wrong);
                }
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
        const nextWord = document.querySelector(`.${styles.word}.${styles.current}`);
        const caret = document.getElementById('caret');

        if (!caret) {
            return;
        }
        if (nextLetter) {
            // use left if there is a nextLetter
            caret.style.top = nextLetter.getBoundingClientRect().top + 10 + 'px';
            caret.style.left = nextLetter.getBoundingClientRect().left + 'px';
        } else if (nextWord) {
            // use right if nextWord
            caret.style.top = nextWord.getBoundingClientRect().top + 29 + 'px';
            caret.style.left = nextWord.getBoundingClientRect().right + 'px';
        } else {
            caret.style.visibility = 'hidden';
        }

        if (currentWord && currentWord.getBoundingClientRect().top > 200) {
            const words = document.getElementById("words");
            if (words) {
                const currentMarginTop = parseInt(words.style.marginTop || "0px");
                words.style.marginTop = `${currentMarginTop - 35}px`;
            }
        }
        // if (nextLetter) {
        //     caret.style.top = `${nextLetter.getBoundingClientRect().top}px`;
        // }
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