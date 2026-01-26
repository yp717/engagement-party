import Header from "./components/header";
import Details from "./components/details";
import OurStory from "./components/our-story";
import FAQs from "./components/FAQs";
import Hero2 from "./components/hero-2";
import PasswordProtection from "./components/password-protection";
import RSVP from "./components/RSVP";
import SaveTheDate from "./components/save-the-date";
import Footer from "./components/footer";

export default function Home() {
  return (
    <PasswordProtection>
      <main className="relative bg-cream snap-y snap-mandatory overflow-y-scroll h-screen scroll-smooth">
        {/* Hero Section with Header overlay */}
        <section id="hero" className="snap-start relative">
          <Header />
          <Hero2 />
        </section>

        {/* Save the Date */}
        <section id="save-the-date" className="snap-start">
          <SaveTheDate />
        </section>

        {/* Details - Transportation & Dress Code */}
        <section id="details" className="snap-start">
          <Details />
        </section>

        {/* Our Story */}
        <section id="our-story" className="snap-start">
          <OurStory />
        </section>

        {/* FAQs */}
        <section id="faqs" className="snap-start">
          <FAQs />
        </section>

        {/* RSVP */}
        <section id="rsvp" className="snap-start">
          <RSVP />
        </section>

        {/* Footer */}
        <Footer />
      </main>
    </PasswordProtection>
  );
}
