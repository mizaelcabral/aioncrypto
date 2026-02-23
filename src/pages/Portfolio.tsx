import { useState } from 'react';
import DashboardHeader from '../components/DashboardHeader';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, ArrowUpRight, ArrowDownRight, Briefcase, PieChart as PieChartIcon } from 'lucide-react';

const performanceData = [
    { name: '1', value: 21000 },
    { name: '5', value: 22500 },
    { name: '10', value: 21800 },
    { name: '15', value: 23400 },
    { name: '20', value: 24100 },
    { name: '25', value: 23800 },
    { name: '30', value: 24562 },
];

const allocationData = [
    { name: 'Bitcoin', value: 12500, color: '#F7931A' },
    { name: 'Ethereum', value: 8000, color: '#627EEA' },
    { name: 'Solana', value: 2500, color: '#00FFA3' },
    { name: 'Ripple', value: 1000, color: '#23292F' },
    { name: 'Others', value: 562, color: '#6639E4' },
];

const portfolioAssets = [
    { id: 1, name: 'Bitcoin', symbol: 'BTC', balance: 0.182, price: 68681.31, value: 12500, change: 2.4, color: '#F7931A' },
    { id: 2, name: 'Ethereum', symbol: 'ETH', balance: 4.024, price: 1988.07, value: 8000, change: -1.2, color: '#627EEA' },
    { id: 3, name: 'Solana', symbol: 'SOL', balance: 28.9, price: 86.50, value: 2500, change: 12.4, color: '#00FFA3' },
    { id: 4, name: 'Ripple', symbol: 'XRP', balance: 694.4, price: 1.44, value: 1000, change: 0.5, color: '#23292F' },
];

interface CustomTooltipProps {
    active?: boolean;
    payload?: { value: number }[];
    label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-[#131128]/90 backdrop-blur-md border border-white/10 p-3 rounded-xl shadow-2xl">
                <p className="text-text-secondary text-xs mb-1">Day {label}</p>
                <p className="text-white font-bold">${payload[0].value.toLocaleString()}</p>
            </div>
        );
    }
    return null;
};

interface PieTooltipProps {
    active?: boolean;
    payload?: { name: string; value: number; payload: { color: string } }[];
}

const PieTooltip = ({ active, payload }: PieTooltipProps) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-[#131128]/90 backdrop-blur-md border border-white/10 p-3 rounded-xl shadow-2xl flex items-center gap-3">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: payload[0].payload.color }}></div>
                <div>
                    <p className="text-white font-bold">{payload[0].name}</p>
                    <p className="text-text-secondary text-xs">${payload[0].value.toLocaleString()}</p>
                </div>
            </div>
        );
    }
    return null;
};

export default function Portfolio() {
    const [timeframe, setTimeframe] = useState('1M');

    return (
        <div className="pt-4 md:pt-8 px-4 md:px-8 xl:px-12 w-full max-w-[1800px] mx-auto min-h-screen pb-24 md:pb-12 pt-safe">
            <DashboardHeader title="Portfolio" className="mb-6 md:mb-12" />

            {/* Top Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-[#131128]/80 backdrop-blur-md rounded-3xl p-6 border border-white/5 relative overflow-hidden group">
                    <div className="absolute -right-6 -top-6 w-32 h-32 bg-primary-purple/10 rounded-full blur-2xl group-hover:bg-primary-purple/20 transition-colors"></div>
                    <div className="flex items-center gap-4 mb-4 relative z-10">
                        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-primary-purple">
                            <Briefcase size={24} />
                        </div>
                        <div>
                            <p className="text-text-secondary text-sm font-medium">Total Balance</p>
                            <h3 className="text-2xl font-bold text-white">$24,562.00</h3>
                        </div>
                    </div>
                </div>

                <div className="bg-[#131128]/80 backdrop-blur-md rounded-3xl p-6 border border-white/5 relative overflow-hidden group">
                    <div className="absolute -right-6 -top-6 w-32 h-32 bg-green-500/10 rounded-full blur-2xl group-hover:bg-green-500/20 transition-colors"></div>
                    <div className="flex items-center gap-4 mb-4 relative z-10">
                        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-green-500">
                            <TrendingUp size={24} />
                        </div>
                        <div>
                            <p className="text-text-secondary text-sm font-medium">24h Profit</p>
                            <div className="flex items-center gap-2">
                                <h3 className="text-2xl font-bold text-white">+$1,288.40</h3>
                                <span className="text-green-500 text-xs font-bold">+5.24%</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-[#131128]/80 backdrop-blur-md rounded-3xl p-6 border border-white/5 relative overflow-hidden group">
                    <div className="absolute -right-6 -top-6 w-32 h-32 bg-green-500/10 rounded-full blur-2xl group-hover:bg-green-500/20 transition-colors"></div>
                    <div className="flex items-center gap-4 mb-4 relative z-10">
                        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-green-500">
                            <ArrowUpRight size={24} />
                        </div>
                        <div>
                            <p className="text-text-secondary text-sm font-medium">Best Performer</p>
                            <div className="flex items-center gap-2">
                                <h3 className="text-2xl font-bold text-white">Solana</h3>
                                <span className="text-green-500 text-xs font-bold">+12.4%</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-[#131128]/80 backdrop-blur-md rounded-3xl p-6 border border-white/5 relative overflow-hidden group">
                    <div className="absolute -right-6 -top-6 w-32 h-32 bg-red-500/10 rounded-full blur-2xl group-hover:bg-red-500/20 transition-colors"></div>
                    <div className="flex items-center gap-4 mb-4 relative z-10">
                        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-red-500">
                            <ArrowDownRight size={24} />
                        </div>
                        <div>
                            <p className="text-text-secondary text-sm font-medium">Worst Performer</p>
                            <div className="flex items-center gap-2">
                                <h3 className="text-2xl font-bold text-white">Ethereum</h3>
                                <span className="text-red-500 text-xs font-bold">-1.2%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Charts Section */}
            <div className="flex flex-col xl:flex-row gap-6 mb-8">
                {/* Left: Performance Chart */}
                <div className="flex-1 bg-[#131128]/80 backdrop-blur-md rounded-3xl p-6 border border-white/5">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                        <h3 className="text-xl font-bold flex items-center gap-2">
                            <TrendingUp className="text-primary-purple" size={24} />
                            Performance
                        </h3>
                        <div className="flex overflow-x-auto hide-scrollbar sm:flex-nowrap justify-start sm:justify-center bg-[#100e23] rounded-2xl sm:rounded-full p-1 border border-white/5 w-full sm:w-auto">
                            {['1H', '1D', '1W', '1M', '1Y', 'ALL'].map(tf => (
                                <button
                                    key={tf}
                                    onClick={() => setTimeframe(tf)}
                                    className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 ${timeframe === tf ? 'bg-primary-purple text-white shadow-lg shadow-primary-purple/30' : 'text-text-secondary hover:text-white'}`}
                                >
                                    {tf}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="h-[300px] w-full mt-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={performanceData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorPerformance" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6639E4" stopOpacity={0.4} />
                                        <stop offset="95%" stopColor="#6639E4" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="name" stroke="#ffffff20" tick={{ fill: '#8b8ca7', fontSize: 12 }} tickLine={false} axisLine={false} />
                                <YAxis hide domain={['dataMin - 1000', 'dataMax + 1000']} />
                                <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#ffffff20', strokeWidth: 1, strokeDasharray: '4 4' }} />
                                <Area type="monotone" dataKey="value" stroke="#6639E4" strokeWidth={3} fillOpacity={1} fill="url(#colorPerformance)" activeDot={{ r: 6, fill: '#6639E4', stroke: '#fff', strokeWidth: 2 }} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Right: Allocation Pie Chart */}
                <div className="w-full xl:w-[450px] bg-[#131128]/80 backdrop-blur-md rounded-3xl p-6 border border-white/5 shrink-0">
                    <h3 className="text-xl font-bold flex items-center gap-2 mb-2">
                        <PieChartIcon className="text-primary-purple" size={24} />
                        Asset Allocation
                    </h3>
                    <p className="text-text-secondary text-sm mb-6">Distribution across your portfolio</p>

                    <div className="h-[220px] w-full relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Tooltip content={<PieTooltip />} />
                                <Pie
                                    data={allocationData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius="65%"
                                    outerRadius="85%"
                                    paddingAngle={5}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {allocationData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                        {/* Center Text */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <span className="text-text-secondary text-xs uppercase font-bold tracking-widest">Total</span>
                            <span className="text-white text-xl font-bold">$24.5k</span>
                        </div>
                    </div>

                    {/* Allocation Legend */}
                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {allocationData.map((item) => (
                            <div key={item.name} className="flex items-center gap-3">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                                <div className="flex-1 flex justify-between items-center">
                                    <span className="text-sm font-medium text-white">{item.name}</span>
                                    <span className="text-xs text-text-secondary ml-2">{Math.round((item.value / 24562) * 100)}%</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Assets Table */}
            <div className="bg-[#131128]/80 backdrop-blur-md rounded-3xl p-6 border border-white/5">
                <h3 className="text-xl font-bold mb-6">Your Holdings</h3>

                {/* Desktop and Tablet View */}
                <div className="hidden md:block overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[600px]">
                        <thead>
                            <tr className="text-text-secondary text-sm border-b border-white/10">
                                <th className="pb-4 font-medium pl-4">Asset</th>
                                <th className="pb-4 font-medium text-right">Price</th>
                                <th className="pb-4 font-medium text-right">Balance</th>
                                <th className="pb-4 font-medium text-right">Value (USD)</th>
                                <th className="pb-4 font-medium text-right pr-4">24h Change</th>
                            </tr>
                        </thead>
                        <tbody>
                            {portfolioAssets.map((asset) => (
                                <tr key={asset.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group cursor-pointer">
                                    <td className="py-4 pl-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xs" style={{ backgroundColor: asset.color }}>
                                                {asset.symbol[0]}
                                            </div>
                                            <div>
                                                <p className="font-bold text-white leading-tight">{asset.name}</p>
                                                <p className="text-sm text-text-secondary">{asset.symbol}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 text-right text-white font-medium">${asset.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })}</td>
                                    <td className="py-4 text-right">
                                        <p className="font-bold text-white">{asset.balance}</p>
                                        <p className="text-sm text-text-secondary">{asset.symbol}</p>
                                    </td>
                                    <td className="py-4 text-right text-white font-bold">${asset.value.toLocaleString()}</td>
                                    <td className="py-4 text-right pr-4">
                                        <div className={`inline-flex items-center gap-1 font-bold ${asset.change >= 0 ? 'text-green-500 bg-green-500/10' : 'text-red-500 bg-red-500/10'} px-2 py-1 rounded text-sm`}>
                                            {asset.change >= 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                                            {Math.abs(asset.change)}%
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile View: Cards Layout */}
                <div className="md:hidden flex flex-col gap-4">
                    {portfolioAssets.map((asset) => (
                        <div key={asset.id} className="bg-[#100e23] rounded-2xl p-4 border border-white/5 flex flex-col gap-4">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xs" style={{ backgroundColor: asset.color }}>
                                        {asset.symbol[0]}
                                    </div>
                                    <div>
                                        <p className="font-bold text-white leading-tight">{asset.name}</p>
                                        <p className="text-sm text-text-secondary">{asset.symbol}</p>
                                    </div>
                                </div>
                                <div className={`inline-flex items-center gap-1 font-bold ${asset.change >= 0 ? 'text-green-500 bg-green-500/10' : 'text-red-500 bg-red-500/10'} px-2 py-1 rounded text-sm`}>
                                    {asset.change >= 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                                    {Math.abs(asset.change)}%
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-text-secondary text-xs mb-1">Price</p>
                                    <p className="text-white font-medium">${asset.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-text-secondary text-xs mb-1">Balance</p>
                                    <p className="font-bold text-white">{asset.balance} {asset.symbol}</p>
                                </div>
                            </div>

                            <div className="pt-3 border-t border-white/5 flex justify-between items-center">
                                <span className="text-text-secondary text-sm">Total Value</span>
                                <span className="text-white font-bold text-lg">${asset.value.toLocaleString()}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
