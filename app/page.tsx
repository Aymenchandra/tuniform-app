import { Benefits } from "@/components/landing-page/Benefits";
import { Container } from "@/components/landing-page/Container";
import { Cta } from "@/components/landing-page/Cta";
import { Footer } from "@/components/landing-page/Footer";
import { Hero } from "@/components/landing-page/Hero";
import { Navbar } from "@/components/landing-page/Navbar";
import { SectionTitle } from "@/components/landing-page/SectionTitle";
import { Testimonials } from "@/components/landing-page/Testimonials";
import { benefitOne, benefitTwo } from "@/components/landing-page/data";

export default function Home() {
  return (
    
    <Container>
      <Navbar/>
      <Hero />
      <SectionTitle
        preTitle="Tuniform Benefits"
        title=" Why should you use this application"
      >
        You should use this application for social media because it streamlines content creation, boosts engagement, tracks performance, and helps grow your online presence efficiently.
      </SectionTitle>

      <Benefits data={benefitOne} />
      <Benefits imgPos="right" data={benefitTwo} />

      <SectionTitle
        preTitle="Testimonials"
        title="Here's what our customers said"
      >
        Testimonials is a great way to increase the brand trust and awareness.
        Use this section to highlight your popular customers.
      </SectionTitle>

      <Testimonials />

      <SectionTitle preTitle="FAQ" title="Frequently Asked Questions">
        Answer your customers possible questions here, it will increase the
        conversion rate as well as support or chat requests.
      </SectionTitle>

      <Cta />
      <Footer/>
    </Container>
  );
}
