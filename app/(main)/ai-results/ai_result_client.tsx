"use client"

import React from 'react'
import { FileText, CheckCircle, AlertCircle, Plus, Clock } from 'lucide-react'
import Link from 'next/link'
type Props = {
    aiResults: any[]
}

const AiResultsPage = (props: Props) => {
    const { aiResults } = props

    return (
        <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white">Scans</h1>
                    <p className="text-neutral-400">View and manage your medical scans</p>
                </div>
                <Link
                    href="/ai-detect" // Link to a future upload page
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    <span>Upload New Scan</span>
                </Link>
            </div>

            {/* Scan History */}
            <div>
                <h2 className="text-xl font-semibold text-white mb-4">Scan History</h2>
                <div className="grid gap-4">

                    {aiResults.map((scan) => (
                        <div key={scan.id} className="bg-neutral-900 rounded-xl border border-neutral-800 p-6">
                            <div className="flex items-start justify-between">
                                <div className="flex items-start gap-4">
                                    {/* Icon changes based on status */}
                                    <div className={`p-3 rounded-lg ${scan.status === 'Processing' ? 'bg-yellow-600' : 'bg-neutral-800'}`}>
                                        <FileText className={`w-6 h-6 ${scan.status === 'Processing' ? 'text-white' : 'text-neutral-400'}`} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-medium text-white">{scan.type}</h3>
                                        <p className="text-neutral-400">Uploaded on {scan.created_at}</p>
                                        {/* Status text styling */}
                                        <p className={`text-sm mt-1 ${scan.status === 'Processing' ? 'text-yellow-500' : 'text-neutral-400'}`}>
                                            Status: {scan.status}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    {/* Display result/AI detection if completed */}
                                    {scan.status === 'Completed' && scan.result && (
                                        <>
                                            {scan.result === 'Viral Pneumonia' ? (
                                                <CheckCircle className="w-5 h-5 text-green-500" />
                                            ) : (
                                                <AlertCircle className="w-5 h-5 text-red-500" />
                                            )}
                                            <span className={scan.result === 'Viral Pneumonia' ? 'text-green-500' : 'text-red-500'}>
                                                {scan.result}
                                            </span>
                                        </>
                                    )}
                                    {/* Display processing status */}
                                    {scan.status === 'Processing' && (
                                        <>
                                            <Clock className="w-5 h-5 text-yellow-500" />
                                            <span className="text-yellow-500">Processing</span>
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className="mt-4 flex gap-3">
                                <button className="text-blue-500 hover:text-blue-400 text-sm">View Details</button>
                                {/* Conditionally show View AI Results button */}
                                {scan.status === 'Completed' && (
                                    <button className="text-blue-500 hover:text-blue-400 text-sm">View AI Results</button>
                                )}
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    )
}

export default AiResultsPage



// {scans.map((scan) => (
//     <div key={scan.id} className="bg-neutral-900 rounded-xl border border-neutral-800 p-6">
//         <div className="flex items-start justify-between">
//             <div className="flex items-start gap-4">
//                 {/* Icon changes based on status */}
//                 <div className={`p-3 rounded-lg ${scan.status === 'Processing' ? 'bg-yellow-600' : 'bg-neutral-800'}`}>
//                     <FileText className={`w-6 h-6 ${scan.status === 'Processing' ? 'text-white' : 'text-neutral-400'}`} />
//                 </div>
//                 <div>
//                     <h3 className="text-lg font-medium text-white">{scan.type}</h3>
//                     <p className="text-neutral-400">Uploaded on {scan.date}</p>
//                     {/* Status text styling */}
//                     <p className={`text-sm mt-1 ${scan.status === 'Processing' ? 'text-yellow-500' : 'text-neutral-400'}`}>
//                         Status: {scan.status}
//                     </p>
//                 </div>
//             </div>
//             <div className="flex items-center gap-2">
//                 {/* Display result/AI detection if completed */}
//                 {scan.status === 'Completed' && scan.result && (
//                     <>
//                         {scan.result === 'Negative' ? (
//                             <CheckCircle className="w-5 h-5 text-green-500" />
//                         ) : (
//                             <AlertCircle className="w-5 h-5 text-red-500" />
//                         )}
//                         <span className={scan.result === 'Negative' ? 'text-green-500' : 'text-red-500'}>
//                             {scan.ai_detection}
//                         </span>
//                     </>
//                 )}
//                 {/* Display processing status */}
//                 {scan.status === 'Processing' && (
//                     <>
//                         <Clock className="w-5 h-5 text-yellow-500" />
//                         <span className="text-yellow-500">Processing</span>
//                     </>
//                 )}
//             </div>
//         </div>
//         <div className="mt-4 flex gap-3">
//             <button className="text-blue-500 hover:text-blue-400 text-sm">View Details</button>
//             {/* Conditionally show View AI Results button */}
//             {scan.status === 'Completed' && (
//                 <button className="text-blue-500 hover:text-blue-400 text-sm">View AI Results</button>
//             )}
//         </div>
//     </div>
// ))}



// const scans = [
//     {
//         id: 1,
//         date: '2024-03-15',
//         type: 'Chest X-Ray',
//         status: 'Completed',
//         result: 'Negative',
//         ai_detection: 'No Pneumonia Detected'
//     },
//     {
//         id: 2,
//         date: '2024-03-10',
//         type: 'Chest CT Scan',
//         status: 'Completed',
//         result: 'Negative',
//         ai_detection: 'No Pneumonia Detected'
//     },
//     {
//         id: 3,
//         date: '2024-02-20',
//         type: 'Chest X-Ray',
//         status: 'Completed',
//         result: 'Positive',
//         ai_detection: 'Pneumonia Detected'
//     },
//     {
//         id: 4,
//         date: '2024-01-05',
//         type: 'Chest X-Ray',
//         status: 'Processing',
//         result: null,
//         ai_detection: null
//     },
// ]
