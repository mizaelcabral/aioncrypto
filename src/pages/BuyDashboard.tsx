import { useState, useEffect } from 'react';
import UnlimitWidget from '../components/UnlimitWidget';
import DashboardHeader from '../components/DashboardHeader';
import TokenCard from '../components/TokenCard';

export default function BuyDashboard() {
    const [tokens, setTokens] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTopTokens = async () => {
            setLoading(true);
            try {
                // Fetch top 6 coins by market cap
                const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=6&page=1&sparkline=true&price_change_percentage=24h`);
                const data = await response.json();
                if (data && data.length > 0) {
                    setTokens(data);
                }
            } catch (error) {
                console.error("Failed to fetch top tokens", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTopTokens();
    }, []);

    return (
        <div className="pt-8 px-8 xl:px-12 w-full mx-auto min-h-screen pb-12">
            <DashboardHeader title="Buy & Sell" className="mb-12" />

            <div className="flex flex-col xl:flex-row gap-8 mt-8">
                {/* Left Column: Unlimit Widget */}
                <div className="w-full xl:w-[450px] shrink-0">
                    <h2 className="text-3xl font-bold mb-4">Trade Crypto easily</h2>
                    <p className="text-text-secondary text-lg mb-8 leading-relaxed">
                        Securely buy, sell, and exchange bridging the gap between traditional banking and crypto via Unlimit's extensive network.
                    </p>
                    <UnlimitWidget />
                </div>

                {/* Right Column: Grid of Cryptos */}
                <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-6">Market Overview</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-6">
                        {loading ? (
                            Array.from({ length: 6 }).map((_, i) => (
                                <TokenCard
                                    key={i}
                                    isLoading={true}
                                    name="" symbol="" price={0} change24h={0} sparklineData={[]}
                                />
                            ))
                        ) : (
                            tokens.map(token => (
                                <TokenCard
                                    key={token.id}
                                    name={token.name}
                                    symbol={token.symbol.toUpperCase()}
                                    price={token.current_price}
                                    change24h={token.price_change_percentage_24h}
                                    walletAddress="Public Market"
                                    sparklineData={token.sparkline_in_7d?.price || []}
                                    iconUrl={token.image}
                                    hideBuyButton={true}
                                />
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
