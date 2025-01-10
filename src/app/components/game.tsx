"use client";


import styles from "./components.module.css";
import Words from "@/app/components/words";

export default function Game({ wordListToUse, countDown, gameIsOver }: { wordListToUse: string[]; countDown: () => void; gameIsOver: boolean }) {

    return (
        <div id="game" className={styles.game}>
            <Words wordListToUse={wordListToUse} countDown={countDown} gameIsOver={gameIsOver} />
        </div>
    );
};
