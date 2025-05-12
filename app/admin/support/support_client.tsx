"use client"

import React, { useState } from 'react'
import { MessageSquare, User, Clock, Check, Search, Filter } from 'lucide-react'
import Link from 'next/link' // Import Link for potential detail view navigation

// Mock support ticket data - replace with actual data fetching
const mockTickets = [
    {
        id: 'ticket-101',
        patientName: 'John Doe',
        patientId: 'user-001',
        subject: 'Issue logging in',
        status: 'Open', // Possible statuses: Open, In Progress, Closed
        dateReceived: '2024-03-18T10:30:00Z',
        lastUpdate: '2024-03-18T10:30:00Z',
        priority: 'High', // Optional: Low, Medium, High
    },
    {
        id: 'ticket-102',
        patientName: 'Jane Smith',
        patientId: 'user-002',
        subject: 'Question about scan results',
        status: 'In Progress',
        dateReceived: '2024-03-17T14:05:00Z',
        lastUpdate: '2024-03-18T09:15:00Z',
        priority: 'Medium',
    },
    {
        id: 'ticket-103',
        patientName: 'Robert Johnson',
        patientId: 'user-003',
        subject: 'Appointment cancellation request',
        status: 'Closed',
        dateReceived: '2024-03-16T08:00:00Z',
        lastUpdate: '2024-03-17T11:00:00Z',
        priority: 'Low',
    },
    {
        id: 'ticket-104',
        patientName: 'Emily Williams',
        patientId: 'user-004',
        subject: 'Cannot download scan file',
        status: 'Open',
        dateReceived: '2024-03-18T11:00:00Z',
        lastUpdate: '2024-03-18T11:00:00Z',
        priority: 'High',
    },
];

// Helper function to format date
const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
        dateStyle: 'short',
        timeStyle: 'short',
    });
};

// Helper function to get status color
const getStatusColor = (open: boolean) => {
    switch (open) {
        case false: return 'text-red-500 bg-red-900/30';
        case true: return 'text-green-500 bg-green-900/30';
        default: return 'text-neutral-400 bg-neutral-800';
    }
}

type Props = {
    tickets: any[]
}

const Support_client = (props: Props) => {
    const { tickets } = props
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('All'); // All, Open, In Progress, Closed

    const filteredTickets = tickets.filter(ticket => {
        const matchesSearch = ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ticket.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ticket.id.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'All' || ticket.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    return (
        <div>
            {/* Header */}
            <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white">Support Tickets</h1>
                    <p className="text-neutral-400">Manage patient support requests</p>
                </div>
                {/* Add New Ticket Button (Optional) */}
                {/* <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                    <Plus className="w-5 h-5" />
                    <span>New Ticket</span>
                </button> */}
            </div>

            {/* Filters and Search */}
            <div className="mb-6 flex flex-wrap gap-4 items-center">
                {/* Search Input */}
                <div className="relative flex-grow sm:flex-grow-0 sm:w-64">
                    <Search className="w-5 h-5 text-neutral-400 absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                    <input
                        type="text"
                        placeholder="Search tickets..."
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
                        <option value="Open">Open</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Closed">Closed</option>
                    </select>
                </div>
            </div>

            {/* Tickets Table/List */}
            <div className="bg-neutral-900 rounded-xl border border-neutral-800 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-neutral-800">
                            <tr>
                                <th className="px-6 py-3 text-sm font-semibold text-neutral-400 uppercase tracking-wider">Ticket ID</th>
                                <th className="px-6 py-3 text-sm font-semibold text-neutral-400 uppercase tracking-wider">Patient</th>
                                <th className="px-6 py-3 text-sm font-semibold text-neutral-400 uppercase tracking-wider">Subject</th>
                                <th className="px-6 py-3 text-sm font-semibold text-neutral-400 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-sm font-semibold text-neutral-400 uppercase tracking-wider">Last Updated</th>
                                <th className="px-6 py-3 text-sm font-semibold text-neutral-400 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-800">
                            {filteredTickets.length > 0 ? (
                                filteredTickets.map((ticket) => (
                                    <tr key={ticket.id} className="hover:bg-neutral-800/50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-400">{ticket.id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-white">{ticket.user_name}</div>
                                            <div className="text-xs text-neutral-500">{ticket.user_name}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-white max-w-xs truncate" title={ticket.subject}>{ticket.subject}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(ticket.open)}`}>
                                                {ticket.open ? "open" : "closed"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-400">{formatDate(ticket.created_at)}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            {/* Replace Link/buttons with actual functionality */}
                                            <Link href={`/admin/support/${ticket.id}`} className="text-blue-500 hover:text-blue-400 mr-3">
                                                View
                                            </Link>
                                            {/* Add Reply/open Change buttons as needed */}
                                            {/* <button className="text-green-500 hover:text-green-400 mr-3">Reply</button> */}
                                            {/* <button className="text-yellow-500 hover:text-yellow-400">Update</button> */}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="text-center px-6 py-8 text-neutral-500">
                                        No tickets found matching your criteria.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            {/* Pagination (Optional - Add if needed) */}
            {/* <div className="mt-6 flex justify-center"> ... </div> */}
        </div>
    )
}

export default Support_client
