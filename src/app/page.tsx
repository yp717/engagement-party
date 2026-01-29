import Header from "./components/header";
import Details from "./components/details";
import OurStory from "./components/our-story";
import PhotoGallery from "./components/photo-gallery";
import FAQs from "./components/FAQs";
import Hero2 from "./components/hero-2";
import PasswordProtection from "./components/password-protection";
import RSVP from "./components/RSVP";
import SaveTheDate from "./components/save-the-date";
import CheckeredDivider from "./components/checkered-divider";
import StripedDivider from "./components/striped-divider";
import CheckeredDividerNarrow from "./components/checkered-divider-narrow";

export default function Home() {
  return (
    <PasswordProtection>
      <main className="relative bg-cream snap-y snap-mandatory overflow-x-hidden overflow-y-scroll h-screen md:scroll-smooth">
        {/* Hero Section with Header overlay */}
        <section id="hero" className="snap-start relative">
          <Header />
          <Hero2 />
        </section>

        {/* Save the Date */}
        <section id="save-the-date" className="snap-start">
          <SaveTheDate />
        </section>

        {/* Checkered Pattern Divider */}
        <CheckeredDivider />

        {/* Details - Transportation & Dress Code */}
        <section id="details" className="snap-start">
          <Details />
        </section>

        {/* Striped Pattern Divider */}
        <StripedDivider />

        {/* Our Story */}
        <section id="our-story" className="snap-start">
          <OurStory />
        </section>

        {/* Photo Gallery */}
        <section id="photo-gallery" className="snap-start">
          <PhotoGallery />
        </section>

        {/* FAQs */}
        <section id="faqs" className="snap-start">
          <FAQs />
        </section>

        {/* Checkered Pattern Divider - Narrow */}
        <CheckeredDividerNarrow />

        {/* RSVP */}
        <section id="rsvp" className="snap-start">
          <RSVP />
        </section>
      </main>
    </PasswordProtection>
  );
}
