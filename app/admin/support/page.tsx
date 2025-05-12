import { createClient } from '@/utils/supabase/server';
import React from 'react'
import Support_client from './support_client';

type Props = {}

const SupportPage = async (props: Props) => {

    const supabase = await createClient();


    const { data: tickets } = await supabase.from("tickets")
        .select()
        ;



    return (
        <Support_client tickets={tickets!} />
    )
}

export default SupportPage