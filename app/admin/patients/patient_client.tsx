// path: app/admin/patients/page.tsx
"use client"

import React, { useState } from 'react'
import { Users, Mail, Phone, CalendarDays, Search, UserPlus, Send, Edit } from 'lucide-react'
import Link from 'next/link'


type Props = {
    profiles: any[]
}




// Mock patient data - replace with actual data fetching
const mockPatients = [
    {
        id: 'user-001',
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1 (555) 123-4567',
        dateRegistered: '2024-01-15T09:00:00Z',
        lastLogin: '2024-03-18T10:30:00Z',
        totalScans: 5,
        upcomingAppointments: 1,
    },
    {
        id: 'user-002',
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        phone: '+1 (555) 987-6543',
        dateRegistered: '2024-01-20T11:00:00Z',
        lastLogin: '2024-03-17T14:05:00Z',
        totalScans: 3,
        upcomingAppointments: 0,
    },
    {
        id: 'user-003',
        name: 'Robert Johnson',
        email: 'robert.j@example.com',
        phone: '+1 (555) 555-5555',
        dateRegistered: '2024-02-01T15:30:00Z',
        lastLogin: '2024-03-16T08:00:00Z',
        totalScans: 8,
        upcomingAppointments: 2,
    },
    {
        id: 'user-004',
        name: 'Emily Williams',
        email: 'emily.w@example.com',
        phone: '+1 (555) 111-2222',
        dateRegistered: '2024-02-10T10:00:00Z',
        lastLogin: '2024-03-18T11:00:00Z',
        totalScans: 1,
        upcomingAppointments: 1,
    },
    {
        id: 'user-005',
        name: 'Michael Brown',
        email: 'michael.b@sample.net',
        phone: '+1 (555) 333-4444',
        dateRegistered: '2024-03-01T12:00:00Z',
        lastLogin: '2024-03-15T09:00:00Z',
        totalScans: 0,
        upcomingAppointments: 0,
    },
];

// Helper function to format date
const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric', month: 'short', day: 'numeric'
    });
};

const AdminPatientsPage = (props: Props) => {
    const { profiles } = props
    const [searchTerm, setSearchTerm] = useState('');

    const filteredPatients = mockPatients.filter(patient =>
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.phone.includes(searchTerm)
    );

    return (
        <div>
            {/* Header */}
            <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white">Manage Patients</h1>
                    <p className="text-neutral-400">View and manage registered patients</p>
                </div>
                {/* Add New Patient Button (Optional) */}
                <Link href="/admin/patients/new">
                    <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                        <UserPlus className="w-5 h-5" />
                        <span>Add New Patient</span>
                    </button>
                </Link>
            </div>

            {/* Search */}
            <div className="mb-6 flex justify-end">
                <div className="relative sm:w-64">
                    <Search className="w-5 h-5 text-neutral-400 absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                    <input
                        type="text"
                        placeholder="Search patients..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-neutral-800 border border-neutral-700 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            {/* Patients Table */}
            <div className="bg-neutral-900 rounded-xl border border-neutral-800 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-neutral-800">
                            <tr>
                                <th className="px-6 py-3 text-sm font-semibold text-neutral-400 uppercase tracking-wider">Patient ID</th>
                                <th className="px-6 py-3 text-sm font-semibold text-neutral-400 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-sm font-semibold text-neutral-400 uppercase tracking-wider">Contact</th>
                                <th className="px-6 py-3 text-sm font-semibold text-neutral-400 uppercase tracking-wider">aidetect</th>
                                <th className="px-6 py-3 text-sm font-semibold text-neutral-400 uppercase tracking-wider">residency</th>
                                <th className="px-6 py-3 text-sm font-semibold text-neutral-400 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-800">
                            {profiles.length > 0 ? (
                                profiles.map((patient) => (
                                    <tr key={patient.id} className="hover:bg-neutral-800/50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-400">{patient.id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-white">{patient.name}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-1 text-sm text-neutral-300">
                                                <Mail className="w-3.5 h-3.5 text-neutral-500" /> {patient.email}
                                            </div>
                                            <div className="flex items-center gap-1 text-xs text-neutral-400 mt-1">
                                                <Phone className="w-3 h-3 text-neutral-500" /> {patient.phone}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-neutral-300">{patient.aiDetect ? "has access" : " no acess"}</div>
                                            {/* <div className="text-xs text-neutral-500">Last Login: {formatDate(patient.lastLogin)}</div> */}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-300">
                                            <div> {patient.isResident ? "resident " : "non resident"}</div>
                                            {/* <div>Appts: {patient.upcomingAppointments}</div> */}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            {/* Action Links/Buttons */}
                                            <Link href={`/admin/send-scans?patientId=${patient.id}`} className="text-purple-500 hover:text-purple-400 mr-3 inline-flex items-center gap-1">
                                                <Send className="w-4 h-4" /> Send Scan
                                            </Link>
                                            <Link href={`/admin/patients/${patient.id}`} className="text-blue-500 hover:text-blue-400 mr-3">
                                                View Details
                                            </Link>
                                            <Link href={`/admin/patients/${patient.id}/edit`} className="text-yellow-500 hover:text-yellow-400 inline-flex items-center gap-1">
                                                <Edit className="w-4 h-4" /> Edit
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="text-center px-6 py-8 text-neutral-500">
                                        No patients found matching your criteria.
                                    </td>
                                </tr>
                            )}

                        </tbody>
                    </table>
                </div>
            </div>
            {/* Pagination (Optional) */}
            {/* <div className="mt-6"> ... </div> */}
        </div>
    )
}

export default AdminPatientsPage



// {filteredPatients.length > 0 ? (
//     filteredPatients.map((patient) => (
//         <tr key={patient.id} className="hover:bg-neutral-800/50 transition-colors">
//             <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-400">{patient.id}</td>
//             <td className="px-6 py-4 whitespace-nowrap">
//                 <div className="text-sm font-medium text-white">{patient.name}</div>
//             </td>
//             <td className="px-6 py-4 whitespace-nowrap">
//                 <div className="flex items-center gap-1 text-sm text-neutral-300">
//                     <Mail className="w-3.5 h-3.5 text-neutral-500" /> {patient.email}
//                 </div>
//                 <div className="flex items-center gap-1 text-xs text-neutral-400 mt-1">
//                     <Phone className="w-3 h-3 text-neutral-500" /> {patient.phone}
//                 </div>
//             </td>
//             <td className="px-6 py-4 whitespace-nowrap">
//                 <div className="text-sm text-neutral-300">{formatDate(patient.dateRegistered)}</div>
//                 <div className="text-xs text-neutral-500">Last Login: {formatDate(patient.lastLogin)}</div>
//             </td>
//             <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-300">
//                 <div>Scans: {patient.totalScans}</div>
//                 <div>Appts: {patient.upcomingAppointments}</div>
//             </td>
//             <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                 {/* Action Links/Buttons */}
//                 <Link href={`/admin/send-scans?patientId=${patient.id}`} className="text-purple-500 hover:text-purple-400 mr-3 inline-flex items-center gap-1">
//                     <Send className="w-4 h-4" /> Send Scan
//                 </Link>
//                 <Link href={`/admin/patients/${patient.id}`} className="text-blue-500 hover:text-blue-400 mr-3">
//                     View Details
//                 </Link>
//                 <Link href={`/admin/patients/${patient.id}/edit`} className="text-yellow-500 hover:text-yellow-400 inline-flex items-center gap-1">
//                     <Edit className="w-4 h-4" /> Edit
//                 </Link>
//             </td>
//         </tr>
//     ))
// ) : (
//     <tr>
//         <td colSpan={6} className="text-center px-6 py-8 text-neutral-500">
//             No patients found matching your criteria.
//         </td>
//     </tr>
// )}