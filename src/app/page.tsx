// src/app/page.tsx
import { ContactSection } from './ContactSection';
import { HeroSection } from './HeroSection';
import { HowItWorks } from './HowItWorks';
import { WhoWeWorkWith } from './WhoWeWorkWith';

export default function Home() {
    return (
        <main className='pt-14'>
            {' '}
            {/* ← Changed from pt-16 to pt-14 to match h-14 navbar */}
            <HeroSection />
            <WhoWeWorkWith />
            <HowItWorks />
            <ContactSection />
        </main>
    );
}
