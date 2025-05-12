"use client"

import React, { useState } from 'react'
import { User, Mail, Phone, Lock, Edit2, Save, Home, Brain, ArrowLeft } from 'lucide-react'
import { signOutAction } from '@/app/actions';
import Link from 'next/link';


type Props = {
    profile: {
        id: string,
        email: string,
        name: string,
        role: string,
        patient_id: string,
        resident: boolean,
        aiDetect: boolean;
    }
}


const Profile_client = (props: Props) => {
    // Mock user data - replace with actual user data
    const { email, name, role, resident, aiDetect } = props.profile

    //////:/ countinue maybe implement role

    const [isEditing, setIsEditing] = useState(false);
    const [profileData, setProfileData] = useState({
        name: name,
        email: email,
        phone: '+1 (555) 123-4567',
        isResident: resident,
        hasAiScanAccess: aiDetect,
        role: role
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProfileData(prev => ({ ...prev, [name]: value }));
    };

    const toggleEdit = () => {
        setIsEditing(!isEditing);
        // Here you might want to reset changes if cancelling, or fetch fresh data
    };

    const handleSave = () => {
        console.log('Saving profile data:', profileData);
        // Add logic here to save the data to your backend
        setIsEditing(false);
        alert('Profile updated successfully!'); // Replace with better feedback
    };

    return (
        <div className="max-w-6xl mx-auto flex flex-col py-8">
            <Link href={'/home'}><ArrowLeft /></Link>
            <form>

                {/* Header */}
                <div className="flex justify-between items-center mb-8 mt-10">
                    <div>
                        <h1 className="text-3xl font-bold text-white">Profile & Settings</h1>
                        <p className="text-neutral-400">Manage your personal information and account settings</p>
                    </div>
                    {isEditing ? (
                        <button
                            type="button"
                            onClick={handleSave}
                            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                        >
                            <Save className="w-5 h-5" />
                            <span>Save Changes</span>
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={toggleEdit}
                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                        >
                            <Edit2 className="w-5 h-5" />
                            <span>Edit Profile</span>
                        </button>
                    )}
                </div>

                {/* Profile Sections */}
                <div className="flex flex-col gap-8">

                    {/* Personal Information Card */}
                    <div className="bg-neutral-900 rounded-xl border border-neutral-800 p-6">
                        <h2 className="text-xl font-semibold text-white mb-6">Personal Information</h2>
                        <div className="space-y-4">
                            {/* Name */}
                            <div className="flex items-start gap-4">
                                <User className="w-5 h-5 text-neutral-400 mt-1" />
                                <div className="flex-1 flex flex-col">
                                    <label className="text-sm text-neutral-400 mb-1">Full Name</label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="name"
                                            value={profileData.name}
                                            onChange={handleInputChange}
                                            className="w-full bg-neutral-800 border border-neutral-700 rounded px-3 py-2 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    ) : (
                                        <p className="text-white px-3 py-2">{profileData.name}</p>
                                    )}
                                </div>
                            </div>

                            {/* Email */}
                            <div className="flex items-start gap-4">
                                <Mail className="w-5 h-5 text-neutral-400 mt-1" />
                                <div className="flex-1 flex flex-col">
                                    <label className="text-sm text-neutral-400 mb-1">Email Address</label>
                                    {isEditing ? (
                                        <input
                                            type="email"
                                            name="email"
                                            value={profileData.email}
                                            onChange={handleInputChange}
                                            className="w-full bg-neutral-800 border border-neutral-700 rounded px-3 py-2 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    ) : (
                                        <p className="text-white px-3 py-2">{profileData.email}</p>
                                    )}
                                </div>
                            </div>

                            {/* Phone */}
                            <div className="flex items-start gap-4">
                                <Phone className="w-5 h-5 text-neutral-400 mt-1" />
                                <div className="flex-1 flex flex-col">
                                    <label className="text-sm text-neutral-400 mb-1">Phone Number</label>
                                    {isEditing ? (
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={profileData.phone}
                                            onChange={handleInputChange}
                                            className="w-full bg-neutral-800 border border-neutral-700 rounded px-3 py-2 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    ) : (
                                        <p className="text-white px-3 py-2">{profileData.phone}</p>
                                    )}
                                </div>
                            </div>

                            {/* Resident Status */}
                            <div className="flex items-start gap-4">
                                <Home className="w-5 h-5 text-neutral-400 mt-1" />
                                <div className="flex-1 flex flex-col">
                                    <label className="text-sm text-neutral-400 mb-1">Resident Status</label>
                                    <p className="text-white px-3 py-2">{profileData.isResident ? 'Yes' : 'No'}</p>
                                </div>
                            </div>

                            {/* AI Scan Access */}
                            <div className="flex items-start gap-4">
                                <Brain className="w-5 h-5 text-neutral-400 mt-1" />
                                <div className="flex-1 flex flex-col">
                                    <label className="text-sm text-neutral-400 mb-1">AI Scan Access</label>
                                    <p className="text-white px-3 py-2">{profileData.hasAiScanAccess ? 'Yes' : 'No'}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <User className="w-5 h-5 text-neutral-400 mt-1" /> {/* Using User icon for role */}
                                <div className="flex-1 flex flex-col">
                                    <label className="text-sm text-neutral-400 mb-1">Role</label> {/* Label changed to Role */}
                                    {/* Display Admin if role is 'admin', otherwise display User */}
                                    <p className="text-white px-3 py-2">{profileData.role === 'admin' ? 'Admin' : 'User'}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Account Settings Card */}
                    <div className="bg-neutral-900 rounded-xl border border-neutral-800 p-6">
                        <h2 className="text-xl font-semibold text-white mb-6">Account Settings</h2>
                        <div className="space-y-4">
                            {/* Change Password */}
                            <div className="flex items-center justify-between p-4 bg-neutral-800 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <Lock className="w-5 h-5 text-neutral-400" />
                                    <span className="text-white">Change Password</span>
                                </div>
                                <button className="text-blue-500 hover:text-blue-400 text-sm">Change</button>
                            </div>

                            {/* Notification Settings (Example) */}
                            <div className="flex items-center justify-between p-4 bg-neutral-800 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <Mail className="w-5 h-5 text-neutral-400" />
                                    <span className="text-white">Notification Preferences</span>
                                </div>
                                <button className="text-blue-500 hover:text-blue-400 text-sm">Manage</button>
                            </div>

                            {/* Delete Account (Example) */}
                            <div className="flex items-center justify-between p-4 bg-red-900/30 border border-red-500/50 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <User className="w-5 h-5 text-red-500" />
                                    <span className="text-red-400">logout</span>
                                </div>


                                <button formAction={signOutAction} className="text-red-500 hover:text-red-400 text-sm font-medium">logout</button>


                            </div>
                        </div>
                    </div>
                </div>

            </form>

        </div>
    )
}

export default Profile_client