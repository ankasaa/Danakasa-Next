import Hero from "@/components/Hero";
import About from "@/components/About";
import Features from "@/components/Features";
import TestimonialSlider from "@/components/TestimonialSlider";
import FaqAccordion from "@/components/FaqAccordion";
import ContactForm from "@/components/ContactForm";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <About />
        <Features />
        <TestimonialSlider />
        <FaqAccordion />
        <ContactForm />
      </main>
    </>
  );
}