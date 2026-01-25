import PaperBackground from "./components/PaperBackground";
import Navigation from "./components/Navigation";
import Details from "./components/details";
import Transportation from "./components/transportation";
import DressCode from "./components/dress-code";
import OurStory from "./components/our-story";
import FAQs from "./components/FAQs";

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <Navigation />
      <PaperBackground />
      <Details />
      <div className="bg-primary w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 mx-auto max-w-7xl py-16 gap-16">
          <Transportation className="col-span-1" />
          <DressCode className="col-span-1" />
        </div>
      </div>
      <OurStory className="col-span-1" />
      <FAQs />
    </main>
  );
}
