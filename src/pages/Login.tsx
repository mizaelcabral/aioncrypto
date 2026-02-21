import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Wallet } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
        } else {
            navigate('/dashboard');
        }
        setLoading(false);
    };

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
                    <h1 className="text-3xl font-bold">Welcome Back</h1>
                    <p className="text-text-secondary mt-2">Sign in to your Aion Crypto wallet</p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm p-4 rounded-xl mb-6 text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-6">
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
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                <p className="text-center text-text-secondary mt-8">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-white hover:text-primary-purple font-medium transition-colors">
                        Create Wallet
                    </Link>
                </p>
            </div>
        </div>
    );
}
