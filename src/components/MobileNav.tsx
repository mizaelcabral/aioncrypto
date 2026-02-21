import { NavLink } from 'react-router-dom';
import { LayoutDashboard, PieChart, ArrowRightLeft, History, Settings } from 'lucide-react';

export default function MobileNav() {
    const menuItems = [
        { icon: <LayoutDashboard size={20} />, path: '/dashboard', label: 'Home' },
        { icon: <PieChart size={20} />, path: '/portfolio', label: 'Portf.' },
        { icon: <ArrowRightLeft size={20} />, path: '/buy', label: 'Trade' },
        { icon: <History size={20} />, path: '/history', label: 'Hist.' },
        { icon: <Settings size={20} />, path: '/settings', label: 'Config' },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-[#131128]/90 backdrop-blur-md border-t border-white/5 md:hidden flex items-center justify-around p-3 z-50 pb-safe">
            {menuItems.map((item, index) => (
                <NavLink
                    key={index}
                    to={item.path}
                    className={({ isActive }) =>
                        `flex flex-col items-center gap-1 transition-colors ${isActive
                            ? 'text-primary-purple'
                            : 'text-text-secondary hover:text-white'
                        }`
                    }
                >
                    {item.icon}
                    <span className="text-[10px] font-medium">{item.label}</span>
                </NavLink>
            ))}
        </nav>
    );
}
