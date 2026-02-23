import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function UnlimitWidget() {
    const { user } = useAuth();
    const [action, setAction] = useState<'buy' | 'sell'>('buy');
    const [fiatCurrency, setFiatCurrency] = useState('USD');
    const [cryptoCurrency, setCryptoCurrency] = useState('BTC');
    const [fiatAmount, setFiatAmount] = useState('500');
    const [cryptoAmount, setCryptoAmount] = useState('0.00735');
    const [isLoading, setIsLoading] = useState(false);

    // Mock API call to get quote from our custom backend (which will talk to Unlimit)
    const getQuote = useCallback(() => {
        setIsLoading(true);
        setTimeout(() => {
            if (action === 'buy') {
                const amount = parseFloat(fiatAmount) || 0;
                setCryptoAmount((amount / 68000).toFixed(5));
            } else {
                const amount = parseFloat(cryptoAmount) || 0;
                setFiatAmount((amount * 68000).toFixed(2));
            }
            setIsLoading(false);
        }, 1200);
    }, [action, fiatAmount, cryptoAmount]);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            getQuote();
        }, 800);
        return () => clearTimeout(timeoutId);
    }, [getQuote, fiatCurrency, cryptoCurrency]);

    const handleTransaction = async () => {
        if (!user) {
            // Should prompt login
            alert("Please login to process transaction");
            return;
        }

        // This is where we will call the Supabase Edge Function to generate the Unlimit payment link securely
        alert(`Proceeding securely to buy ${cryptoAmount} ${cryptoCurrency} for ${fiatAmount} ${fiatCurrency}. (Backend Link Generation Pending)`);
    };

    return (
        <div className="bg-bg-surface rounded-[40px] p-6 border border-white/5 shadow-2xl relative overflow-hidden group min-h-[500px] flex flex-col">
            {/* Decorative Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-purple/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

            <div className="flex justify-between items-center mb-6 relative z-10">
                <h3 className="text-2xl font-bold">Fiat Gateway</h3>
                <div className="flex bg-[#100e23] rounded-full p-1 border border-white/5">
                    <button
                        className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${action === 'buy' ? 'bg-primary-purple text-white' : 'text-text-secondary hover:text-white'}`}
                        onClick={() => setAction('buy')}
                    >
                        Buy
                    </button>
                    <button
                        className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${action === 'sell' ? 'bg-primary-purple text-white' : 'text-text-secondary hover:text-white'}`}
                        onClick={() => setAction('sell')}
                    >
                        Sell
                    </button>
                </div>
            </div>

            <div className="flex-1 w-full flex flex-col relative z-10 mt-2 space-y-6">
                {/* You Pay Section */}
                <div>
                    <label className="text-xs text-text-secondary font-medium mb-2 block uppercase tracking-wider">
                        {action === 'buy' ? 'You Pay' : 'You Sell'}
                    </label>
                    <div className="flex bg-[#131128] rounded-2xl p-4 border border-white/5 items-center transition-all focus-within:border-primary-purple focus-within:shadow-[0_0_15px_rgba(102,57,228,0.2)]">
                        <input
                            type="text"
                            className="bg-transparent border-none outline-none flex-1 text-2xl font-bold w-full"
                            value={action === 'buy' ? fiatAmount : cryptoAmount}
                            onChange={(e) => action === 'buy' ? setFiatAmount(e.target.value) : setCryptoAmount(e.target.value)}
                        />
                        <select
                            className="bg-[#282454] border border-white/10 outline-none text-white font-bold py-2 px-4 rounded-xl ml-4 cursor-pointer hover:bg-[#342e6d] transition-colors"
                            value={action === 'buy' ? fiatCurrency : cryptoCurrency}
                            onChange={(e) => action === 'buy' ? setFiatCurrency(e.target.value) : setCryptoCurrency(e.target.value)}
                        >
                            {action === 'buy' ? (
                                <>
                                    <option value="USD">USD</option>
                                    <option value="EUR">EUR</option>
                                    <option value="BRL">BRL</option>
                                </>
                            ) : (
                                <>
                                    <option value="BTC">BTC</option>
                                    <option value="ETH">ETH</option>
                                    <option value="USDT">USDT</option>
                                </>
                            )}
                        </select>
                    </div>
                </div>

                {/* Swap Icon */}
                <div className="flex justify-center -my-3 relative z-20">
                    <div className="bg-[#282454] p-2 rounded-full border border-white/5 shadow-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-text-secondary">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <polyline points="19 12 12 19 5 12"></polyline>
                        </svg>
                    </div>
                </div>

                {/* You Receive Section */}
                <div>
                    <label className="text-xs text-text-secondary font-medium mb-2 block uppercase tracking-wider">
                        You Receive
                    </label>
                    <div className="flex bg-[#131128] rounded-2xl p-4 border border-white/5 items-center">
                        <div className="flex-1 flex flex-col">
                            {isLoading ? (
                                <div className="h-8 w-32 bg-white/10 rounded animate-pulse" />
                            ) : (
                                <span className="text-2xl font-bold text-primary-purple">
                                    {action === 'buy' ? cryptoAmount : fiatAmount}
                                </span>
                            )}
                        </div>
                        <select
                            className="bg-[#282454] border border-white/10 outline-none text-white font-bold py-2 px-4 rounded-xl ml-4 cursor-pointer hover:bg-[#342e6d] transition-colors"
                            value={action === 'buy' ? cryptoCurrency : fiatCurrency}
                            onChange={(e) => action === 'buy' ? setCryptoCurrency(e.target.value) : setFiatCurrency(e.target.value)}
                        >
                            {action === 'buy' ? (
                                <>
                                    <option value="BTC">BTC</option>
                                    <option value="ETH">ETH</option>
                                    <option value="USDT">USDT</option>
                                </>
                            ) : (
                                <>
                                    <option value="USD">USD</option>
                                    <option value="EUR">EUR</option>
                                    <option value="BRL">BRL</option>
                                </>
                            )}
                        </select>
                    </div>
                    {isLoading ? (
                        <p className="text-xs text-text-secondary mt-2 text-right animate-pulse">Calculating rate...</p>
                    ) : (
                        <p className="text-xs text-text-secondary mt-2 text-right">
                            1 {action === 'buy' ? cryptoCurrency : fiatCurrency} ≈ {action === 'buy' ? (68000).toLocaleString() : (1 / 68000).toFixed(8)} {action === 'buy' ? fiatCurrency : cryptoCurrency}
                        </p>
                    )}
                </div>

                <div className="flex-1 flex flex-col justify-end mt-4">
                    <button
                        onClick={handleTransaction}
                        disabled={isLoading}
                        className={`w-full bg-primary-purple hover:bg-[#7b46ff] text-white font-bold py-4 rounded-xl transition-all shadow-[0_4px_14px_0_rgba(102,57,228,0.39)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
                    >
                        {isLoading && (
                            <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                        )}
                        {action === 'buy' ? `Buy ${cryptoCurrency}` : `Sell ${cryptoCurrency}`}
                    </button>

                    <p className="text-xs text-center text-text-secondary mt-4 flex items-center justify-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]"></span>
                        Secure Server-to-Server White-label API
                    </p>
                </div>
            </div>
        </div>
    );
}
