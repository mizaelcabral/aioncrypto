import { NavLink } from 'react-router-dom';
import { Shield, Users, Settings, LogOut, LayoutDashboard } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function AdminSidebar() {
    const menuItems = [
        { icon: <LayoutDashboard size={20} />, path: '/admin', label: 'Overview' },
        { icon: <Users size={20} />, path: '/admin/users', label: 'Users' },
        { icon: <Settings size={20} />, path: '/admin/settings', label: 'System' },
    ];

    const handleLogout = async () => {
        await supabase.auth.signOut();
        window.location.href = '/login';
    };

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 bg-[#131128] border-r border-white/5 flex flex-col py-6 z-40 shadow-2xl">
            <div className="px-6 mb-12 flex items-center gap-3">
                <div className="bg-red-500/20 p-2.5 rounded-xl border border-red-500/30">
                    <Shield size={24} className="text-red-500" />
                </div>
                <div>
                    <h2 className="text-white font-bold leading-tight">Super Admin</h2>
                    <span className="text-xs text-text-secondary font-mono tracking-wider uppercase">Console</span>
                </div>
            </div>

            <nav className="flex-1 w-full flex flex-col gap-2 px-4">
                {menuItems.map((item, index) => (
                    <NavLink
                        key={index}
                        to={item.path}
                        end={item.path === '/admin'}
                        className={({ isActive }) =>
                            `flex items-center gap-3 p-3 rounded-xl transition-all ${isActive
                                ? 'bg-red-500/10 text-red-500 font-medium'
                                : 'text-text-secondary hover:text-white hover:bg-white/5'
                            }`
                        }
                    >
                        {item.icon}
                        <span>{item.label}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="mt-auto px-4 pb-4">
                <button
                    onClick={handleLogout}
                    className="w-full p-3 rounded-xl text-text-secondary hover:text-red-400 hover:bg-red-500/10 transition-all flex items-center gap-3"
                >
                    <LogOut size={20} />
                    <span>Sign Out</span>
                </button>
            </div>
        </aside>
    );
}
