import '@rainbow-me/rainbowkit/styles.css';
import {
    getDefaultConfig,
    RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
    arbitrumSepolia
} from 'wagmi/chains';
import {
    QueryClientProvider,
    QueryClient,
} from "@tanstack/react-query";
import { useEffect } from "react";

const config = getDefaultConfig({
    appName: 'Marcraft',
    projectId: '1ab35f9964fde96f776376c814e10570',
    chains: [arbitrumSepolia],
    ssr: true, // If your dApp uses server side rendering (SSR)
});

const queryClient = new QueryClient();
// Firebase provider component
export const RainbowKitCustomProvider = ({ children }) => {
    useEffect(() => {
        // Firebase is now initialized globally, and you can access the app instance if needed
        console.log("Rainbow Kit initialized");
    }, []);

    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider>
                    {children}
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
};
