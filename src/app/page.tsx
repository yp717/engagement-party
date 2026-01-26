import PaperBackground from "./components/paper-background";
import Header from "./components/header";
import Details from "./components/details";
import Transportation from "./components/transportation";
import DressCode from "./components/dress-code";
import OurStory from "./components/our-story";
import FAQs from "./components/FAQs";
import CheckeredHeader from "./components/checkered-header";
import Hero2 from "./components/hero-2";
import PasswordProtection from "./components/password-protection";
import RSVP from "./components/RSVP";

export default function Home() {
  return (
    <PasswordProtection>
      <main className="relative bg-cream snap-y snap-mandatory overflow-y-scroll h-screen scroll-smooth">
        <Header />
        {/* <PaperBackground /> */}
        <section id="hero" className="snap-start">
          <Hero2 />
        </section>
        <section id="details" className="snap-start">
          <Details />
        </section>
        <section id="transportation-dresscode" className="snap-start h-screen bg-primary w-full flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 mx-auto max-w-7xl w-full px-4 gap-16">
            <Transportation className="col-span-1" />
            <DressCode className="col-span-1" />
          </div>
        </section>
        <section id="our-story" className="snap-start">
          <OurStory className="col-span-1" />
        </section>
        <section id="checkered" className="snap-start">
          <CheckeredHeader />
        </section>
        <section id="rsvp" className="snap-start">
          <RSVP />
        </section>
        <section id="faqs" className="snap-start">
          <FAQs />
        </section>
      </main>
    </PasswordProtection>
  );
}
