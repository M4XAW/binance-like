import React from "react";

export default function Loading() {
    return (
        <div className="flex items-center justify-center h-[calc(100vh-64px)]">
            <div className="loader inline-block h-6 w-6 p-0 border-t-2 border-r-2 border-b-2 border-zinc-700 border-l-2 border-l-gray-50 rounded-full"></div>
        </div>
    );
}