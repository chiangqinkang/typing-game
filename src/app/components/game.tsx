"use client";


import styles from "./components.module.css";
import Words from "@/app/components/words";

export default function Game({ wordListToUse }: { wordListToUse: string[] }) {

    return (
        <div id="game" className={styles.game}>
            <Words wordListToUse={wordListToUse}/>
        </div>
    );
};
