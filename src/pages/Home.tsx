
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div className="pt-20">
            {/* Hero Section */}
            <section className="relative px-6 py-24 md:py-32 max-w-7xl mx-auto flex flex-col items-center text-center">
                {/* Abstract Background Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-purple/20 blur-[120px] rounded-full pointer-events-none" />

                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm">
                    <span className="w-2 h-2 rounded-full bg-primary-purple animate-pulse" />
                    <span className="text-sm font-medium text-text-secondary">Next Generation Crypto Wallet</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight max-w-4xl relative z-10">
                    The World's Most <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6639E4] to-[#A283F6]">Secure</span> <br className="hidden md:block" />
                    Crypto Control Panel
                </h1>

                <p className="text-lg md:text-xl text-text-secondary mb-12 max-w-2xl relative z-10">
                    Buy, sell and exchange cryptocurrencies instantly with bank-grade security and zero hidden fees. Experience the future of finance today.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-4 relative z-10">
                    <Link to="/dashboard" className="w-full sm:w-auto px-8 py-4 bg-primary-purple hover:bg-white hover:text-bg-deep text-white rounded-button font-bold transition-all text-lg shadow-[0_4px_14px_0_rgba(102,57,228,0.39)]">
                        Get Started Now
                    </Link>
                    <a href="#features" className="w-full sm:w-auto px-8 py-4 bg-bg-surface hover:bg-bg-surface/80 rounded-button font-bold transition-colors text-lg text-white border border-white/5">
                        View Features
                    </a>
                </div>
            </section>

            {/* Features Showcase */}
            <section id="features" className="py-24 bg-[#100e23] border-t border-white/5">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">Everything You Need</h2>
                        <p className="text-text-secondary text-lg">A powerful suite of tools designed for the modern investor.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { title: "Bank-Grade Security", desc: "Your assets are protected by industry-leading encryption and multi-sig wallets.", icon: "Shield" },
                            { title: "Lightning Fast", desc: "Execute trades in milliseconds on our high-performance matching engine.", icon: "Zap" },
                            { title: "Instant Fiat On-Ramp", desc: "Buy crypto with your credit card or bank transfer in seconds. Powered by Unlimit.", icon: "Refresh" }
                        ].map((feature, i) => (
                            <div key={i} className="bg-bg-surface p-10 rounded-[40px] border border-white/5 hover:-translate-y-2 transition-transform duration-300">
                                <div className="w-16 h-16 bg-primary-purple/10 rounded-2xl flex items-center justify-center mb-8">
                                    <div className="w-8 h-8 rounded-full bg-primary-purple" />
                                </div>
                                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                                <p className="text-text-secondary leading-relaxed">
                                    {feature.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
