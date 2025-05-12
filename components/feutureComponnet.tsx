
import React from "react";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    className?: string;
}

const FeatureCard = ({ icon, title, description, className }: FeatureCardProps) => {
    return (
        <div
            className={cn(
                "bg-white/5 backdrop-blur-lg p-6 rounded-xl shadow-lg hover:shadow-blue-500/20 transition-all duration-300 border border-blue-500/30 hover:border-blue-400/70 group hover:-translate-y-1",
                className
            )}
        >
            <div className="text-blue-400 mb-4 transition-transform duration-300 group-hover:scale-110 flex justify-center">{icon}</div>
            <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
            <p className="text-blue-50/80">{description}</p>
        </div>
    );
};

export default FeatureCard;