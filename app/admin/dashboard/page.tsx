import React from 'react'
import { Users, CalendarCheck, MessageSquare, Send } from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/server';

const AdminDashboardPage = async () => {
    // Mock data - replace with actual counts or data



    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    const { data: tickets } = user
        ? await supabase.from("tickets").select()
        : { data: [] };
    console.log("this is the chats ", tickets);
    const { data: profiles } = user
        ? await supabase.from("profile").select()
        : { data: [] };
    const { data: appointments } = user
        ? await supabase.from("appointments").select()
        : { data: [] }

    const stats = [
        { name: 'Total Patients', value: profiles?.length, icon: Users, href: '/admin/patients' },
        { name: 'Pending Appointments', value: appointments?.length, icon: CalendarCheck, href: '/admin/appointments?status=pending' },
        { name: 'Open Support Tickets', value: tickets?.length, icon: MessageSquare, href: '/admin/support?status=open' },
        { name: 'Scans to Send', value: 3, icon: Send, href: '/admin/send-scans' },
    ];
    return (
        <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
                <p className="text-neutral-400">Overview and quick actions</p>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {stats.map((stat) => (
                    <Link href={stat.href} key={stat.name}>
                        <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-800 hover:border-blue-500 transition-colors cursor-pointer">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-neutral-400">{stat.name}</p>
                                    <p className="text-3xl font-bold text-white">{stat.value}</p>
                                </div>
                                <div className="p-3 bg-blue-600/20 text-blue-500 rounded-lg">
                                    <stat.icon className="w-7 h-7" />
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Placeholder for Recent Activity or Other Widgets */}
            <div className="bg-neutral-900 rounded-xl border border-neutral-800 p-6">
                <h2 className="text-xl font-semibold text-white mb-4">Recent Activity</h2>
                <p className="text-neutral-400">Placeholder for recent appointment bookings, new patient registrations, or support requests...</p>
                {/* Add components here later */}
            </div>
        </div>
    )
}

export default AdminDashboardPage
