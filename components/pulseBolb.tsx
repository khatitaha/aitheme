
import React from "react";

const PulseBlob = () => {
    return (
        <div className="absolute pointer-events-none overflow-hidden inset-0 z-0 opacity-70">
            <div className="absolute -top-[40%] -left-[20%] w-[70%] h-[70%] bg-blue-500 rounded-full opacity-20 blur-[120px] animate-pulse" />
            <div className="absolute top-[20%] -right-[20%] w-[60%] h-[60%] bg-blue-700 rounded-full opacity-20 blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="absolute -bottom-[40%] left-[20%] w-[50%] h-[50%] bg-sky-400 rounded-full opacity-20 blur-[80px] animate-pulse" style={{ animationDelay: '2s' }} />
        </div>
    );
};

export default PulseBlob;