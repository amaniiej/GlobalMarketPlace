// src/app/page.tsx
import { ContactSection } from './ContactSection';
import { HeroSection } from './HeroSection';
import { Services } from './Services';
import { WhoWeAre } from './WhoWeAre';

export default function Home() {
    return (
        <main>
            <HeroSection />
            <WhoWeAre />
            <Services />
            <ContactSection />
        </main>
    );
}
