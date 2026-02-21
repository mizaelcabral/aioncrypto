import { useState } from 'react';
import DashboardHeader from '../components/DashboardHeader';
import { Search, Filter, ArrowUpRight, ArrowDownRight, ArrowRightLeft, Download, Calendar } from 'lucide-react';

// Mock data for transactions
const mockTransactions = [
    {
        id: '1',
        type: 'receive',
        asset: 'Bitcoin',
        symbol: 'BTC',
        amount: 0.052,
        valueUsd: 3571.42,
        status: 'completed',
        date: '2024-03-15T10:30:00Z',
        address: 'bc1qxxx...yyy',
    },
    {
        id: '2',
        type: 'swap',
        fromAsset: 'Ethereum',
        fromSymbol: 'ETH',
        toAsset: 'Solana',
        toSymbol: 'SOL',
        fromAmount: 1.5,
        toAmount: 34.5,
        valueUsd: 2982.10,
        status: 'completed',
        date: '2024-03-14T15:45:00Z',
    },
    {
        id: '3',
        type: 'send',
        asset: 'USDT',
        symbol: 'USDT',
        amount: 500,
        valueUsd: 500,
        status: 'completed',
        date: '2024-03-12T09:15:00Z',
        address: '0xabc...def',
    },
    {
        id: '4',
        type: 'buy',
        asset: 'Ethereum',
        symbol: 'ETH',
        amount: 0.25,
        valueUsd: 497.01,
        status: 'processing',
        date: '2024-03-11T18:20:00Z',
        method: 'Credit Card',
    },
    {
        id: '5',
        type: 'receive',
        asset: 'Solana',
        symbol: 'SOL',
        amount: 15.0,
        valueUsd: 1297.50,
        status: 'completed',
        date: '2024-03-10T14:10:00Z',
        address: 'Gk3...9xT',
    },
    {
        id: '6',
        type: 'sell',
        asset: 'Ripple',
        symbol: 'XRP',
        amount: 1000,
        valueUsd: 610.00,
        status: 'failed',
        date: '2024-03-09T11:05:00Z',
        method: 'Bank Transfer',
    }
];

export default function History() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all');

    const getTransactionIcon = (type: string) => {
        switch (type) {
            case 'receive':
                return <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-500"><ArrowDownRight size={20} /></div>;
            case 'send':
                return <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center text-red-500"><ArrowUpRight size={20} /></div>;
            case 'swap':
                return <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500"><ArrowRightLeft size={20} /></div>;
            case 'buy':
                return <div className="w-10 h-10 rounded-full bg-primary-purple/20 flex items-center justify-center text-primary-purple"><ArrowDownRight size={20} /></div>;
            case 'sell':
                return <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-500"><ArrowUpRight size={20} /></div>;
            default:
                return null;
        }
    };

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'completed':
                return 'text-green-500 bg-green-500/10 border-green-500/20';
            case 'processing':
                return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
            case 'failed':
                return 'text-red-500 bg-red-500/10 border-red-500/20';
            default:
                return 'text-text-secondary bg-white/5 border-white/10';
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        }).format(date);
    };

    const filteredTransactions = mockTransactions.filter(tx => {
        const matchesSearch =
            tx.asset?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            tx.symbol?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            tx.fromAsset?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            tx.type.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesFilter = filterType === 'all' || tx.type === filterType;

        return matchesSearch && matchesFilter;
    });

    return (
        <div className="pt-4 md:pt-8 px-4 md:px-8 xl:px-12 w-full max-w-[1800px] mx-auto min-h-screen pb-24 md:pb-12 pt-safe relative">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-purple/5 blur-[120px] rounded-full pointer-events-none" />

            <DashboardHeader title="Transaction History" className="mb-6 md:mb-12 relative z-10" />

            <div className="bg-[#131128]/80 backdrop-blur-md rounded-3xl p-6 border border-white/5 relative z-10 shadow-2xl">

                {/* Search and Filters */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <div className="relative flex-1 md:w-80">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
                            <input
                                type="text"
                                placeholder="Search by asset or type..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-[#100e23] border border-white/5 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-primary-purple/50 focus:ring-1 focus:ring-primary-purple text-sm text-white transition-all placeholder:text-text-secondary"
                            />
                        </div>
                        <button className="flex items-center gap-2 bg-[#100e23] border border-white/5 rounded-xl px-4 py-3 text-sm font-medium text-text-secondary hover:text-white hover:border-white/20 transition-all shrink-0">
                            <Filter size={18} />
                            <span className="hidden sm:inline">Advanced</span>
                        </button>
                    </div>

                    <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
                        {['all', 'receive', 'send', 'swap', 'buy', 'sell'].map(type => (
                            <button
                                key={type}
                                onClick={() => setFilterType(type)}
                                className={`px-4 py-2 rounded-full text-xs font-bold capitalize whitespace-nowrap transition-all ${filterType === type
                                        ? 'bg-primary-purple text-white shadow-lg shadow-primary-purple/30'
                                        : 'bg-[#100e23] text-text-secondary border border-white/5 hover:border-white/20 hover:text-white'
                                    }`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Desktop Table View (Hidden on mobile) */}
                <div className="hidden md:block overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="text-text-secondary text-xs uppercase tracking-wider border-b border-white/10">
                                <th className="pb-4 font-semibold pl-4">Type / Asset</th>
                                <th className="pb-4 font-semibold">Amount</th>
                                <th className="pb-4 font-semibold">Value (USD)</th>
                                <th className="pb-4 font-semibold">Date</th>
                                <th className="pb-4 font-semibold">Status</th>
                                <th className="pb-4 font-semibold text-right pr-4">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTransactions.map((tx) => (
                                <tr key={tx.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                                    <td className="py-4 pl-4">
                                        <div className="flex items-center gap-4">
                                            {getTransactionIcon(tx.type)}
                                            <div>
                                                <p className="font-bold text-white capitalize text-sm">{tx.type}</p>
                                                <p className="text-xs text-text-secondary mt-0.5">
                                                    {tx.type === 'swap' ? `${tx.fromSymbol} → ${tx.toSymbol}` : tx.asset}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4">
                                        <div className="font-medium text-sm text-white">
                                            {tx.type === 'swap' ? (
                                                <span>-{tx.fromAmount} {tx.fromSymbol} <br /><span className="text-green-500">+{tx.toAmount} {tx.toSymbol}</span></span>
                                            ) : (
                                                <span>{tx.type === 'send' || tx.type === 'sell' ? '-' : '+'}{tx.amount} {tx.symbol}</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="py-4 text-sm font-medium text-text-secondary">
                                        ${tx.valueUsd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </td>
                                    <td className="py-4">
                                        <div className="flex items-center gap-2 text-sm text-text-secondary">
                                            <Calendar size={14} className="opacity-50" />
                                            {formatDate(tx.date)}
                                        </div>
                                    </td>
                                    <td className="py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold border capitalize ${getStatusStyle(tx.status)}`}>
                                            {tx.status}
                                        </span>
                                    </td>
                                    <td className="py-4 text-right pr-4">
                                        <button className="p-2 text-text-secondary hover:text-primary-purple hover:bg-primary-purple/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                                            <Download size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {filteredTransactions.length === 0 && (
                        <div className="text-center py-16">
                            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 text-text-secondary">
                                <Search size={24} />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">No transactions found</h3>
                            <p className="text-text-secondary">Try adjusting your search or filters.</p>
                        </div>
                    )}
                </div>

                {/* Mobile View (Cards) */}
                <div className="md:hidden space-y-4">
                    {filteredTransactions.map((tx) => (
                        <div key={tx.id} className="bg-[#100e23] border border-white/5 rounded-2xl p-4 flex flex-col gap-4">
                            <div className="flex justify-between items-start">
                                <div className="flex items-center gap-3">
                                    {getTransactionIcon(tx.type)}
                                    <div>
                                        <p className="font-bold text-white capitalize text-sm">{tx.type}</p>
                                        <p className="text-xs text-text-secondary mt-0.5">
                                            {tx.type === 'swap' ? `${tx.fromSymbol} → ${tx.toSymbol}` : tx.asset}
                                        </p>
                                    </div>
                                </div>
                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border capitalize ${getStatusStyle(tx.status)}`}>
                                    {tx.status}
                                </span>
                            </div>

                            <div className="bg-[#131128] rounded-xl p-3 border border-white/5">
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-xs text-text-secondary">Amount</span>
                                    <span className="font-bold text-sm text-white">
                                        {tx.type === 'swap' ? `${tx.toAmount} ${tx.toSymbol}` : `${tx.type === 'send' || tx.type === 'sell' ? '-' : '+'}${tx.amount} ${tx.symbol}`}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-xs text-text-secondary">Value</span>
                                    <span className="text-xs text-text-secondary">${tx.valueUsd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                </div>
                            </div>

                            <div className="flex justify-between items-center text-xs text-text-secondary border-t border-white/5 pt-3">
                                <span>{formatDate(tx.date)}</span>
                                <button className="flex items-center gap-1 text-primary-purple hover:text-white transition-colors">
                                    Receipt <Download size={14} />
                                </button>
                            </div>
                        </div>
                    ))}

                    {filteredTransactions.length === 0 && (
                        <div className="text-center py-10 bg-[#100e23] rounded-2xl border border-white/5">
                            <p className="text-text-secondary text-sm">No transactions found.</p>
                        </div>
                    )}
                </div>

            </div>

            {/* Pagination Placeholder */}
            {filteredTransactions.length > 0 && (
                <div className="flex justify-center mt-8 relative z-10">
                    <div className="flex items-center gap-1 bg-[#131128]/80 backdrop-blur-md rounded-full p-1 border border-white/5 shadow-xl">
                        <button className="w-8 h-8 flex items-center justify-center rounded-full text-text-secondary hover:text-white hover:bg-white/5 transition-colors text-sm font-medium" disabled>←</button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-primary-purple text-white text-sm font-bold shadow-lg shadow-primary-purple/20">1</button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-full text-text-secondary hover:text-white hover:bg-white/5 transition-colors text-sm font-medium">2</button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-full text-text-secondary hover:text-white hover:bg-white/5 transition-colors text-sm font-medium">3</button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-full text-text-secondary hover:text-white hover:bg-white/5 transition-colors text-sm font-medium">→</button>
                    </div>
                </div>
            )}
        </div>
    );
}
