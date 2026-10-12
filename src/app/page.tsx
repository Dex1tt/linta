import { Features } from "@/components/landing/Features";
import { FinalCta } from "@/components/landing/FinalCta";
import { Footer } from "@/components/landing/Footer";
import { ForWhom } from "@/components/landing/ForWhom";
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Pricing } from "@/components/landing/Pricing";
import { ProjectConcept } from "@/components/landing/ProjectConcept";
import { ProblemSolution } from "@/components/landing/ProblemSolution";
import { StudioPulse } from "@/components/landing/StudioPulse";

const softwareApplicationJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Linta",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  offers: [
    { "@type": "Offer", name: "Старт", price: "1900", priceCurrency: "RUB" },
    { "@type": "Offer", name: "Команда", price: "4900", priceCurrency: "RUB" },
    { "@type": "Offer", name: "Сеть", price: "9900", priceCurrency: "RUB" },
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareApplicationJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Header />
      <main>
        <Hero />
        <HowItWorks />
        <ProblemSolution />
        <StudioPulse />
        <Features />
        <ForWhom />
        <Pricing />
        <ProjectConcept />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
