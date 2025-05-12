"use client"; // This page needs client-side interactivity

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter

// Define a type for your ticket data (adjust as needed)
interface Ticket {
    id: string
    subject: string | null;
    open: boolean | null;
    user_name: string | null
    created_at: Date | null
    // Add other ticket properties here
}

type Props = {
    tickets: Ticket[] | null;

}
const SupportPageClient = (props: Props) => {
    const { tickets } = props;
    const router = useRouter(); // Initialize router
    const [error, setError] = useState<string | null>(null);


    const handleCreateTicketClick = () => {
        router.push('/create-ticket'); // Navigate to the create ticket page
    };

    const handleTicketClick = (ticketId: string) => {
        router.push(`/ticket/${ticketId}`); // Navigate to the specific ticket page
    };

    return (
        <div className="container mx-auto p-6">
            {/* Top section with button */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Your Support Tickets</h1>
                <button
                    onClick={handleCreateTicketClick}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200"
                >
                    Create New Ticket
                </button>
            </div>

            {/* Display tickets */}
            {error && <p className="text-red-500">Error: {error}</p>}
            {tickets && !error && (
                tickets.length > 0 ? (
                    <ul className="space-y-4">
                        {tickets.map((ticket) => (
                            <li
                                key={ticket.id}
                                className="bg-neutral-800 p-4 rounded-lg shadow cursor-pointer hover:bg-neutral-700 transition duration-200"
                                onClick={() => handleTicketClick(ticket.id)}
                            >
                                <h2 className="text-lg font-semibold text-white">{ticket.subject}</h2>
                                <p className="text-sm text-neutral-400">
                                    Status:
                                    {ticket.open ? (
                                        <span className="inline-flex items-center text-green-500 ml-1">
                                            <span className="w-2 h-2 rounded-full bg-green-500 mr-1"></span>
                                            Open
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center text-red-500 ml-1">
                                            <span className="w-2 h-2 rounded-full bg-red-500 mr-1"></span>
                                            Closed
                                        </span>
                                    )}
                                </p>
                                {/* Add more ticket details here */}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>You have not opened any support tickets yet.</p>
                )
            )}
        </div>
    );
}

export default SupportPageClient;






// // Placeholder for fetching tickets
// useEffect(() => {
//     const fetchTickets = async () => {
//         try {
//             // Replace with your actual API call to fetch user tickets
//             // Example placeholder:
//             // const response = await fetch('/api/user/tickets');
//             // if (!response.ok) {
//             //     throw new Error('Failed to fetch tickets');
//             // }
//             // const data = await response.json();
//             // setTickets(data.tickets);

//             // Mock data for demonstration
//             const mockTickets: Ticket[] = [
//                 {
//                     id: '1', subject: 'Issue with login', status: 'Open',
//                     user_name: null,
//                     created_at: null
//                 },
//                 {
//                     id: '2', subject: 'Question about features', status: 'Closed',
//                     user_name: null,
//                     created_at: null
//                 },
//                 {
//                     id: '3', subject: 'Bug report: page crashes', status: 'Open',
//                     user_name: null,
//                     created_at: null
//                 },
//             ];
//             await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
//             setTickets(mockTickets);

//         } catch (err: any) {
//             setError(err.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     fetchTickets();
// }, []); // Empty dependency array means this runs once on mount
