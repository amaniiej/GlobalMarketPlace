// app/(auth)/layout.tsx
import Navbar from '@/components/shared/Navbar';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Navbar />
            {children}
        </>
    );
}
