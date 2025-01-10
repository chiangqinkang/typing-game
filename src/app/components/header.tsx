import Timer from "@/app/components/timer";
import RestartButton from "@/app/components/restart-button";

export default function Header({ onRestart, time }: { onRestart: () => void; time: number }) {
    return (
        <div className="flex items-center space-x-4 mb-2 ">
            <Timer time={time}/>
            <RestartButton onClick={onRestart}/>
        </div>
    );
}