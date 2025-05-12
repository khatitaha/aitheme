import { createClient } from '@/utils/supabase/server';
import React from 'react'
import AdminPatientsPage from './patient_client';

type Props = {}

const Patient_page = async (props: Props) => {
    const supabase = await createClient();





    const { data: profiles } = await supabase.from("profile")
        .select()
        ;






    return (
        <AdminPatientsPage profiles={profiles!} />
    )
}

export default Patient_page