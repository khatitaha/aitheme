"use client"; // Needs client-side for fetching data

import React, { useState, useEffect, FormEvent } from 'react';
import { useParams } from 'next/navigation'; // To get the id from the URL
import { addMessageToChats } from '../../actions';

// Define types for ticket and messages (adjust as needed)
interface Ticket {
    id: string;
    subject: string;
    description: string;
    status: string;
    created_at: Date; // Assuming a timestamp
    // Add other properties
    messages: TicketMessage[]; // Array of messages/responses
}

interface TicketMessage {
    id: string;
    admin: boolean; // Or a user ID/object
    message: string;
    user_id: string
    ticket_id: string
    created_at: string;
}
type Props = {
    chats: any[] | null;
    ticket: any | null;

}
const TicketDetailPage = (props: Props) => {
    const { chats, ticket } = props
    const params = useParams();

    const [error, setError] = useState<string | null>(null);
    const [newMessage, setNewMessage] = useState('');
    const [sendingMessage, setSendingMessage] = useState(false);


    function handleSendMessage(event: FormEvent<HTMLFormElement>): void {
        throw new Error('Function not implemented.');
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Ticket: {ticket.subject}</h1>
            <div className={`mb-6 text-sm font-semibold ${ticket.open ? 'text-green-500' : 'text-red-500'}`}>
                Status: {ticket.open ? "open" : "closed"}
            </div>

            <div className="bg-neutral-900 p-6 rounded-lg shadow space-y-4 mb-6">
                <div>
                    <h2 className="text-lg font-semibold mb-2">Description</h2>
                    <p className="text-neutral-300">{ticket.description}</p>
                </div>
                <div className="text-sm text-neutral-400">Opened on: {new Date(ticket.created_at).toLocaleString()}</div>
            </div>


            {/* Messages/Responses Section */}
            <div className="bg-neutral-900 p-6 rounded-lg shadow space-y-4">
                <h2 className="text-lg font-semibold mb-4">Conversation</h2>
                {chats!.length === 0 ? (
                    <p className="text-neutral-400">No messages yet.</p>
                ) : (
                    <div className="space-y-4 max-h-80 overflow-y-auto pr-2"> {/* Added overflow for long conversations */}
                        {chats!.map((message: TicketMessage) => (
                            <div
                                key={message.id}
                                className={`p-3 rounded-lg ${!message.admin ? 'bg-blue-700 text-white ml-auto' : 'bg-neutral-800 text-neutral-200 mr-auto'}`}
                                style={{ maxWidth: '80%' }} // Limit message width
                            >
                                <p className="text-sm">{message.message}</p>
                                <p className="text-xs text-neutral-400 mt-1 text-right">
                                    {new Date(message.created_at).toLocaleString()} by {message.user_id}
                                </p>
                            </div>
                        ))}
                    </div>
                )}

                {/* Message Input Form */}
                {ticket.open && ( // Only show input if ticket is open
                    <form action={addMessageToChats} className="mt-6 pt-4 border-t border-neutral-800">
                        <textarea
                            name='message'
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            rows={3}
                            className="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-md text-white placeholder-neutral-400 focus:outline-none focus:ring focus:ring-blue-600 resize-y"
                            placeholder="Add a message..."
                            required
                            disabled={sendingMessage}
                        ></textarea>
                        {error && (
                            <div className="bg-red-800 text-white p-2 rounded text-sm mt-2">
                                {error}
                            </div>
                        )}
$                        <input type="text" hidden name='ticket_id' value={`${ticket.id}`} />

                        <button
                            type="submit"
                            className={`mt-3 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200 ${sendingMessage ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={sendingMessage || !newMessage.trim()}
                        >
                            {sendingMessage ? 'Sending...' : 'Send Message'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}

export default TicketDetailPage;