
import React from 'react'
import { Calendar, Clock, CheckCircle, XCircle, Plus } from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import Appointment_comp from './appointment-comp'

const AppointmentsPage = async () => {

    const supabase = await createClient();
    const { data: appointments } = await supabase.from("appointments").select();

    return (
        <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white">Appointments</h1>
                    <p className="text-neutral-400">Manage your medical appointments</p>
                </div>
                <Link
                    href="/appointment"
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    <span>New Appointment</span>
                </Link>
            </div>

            {/* Upcoming Appointments */}
            <div className="mb-12">
                <h2 className="text-xl font-semibold text-white mb-4">Upcoming Appointments</h2>
                <div className="grid gap-4">

                    {
                        appointments?.map((appointment) => (
                            <Appointment_comp key={appointment.id} id={appointment.id} type={appointment.type} date={appointment.date} time={appointment.time} location={appointment.location} status={appointment.status} />
                        ))
                    }
                </div>
            </div>


        </div>
    )
}

export default AppointmentsPage


