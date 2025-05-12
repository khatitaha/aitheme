import React from 'react'
import { Calendar, FileText, Clock, CheckCircle, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'

const HomePage = async () => {

    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();
    const { data: aiResults } = await supabase.from("airesults")
        .select("*")
        .eq("user_id", user?.id).order("created_at", { ascending: false });
    ;

    const { data: appointments } = await supabase.from("appointments")
        .select("*")
        .eq("user_id", user?.id).order("created_at", { ascending: false });
    ;

    const { data: scans } = await supabase.from("scans")
        .select("*")
        .eq("user_id", user?.id).order("created_at", { ascending: false });
    ;

    const { data: profile } = await supabase.from("profile")
        .select("*")
        .eq("id", user?.id);
    ;





    return (
        <div className="max-w-7xl mx-auto">
            {/* Welcome Section */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white">Welcome back , {profile![0].name}</h1>
                <p className="text-neutral-400">Here's your dashboard overview</p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-800">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-neutral-400">Total Scans</p>
                            <p className="text-2xl font-bold text-white">{scans?.length}</p>
                        </div>
                        <div className="p-3 bg-blue-600 rounded-lg">
                            <FileText className="w-6 h-6 text-white" />
                        </div>
                    </div>
                </div>

                <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-800">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-neutral-400">Upcoming Appointments</p>
                            <p className="text-2xl font-bold text-white">{appointments?.length}</p>
                        </div>
                        <div className="p-3 bg-blue-600 rounded-lg">
                            <Calendar className="w-6 h-6 text-white" />
                        </div>
                    </div>
                </div>

                <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-800">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-neutral-400">AI Detections</p>
                            <p className="text-2xl font-bold text-white">{aiResults?.length}</p>
                        </div>
                        <div className="p-3 bg-blue-600 rounded-lg">
                            <Clock className="w-6 h-6 text-white" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Scans */}
                <div className="bg-neutral-900 rounded-xl border border-neutral-800 p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-white">Recent Scans</h2>
                        <Link href="/scans" className="text-blue-500 hover:text-blue-400">View All</Link>
                    </div>
                    <div className="space-y-4">
                        {scans?.slice(0, 3).map((scan) => (
                            <div key={scan.id} className="flex items-center justify-between p-4 bg-neutral-800 rounded-lg">
                                <div className="flex items-center gap-4">
                                    {scan.status === 'Available' ? (
                                        <CheckCircle className="w-6 h-6 text-green-500" />
                                    ) : (
                                        <AlertCircle className="w-6 h-6 text-red-500" />
                                    )}
                                    <div>
                                        <p className="text-white">Scan from {scan.date}</p>
                                        <p className="text-neutral-400 text-sm">Status: {scan.status}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-white font-medium">{scan.result}</p>
                                    <p className="text-neutral-400 text-sm">Result</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Upcoming Appointments */}
                <div className="bg-neutral-900 rounded-xl border border-neutral-800 p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-white">Upcoming Appointments</h2>
                        <Link href="/appointments" className="text-blue-500 hover:text-blue-400">View All</Link>
                    </div>
                    <div className="space-y-4">
                        {appointments?.slice(0, 3).map((appointment) => (
                            <div key={appointment.id} className="flex items-center justify-between p-4 bg-neutral-800 rounded-lg">
                                <div className="flex items-center gap-4">
                                    <Calendar className="w-6 h-6 text-blue-500" />
                                    <div>
                                        <p className="text-white">{appointment.type}</p>
                                        <p className="text-neutral-400 text-sm">{appointment.date} at {appointment.time}</p>
                                    </div>
                                </div>
                                <button className="text-blue-500 hover:text-blue-400 text-sm">View Details</button>
                            </div>
                        ))}
                    </div>

                </div>
                <div className="bg-neutral-900 rounded-xl border border-neutral-800 p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-white">Upcoming Appointments</h2>
                        <Link href="/appointments" className="text-blue-500 hover:text-blue-400">View All</Link>
                    </div>
                    <div className="space-y-4">
                        {aiResults?.slice(0, 3).map((result) => (
                            <div key={result.id} className="flex items-center justify-between p-4 bg-neutral-800 rounded-lg">
                                <div className="flex items-center gap-4">
                                    {/* Icon based on AI result status or outcome */}
                                    {result.status === 'Completed' && result.result === 'Normal' ? (
                                        <CheckCircle className="w-6 h-6 text-green-500" />
                                    ) : result.status === 'Completed' && result.result === 'Pneumonia Detected' ? (
                                        <AlertCircle className="w-6 h-6 text-red-500" /> // Red for positive detection
                                    ) : (
                                        <Clock className="w-6 h-6 text-yellow-500" /> // Yellow for pending or other states
                                    )}
                                    <div>
                                        {/* Display result date and status */}
                                        <p className="text-white">Analysis from {new Date(result.created_at).toLocaleDateString()}</p> {/* Using created_at and formatting */}
                                        <p className="text-neutral-400 text-sm">Status: {result.status}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    {/* Display AI result */}
                                    <p className={`text-white font-medium ${result.result === 'Normal' ? 'text-green-500' : result.result === 'Pneumonia Detected' ? 'text-red-500' : ''}`}>
                                        {result.result || 'Pending'} {/* Display result or 'Pending' */}
                                    </p>
                                    <p className="text-neutral-400 text-sm">Result</p>
                                </div>
                            </div>
                        ))}
                        {/* Message if no AI results */}
                        {aiResults?.length === 0 && (
                            <div className="p-4 text-center text-neutral-400">No recent AI results found.</div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default HomePage