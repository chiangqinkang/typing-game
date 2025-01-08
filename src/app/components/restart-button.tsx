"use client";

import styles from "./components.module.css"

interface RestartButtonProps {
    onClick: () => void;
}

const RestartButton: React.FC<RestartButtonProps> = ({ onClick }) => {
    return (<button className={styles.resetButton} onClick={onClick} >
        Restart
    </button>);
}

export default RestartButton;