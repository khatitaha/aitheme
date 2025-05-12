import { createClient } from '@/utils/supabase/server';
import React from 'react'
import AiResultsPage from '../ai-results/ai_result_client';
import AiDetectPage from './ai-detect-client';
import PaymentPage from '@/components/payement_comp';

type Props = {}

const Ai_detect = async (props: Props) => {
    const supabase = await createClient();
    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {

        return <div>Please sign in to access AI detection.</div>;
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
            <AiDetectPage />
        );
    } else {
        return (

            <PaymentPage />



        );
    }
}

export default Ai_detect