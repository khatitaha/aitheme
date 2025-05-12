import { createClient } from '@/utils/supabase/server';
import React from 'react'
import ScansPage from './scans-client';

type Props = {}

const SacnsPage = async (props: Props) => {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    const { data: scans } = user
        ? await supabase.from("scans").select().eq('user_id', user.id)
        : { data: [] };
    return (
        <div><ScansPage scans={scans!} /></div>
    )
}

export default SacnsPage