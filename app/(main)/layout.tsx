import type { Metadata } from "next";
import { Inter } from "next/font/google";
import DashboardLayout from "@/components/dashboard-layout";
import DashboardWrapper from "./dashboard-wrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "AI Medical Lab - Pneumonia Detection",
    description: "Advanced AI-powered pneumonia detection system",
};

export default function mainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className=" w-full">
            <DashboardWrapper>
                {children}
            </DashboardWrapper>
        </div>
    );
}
