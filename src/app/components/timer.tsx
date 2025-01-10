"use client";

export default function Timer({time,}: {time: number}) {

    return (
        <div className="flex items-center gap-5">
            <div className="text-3xl">
                {time}
            </div>
        </div>
      );
};
