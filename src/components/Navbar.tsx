import { Link, useLocation } from 'react-router-dom';
import { Wallet } from 'lucide-react';

export default function Navbar() {
    const location = useLocation();

    return (
        <nav className="fixed w-full top-0 z-50 bg-bg-deep/80 backdrop-blur-md border-b border-white/5">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2">
                    <div className="bg-primary-purple p-2 rounded-xl">
                        <Wallet className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xl font-bold tracking-tight">aioncrypto</span>
                </Link>

                <div className="hidden md:flex items-center gap-8 text-text-secondary font-medium">
                    <Link to="/" className={`hover:text-white transition-colors ${location.pathname === '/' ? 'text-white' : ''}`}>Home</Link>
                    <a href="#" className="hover:text-white transition-colors">About</a>
                    <a href="#" className="hover:text-white transition-colors">Features</a>
                    <a href="#" className="hover:text-white transition-colors">Contact</a>
                </div>

                <div className="flex items-center gap-4">
                    <Link to="/login" className="text-white font-medium hover:text-primary-purple transition-colors">
                        Login
                    </Link>
                    <Link to="/register" className="bg-primary-purple hover:bg-primary-purple/90 text-white px-6 py-3 rounded-button font-semibold transition-all shadow-[0_4px_14px_0_rgba(102,57,228,0.39)] hover:shadow-[0_6px_20px_rgba(102,57,228,0.23)] hover:-translate-y-0.5">
                        Create Wallet
                    </Link>
                </div>
            </div>
        </nav>
    );
}
