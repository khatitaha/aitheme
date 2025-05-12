"use client";

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import AiDetectPage from "@/app/(main)/ai-detect/ai-detect-client";

export default function PaymentPage() {
    const [open, setOpen] = useState(true); // modal is open by default

    return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-950 text-white px-4">
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button className="hidden">Open Payment Modal</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md bg-neutral-900 border border-neutral-700">
                    <DialogHeader>
                        <DialogTitle className="text-white text-center">Payment Required</DialogTitle>
                        <DialogDescription className="text-neutral-400 text-center">
                            Complete your payment to unlock the AI detection service.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 mt-4">
                        <div>
                            <label className="block text-sm text-neutral-400 mb-1">Card Number</label>
                            <Input
                                placeholder="1234 5678 9012 3456"
                                className="bg-neutral-800 border-neutral-700 text-white"
                            />
                        </div>
                        <div className="flex gap-4">
                            <div className="flex-1">
                                <label className="block text-sm text-neutral-400 mb-1">Expiry</label>
                                <Input placeholder="MM/YY" className="bg-neutral-800 border-neutral-700 text-white" />
                            </div>
                            <div className="flex-1">
                                <label className="block text-sm text-neutral-400 mb-1">CVC</label>
                                <Input placeholder="123" className="bg-neutral-800 border-neutral-700 text-white" />
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="mt-6 flex flex-col gap-2">
                        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                            Proceed to Payment
                        </Button>
                        <Link
                            href="/home"
                            className="text-sm text-neutral-400 hover:text-white text-center"
                        >
                            Cancel and return
                        </Link>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <div className=" text-xl font-bold">
                pay to access this feuture
            </div>
        </div>
    );
}
