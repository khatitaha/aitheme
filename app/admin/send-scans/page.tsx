import { createClient } from '@/utils/supabase/server';
import React from 'react'
import SendScansPage from './send-scans-client';

type Props = {}

const sendScansPage = async (props: Props) => {
    const supabase = await createClient();
    const { data: profiles } = await supabase.from("profile").select();
    console.log(profiles);
    return (
        <div><SendScansPage patients={profiles!} /></div>
    )
}

export default sendScansPage