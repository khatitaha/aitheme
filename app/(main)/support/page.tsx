
import React from 'react'
import SupportPageClient from './support_client'
import { createClient } from '@/utils/supabase/server';

type Props = {}

const SupportPage = async (props: Props) => {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    const { data: tickets } = user
        ? await supabase.from("tickets").select().eq('user_id', user.id)
        : { data: [] };
    console.log(tickets);
    return (
        <SupportPageClient tickets={tickets} />
    )
}

export default SupportPage