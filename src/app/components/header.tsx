import Timer from "@/app/components/timer";
import RestartButton from "@/app/components/restart-button";

export default function Header({ onRestart, time, wpm }: { onRestart: () => void; time: number; wpm?: number; }) {
    if (!wpm) {
        return (
            <div className="flex items-center space-x-4 mb-2 ">
                <Timer time={time}/>
                <RestartButton onClick={onRestart}/>
            </div>
        );
    } else {
        console.log("wpm: " + wpm);
        return (
            <div className="flex items-center space-x-4 mb-2 p-5">
                <div className="flex text-3xl p-10" id="wpm">{wpm} WPM</div>
                <Timer time={time}/>
                <RestartButton onClick={onRestart}/>
            </div>
        );
    }
}