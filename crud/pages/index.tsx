// pages/index.tsx
import { useSession } from 'next-auth/react';

export default function Home() {
    const { data: session } = useSession();

    return (
        <div>
            <h1>Next.js Auth App</h1>
            {session ? (
                <p>Welcome, {session.user?.name}!</p> // Added conditional check using optional chaining operator
            ) : (
                <p>Please sign in</p>
            )}
        </div>
    );
}
