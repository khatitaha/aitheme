// path: app/(main)/scans/page.tsx
"use client"

import React from 'react'
import { FileText, CheckCircle, Clock, Download } from 'lucide-react'
type Props = {
    scans: any[]
}

const ScansPage = (props: Props) => {
    const { scans } = props


    const handleDownload = (url: string | null, fileName: string | null) => {
        if (url && fileName) {
            const downloadUrl = url.includes('?') ? `${url}&download` : `${url}?download`;

            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            alert('Scan file is not yet available for download.');
        }
    }


    return (
        <div className="max-w-7xl mx-auto">
            {/* Header - Removed Upload button */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white">Medical Scans</h1>
                    <p className="text-neutral-400">View and download your available scans</p>
                </div>
            </div>

            {/* Scan History */}
            <div>
                <h2 className="text-xl font-semibold text-white mb-4">Scan History</h2>
                <div className="grid gap-4">
                    {scans.map((scan) => (
                        <div key={scan.id} className="bg-neutral-900 rounded-xl border border-neutral-800 p-6">
                            <div className="flex items-start justify-between">
                                <div className="flex items-start gap-4">
                                    {/* Icon changes based on status */}
                                    <div className={`p-3 rounded-lg ${scan.status === 'Pending' ? 'bg-yellow-600' : 'bg-green-600'}`}>
                                        <FileText className={`w-6 h-6 text-white`} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-medium text-white">{scan.type}</h3>
                                        <p className="text-neutral-400">Received on {scan.date}</p>
                                        {/* Status text styling */}
                                        <p className={`text-sm mt-1 ${scan.status === 'Pending' ? 'text-yellow-500' : 'text-green-500'}`}>
                                            Status: {scan.status}
                                        </p>
                                        {scan.fileName && <p className="text-xs text-neutral-500 mt-1">File: {scan.fileName}</p>}
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    {/* Removed AI detection result display */}
                                    {scan.status === 'Pending' && (
                                        <>
                                            <Clock className="w-5 h-5 text-yellow-500" />
                                            <span className="text-yellow-500">Pending</span>
                                        </>
                                    )}
                                    {scan.status === 'Available' && (
                                        <>
                                            <CheckCircle className="w-5 h-5 text-green-500" />
                                            <span className="text-green-500">Available</span>
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className="mt-4 flex gap-3">
                                <button className="text-blue-500 hover:text-blue-400 text-sm">View Details</button>
                                {/* Changed button to Download Scan */}
                                {scan.status === 'Available' && (
                                    <button
                                        onClick={() => handleDownload(scan.image_url, scan.file_path)}
                                        className="flex items-center gap-1 text-blue-500 hover:text-blue-400 text-sm"
                                    >
                                        <Download className="w-4 h-4" />
                                        Download Scan
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ScansPage




// // Mock data - Updated to reflect scans from external sources
// const scans = [
//     {
//         id: 1,
//         date: '2024-03-15',
//         type: 'Chest X-Ray',
//         status: 'Available',
//         fileName: 'scan_20240315_chest_xray.png',
//         downloadUrl: '/path/to/scan_20240315_chest_xray.png'
//     },
//     {
//         id: 2,
//         date: '2024-03-10',
//         type: 'Chest CT Scan',
//         status: 'Available',
//         fileName: 'scan_20240310_chest_ct.jpg',
//         downloadUrl: '/path/to/scan_20240310_chest_ct.jpg'
//     },
//     {
//         id: 3,
//         date: '2024-02-20',
//         type: 'Chest X-Ray',
//         status: 'Available',
//         fileName: 'scan_20240220_chest_xray.png',
//         downloadUrl: '/path/to/scan_20240220_chest_xray.png'
//     },
//     {
//         id: 4,
//         date: '2024-01-05',
//         type: 'Chest X-Ray',
//         status: 'Pending',
//         fileName: null,
//         downloadUrl: null
//     },
// ]