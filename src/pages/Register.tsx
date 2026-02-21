import { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { Wallet } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

export default function Register() {
    const { user } = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // Using Supabase Auth
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: name
                }
            }
        });

        if (error) {
            setError(error.message);
        } else if (data.user) {
            setSuccess(true);
            setTimeout(() => {
                navigate('/dashboard');
            }, 2000);
        }
        setLoading(false);
    };

    if (user) {
        return <Navigate to="/dashboard" replace />;
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-6 relative">
            {/* Abstract Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-purple/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="bg-bg-surface w-full max-w-md p-10 rounded-card border border-white/5 shadow-2xl relative z-10 glass-card">
                <div className="flex flex-col items-center mb-8">
                    <Link to="/" className="flex items-center gap-2 mb-8">
                        <div className="bg-primary-purple p-3 rounded-2xl">
                            <Wallet className="w-8 h-8 text-white" />
                        </div>
                    </Link>
                    <h1 className="text-3xl font-bold">Create Wallet</h1>
                    <p className="text-text-secondary mt-2">Join Aion Crypto today</p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm p-4 rounded-xl mb-6 text-center">
                        {error}
                    </div>
                )}

                {success ? (
                    <div className="bg-green-500/10 border border-green-500/50 text-green-500 text-sm p-4 rounded-xl mb-6 text-center">
                        Wallet created successfully! Redirecting to Dashboard...
                    </div>
                ) : (
                    <form onSubmit={handleRegister} className="space-y-6">
                        <div>
                            <label className="text-sm text-text-secondary font-medium mb-2 block tracking-wide">
                                FULL NAME
                            </label>
                            <input
                                type="text"
                                required
                                className="w-full bg-[#131128] border border-white/5 rounded-xl p-4 outline-none focus:border-primary-purple/50 focus:ring-1 focus:ring-primary-purple text-white transition-all"
                                placeholder="John Doe"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="text-sm text-text-secondary font-medium mb-2 block tracking-wide">
                                EMAIL ADDRESS
                            </label>
                            <input
                                type="email"
                                required
                                className="w-full bg-[#131128] border border-white/5 rounded-xl p-4 outline-none focus:border-primary-purple/50 focus:ring-1 focus:ring-primary-purple text-white transition-all"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="text-sm text-text-secondary font-medium mb-2 block tracking-wide">
                                PASSWORD
                            </label>
                            <input
                                type="password"
                                required
                                className="w-full bg-[#131128] border border-white/5 rounded-xl p-4 outline-none focus:border-primary-purple/50 focus:ring-1 focus:ring-primary-purple text-white transition-all"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-primary-purple hover:bg-white hover:text-bg-deep text-white font-bold py-4 rounded-xl transition-all shadow-[0_4px_14px_0_rgba(102,57,228,0.39)] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Creating Wallet...' : 'Create Wallet'}
                        </button>
                    </form>
                )}

                <p className="text-center text-text-secondary mt-8">
                    Already have an account?{' '}
                    <Link to="/login" className="text-white hover:text-primary-purple font-medium transition-colors">
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
}
