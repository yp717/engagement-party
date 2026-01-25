import PaperBackground from "./components/PaperBackground";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import DateLocation from "./components/DateLocation";
import OurStory from "./components/OurStory";
import DressCode from "./components/DressCode";
import RSVP from "./components/RSVP";
import FAQs from "./components/FAQs";
import Contact from "./components/Contact";

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <Navigation />
      <PaperBackground />
      {/* <Hero /> */}
      <DateLocation />
      {/* <div id="details">
        <DressCode />
      </div>
      <div id="our-story">
        <OurStory />
      </div>
      <div id="rsvp">
        <RSVP />
      </div>
      <div id="faqs">
        <FAQs />
      </div>
      <Contact /> */}
    </main>
  );
}
