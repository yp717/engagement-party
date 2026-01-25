import PaperBackground from "./components/PaperBackground";
import Navigation from "./components/Navigation";
import DateLocation from "./components/DateLocation";

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <Navigation />
      <PaperBackground />
      <DateLocation />
    </main>
  );
}
