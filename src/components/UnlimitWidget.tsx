import { useState } from 'react';

export default function UnlimitWidget() {
    const [amount] = useState('0.233455');
    const [action, setAction] = useState<'buy' | 'sell'>('buy');
    const [fiat, setFiat] = useState('USD');

    return (
        <div className="bg-bg-surface rounded-[40px] p-8 border border-white/5 shadow-2xl relative overflow-hidden group">
            {/* Decorative Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-purple/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="flex justify-between items-center mb-8">
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

            <div className="space-y-6">
                <div>
                    <label className="text-sm text-text-secondary font-medium mb-2 block uppercase tracking-wider">
                        {action === 'buy' ? 'You Pay' : 'You Sell'}
                    </label>
                    <div className="flex bg-[#131128] rounded-2xl p-4 border border-white/5 items-center">
                        <input
                            type="text"
                            className="bg-transparent border-none outline-none flex-1 text-2xl font-bold w-full"
                            defaultValue={action === 'buy' ? '1,500' : '0.035'}
                        />
                        <select
                            className="bg-[#282454] border-none outline-none text-white font-bold py-2 px-4 rounded-xl ml-4 cursor-pointer"
                            onChange={(e) => setFiat(e.target.value)}
                            value={action === 'buy' ? fiat : 'BTC'}
                            disabled={action === 'sell'}
                        >
                            {action === 'buy' ? (
                                <>
                                    <option value="USD">USD</option>
                                    <option value="EUR">EUR</option>
                                    <option value="BRL">BRL</option>
                                </>
                            ) : (
                                <option value="BTC">BTC</option>
                            )}
                        </select>
                    </div>
                </div>

                <div>
                    <label className="text-sm text-text-secondary font-medium mb-2 block uppercase tracking-wider">
                        {action === 'buy' ? 'You Receive' : 'You Receive'}
                    </label>
                    <div className="flex bg-[#131128] rounded-2xl p-4 border border-white/5 items-center">
                        <input
                            type="text"
                            className="bg-transparent border-none outline-none flex-1 text-2xl font-bold w-full text-primary-purple"
                            value={action === 'buy' ? amount : '1,480.50'}
                            readOnly
                        />
                        <select
                            className="bg-[#282454] border-none outline-none text-white font-bold py-2 px-4 rounded-xl ml-4 cursor-pointer"
                            value={action === 'buy' ? 'BTC' : fiat}
                            disabled={action === 'buy'}
                        >
                            {action === 'buy' ? (
                                <option value="BTC">BTC</option>
                            ) : (
                                <>
                                    <option value="USD">USD</option>
                                    <option value="EUR">EUR</option>
                                    <option value="BRL">BRL</option>
                                </>
                            )}
                        </select>
                    </div>
                    <p className="text-xs text-text-secondary mt-2 text-right">1 BTC = $42,050.00</p>
                </div>

                <button className="w-full bg-primary-purple hover:bg-white hover:text-bg-deep text-white font-bold py-4 rounded-xl transition-all shadow-[0_4px_14px_0_rgba(102,57,228,0.39)]">
                    {action === 'buy' ? 'Buy Crypto' : 'Sell Crypto'}
                </button>

                <p className="text-xs text-center text-text-secondary mt-4 flex items-center justify-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    Protected by Secure Encryption
                </p>
            </div>
        </div>
    );
}
