import Hero from "@/components/home/Hero";
import LatestNews from "@/components/home/LatestNews";
import UpcomingEvents from "@/components/home/UpcomingEvents";
import QuickLinks from "@/components/home/QuickLinks";

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <Hero />
      <div className="relative">
        {/* Decorative background elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-100 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-purple-100 rounded-full blur-2xl opacity-40"></div>
        <div className="absolute bottom-40 left-1/4 w-28 h-28 bg-cyan-100 rounded-full blur-3xl opacity-20"></div>

        <LatestNews />
        <UpcomingEvents />
        <QuickLinks />

        {/* Bottom decorative elements */}
        <div className="absolute bottom-20 right-10 w-36 h-36 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full blur-3xl opacity-25"></div>
      </div>
    </div>
  );
}
