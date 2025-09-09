"use client";
import Link from "next/link";
import { ArrowRight, Calendar, MapPin, Clock, Users, Zap } from "lucide-react";
import { useState, useEffect } from "react";

interface EventItem {
  _id: string;
  title: string;
  description: string;
  date: string;
  location?: string;
  image?: string;
  organizer?: string;
  createdAt: string;
  updatedAt: string;
}

const getCategoryIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case "competition":
      return "🏆";
    case "workshop":
      return "🔬";
    case "seminar":
      return "🎓";
    default:
      return "📅";
  }
};

const getCategoryColor = (category: string) => {
  switch (category.toLowerCase()) {
    case "competition":
      return "from-yellow-400 to-orange-500";
    case "workshop":
      return "from-blue-400 to-cyan-500";
    case "seminar":
      return "from-purple-400 to-pink-500";
    default:
      return "from-gray-400 to-gray-600";
  }
};

export default function UpcomingEvents() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isUpcoming, setIsUpcoming] = useState(true); // Track if showing upcoming or recent events

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError(null);

        // First try to get upcoming events
        let response = await fetch("/api/events?limit=3&upcoming=true");
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }

        let data = await response.json();

        // If no upcoming events, fall back to recent events
        if (!data || data.length === 0) {
          response = await fetch("/api/events?limit=3");
          if (!response.ok) {
            throw new Error("Failed to fetch events");
          }
          data = await response.json();
          setIsUpcoming(false); // We're showing recent events
        } else {
          setIsUpcoming(true); // We're showing upcoming events
        }

        setEvents(data || []);
      } catch (err) {
        console.error("Error fetching events:", err);
        setError(err instanceof Error ? err.message : "Failed to load events");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Helper function to determine category based on title/description
  const getEventCategory = (event: EventItem) => {
    const title = event.title.toLowerCase();
    if (title.includes("workshop") || title.includes("training"))
      return "Workshop";
    if (
      title.includes("competition") ||
      title.includes("fair") ||
      title.includes("contest")
    )
      return "Competition";
    if (
      title.includes("seminar") ||
      title.includes("lecture") ||
      title.includes("talk")
    )
      return "Seminar";
    return "Event";
  };

  // Helper function to extract time from description or use default
  const getEventTime = (event: EventItem) => {
    // Try to extract time from description, otherwise use default
    const timeRegex = /\b\d{1,2}:\d{2}\s*(AM|PM|am|pm)\b/;
    const match = event.description.match(timeRegex);
    return match ? match[0] : "10:00 AM";
  };

  // Helper function to determine if event is featured (first event or specific criteria)
  const isFeatured = (event: EventItem, index: number) => {
    return index === 0; // Make the first event featured
  };

  if (loading) {
    return (
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center space-x-2 bg-purple-100 text-purple-800 rounded-full px-4 py-2 text-sm font-semibold mb-4">
              <Zap className="h-4 w-4" />
              <span>What's Next</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
              Events{" "}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Loading...
              </span>
            </h2>
          </div>
          <div className="space-y-6 md:space-y-8">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl md:rounded-3xl shadow-lg overflow-hidden border border-gray-200 animate-pulse"
              >
                <div className="flex flex-col lg:flex-row">
                  <div className="lg:w-1/3">
                    <div className="w-full h-48 sm:h-56 md:h-64 lg:h-full bg-gray-200"></div>
                  </div>
                  <div className="lg:w-2/3 p-4 sm:p-6 md:p-8 lg:p-12">
                    <div className="h-6 md:h-8 bg-gray-200 rounded mb-3 md:mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-4 md:mb-6"></div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-4 md:mb-8">
                      {[...Array(4)].map((_, j) => (
                        <div key={j} className="h-12 md:h-16 bg-gray-200 rounded"></div>
                      ))}
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                      <div className="h-10 md:h-12 bg-gray-200 rounded flex-1"></div>
                      <div className="h-10 md:h-12 bg-gray-200 rounded flex-1"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-red-600">Error loading events: {error}</p>
        </div>
      </section>
    );
  }
  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center space-x-2 bg-purple-100 text-purple-800 rounded-full px-4 py-2 text-sm font-semibold mb-4">
            <Zap className="h-4 w-4" />
            <span>What's Next</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
            {isUpcoming ? "Upcoming" : "Recent"}{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Events
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {isUpcoming
              ? "Join us for exciting events, workshops, and seminars designed to enhance your academic journey and connect with the scientific community."
              : "Explore our recent events and activities. Stay tuned for more upcoming opportunities to engage with the scientific community."}
          </p>
        </div>

        <div className="space-y-6 md:space-y-8">
          {events.map((event, index) => {
            const category = getEventCategory(event);
            const eventTime = getEventTime(event);
            const featured = isFeatured(event, index);

            return (
              <div
                key={event._id}
                className={`group relative overflow-hidden rounded-2xl md:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 ${
                  featured
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                    : "bg-white border border-gray-200 hover:border-blue-300"
                }`}
              >
                <div className="flex flex-col lg:flex-row">
                  {/* Image Section */}
                  <div className="lg:w-1/3 relative overflow-hidden">
                    <img
                      src={event.image || "/images/picture2.jpg"}
                      alt={event.title}
                      className="w-full h-48 sm:h-56 md:h-64 lg:h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-3 md:top-4 left-3 md:left-4">
                      <div
                        className={`px-2 md:px-3 py-1 rounded-full text-white text-xs md:text-sm font-semibold bg-gradient-to-r ${getCategoryColor(
                          category
                        )}`}
                      >
                        <span className="mr-1">
                          {getCategoryIcon(category)}
                        </span>
                        {category}
                      </div>
                    </div>
                    {featured && (
                      <div className="absolute top-3 md:top-4 right-3 md:right-4">
                        <div className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-bold">
                          Featured
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Content Section */}
                  <div className="lg:w-2/3 p-4 sm:p-6 md:p-8 lg:p-12">
                    <div className="flex flex-col h-full">
                      <div className="flex-1">
                        <h3
                          className={`text-xl sm:text-2xl lg:text-3xl font-bold mb-3 md:mb-4 ${
                            featured
                              ? "text-white"
                              : "text-gray-900 group-hover:text-blue-600"
                          } transition-colors`}
                        >
                          {event.title}
                        </h3>
                        <p
                          className={`text-sm sm:text-base lg:text-lg mb-4 md:mb-6 leading-relaxed ${
                            featured ? "text-blue-100" : "text-gray-600"
                          }`}
                        >
                          {event.description}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-4 md:mb-8">
                        <div className="flex items-center space-x-2">
                          <div
                            className={`p-2 rounded-lg ${
                              featured ? "bg-white/20" : "bg-blue-100"
                            }`}
                          >
                            <Calendar
                              className={`h-3 w-3 md:h-4 md:w-4 ${
                                featured ? "text-white" : "text-blue-600"
                              }`}
                            />
                          </div>
                          <div>
                            <div
                              className={`text-xs md:text-sm ${
                                featured ? "text-blue-200" : "text-gray-500"
                              }`}
                            >
                              Date
                            </div>
                            <div
                              className={`text-sm md:text-base font-semibold ${
                                featured ? "text-white" : "text-gray-900"
                              }`}
                            >
                              {new Date(event.date).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                }
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <div
                            className={`p-2 rounded-lg ${
                              featured ? "bg-white/20" : "bg-purple-100"
                            }`}
                          >
                            <Clock
                              className={`h-3 w-3 md:h-4 md:w-4 ${
                                featured ? "text-white" : "text-purple-600"
                              }`}
                            />
                          </div>
                          <div>
                            <div
                              className={`text-xs md:text-sm ${
                                featured ? "text-blue-200" : "text-gray-500"
                              }`}
                            >
                              Time
                            </div>
                            <div
                              className={`text-sm md:text-base font-semibold ${
                                featured ? "text-white" : "text-gray-900"
                              }`}
                            >
                              {eventTime}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <div
                            className={`p-2 rounded-lg ${
                              featured ? "bg-white/20" : "bg-green-100"
                            }`}
                          >
                            <MapPin
                              className={`h-3 w-3 md:h-4 md:w-4 ${
                                featured ? "text-white" : "text-green-600"
                              }`}
                            />
                          </div>
                          <div>
                            <div
                              className={`text-xs md:text-sm ${
                                featured ? "text-blue-200" : "text-gray-500"
                              }`}
                            >
                              Location
                            </div>
                            <div
                              className={`text-sm md:text-base font-semibold ${
                                featured ? "text-white" : "text-gray-900"
                              } truncate`}
                            >
                              {event.location || "UTG Campus"}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <div
                            className={`p-2 rounded-lg ${
                              featured ? "bg-white/20" : "bg-orange-100"
                            }`}
                          >
                            <Users
                              className={`h-3 w-3 md:h-4 md:w-4 ${
                                featured ? "text-white" : "text-orange-600"
                              }`}
                            />
                          </div>
                          <div>
                            <div
                              className={`text-xs md:text-sm ${
                                featured ? "text-blue-200" : "text-gray-500"
                              }`}
                            >
                              Attendees
                            </div>
                            <div
                              className={`text-sm md:text-base font-semibold ${
                                featured ? "text-white" : "text-gray-900"
                              }`}
                            >
                              {Math.floor(Math.random() * 150) + 50}+
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                        <Link
                          href={`/events/${event._id}`}
                          className={`group/btn inline-flex items-center justify-center px-4 sm:px-6 py-3 rounded-xl md:rounded-2xl font-semibold text-sm md:text-base transition-all duration-300 ${
                            featured
                              ? "bg-white text-blue-600 hover:bg-blue-50"
                              : "bg-blue-600 text-white hover:bg-blue-700"
                          }`}
                        >
                          <span>Register Now</span>
                          <ArrowRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                          href={`/events/${event._id}`}
                          className={`inline-flex items-center justify-center px-4 sm:px-6 py-3 rounded-xl md:rounded-2xl font-semibold text-sm md:text-base border-2 transition-all duration-300 ${
                            featured
                              ? "border-white text-white hover:bg-white hover:text-blue-600"
                              : "border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                          }`}
                        >
                          Learn More
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12 md:mt-16">
          <Link
            href="/events"
            className="group inline-flex items-center bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl font-semibold text-base md:text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            <span>View All Events</span>
            <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
