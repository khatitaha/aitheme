import React from 'react'
import Profile_client from './profile_client'
import { createClient } from '@/utils/supabase/server';

type Props = {}

const ProfilePage = async (props: Props) => {
    const supabase = await createClient();
    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser();
    const { data: profile, error: profileError } = await supabase
        .from("profile")
        .select("*") // Select only the required fields
        .eq("id", user!.id) // Filter by user ID
        .single(); // Assuming one profile per user

    console.log("Profile data for AI detect:", profile);
    console.log("Profile error for AI detect:", profileError);
    ;
    return (
        <Profile_client profile={profile} />
    )
}

export default ProfilePage