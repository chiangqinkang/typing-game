"use client";

import React, { useState } from "react";
import Header from "@/app/components/header";
import {words} from "../../../next.config";
import Game from "@/app/components/game";

export default function Type() {
    const [usedWordList, setUsedWordList] = useState<string[]>([]);

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

    return (
        <>
            <Header onRestart={newGame} />
            <Game wordListToUse={usedWordList} />
        </>
    );
}
