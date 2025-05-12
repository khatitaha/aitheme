"use client"; // This page needs client-side interactivity for the form

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter
import { createTicket } from '../actions';

const CreateTicketPage = () => {
    const [subject, setSubject] = useState('');
    const [description, setDescription] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);


    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Create New Support Ticket</h1>

            <form action={createTicket} className="bg-neutral-900 p-6 rounded-lg shadow space-y-4">
                {error && (
                    <div className="bg-red-800 text-white p-3 rounded mb-4">
                        {error}
                    </div>
                )}

                <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-neutral-300 mb-2">
                        Subject
                    </label>
                    <input
                        name='subject'
                        type="text"
                        id="subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-md text-white focus:outline-none focus:ring focus:ring-blue-600"
                        required
                        disabled={submitting}
                    />
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-neutral-300 mb-2">
                        Description
                    </label>
                    <textarea
                        name='description'
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={6}
                        className="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-md text-white focus:outline-none focus:ring focus:ring-blue-600 resize-y"
                        required
                        disabled={submitting}
                    ></textarea>
                </div>

                <button
                    type="submit"
                    className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200 ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={submitting}
                >
                    {submitting ? 'Submitting...' : 'Submit Ticket'}
                </button>
            </form>
        </div>
    );
}

export default CreateTicketPage;