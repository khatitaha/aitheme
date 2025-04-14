import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload } from 'lucide-react';
import React from 'react'

type Props = {}

const DashBoard = (props: Props) => {
    return (
        <div className="p-6 space-y-6">
            {/* Welcome */}
            <div className="text-2xl font-bold">Welcome back, taha 👋</div>

            {/* Upload Scan Section */}
            <Card>
                <CardHeader>
                    <CardTitle>Upload a Chest Scan</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                        Upload your chest X-ray to receive an instant AI-powered diagnosis.
                    </p>
                    <div className="flex items-center justify-between">
                        <input
                            type="file"
                            accept="image/*"
                            className="border p-2 rounded"
                        />
                        <Button className="ml-4">
                            <Upload className="mr-2 h-4 w-4" />
                            Scan Now , chaning later
                            chaning this now for somereason
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Latest Diagnosis */}
            <Card>
                <CardHeader>
                    <CardTitle>Latest Diagnosis</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">Result:</p>
                    <div className="mt-2 font-semibold text-green-600">
                        ✅ No Pneumonia Detected
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Scanned on: April 6, 2025</p>
                </CardContent>
            </Card>

            {/* Scan History */}
            <Card>
                <CardHeader>
                    <CardTitle>Scan History</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="text-sm space-y-2">
                        <li className="flex justify-between">
                            <span>March 28, 2025</span>
                            <span className="text-red-500">⚠️ Pneumonia Detected</span>
                        </li>
                        <li className="flex justify-between">
                            <span>March 12, 2025</span>
                            <span className="text-green-600">✅ Clear</span>
                        </li>
                    </ul>
                </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Consult a Doctor</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground mb-2">
                            Have questions about your result?
                        </p>
                        <Button variant="outline">Find Nearby Physicians</Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Need Help?</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground mb-2">
                            Contact our support team for assistance.
                        </p>
                        <Button variant="outline">Contact Admin</Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default DashBoard