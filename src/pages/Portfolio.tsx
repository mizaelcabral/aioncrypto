

import DashboardHeader from '../components/DashboardHeader';

export default function Portfolio() {
    return (
        <div className="pt-8 px-8 max-w-[1600px] mx-auto min-h-screen">
            <DashboardHeader title="Portfolio" />
            <div className="bg-[#131128] rounded-[40px] p-8 mt-8 border border-white/5 flex items-center justify-center min-h-[400px]">
                <p className="text-text-secondary text-lg">Portfolio feature coming soon.</p>
            </div>
        </div>
    );
}
