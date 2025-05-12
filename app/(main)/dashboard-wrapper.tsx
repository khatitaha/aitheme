import DashboardLayout from '@/components/dashboard-layout';
import { createClient } from '@/utils/supabase/server';
import { redirect } from "next/navigation";

import React from 'react'


const DashboardWrapper = async ({ children }: { children: React.ReactNode }) => {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/sign-in");
    }

    const { data: profile, error: profileError } = await supabase.from("profile").select("*").eq('id', user.id); // Fix typo and select all columns

    if (profileError) {
        console.error("Error fetching profile:", profileError);
        // Handle error - maybe redirect to an error page or show a message
        // For now, we'll just log and continue, but consider how you want to handle this in production.
    }

    // Optional: Add a check if profile data was actually returned, though .eq('id', user.id) should return at most one record.
    if (!profile || profile.length === 0) {
        console.warn(`No profile found for user ID: ${user.id}`);
        // Handle case where profile doesn't exist for some reason.
        // You might want to redirect or show a different UI.
    }
    console.log(profile)
    return (
        <DashboardLayout profile={profile}>
            {children}
        </DashboardLayout>
    )
}

export default DashboardWrapper