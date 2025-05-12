import AdminLayout from '@/components/admin-layout';
import React from 'react';

export default function AdminRootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AdminLayout>
            {children}

        </AdminLayout>
    );
}
