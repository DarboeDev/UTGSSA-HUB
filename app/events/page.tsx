"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Calendar,
  Clock,
  MapPin,
  Search,
  Filter,
  Users,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import Loader from "@/components/ui/Loader";

const backgroundImages = [
  "/images/picture1.jpg", // Your local image 1
  "/images/picture2.jpg", // Your local image 2
  "/images/picture1.jpg", // Repeat for smoother cycling
  "/images/picture2.jpg", // Repeat for smoother cycling
];

interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  createdAt: string;
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<"all" | "upcoming" | "past">(
    "all"
  );
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % backgroundImages.length
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/events");
      if (response.ok) {
        const data = await response.json();
        setEvents(data);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredEvents = events
    .filter((event) => {
      const matchesSearch =
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase());

      if (!matchesSearch) return false;

      const eventDate = new Date(event.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (filterType === "upcoming") {
        return eventDate >= today;
      } else if (filterType === "past") {
        return eventDate < today;
      }
      return true;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  if (loading) {
    return <Loader text="Loading events..." fullScreen />;
  }

  return (
    <div>
      {/* Hero Header Section with Background Images */}
      <div className="relative min-h-[80vh] pt-[100px] overflow-hidden">
        {/* Background Image Slider */}
        <div className="absolute inset-0">
          {backgroundImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentImageIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={image}
                alt={`Background ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-purple-900/70 to-cyan-900/80"></div>

        {/* Animated particles */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full opacity-30 animate-twinkle"></div>
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-blue-300 rounded-full opacity-40 animate-twinkle-delayed"></div>
          <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-purple-300 rounded-full opacity-50 animate-twinkle"></div>
          <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-cyan-300 rounded-full opacity-30 animate-twinkle-delayed"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex items-center justify-center min-h-[80vh]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-block p-6 bg-white/20 backdrop-blur-md rounded-full mb-8 transform hover:scale-110 transition-all duration-500 shadow-2xl border border-white/30">
              <Calendar className="h-20 w-20 text-white drop-shadow-lg" />
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 animate-fade-in drop-shadow-2xl">
              Upcoming{" "}
              <span className="bg-gradient-to-r from-blue-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent">
                Events
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/95 max-w-4xl mx-auto leading-relaxed animate-slide-up mb-12 drop-shadow-lg">
              Discover workshops, seminars, conferences, and activities
              organized by the UTG Science Student Association community.
            </p>

            {/* Search and Filter in Hero */}
            <div className="max-w-4xl mx-auto mb-16">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Search events..."
                    className="w-full pl-12 pr-6 py-4 bg-white/20 backdrop-blur-md border border-white/30 rounded-full focus:ring-2 focus:ring-white/50 focus:border-white/50 text-white placeholder-white/70 font-medium transition-all duration-300"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="relative">
                  <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 h-5 w-5" />
                  <select
                    title="Filter events"
                    className="pl-12 pr-8 py-4 bg-white/20 backdrop-blur-md border border-white/30 rounded-full focus:ring-2 focus:ring-white/50 focus:border-white/50 appearance-none text-white font-medium transition-all duration-300"
                    value={filterType}
                    onChange={(e) =>
                      setFilterType(
                        e.target.value as "all" | "upcoming" | "past"
                      )
                    }
                  >
                    <option value="all" className="text-gray-900">
                      All Events
                    </option>
                    <option value="upcoming" className="text-gray-900">
                      Upcoming
                    </option>
                    <option value="past" className="text-gray-900">
                      Past Events
                    </option>
                  </select>
                </div>
              </div>
            </div>

            {/* Scroll indicator */}
            <div className="animate-bounce">
              <div className="w-1 h-16 bg-gradient-to-b from-white/80 to-transparent rounded-full mx-auto"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 relative">
        {/* Decorative background elements */}
        <div className="absolute top-20 left-[10%] w-32 h-32 bg-blue-100 rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute top-32 right-[20%] w-24 h-24 bg-purple-100 rounded-full blur-2xl opacity-40 animate-float"></div>
        <div className="absolute top-80 left-[25%] w-28 h-28 bg-cyan-100 rounded-full blur-3xl opacity-20 animate-float-delayed"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* Events List */}
          {filteredEvents.length === 0 ? (
            <div className="text-center py-20">
              <div className="inline-block p-8 bg-white/60 backdrop-blur-sm rounded-2xl mb-6 shadow-xl border border-white/20">
                <Calendar className="h-16 w-16 text-gray-400 mx-auto" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                No events found
              </h3>
              <p className="text-gray-600 max-w-md mx-auto">
                {searchTerm || filterType !== "all"
                  ? "No events found matching your criteria. Try adjusting your search or filter."
                  : "No events available at the moment. Check back later for upcoming events!"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map((event) => {
                const eventDate = new Date(event.date);
                const isUpcoming = eventDate >= new Date();

                return (
                  <article
                    key={event._id}
                    className="group relative bg-white/90 backdrop-blur-md rounded-3xl overflow-hidden hover:bg-white/95 transition-all duration-500 shadow-xl hover:shadow-2xl transform hover:-translate-y-4 border border-white/40 hover:border-white/60"
                  >
                    {/* Event Header */}
                    <div className="relative p-6 bg-gradient-to-br from-blue-600/10 to-purple-600/10">
                      {/* Status Badge */}
                      <div className="absolute top-4 right-4">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${
                            isUpcoming
                              ? "bg-green-100 text-green-800 border border-green-200"
                              : "bg-gray-100 text-gray-800 border border-gray-200"
                          }`}
                        >
                          {isUpcoming ? "Upcoming" : "Past Event"}
                        </span>
                      </div>

                      {/* Event Icon */}
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <Calendar className="h-8 w-8 text-white" />
                      </div>

                      {/* Event Title */}
                      <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
                        {event.title}
                      </h2>

                      {/* Event Description */}
                      <p className="text-gray-600 line-clamp-3 leading-relaxed mb-6 group-hover:text-gray-700 transition-colors duration-300">
                        {event.description}
                      </p>
                    </div>

                    {/* Event Details */}
                    <div className="p-6 space-y-4 border-t border-gray-100 group-hover:border-gray-200 transition-colors duration-300">
                      <div className="flex items-center text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                        <Calendar className="h-4 w-4 mr-3 text-blue-600" />
                        <span className="font-medium">
                          {eventDate.toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                      </div>

                      <div className="flex items-center text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                        <Clock className="h-4 w-4 mr-3 text-purple-600" />
                        <span className="font-medium">{event.time}</span>
                      </div>

                      <div className="flex items-center text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                        <MapPin className="h-4 w-4 mr-3 text-green-600" />
                        <span className="font-medium">{event.location}</span>
                      </div>

                      {/* Event Stats */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100 group-hover:border-gray-200 transition-colors duration-300">
                        <div className="flex items-center space-x-4 text-sm text-gray-500 group-hover:text-gray-600 transition-colors duration-300">
                          <div className="flex items-center space-x-1">
                            <Users className="h-4 w-4" />
                            <span>
                              {Math.floor(Math.random() * 50) + 10} attending
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center text-sm text-gray-500">
                          <TrendingUp className="h-4 w-4 mr-1" />
                          <span>{isUpcoming ? "Popular" : "Past"}</span>
                        </div>
                      </div>

                      {/* Action Button */}
                      <Link
                        href={`/events/${event._id}`}
                        className="block w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-center py-3 px-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl group-hover:shadow-blue-500/25 transform group-hover:scale-[1.02]"
                      >
                        <span className="flex items-center justify-center">
                          View Details
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </span>
                      </Link>
                    </div>

                    {/* Subtle glow effect */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl"></div>
                  </article>
                );
              })}
            </div>
          )}

          {/* Load More Button */}
          {filteredEvents.length > 0 && (
            <div className="text-center mt-16">
              <button className="inline-flex items-center px-8 py-4 bg-white/80 backdrop-blur-md hover:bg-white/90 text-gray-900 font-semibold rounded-2xl transition-all duration-300 transform hover:-translate-y-1 shadow-xl hover:shadow-2xl border border-white/30 group">
                <Calendar className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                Load More Events
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
