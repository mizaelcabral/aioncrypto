

import DashboardHeader from '../components/DashboardHeader';

export default function History() {
    return (
        <div className="pt-4 md:pt-8 px-4 md:px-8 max-w-[1600px] mx-auto min-h-screen pb-24 md:pb-8 pt-safe">
            <DashboardHeader title="History" />
            <div className="bg-[#131128] rounded-[40px] p-8 mt-8 border border-white/5 flex items-center justify-center min-h-[400px]">
                <p className="text-text-secondary text-lg">Transaction history coming soon.</p>
            </div>
        </div>
    );
}
