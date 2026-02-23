import { Area, AreaChart, ResponsiveContainer, YAxis } from 'recharts';
import { useNavigate } from 'react-router-dom';

interface TokenCardProps {
    name: string;
    symbol: string;
    price: number;
    change24h: number;
    sparklineData: number[];
    iconUrl?: string;
    isLoading?: boolean;
    hideBuyButton?: boolean;
}

export default function TokenCard({
    name,
    symbol,
    price,
    change24h,
    sparklineData,
    iconUrl,
    isLoading,
    hideBuyButton
}: TokenCardProps) {
    const navigate = useNavigate();

    const chartData = sparklineData?.map((val, i) => ({ value: val, index: i })) || [];
    const isPositive = change24h >= 0;

    if (isLoading) {
        return (
            <div className="bg-bg-surface rounded-card p-6 border border-white/5 h-[300px] animate-pulse flex flex-col justify-between">
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/10"></div>
                        <div className="h-6 w-24 bg-white/10 rounded"></div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                        <div className="h-4 w-8 bg-white/10 rounded"></div>
                        <div className="h-6 w-20 bg-white/10 rounded"></div>
                    </div>
                </div>
                <div className="flex justify-between items-center mt-4 p-4 bg-white/5 rounded-2xl">
                    <div className="h-4 w-20 bg-white/10 rounded"></div>
                    <div className="h-4 w-12 bg-white/10 rounded"></div>
                </div>
                <div className="w-full mt-4 h-12 bg-white/10 rounded-xl"></div>
            </div>
        );
    }

    return (
        <div className="bg-bg-surface rounded-card p-6 border border-white/5 flex flex-col justify-between hover:-translate-y-1 transition-transform group shadow-lg">

            {/* Header */}
            <div className="flex justify-between items-center mb-6 gap-2">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                    {iconUrl ? (
                        <img src={iconUrl} alt={name} className="w-10 h-10 rounded-full bg-white/5 p-1 shrink-0" />
                    ) : (
                        <div className="w-10 h-10 rounded-full bg-[#131128] flex items-center justify-center font-bold text-sm border border-white/10 shrink-0">
                            {symbol.charAt(0)}
                        </div>
                    )}
                    <div className="flex flex-col">
                        <span className="text-lg xl:text-xl font-bold truncate leading-tight">{name}</span>
                        <span className="text-[10px] xl:text-xs text-text-secondary font-bold uppercase">{symbol}</span>
                    </div>
                </div>
                <div className="flex justify-end shrink-0">
                    <span className="text-xl xl:text-2xl font-bold tracking-tight">
                        {price ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 4 }).format(price) : '$0.00'}
                    </span>
                </div>
            </div>

            {/* Mini Chart */}
            <div className="h-24 w-full mb-6 relative z-0">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                        <YAxis domain={['dataMin', 'dataMax']} hide />
                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke="#6639E4"
                            strokeWidth={2}
                            fill="transparent"
                            isAnimationActive={false}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            {/* Footer Info */}
            <div className="bg-[#131128] rounded-2xl p-4 border border-white/5 group-hover:border-primary-purple/30 transition-colors relative z-10 flex justify-between items-center">
                <span className="text-xs text-text-secondary">24h Change</span>
                <span className={`text-xs font-bold ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                    {isPositive ? '+' : ''}{change24h?.toFixed(2)}%
                </span>
            </div>

            {!hideBuyButton && (
                <button
                    onClick={() => navigate('/buy', { state: { symbol: symbol.toUpperCase(), name } })}
                    className="w-full mt-4 bg-primary-purple/10 border border-primary-purple/30 hover:bg-primary-purple hover:border-primary-purple text-primary-purple hover:text-white font-bold py-3 px-4 rounded-full transition-all active:scale-95 shadow-lg shadow-[#6639E4]/0 hover:shadow-[#6639E4]/30 flex items-center justify-center gap-2 relative z-10"
                >
                    Comprar {name}
                </button>
            )}

        </div>
    );
}
