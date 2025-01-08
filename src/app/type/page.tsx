import Header from "@/app/components/header";
import Words from "@/app/components/words";

export default function Type() {
    return (
        <div className="items-center p-24">
            <h1 className="text-2xl font-bold text-lg">
                Clicks and Clacks
            </h1>
            <div>
                <Header />
                <Words />
            </div>
        </div>
    );
}