import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Users, Activity, ShieldCheck } from 'lucide-react';

interface Profile {
    id: string;
    full_name: string;
    role: string;
    created_at: string;
}

export default function AdminDashboard() {
    const [users, setUsers] = useState<Profile[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchUsers() {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .order('created_at', { ascending: false });

            if (data && !error) {
                setUsers(data);
            }
            setLoading(false);
        }

        fetchUsers();
    }, []);

    const totalAdmins = users.filter(u => u.role === 'admin').length;

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <div className="mb-10">
                <h1 className="text-3xl font-bold text-white mb-2">Platform Overview</h1>
                <p className="text-text-secondary">Manage users and monitor Aion Crypto activity.</p>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="bg-bg-surface p-6 rounded-card border border-white/5">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-text-secondary font-medium">Total Users</h3>
                        <Users className="text-primary-purple w-5 h-5" />
                    </div>
                    <p className="text-3xl font-bold">{users.length}</p>
                </div>
                <div className="bg-bg-surface p-6 rounded-card border border-white/5">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-text-secondary font-medium">Active Admins</h3>
                        <ShieldCheck className="text-red-500 w-5 h-5" />
                    </div>
                    <p className="text-3xl font-bold">{totalAdmins}</p>
                </div>
                <div className="bg-bg-surface p-6 rounded-card border border-white/5">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-text-secondary font-medium">Transactions Today</h3>
                        <Activity className="text-green-500 w-5 h-5" />
                    </div>
                    <p className="text-3xl font-bold">Mocked Data</p>
                </div>
            </div>

            {/* Users Table */}
            <div className="bg-bg-surface rounded-card border border-white/5 overflow-hidden">
                <div className="p-6 border-b border-white/5">
                    <h2 className="text-xl font-bold">Recent Registrations</h2>
                </div>

                {loading ? (
                    <div className="p-8 text-center text-text-secondary">Loading users...</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-white/5">
                                <tr>
                                    <th className="p-4 text-xs font-medium text-text-secondary uppercase tracking-wider">Name</th>
                                    <th className="p-4 text-xs font-medium text-text-secondary uppercase tracking-wider">ID</th>
                                    <th className="p-4 text-xs font-medium text-text-secondary uppercase tracking-wider">Role</th>
                                    <th className="p-4 text-xs font-medium text-text-secondary uppercase tracking-wider">Joined</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {users.map(user => (
                                    <tr key={user.id} className="hover:bg-white/[0.02] transition-colors">
                                        <td className="p-4 font-medium">{user.full_name || 'Anonymous'}</td>
                                        <td className="p-4 text-xs text-text-secondary font-mono">{user.id}</td>
                                        <td className="p-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.role === 'admin' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-primary-purple/20 text-primary-purple border border-primary-purple/30'
                                                }`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="p-4 text-sm text-text-secondary">
                                            {new Date(user.created_at).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))}
                                {users.length === 0 && (
                                    <tr>
                                        <td colSpan={4} className="p-8 text-center text-text-secondary">No users found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
