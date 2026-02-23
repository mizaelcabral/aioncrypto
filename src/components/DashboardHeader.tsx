import { useState, useRef, useEffect } from 'react';
import { Search, Bell, User, LogOut, Settings as SettingsIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

interface DashboardHeaderProps {
    title: string;
    className?: string;
}

export default function DashboardHeader({ title, className = 'mb-8' }: DashboardHeaderProps) {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isNotifOpen, setIsNotifOpen] = useState(false);
    const [fullName, setFullName] = useState<string>('');
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
    const profileRef = useRef<HTMLDivElement>(null);
    const notifRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const { signOut, user } = useAuth();

    // Close dropdowns on outside click
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
                setIsProfileOpen(false);
            }
            if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
                setIsNotifOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Fetch user profile data
    useEffect(() => {
        if (user) {
            const fetchProfile = async () => {
                const { data } = await supabase
                    .from('profiles')
                    .select('full_name, avatar_url')
                    .eq('id', user.id)
                    .single();

                if (data) {
                    setFullName(data.full_name || '');
                    setAvatarUrl(data.avatar_url || null);
                }
            };
            fetchProfile();

            // Realtime subscription to profile changes
            const channel = supabase.channel('custom-all-channel')
                .on(
                    'postgres_changes',
                    { event: 'UPDATE', schema: 'public', table: 'profiles', filter: `id=eq.${user.id}` },
                    (payload) => {
                        const newProfile = payload.new as { full_name?: string; avatar_url?: string };
                        setFullName(newProfile.full_name || '');
                        setAvatarUrl(newProfile.avatar_url || null);
                    }
                )
                .subscribe();

            return () => {
                supabase.removeChannel(channel);
            };
        }
    }, [user]);

    const handleLogout = async () => {
        await signOut();
        navigate('/login');
    };

    const getInitials = (nameStr: string) => {
        return nameStr ? nameStr.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'US';
    };

    const displayName = fullName || user?.email?.split('@')[0] || 'User';

    return (
        <header className={`flex items-center justify-between py-2 md:py-4 ${className}`}>
            <div className="flex items-center gap-4 md:gap-6">
                <h1 className="text-xl md:text-3xl font-bold truncate">{title}</h1>
                <div className="relative hidden lg:block">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
                    <input
                        type="text"
                        placeholder="Search"
                        className="bg-[rgba(40,36,84,0.4)] rounded-full py-2 pl-12 pr-6 text-sm outline-none border border-white/5 focus:border-primary-purple/50 focus:ring-1 focus:ring-primary-purple transition-all w-64 text-white"
                    />
                </div>
            </div>

            <div className="flex items-center gap-6">
                {/* Notifications */}
                <div className="relative" ref={notifRef}>
                    <button
                        onClick={() => { setIsNotifOpen(!isNotifOpen); setIsProfileOpen(false); }}
                        className="relative p-2 rounded-full hover:bg-white/5 transition-colors"
                    >
                        <Bell className="w-6 h-6 text-text-secondary hover:text-white transition-colors" />
                        <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-primary-purple rounded-full ring-2 ring-bg-deep" />
                    </button>

                    {isNotifOpen && (
                        <div className="absolute right-0 mt-3 w-80 bg-[#131128] rounded-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] py-2 z-50">
                            <div className="px-4 py-3 border-b border-white/5 flex justify-between items-center">
                                <h3 className="font-bold text-white leading-none">Notificações</h3>
                                <span className="text-xs bg-primary-purple/20 text-primary-purple px-2 py-0.5 rounded-full font-bold">2 Novas</span>
                            </div>
                            <div className="max-h-80 overflow-y-auto">
                                <div className="px-4 py-3 hover:bg-white/5 cursor-pointer border-b border-white/5 last:border-0 transition-colors relative">
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary-purple rounded-r-full" />
                                    <p className="text-sm text-white mb-1"><span className="text-green-500 font-semibold">Deposit Successful</span></p>
                                    <p className="text-xs text-text-secondary leading-relaxed">Your deposit of 0.5 BTC has been processed and credited to your wallet.</p>
                                    <p className="text-[10px] uppercase tracking-wider text-text-secondary mt-2">10 min ago</p>
                                </div>
                                <div className="px-4 py-3 hover:bg-white/5 cursor-pointer border-b border-white/5 last:border-0 transition-colors relative">
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary-purple rounded-r-full" />
                                    <p className="text-sm text-white mb-1"><span className="text-red-400 font-semibold">Security Alert</span></p>
                                    <p className="text-xs text-text-secondary leading-relaxed">New login from Chrome on Windows device detected.</p>
                                    <p className="text-[10px] uppercase tracking-wider text-text-secondary mt-2">2 hours ago</p>
                                </div>
                            </div>
                            <div className="px-4 pt-2 pb-1 border-t border-white/5 text-center">
                                <button className="text-sm text-primary-purple hover:text-white transition-colors font-medium">Ver todas as notificações</button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Profile */}
                <div className="relative" ref={profileRef}>
                    <div
                        onClick={() => { setIsProfileOpen(!isProfileOpen); setIsNotifOpen(false); }}
                        className="flex items-center gap-2 md:gap-3 bg-[rgba(40,36,84,0.4)] py-1.5 px-2 rounded-full cursor-pointer hover:bg-[rgba(40,36,84,0.6)] transition-all border border-white/5 hover:border-primary-purple/30 group"
                    >
                        <span className="hidden sm:block text-sm font-medium pl-3 pr-1 text-text-secondary group-hover:text-white transition-colors capitalize truncate max-w-[120px]">{displayName}</span>
                        {avatarUrl ? (
                            <img
                                src={avatarUrl}
                                alt="Avatar"
                                className="w-8 h-8 rounded-full object-cover shadow-[0_0_10px_rgba(102,57,228,0.5)] shrink-0"
                            />
                        ) : (
                            <div className="w-8 h-8 rounded-full bg-primary-purple flex items-center justify-center font-bold text-sm text-white shadow-[0_0_10px_rgba(102,57,228,0.5)] shrink-0">
                                {getInitials(displayName)}
                            </div>
                        )}
                    </div>

                    {isProfileOpen && (
                        <div className="absolute right-0 mt-3 w-56 bg-[#131128] rounded-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] py-2 z-50 overflow-hidden">
                            <div className="px-4 py-3 border-b border-white/5 mb-1 bg-white/[0.02]">
                                <p className="text-sm font-bold text-white capitalize truncate">{displayName}</p>
                                <p className="text-xs text-text-secondary truncate">{user?.email}</p>
                            </div>

                            <button
                                onClick={() => { navigate('/settings'); setIsProfileOpen(false); }}
                                className="w-full text-left px-4 py-2.5 flex items-center gap-3 text-sm text-text-secondary hover:text-white hover:bg-white/5 transition-colors"
                            >
                                <User size={16} /> Meu Perfil
                            </button>
                            <button
                                onClick={() => { navigate('/settings'); setIsProfileOpen(false); }}
                                className="w-full text-left px-4 py-2.5 flex items-center gap-3 text-sm text-text-secondary hover:text-white hover:bg-white/5 transition-colors"
                            >
                                <SettingsIcon size={16} /> Configurações
                            </button>

                            <div className="h-px bg-white/5 my-1" />

                            <button
                                onClick={handleLogout}
                                className="w-full text-left px-4 py-2.5 flex items-center gap-3 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                            >
                                <LogOut size={16} /> Sair da aplicação
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

