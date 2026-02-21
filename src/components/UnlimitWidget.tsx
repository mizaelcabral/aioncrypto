import { useEffect, useRef } from 'react';
import { GateFiDisplayModeEnum, GateFiSDK } from '@gatefi/js-sdk';

export default function UnlimitWidget() {
    const embedRef = useRef<HTMLDivElement>(null);
    const gatefiInstance = useRef<GateFiSDK | null>(null);

    useEffect(() => {
        // Initialize GateFi SDK only once
        if (embedRef.current && !gatefiInstance.current) {
            // Unlimit (GateFi) SDK Initialization
            const gatefi = new GateFiSDK({
                merchantId: import.meta.env.VITE_GATEFI_MERCHANT_ID || 'bdef24b6-7ebc-4fc3-a128-444743c33dc6', // Replace with your actual merchant ID
                displayMode: GateFiDisplayModeEnum.Embedded,
                nodeSelector: `#${embedRef.current.id}`,
                isSandbox: true, // Set to false for production
                walletAddress: '', // Optionally pre-fill user wallet address
                email: '', // Optionally pre-fill user email
                externalId: '', // Optionally set your internal user ID
                defaultFiat: {
                    currency: 'USD',
                    amount: '500',
                },
                defaultCrypto: {
                    currency: 'BTC'
                }
            });

            gatefiInstance.current = gatefi;
        }

        return () => {
            // Cleanup on unmount if possible
            if (gatefiInstance.current) {
                gatefiInstance.current.destroy();
                gatefiInstance.current = null;
            }
        };
    }, []);

    return (
        <div className="bg-bg-surface rounded-[40px] p-6 border border-white/5 shadow-2xl relative overflow-hidden group min-h-[500px] flex flex-col">
            {/* Decorative Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-purple/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

            <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">Fiat Gateway</h3>
                <div className="px-3 py-1 rounded-full bg-primary-purple/20 text-primary-purple text-xs font-bold border border-primary-purple/30">
                    Live
                </div>
            </div>

            <div className="flex-1 w-full flex items-center justify-center rounded-3xl overflow-hidden relative bg-[#131128]/50 border border-white/5">
                {/* GateFi SDK Container */}
                <div
                    id="gatefi-widget-container"
                    ref={embedRef}
                    className="w-full flex justify-center py-4"
                />
            </div>

            <p className="text-xs text-center text-text-secondary mt-6 flex items-center justify-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]"></span>
                Powered by Unlimit GateFi
            </p>
        </div>
    );
}
