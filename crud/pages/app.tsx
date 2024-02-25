// pages/_app.tsx
import { SessionProvider } from 'next-auth/react';
import { ReactQueryDevtools } from 'react-query/devtools';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: { Component: React.ComponentType<any>, pageProps: any }) {
    return (
        <QueryClientProvider client={queryClient}>
            <SessionProvider session={pageProps.session}>
                <Component {...pageProps} />
            </SessionProvider>
            <ReactQueryDevtools />
        </QueryClientProvider>
    );
}

export default MyApp;
