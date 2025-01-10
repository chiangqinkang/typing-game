export {};

declare global {
    interface Window {
        timer: ReturnType<typeof setInterval>  | null;
        startTime: number | null;
        pauseTime: number;
    }
}
