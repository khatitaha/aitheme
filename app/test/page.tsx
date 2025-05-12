"use client"
import { createClient } from '@/utils/supabase/client';
import React, { useState } from 'react'

type Props = {}

const TestPage = (props: Props) => {
    const [prediction, setPrediction] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);

    const [isLoading, setIsLoading] = useState(false);
    const supabase = createClient();

    const handleUpload = async (file: File) => {
        setIsLoading(true);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch("http://localhost:8000/predict", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();
            setPrediction(data.prediction);
        } catch (error) {
            console.error("Error uploading file:", error);
            setPrediction("Error processing file");
        } finally {
            setIsLoading(false);
        }
    };

    const uploadScan = async () => {
        if (!file) {
            console.error("No file selected");
            return;
        }

        setIsLoading(true);

        try {
            const { data, error } = await supabase.storage
                .from("scans")
                .upload(`public/${file.name}`, file);

            if (error) {
                throw error;
            }

            console.log("Uploaded file:", data);

            // Here you would normally call an API to get a prediction.
            // I'll simulate a fake prediction:
            setPrediction("Fake Prediction: Healthy");

        } catch (error) {
            console.error("Error uploading file:", error);
            setPrediction("Error processing file");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen p-8">
            <div className="max-w-md mx-auto  rounded-lg shadow-md p-6">
                <h1 className="text-2xl font-bold mb-4">File Upload Test</h1>

                <div className="mb-4">
                    <input
                        type="file"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                                handleUpload(file);
                            }
                        }}
                        className="block w-full text-sm text-gray-500
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-full file:border-0
                            file:text-sm file:font-semibold
                            file:bg-blue-50 file:text-blue-700
                            hover:file:bg-blue-100"
                    />
                </div>

                {isLoading && (
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                        <p className="mt-2 text-gray-600">Processing...</p>
                    </div>
                )}

                {prediction && !isLoading && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                        <h2 className="text-lg font-semibold mb-2">Prediction Result:</h2>
                        <p className="text-gray-700">{prediction}</p>
                    </div>
                )}
            </div>
            <div>
                upload to storage:::::::
                <button className=' bg-green-700 p-3 rounded-lg' onClick={uploadScan}>uploiad</button>
                <div className="mb-4">
                    <input
                        type="file"
                        onChange={(e) => {
                            const selectedFile = e.target.files?.[0];
                            if (selectedFile) {
                                setFile(selectedFile);
                            }
                        }}
                        className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
                    />
                </div>
            </div>
        </div>
    )
}

export default TestPage