// app/admin/approve-users/page.tsx
'use client';

import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { createClient } from '@/lib/supabase/client';

import { Building, CheckCircle, Globe, Search, User, XCircle } from 'lucide-react';

// app/admin/approve-users/page.tsx

// app/admin/approve-users/page.tsx

// app/admin/approve-users/page.tsx

export default function AdminApproveUsers() {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        fetchPendingUsers();
    }, []);

    const fetchPendingUsers = async () => {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('status', 'pending')
            .order('created_at', { ascending: true });

        if (error) {
            console.error('Error fetching users:', error);
        } else {
            setUsers(data || []);
        }
        setLoading(false);
    };

    const updateUserStatus = async (userId: string, newStatus: 'active' | 'rejected') => {
        const { error } = await supabase.from('profiles').update({ status: newStatus }).eq('id', userId);

        if (error) {
            alert('Error updating user: ' + error.message);
        } else {
            // Remove from list
            setUsers(users.filter((user) => user.id !== userId));
            alert(`User ${newStatus === 'active' ? 'approved' : 'rejected'} successfully!`);
        }
    };

    if (loading) {
        return (
            <div className='flex min-h-screen items-center justify-center'>
                <div className='text-center'>
                    <div className='mx-auto h-8 w-8 animate-spin rounded-full border-b-2 border-emerald-600'></div>
                    <p className='mt-4 text-emerald-700'>Loading pending users...</p>
                </div>
            </div>
        );
    }

    return (
        <div className='min-h-screen bg-linear-to-br from-slate-50 to-white p-6'>
            <div className='mx-auto max-w-6xl'>
                <h1 className='mb-2 text-3xl font-bold text-slate-900'>Admin - User Approvals</h1>
                <p className='mb-8 text-slate-600'>Review and approve user registration requests</p>

                {users.length === 0 ? (
                    <div className='py-12 text-center'>
                        <CheckCircle className='mx-auto mb-4 h-12 w-12 text-emerald-500' />
                        <h3 className='mb-2 text-xl font-semibold text-slate-900'>No pending approvals</h3>
                        <p className='text-slate-600'>All users have been reviewed.</p>
                    </div>
                ) : (
                    <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
                        {users.map((user) => (
                            <div key={user.id} className='rounded-xl border border-slate-200 bg-white p-6 shadow-sm'>
                                <div className='mb-4 flex items-start justify-between'>
                                    <div className='flex items-center space-x-3'>
                                        <div
                                            className={`rounded-lg p-3 ${
                                                user.role === 'exporter' ? 'bg-emerald-100' : 'bg-blue-100'
                                            }`}>
                                            {user.role === 'exporter' ? (
                                                <Building className='h-6 w-6 text-emerald-600' />
                                            ) : (
                                                <Globe className='h-6 w-6 text-blue-600' />
                                            )}
                                        </div>
                                        <div>
                                            <h3 className='font-bold text-slate-900'>{user.company_name}</h3>
                                            <p className='text-sm text-slate-600 capitalize'>{user.role}</p>
                                        </div>
                                    </div>
                                    <span className='rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-700'>
                                        Pending
                                    </span>
                                </div>

                                <div className='mb-6 space-y-3'>
                                    <div className='flex items-center text-sm'>
                                        <User className='mr-2 h-4 w-4 text-slate-400' />
                                        <span className='text-slate-700'>{user.contact_person}</span>
                                    </div>
                                    <div className='flex items-center text-sm'>
                                        <Search className='mr-2 h-4 w-4 text-slate-400' />
                                        <span className='text-slate-700'>{user.country}</span>
                                    </div>
                                    <div className='text-sm text-slate-600'>
                                        Registered: {new Date(user.created_at).toLocaleDateString()}
                                    </div>
                                </div>

                                <div className='flex space-x-3'>
                                    <Button
                                        onClick={() => updateUserStatus(user.id, 'active')}
                                        className='flex-1 bg-emerald-600 hover:bg-emerald-700'>
                                        <CheckCircle className='mr-2 h-4 w-4' />
                                        Approve
                                    </Button>
                                    <Button
                                        onClick={() => updateUserStatus(user.id, 'rejected')}
                                        variant='outline'
                                        className='flex-1 border-red-300 text-red-700 hover:bg-red-50'>
                                        <XCircle className='mr-2 h-4 w-4' />
                                        Reject
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
