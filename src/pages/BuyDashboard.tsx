import UnlimitWidget from '../components/UnlimitWidget';
import DashboardHeader from '../components/DashboardHeader';

export default function BuyDashboard() {
    return (
        <div className="pt-4 md:pt-8 px-4 md:px-8 xl:px-12 w-full max-w-[1800px] mx-auto min-h-screen pb-24 md:pb-12 pt-safe">
            <DashboardHeader title="Buy & Sell" className="mb-6 md:mb-12" />

            <div className="flex justify-center mt-4 md:mt-12">
                <div className="w-full max-w-[500px]">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Trade Crypto easily</h2>
                        <p className="text-text-secondary text-base md:text-lg leading-relaxed">
                            Securely buy, sell, and exchange bridging the gap between traditional banking and crypto via our secure fiat gateway.
                        </p>
                    </div>
                    <UnlimitWidget />
                </div>
            </div>
        </div>
    );
}
