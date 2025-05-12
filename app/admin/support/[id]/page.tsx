import TicketDetailPage from '@/app/(main)/ticket/[id]/ticket-client';
import { createClient } from '@/utils/supabase/server';
import React from 'react'

type supportPageadmin = {
    params: {
        id: string;
    };
};
const supportPageadmin = async ({ params }: supportPageadmin) => {
    const { id } = await params;
    const ticketId = id;
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    const { data: chats } = user
        ? await supabase.from("chats").select().eq('ticket_id', ticketId)
        : { data: [] };
    console.log("this is the chats ", chats);
    const { data: ticket } = user
        ? await supabase.from("tickets").select().eq('id', ticketId)
        : { data: [] };
    console.log("this is the ticket itself ", ticket);

    return (
        <TicketDetailPage chats={chats} ticket={ticket![0]} />
    )
}

export default supportPageadmin