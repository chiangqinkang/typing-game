export {};
//
// declare global {
//     interface Window {
//         timer: ReturnType<typeof setInterval>  | null;
//         startTime: number | null;
//         pauseTime: number;
//     }
// }

declare global {
    interface Window {
        timer: NodeJS.Timeout | null;
        startTime: number | null;
        pauseTime: number;
    }
}
