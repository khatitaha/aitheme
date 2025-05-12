// path: app/admin/appointments/page.tsx
"use client"

import React, { useState } from 'react'
import { CalendarCheck, User, Clock, Search, Filter, CheckCircle, XCircle, AlertTriangle } from 'lucide-react'
import Link from 'next/link'
import { deleteAppointment } from '@/app/(main)/actions'




type Props = {
    appointments: any[]
}





// Mock appointment data - replace with actual data fetching
const mockAppointments = [
    {
        id: 'appt-001',
        patientName: 'John Doe',
        patientId: 'user-001',
        date: '2024-03-20',
        time: '10:00 AM',
        type: 'Chest Scan',
        status: 'Scheduled', // Scheduled, Completed, Cancelled, Pending Approval
        location: 'Main Hospital - Radiology Dept.',
        assignedDoctor: 'Dr. Smith',
    },
    {
        id: 'appt-002',
        patientName: 'Jane Smith',
        patientId: 'user-002',
        date: '2024-03-21',
        time: '02:30 PM',
        type: 'Follow-up Consultation',
        status: 'Scheduled',
        location: 'Consultation Room 3',
        assignedDoctor: 'Dr. Jones',
    },
    {
        id: 'appt-003',
        patientName: 'Robert Johnson',
        patientId: 'user-003',
        date: '2024-03-19',
        time: '09:00 AM',
        type: 'Initial Consultation',
        status: 'Completed',
        location: 'Consultation Room 1',
        assignedDoctor: 'Dr. Davis',
    },
    {
        id: 'appt-004',
        patientName: 'Emily Williams',
        patientId: 'user-004',
        date: '2024-03-22',
        time: '11:00 AM',
        type: 'Chest X-Ray',
        status: 'Pending Approval', // Example of a status needing action
        location: 'Radiology Wing B',
        assignedDoctor: null, // Might not be assigned yet
    },
    {
        id: 'appt-005',
        patientName: 'Michael Brown',
        patientId: 'user-005',
        date: '2024-03-15',
        time: '01:00 PM',
        type: 'Chest Scan',
        status: 'Cancelled',
        location: 'Main Hospital - Radiology Dept.',
        assignedDoctor: 'Dr. Smith',
    },
];

// Helper function to format date
const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric', month: 'short', day: 'numeric'
    });
};

// Helper function to get status color and icon
const getStatusStyle = (status: string): { color: string; Icon: React.ElementType } => {
    switch (status.toLowerCase()) {
        case 'scheduled': return { color: 'text-blue-500 bg-blue-900/30', Icon: Clock };
        case 'completed': return { color: 'text-green-500 bg-green-900/30', Icon: CheckCircle };
        case 'cancelled': return { color: 'text-red-500 bg-red-900/30', Icon: XCircle };
        case 'pending approval': return { color: 'text-yellow-500 bg-yellow-900/30', Icon: AlertTriangle };
        default: return { color: 'text-neutral-400 bg-neutral-800', Icon: Clock };
    }
}

const AdminAppointmentsPage = (props: Props) => {
    const { appointments } = props
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('All'); // All, Scheduled, Completed, etc.

    const filteredAppointments = mockAppointments.filter(appt => {
        const matchesSearch = appt.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            appt.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (appt.assignedDoctor && appt.assignedDoctor.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesStatus = filterStatus === 'All' || appt.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    return (
        <div>
            {/* Header */}
            <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white">Manage Appointments</h1>
                    <p className="text-neutral-400">View and manage patient appointments</p>
                </div>
                {/* Button to Schedule New Appointment (Optional) */}
                {/* <Link href="/admin/appointments/new" className="...">New Appointment</Link> */}
            </div>

            {/* Filters and Search */}
            <div className="mb-6 flex flex-wrap gap-4 items-center">
                {/* Search Input */}
                <div className="relative flex-grow sm:flex-grow-0 sm:w-64">
                    <Search className="w-5 h-5 text-neutral-400 absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                    <input
                        type="text"
                        placeholder="Search by patient, ID, doctor..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-neutral-800 border border-neutral-700 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                {/* Status Filter */}
                <div className="relative">
                    <Filter className="w-5 h-5 text-neutral-400 absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="bg-neutral-800 border border-neutral-700 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                    >
                        <option value="All">All Statuses</option>
                        <option value="Scheduled">Scheduled</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                        <option value="Pending Approval">Pending Approval</option>
                    </select>
                </div>
            </div>

            {/* Appointments Table */}
            <div className="bg-neutral-900 rounded-xl border border-neutral-800 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-neutral-800">
                            <tr>
                                <th className="px-6 py-3 text-sm font-semibold text-neutral-400 uppercase tracking-wider">Appt ID</th>
                                <th className="px-6 py-3 text-sm font-semibold text-neutral-400 uppercase tracking-wider">Patient</th>
                                <th className="px-6 py-3 text-sm font-semibold text-neutral-400 uppercase tracking-wider">Date & Time</th>
                                <th className="px-6 py-3 text-sm font-semibold text-neutral-400 uppercase tracking-wider">Type</th>
                                <th className="px-6 py-3 text-sm font-semibold text-neutral-400 uppercase tracking-wider">Doctor</th>
                                <th className="px-6 py-3 text-sm font-semibold text-neutral-400 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-sm font-semibold text-neutral-400 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-800">
                            {appointments.length > 0 ? (
                                appointments.map((appt) => {
                                    const { color, Icon } = getStatusStyle(appt.status);
                                    return (
                                        <tr key={appt.id} className="hover:bg-neutral-800/50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-400">{appt.id}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-white">{appt.name}</div>
                                                <div className="text-xs text-neutral-500">{appt.patientId}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-white">{formatDate(appt.date)}</div>
                                                <div className="text-xs text-neutral-500">{appt.time}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-white max-w-xs truncate" title={appt.type}>{appt.type}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{appt.assignedDoctor || <span className="text-neutral-500 italic">N/A</span>}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${color}`}>
                                                    <Icon className="w-3 h-3" />
                                                    {appt.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                {/* Example Actions */}
                                                {appt.status === 'Pending Approval' && (
                                                    <button className="text-green-500 hover:text-green-400 mr-3">Approve</button>
                                                )}
                                                <Link href={`/admin/appointments/${appt.id}`} className="text-blue-500 hover:text-blue-400 mr-3">
                                                    View
                                                </Link>
                                                {appt.status !== 'Completed' && appt.status !== 'Cancelled' && (
                                                    <button className="text-red-500 hover:text-red-400" onClick={() => deleteAppointment(appt.id)}>Cancel</button>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan={7} className="text-center px-6 py-8 text-neutral-500">
                                        No appointments found matching your criteria.
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

export default AdminAppointmentsPage



// {filteredAppointments.length > 0 ? (
//     filteredAppointments.map((appt) => {
//         const { color, Icon } = getStatusStyle(appt.status);
//         return (
//             <tr key={appt.id} className="hover:bg-neutral-800/50 transition-colors">
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-400">{appt.id}</td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="text-sm font-medium text-white">{appt.patientName}</div>
//                     <div className="text-xs text-neutral-500">{appt.patientId}</div>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="text-sm text-white">{formatDate(appt.date)}</div>
//                     <div className="text-xs text-neutral-500">{appt.time}</div>
//                 </td>
//                 <td className="px-6 py-4">
//                     <div className="text-sm text-white max-w-xs truncate" title={appt.type}>{appt.type}</div>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{appt.assignedDoctor || <span className="text-neutral-500 italic">N/A</span>}</td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                     <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${color}`}>
//                         <Icon className="w-3 h-3" />
//                         {appt.status}
//                     </span>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                     {/* Example Actions */}
//                     {appt.status === 'Pending Approval' && (
//                         <button className="text-green-500 hover:text-green-400 mr-3">Approve</button>
//                     )}
//                     <Link href={`/admin/appointments/${appt.id}`} className="text-blue-500 hover:text-blue-400 mr-3">
//                         View
//                     </Link>
//                     {appt.status !== 'Completed' && appt.status !== 'Cancelled' && (
//                         <button className="text-red-500 hover:text-red-400">Cancel</button>
//                     )}
//                 </td>
//             </tr>
//         );
//     })
// ) : (
//     <tr>
//         <td colSpan={7} className="text-center px-6 py-8 text-neutral-500">
//             No appointments found matching your criteria.
//         </td>
//     </tr>
// )}