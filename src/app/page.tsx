// src/app/page.tsx
import { ContactSection } from './ContactSection';
import { HeroSection } from './HeroSection';
import { HowItWorks } from './HowItWorks';
import { WhoWeWorkWith } from './WhoWeWorkWith';

export default function Home() {
    return (
        <main>
            <HeroSection />
            <WhoWeWorkWith />
            <HowItWorks /> {/* ✅ Changed from second WhoWeWorkWith to HowItWorks */}
            <ContactSection />
        </main>
    );
}
