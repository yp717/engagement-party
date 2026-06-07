import Header from "./components/header";
import Details from "./components/details";
import OurStory from "./components/our-story";
import PhotoGallery from "./components/photo-gallery";
import FAQs from "./components/FAQs";
import Hero2 from "./components/hero-2";
import PasswordProtection from "./components/password-protection";
import RSVP from "./components/RSVP";
import Contact from "./components/Contact";
import SaveTheDate from "./components/save-the-date";
import CheckeredDivider from "./components/checkered-divider";
import StripedDivider from "./components/striped-divider";
import CheckeredDividerNarrow from "./components/checkered-divider-narrow";

export default function Home() {
  return (
    <PasswordProtection>
      <main className="relative bg-cream overflow-x-hidden">
        {/* Hero Section with Header overlay */}
        <section id="hero" className="relative">
          <Header />
          <Hero2 />
        </section>

        {/* Save the Date */}
        <section id="save-the-date">
          <SaveTheDate />
        </section>

        {/* Checkered Pattern Divider */}
        <CheckeredDivider />

        {/* Details - Transportation & Dress Code */}
        <section id="details">
          <Details />
        </section>

        {/* Striped Pattern Divider */}
        <StripedDivider />

        {/* Our Story */}
        <section id="our-story">
          <OurStory />
        </section>

        {/* Photo Gallery */}
        <section id="photo-gallery">
          <PhotoGallery />
        </section>

        {/* FAQs */}
        <section id="faqs">
          <FAQs />
        </section>

        {/* Contact */}
        <section id="contact">
          <Contact />
        </section>

        {/* Striped Divider - extends into RSVP */}
        <CheckeredDividerNarrow />
        {/* RSVP */}
        <section id="rsvp">
          <RSVP />
        </section>
      </main>
    </PasswordProtection>
  );
}
