'use client';

import React, { useState, useCallback } from 'react';

const RagAdminPage: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploadStatus, setUploadStatus] = useState<string | null>(null);

    const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        if (file && file.type === 'application/pdf') {
            setSelectedFile(file);
            setUploadStatus(null); // Clear previous status on new file selection
        } else {
            setSelectedFile(null);
            setUploadStatus('Please select a PDF file.');
        }
    }, []);

    const handleUpload = useCallback(async () => {
        if (!selectedFile) {
            setUploadStatus('No file selected.');
            return;
        }

        setUploadStatus('Uploading...');


        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const response = await fetch('/api/rag', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const result = await response.json();
                setUploadStatus(`Upload successful: ${result.message || 'File processed.'}`);
                setSelectedFile(null); // Clear selected file after successful upload
            } else {
                const error = await response.json();
                setUploadStatus(`Upload failed: ${error.message || response.statusText}`);
            }
        } catch (error: any) {
            setUploadStatus(`Upload error: ${error.message}`);
        }
    }, [selectedFile]);

    return (
        <div className="container mx-auto p-4 max-w-md">
            <h1 className="text-2xl font-bold mb-6 text-center">Upload PDF for RAG Processing</h1>

            <div className="mb-4">
                <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100"
                />
            </div>

            <button
                onClick={handleUpload}
                disabled={!selectedFile || uploadStatus === 'Uploading...'}
                className={`w-full px-4 py-2 text-white font-semibold rounded-md
                           ${!selectedFile || uploadStatus === 'Uploading...'
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
                    }`}
            >
                {uploadStatus === 'Uploading...' ? 'Uploading...' : 'Upload PDF'}
            </button>

            {uploadStatus && (
                <p className={`mt-4 text-center text-sm
                           ${uploadStatus.startsWith('Upload failed') || uploadStatus.startsWith('Upload error') ? 'text-red-600' : 'text-green-600'}`}
                >
                    {uploadStatus}
                </p>
            )}

            {selectedFile && uploadStatus !== 'Uploading...' && (
                <p className="mt-2 text-center text-sm text-gray-700">
                    Selected file: <span className="font-semibold">{selectedFile.name}</span>
                </p>
            )}
        </div>
    );
};

export default RagAdminPage;
