"use client"

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
    Calendar,
    FileText,
    Brain,
    ClipboardList,
    User,
    Home,
    Eye,
    LifeBuoy,
    Bot
} from 'lucide-react'

const sidebarItems = [
    { name: 'Dashboard', href: '/home', icon: Home },
    { name: 'Appointments', href: '/appointments', icon: Calendar },
    { name: 'Scans', href: '/scans', icon: FileText },
    { name: 'AI Detect', href: '/ai-detect', icon: Brain },
    { name: 'AI Results', href: '/ai-results', icon: ClipboardList },
    { name: 'support', href: '/support', icon: LifeBuoy },
    { name: 'chat Bot', href: '/c', icon: Bot },


]

const DashboardLayout = ({ children, profile }: { children: React.ReactNode, profile: any }) => {
    const pathname = usePathname()
    const userProfile = profile && profile.length > 0 ? profile[0] : null;
    let displayedSidebarItems = sidebarItems; // Start with the full list

    if (userProfile) {
        if (!userProfile.resident) {
            if (!userProfile.aiDetect) {
                displayedSidebarItems = displayedSidebarItems.filter(item => item.name !== 'AI Results');
                displayedSidebarItems = displayedSidebarItems.filter(item => item.name !== 'chat Bot');

            }
            // displayedSidebarItems = displayedSidebarItems.filter(item => item.name !== 'AI Results');
        }
        // If userProfile.resident is true, displayedSidebarItems remains the full list (allSidebarItems)
    } else {
        // Optional: Default to a minimal set if profile data is unexpectedly missing
        // (The wrapper should handle redirects, so this case might not be hit)
        displayedSidebarItems = [
            { name: 'Dashboard', href: '/home', icon: Home },
            { name: 'Appointments', href: '/appointments', icon: Calendar },
            { name: 'Scans', href: '/scans', icon: FileText },
        ];
    }

    return (
        <div className="flex h-screen bg-neutral-950 w-full">
            {/* <h1>{profile}</h1> */}

            {/* Sidebar */}
            <div className="w-64 bg-neutral-900 border-r border-neutral-800 flex flex-col">
                {/* Logo */}
                <div className="p-6 border-b border-neutral-800">
                    <Link href="/" className="text-xl font-bold text-white flex items-center gap-2">
                        <Eye className="w-6 h-6" />
                        <span>XVision Lab</span>
                    </Link>
                </div>

                {/* Navigation */}
                <div className="flex-1 flex flex-col justify-center">
                    <nav className="space-y-2 px-4">
                        {displayedSidebarItems.map((item) => {
                            const isActive = pathname === item.href
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

                {/* User Section */}
                <Link href={'/profile'}>
                    <div className="p-4 border-t border-neutral-800">
                        <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer">
                            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                                <User className="w-4 h-4 text-white" />
                            </div>

                            {userProfile && (
                                <div>
                                    <p className="text-sm font-medium text-white">{userProfile.name}!</p>
                                    <p className="text-xs text-neutral-400">{userProfile.email}</p>
                                </div>
                            )}



                        </div>
                    </div></Link>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-auto">
                <div className="p-6">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default DashboardLayout 