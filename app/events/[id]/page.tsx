"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Calendar,
  Clock,
  MapPin,
  ArrowLeft,
  Users,
  Share2,
  Eye,
  Tag,
  Facebook,
  Twitter,
  Linkedin,
  Link2,
} from "lucide-react";

interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image?: string;
  category: "academic" | "social" | "workshop" | "competition" | "meeting";
  isHighlighted: boolean;
  isActive: boolean;
  createdAt: string;
}

const getCategoryLabel = (category: string) => {
  switch (category) {
    case "academic":
      return "Academic";
    case "social":
      return "Social";
    case "workshop":
      return "Workshop";
    case "competition":
      return "Competition";
    case "meeting":
      return "Meeting";
    default:
      return "Academic";
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case "academic":
      return "from-blue-600 to-blue-700";
    case "social":
      return "from-green-600 to-green-700";
    case "workshop":
      return "from-purple-600 to-purple-700";
    case "competition":
      return "from-orange-600 to-orange-700";
    case "meeting":
      return "from-gray-600 to-gray-700";
    default:
      return "from-blue-600 to-blue-700";
  }
};

export default function EventDetail() {
  const params = useParams();
  const router = useRouter();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const backgroundImageCount = 4; // Number of background images

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % backgroundImageCount
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [backgroundImageCount]);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/events/${params.id}`
        );
        if (response.ok) {
          const data = await response.json();
          setEvent(data);
        }
      } catch (error) {
        console.error("Error fetching event:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [params.id]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const shareEvent = (platform: string) => {
    const url = window.location.href;
    const title = event?.title || "UTG Science Association Event";

    switch (platform) {
      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            url
          )}`
        );
        break;
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(
            title
          )}&url=${encodeURIComponent(url)}`
        );
        break;
      case "linkedin":
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
            url
          )}`
        );
        break;
      case "copy":
        navigator.clipboard.writeText(url);
        break;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white mb-4 mx-auto"></div>
          <p className="text-white text-xl">Loading event...</p>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Event not found
          </h2>
          <button
            onClick={() => router.push("/events")}
            className="px-6 py-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-all duration-300"
          >
            Back to Events
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900">
      {/* Header Navigation */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/10 border-b border-white/20">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.push("/events")}
              className="flex items-center space-x-2 text-white hover:text-blue-300 transition-colors duration-200"
            >
              <ArrowLeft size={20} />
              <span>Back to Events</span>
            </button>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${getCategoryColor(
                    event.category
                  )}`}
                >
                  {getCategoryLabel(event.category)}
                </span>
                {event.isHighlighted && (
                  <span className="px-3 py-1 rounded-full text-xs font-semibold text-yellow-900 bg-yellow-400">
                    Featured
                  </span>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => shareEvent("facebook")}
                  className="p-2 rounded-full bg-white/20 hover:bg-blue-600 transition-all duration-200"
                  title="Share on Facebook"
                  aria-label="Share on Facebook"
                >
                  <Facebook size={16} className="text-white" />
                </button>
                <button
                  onClick={() => shareEvent("twitter")}
                  className="p-2 rounded-full bg-white/20 hover:bg-blue-400 transition-all duration-200"
                  title="Share on Twitter"
                  aria-label="Share on Twitter"
                >
                  <Twitter size={16} className="text-white" />
                </button>
                <button
                  onClick={() => shareEvent("linkedin")}
                  className="p-2 rounded-full bg-white/20 hover:bg-blue-700 transition-all duration-200"
                  title="Share on LinkedIn"
                  aria-label="Share on LinkedIn"
                >
                  <Linkedin size={16} className="text-white" />
                </button>
                <button
                  onClick={() => shareEvent("copy")}
                  className="p-2 rounded-full bg-white/20 hover:bg-gray-600 transition-all duration-200"
                  title="Copy link"
                  aria-label="Copy event link"
                >
                  <Link2 size={16} className="text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        {/* Background Image Carousel */}
        <div className="absolute inset-0">
          {Array.from({ length: backgroundImageCount }).map((_, index) => (
            <div
              key={index}
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
                index === currentImageIndex ? "opacity-100" : "opacity-0"
              } ${
                index === 0
                  ? "hero-bg-1"
                  : index === 1
                  ? "hero-bg-2"
                  : index === 2
                  ? "hero-bg-3"
                  : "hero-bg-4"
              }`}
            />
          ))}
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-purple-900/60 to-blue-900/80" />

        {/* Hero Content */}
        <div className="relative h-full flex items-center">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              {event.title}
            </h1>

            {/* Event Meta Information */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-white/90">
              <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                <Calendar size={18} />
                <span className="font-medium">{formatDate(event.date)}</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                <Clock size={18} />
                <span className="font-medium">{event.time}</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                <MapPin size={18} />
                <span className="font-medium">{event.location}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-16">
        {/* Event Image */}
        {event.image && (
          <div className="mb-12 rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={`http://localhost:5000${event.image}`}
              alt={event.title}
              className="w-full h-96 object-cover"
            />
          </div>
        )}

        {/* Event Description */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Eye className="mr-3" size={24} />
            Event Details
          </h2>
          <div className="text-white/90 text-lg leading-relaxed whitespace-pre-wrap">
            {event.description}
          </div>
        </div>

        {/* Additional Information */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <Calendar className="mr-3" size={20} />
              When & Where
            </h3>
            <div className="space-y-3 text-white/90">
              <div className="flex items-center">
                <span className="font-semibold mr-2">Date:</span>
                <span>{formatDate(event.date)}</span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold mr-2">Time:</span>
                <span>{event.time}</span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold mr-2">Location:</span>
                <span>{event.location}</span>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <Tag className="mr-3" size={20} />
              Event Information
            </h3>
            <div className="space-y-3 text-white/90">
              <div className="flex items-center">
                <span className="font-semibold mr-2">Category:</span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${getCategoryColor(
                    event.category
                  )}`}
                >
                  {getCategoryLabel(event.category)}
                </span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold mr-2">Status:</span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    event.isActive
                      ? "text-green-900 bg-green-400"
                      : "text-red-900 bg-red-400"
                  }`}
                >
                  {event.isActive ? "Active" : "Inactive"}
                </span>
              </div>
              {event.isHighlighted && (
                <div className="flex items-center">
                  <span className="font-semibold mr-2">Featured:</span>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold text-yellow-900 bg-yellow-400">
                    Highlighted Event
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              Interested in this event?
            </h3>
            <p className="text-white/90 mb-6">
              Contact the UTG Science Association for more information or to
              register.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
                Register Now
              </button>
              <button className="px-8 py-3 bg-white/20 backdrop-blur-md text-white font-semibold rounded-full hover:bg-white/30 transition-all duration-300">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
