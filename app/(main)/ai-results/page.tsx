import { createClient } from '@/utils/supabase/server';
import React from 'react'
import AiResultsPage from './ai_result_client';

type Props = {}

const AIresultPage = async (props: Props) => {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();
    const { data: aiResults } = await supabase.from("airesults")
        .select("*")
        .eq("user_id", user?.id).order("created_at", { ascending: false });
    ;

    return (
        <div><AiResultsPage aiResults={aiResults!} /></div>
    )
}

export default AIresultPage