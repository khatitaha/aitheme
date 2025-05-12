"use client"
import { Calendar, Clock } from 'lucide-react';
import React from 'react'
import { deleteAppointment } from '../actions';

type Props = {

    id: number;
    type: string;
    date: string;
    time: string;
    location: string;
    status: string;

}

const Appointment_comp = (props: Props) => {
    const { id, type, date, time, location, status } = props;
    return (
        <div key={id} className="bg-neutral-900 rounded-xl border border-neutral-800 p-6 mb-4">
            <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-600 rounded-lg">
                        <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h3 className="text-lg font-medium text-white">{type}</h3>
                        <p className="text-neutral-400">{date} at {time}</p>
                        <p className="text-neutral-400 text-sm mt-1">{location}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-blue-500" />
                    <span className="text-blue-500">{status}</span>
                </div>
            </div>
            <form>
                <div className="mt-4 flex gap-3">
                    <button className="text-blue-500 hover:text-blue-400 text-sm">View Details</button>
                    <button className="text-red-500 hover:text-red-400 text-sm" onClick={() => deleteAppointment(id)}>Cancel</button>
                </div>

            </form>

        </div>
    )
}

export default Appointment_comp