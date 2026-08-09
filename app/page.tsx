import { CTA } from "@/components/landing/cta";
import { FAQ } from "@/components/landing/faq";
import { Features } from "@/components/landing/features";
import { Footer } from "@/components/landing/footer";
import { Hero } from "@/components/landing/hero";
import { Navbar } from "@/components/landing/navbar";
import { Screenshots } from "@/components/landing/screenshots";
import { WhyNotefy } from "@/components/landing/why-notefy";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#F8F8FF] text-slate-900 dark:bg-[#0B1215] dark:text-white">
      <Navbar />

      <Hero />

      <Features />

      <Screenshots />

      <WhyNotefy />

      <FAQ />

      <CTA />

      <Footer />
    </main>
  );
}