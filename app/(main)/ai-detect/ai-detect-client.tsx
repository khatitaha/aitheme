"use client"
import { createClient } from '@/utils/supabase/client';
import Link from 'next/link';
import React, { useState } from 'react'

type Props = {}






const AiDetectPage = (props: Props) => {
    const supabase = createClient();

    const [prediction, setPrediction] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string | null>(null); // For image preview
    const [saveSuccess, setSaveSuccess] = useState<boolean | null>(null);

    const handleUpload = async (file: File) => {
        setIsLoading(true);
        setSaveSuccess(null);
        setPrediction(null);

        // Show image preview
        const reader = new FileReader();
        reader.onload = (e) => {
            setImageUrl(e.target?.result as string);
        };
        reader.readAsDataURL(file);

        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch("http://localhost:8000/predict", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();
            setPrediction(data.prediction);

            const savingResult = await saveResultToSupabase(data.prediction);
            setSaveSuccess(savingResult);
        } catch (error) {
            console.error("Error uploading file:", error);
            setPrediction("Error processing file");
            setSaveSuccess(false);
        } finally {
            setIsLoading(false);
        }
    };

    const saveResultToSupabase = async (result: string) => {
        const {
            data: { user },
        } = await supabase.auth.getUser();
        try {
            const { data, error } = await supabase
                .from('airesults')
                .insert([{
                    user_id: user?.id,
                    result: result
                }]);
            if (error) {
                console.error('Error saving result to Supabase:', error);
                return false;
            } else {
                return true;
            }
        } catch (error) {
            console.error('Unexpected error saving result:', error);
            return false;
        }
    };

    return (
        <div className="min-h-screen p-8 ">
            <div className="max-w-md mx-auto rounded-xl shadow-lg bg-neutral-900 border border-neutral-800 p-8">
                <h1 className="text-3xl font-bold mb-6 text-blue-500 text-center">AI Image Detection</h1>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-neutral-200 mb-2">
                        Upload an image for detection
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        disabled={isLoading}
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                                handleUpload(file);
                            }
                        }}
                        className="block w-full text-sm text-neutral-300
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-full file:border-0
                            file:text-sm file:font-semibold
                            file:bg-blue-950 file:text-blue-500
                            hover:file:bg-blue-900
                            disabled:opacity-50
                            bg-neutral-800 border border-neutral-700 rounded-lg"
                    />
                </div>

                {/* Image Preview */}
                {imageUrl && (
                    <div className="mb-6 flex justify-center">
                        <img
                            src={imageUrl}
                            alt="Uploaded preview"
                            className="max-h-64 rounded-lg border border-neutral-700 shadow"
                        />
                    </div>
                )}

                {/* Loading Spinner */}
                {isLoading && (
                    <div className="text-center mb-4">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400 mx-auto"></div>
                        <p className="mt-2 text-neutral-400">Processing...</p>
                    </div>
                )}

                {/* Prediction Result */}
                {prediction && !isLoading && (
                    <div className="mt-4 p-4 bg-neutral-800 border border-blue-900 rounded-lg shadow">
                        <h2 className="text-lg font-semibold mb-2 text-blue-400">Prediction Result:</h2>
                        <p className="text-neutral-100">{prediction}</p>
                    </div>
                )}

                {/* Save Result Status */}
                {saveSuccess === true && (
                    <Link href={'/ai-results'}><div className="mt-4 p-2 bg-green-900 text-green-300 rounded text-center border border-green-800">
                        Result saved to your account!
                    </div></Link>
                )}
                {saveSuccess === false && (
                    <div className="mt-4 p-2 bg-red-900 text-red-300 rounded text-center border border-red-800">
                        Failed to save result.
                    </div>
                )}
            </div>
        </div>
    )
}

export default AiDetectPage