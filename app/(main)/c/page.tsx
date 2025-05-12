import { createClient } from '@/utils/supabase/server';
import React from 'react'
import PaymentPage from '@/components/payement_comp';
import ChatBotClient from './chatclient';

type Props = {}

const chatBotPage = async (props: Props) => {
    const supabase = await createClient();
    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {

        return <div>Please sign in to access chatbot.</div>;
    }

    const { data: profile, error: profileError } = await supabase
        .from("profile")
        .select("resident, aiDetect")
        .eq("id", user.id)
        .single();

    console.log("Profile data for AI detect:", profile);
    console.log("Profile error for AI detect:", profileError);

    if (profileError || !profile) {
        return <div>Error fetching profile data. Please try again later.</div>;
    }

    if (profile.resident || profile.aiDetect) {
        return (
            <ChatBotClient />
        );
    } else {
        return (

            <PaymentPage />



        );
    }
}

export default chatBotPage