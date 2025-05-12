// path: components/admin-layout.tsx
"use client"

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
    LayoutDashboard, // Icon for Dashboard
    Users,           // Icon for Patients
    CalendarCheck,   // Icon for Appointments
    MessageSquare,   // Icon for Support
    Send,            // Icon for Send Scans
    LogOut,          // Icon for Logout
    Eye,              // Logo Icon
    Bot
} from 'lucide-react'

// Define sidebar items for the admin panel
const adminSidebarItems = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Manage Patients', href: '/admin/patients', icon: Users },
    { name: 'Manage Appointments', href: '/admin/appointments', icon: CalendarCheck },
    { name: 'Support Tickets', href: '/admin/support', icon: MessageSquare },
    { name: 'Send Scans', href: '/admin/send-scans', icon: Send },
    { name: 'rag chatbot', href: '/admin/rag', icon: Bot },

]

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname()

    return (
        <div className="flex h-screen bg-neutral-950 w-screen">
            {/* Sidebar - Matched width and structure to DashboardLayout */}
            <div className="w-64 bg-neutral-900 border-r border-neutral-800 flex flex-col">
                {/* Logo */}
                <div className="p-6 border-b border-neutral-800">
                    <Link href="/admin/dashboard" className="text-xl font-bold text-white flex items-center gap-2">
                        <Eye className="w-6 h-6 text-blue-500" />
                        <span>XVision (Admin)</span>
                    </Link>
                </div>

                {/* Navigation - Centered like DashboardLayout */}
                <div className="flex-1 flex flex-col justify-center">
                    <nav className="space-y-2 px-4">
                        {adminSidebarItems.map((item) => {
                            const isActive = pathname.startsWith(item.href) // Keep startsWith for admin sections
                            const Icon = item.icon
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                                        ? 'bg-blue-600 text-white'
                                        : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'
                                        }`}
                                >
                                    <Icon className="w-5 h-5" />
                                    <span>{item.name}</span>
                                </Link>
                            )
                        })}
                    </nav>
                </div>

                {/* Footer Section - Mimics User Section structure but with Logout */}
                <div className="p-4 border-t border-neutral-800">
                    <Link
                        href="/logout" // Adjust as needed
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer text-neutral-400 hover:text-white"
                    >
                        <LogOut className="w-5 h-5" />
                        <span>Logout</span>
                    </Link>
                </div>
            </div>

            {/* Main Content - Matched padding */}
            <div className="flex-1 overflow-auto">
                <div className="p-6">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default AdminLayout