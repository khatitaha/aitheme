import React from 'react'
import AdminAppointmentsPage from './appointments_client'
import { createClient } from '@/utils/supabase/server';

type Props = {}

const AppointmentsPage = async (props: Props) => {
    const supabase = await createClient();

    const { data: appointments } = await supabase.from("appointments")
        .select()
        .order("created_at", { ascending: false });


    ;
    return (
        <AdminAppointmentsPage appointments={appointments!} />
    )
}

export default AppointmentsPage