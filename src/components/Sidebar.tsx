import { NavLink } from 'react-router-dom';
import { LayoutDashboard, PieChart, ArrowRightLeft, History, Settings, HelpCircle, Wallet } from 'lucide-react';

export default function Sidebar() {
    const menuItems = [
        { icon: <LayoutDashboard size={20} />, path: '/dashboard', label: 'Dashboard' },
        { icon: <PieChart size={20} />, path: '/portfolio', label: 'Portfolio' },
        { icon: <ArrowRightLeft size={20} />, path: '/buy', label: 'Trade' },
        { icon: <History size={20} />, path: '/history', label: 'History' },
        { icon: <Settings size={20} />, path: '/settings', label: 'Settings' },
    ];

    return (
        <aside className="hidden md:flex fixed left-0 top-0 h-screen w-20 bg-bg-deep border-r border-white/5 flex-col items-center py-6 z-40">
            <div className="mb-12">
                <div className="bg-primary-purple p-2.5 rounded-xl">
                    <Wallet size={24} className="text-white" />
                </div>
            </div>

            <nav className="flex-1 w-full flex flex-col items-center gap-6">
                {menuItems.map((item, index) => (
                    <NavLink
                        key={index}
                        to={item.path}
                        className={({ isActive }) =>
                            `p-3 rounded-2xl transition-all ${isActive
                                ? 'bg-primary-purple/20 text-primary-purple relative'
                                : 'text-text-secondary hover:text-white hover:bg-white/5'
                            }`
                        }
                    >
                        {({ isActive }) => (
                            <>
                                {isActive && (
                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary-purple rounded-r-md" />
                                )}
                                {item.icon}
                                {/* Tooltip */}
                                <span className="absolute left-14 bg-bg-surface px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white/10 pointer-events-none">
                                    {item.label}
                                </span>
                            </>
                        )}
                    </NavLink>
                ))}
            </nav>

            <div className="mt-auto pb-4">
                <NavLink to="/support" className="p-3 rounded-2xl text-text-secondary hover:text-white hover:bg-white/5 transition-all flex group relative">
                    <HelpCircle size={20} />
                    {/* Tooltip */}
                    <span className="absolute left-14 bg-bg-surface px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white/10 pointer-events-none">
                        Support
                    </span>
                </NavLink>
            </div>
        </aside>
    );
}
