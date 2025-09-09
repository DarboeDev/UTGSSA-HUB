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
import Loader from "@/components/ui/Loader";

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
          `https://utgssa-backend.onrender.com/api/events/${params.id}`
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
    return <Loader text="Loading event..." fullScreen />;
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      {/* Header Navigation */}
      <header className="fixed top-0 left-0 right-0 z-[9999] bg-white shadow-xl border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.push("/events")}
              className="flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              <ArrowLeft size={20} />
              <span>Back to Events</span>
            </button>

            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="flex items-center space-x-2">
                <span
                  className={`px-3 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r ${getCategoryColor(
                    event.category
                  )} shadow-lg`}
                >
                  {getCategoryLabel(event.category)}
                </span>
                {event.isHighlighted && (
                  <span className="px-3 py-2 rounded-xl text-sm font-semibold text-yellow-900 bg-yellow-400 shadow-lg">
                    Featured
                  </span>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => shareEvent("facebook")}
                  className="p-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition-all duration-200 shadow-lg transform hover:scale-110"
                  title="Share on Facebook"
                  aria-label="Share on Facebook"
                >
                  <Facebook size={16} className="text-white" />
                </button>
                <button
                  onClick={() => shareEvent("twitter")}
                  className="p-3 rounded-xl bg-blue-400 hover:bg-blue-500 transition-all duration-200 shadow-lg transform hover:scale-110"
                  title="Share on Twitter"
                  aria-label="Share on Twitter"
                >
                  <Twitter size={16} className="text-white" />
                </button>
                <button
                  onClick={() => shareEvent("linkedin")}
                  className="p-3 rounded-xl bg-blue-700 hover:bg-blue-800 transition-all duration-200 shadow-lg transform hover:scale-110"
                  title="Share on LinkedIn"
                  aria-label="Share on LinkedIn"
                >
                  <Linkedin size={16} className="text-white" />
                </button>
                <button
                  onClick={() => shareEvent("copy")}
                  className="p-3 rounded-xl bg-gray-600 hover:bg-gray-700 transition-all duration-200 shadow-lg transform hover:scale-110"
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
      <section className="relative h-96 sm:h-[28rem] overflow-hidden pt-20 sm:pt-24">
        {/* Background Image Carousel */}
        <div className="absolute inset-0">
          {Array.from({ length: backgroundImageCount }).map((_, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentImageIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src="/images/picture1.jpg"
                alt={`Background ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-purple-900/60 to-blue-900/80" />

        {/* Hero Content */}
        <div className="relative h-full flex items-center">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
            <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight px-4">
              {event.title}
            </h1>

            {/* Event Meta Information */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-white/90 px-4">
              <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-2 text-sm">
                <Calendar size={16} />
                <span className="font-medium hidden sm:inline">
                  {formatDate(event.date)}
                </span>
                <span className="font-medium sm:hidden">
                  {new Date(event.date).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-2 text-sm">
                <Clock size={16} />
                <span className="font-medium">{event.time}</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-2 text-sm">
                <MapPin size={16} />
                <span className="font-medium truncate max-w-32 sm:max-w-none">
                  {event.location}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
        {/* Event Image */}
        {event.image && (
          <div className="mb-8 sm:mb-12 rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={`https://utgssa-backend.onrender.com${event.image}`}
              alt={event.title}
              className="w-full h-64 sm:h-96 object-cover"
            />
          </div>
        )}

        {/* Event Description */}
        <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 sm:p-8 mb-8 sm:mb-12 shadow-lg border border-gray-200/50">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center">
            <Eye className="mr-3 text-blue-600" size={24} />
            Event Details
          </h2>
          <div className="text-gray-700 text-base sm:text-lg leading-relaxed whitespace-pre-wrap">
            {event.description}
          </div>
        </div>

        {/* Additional Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-200/50">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center">
              <Calendar className="mr-3 text-blue-600" size={20} />
              When & Where
            </h3>
            <div className="space-y-3 text-gray-700">
              <div className="flex items-start">
                <span className="font-semibold mr-2 text-sm sm:text-base">
                  Date:
                </span>
                <span className="text-sm sm:text-base">
                  {formatDate(event.date)}
                </span>
              </div>
              <div className="flex items-start">
                <span className="font-semibold mr-2 text-sm sm:text-base">
                  Time:
                </span>
                <span className="text-sm sm:text-base">{event.time}</span>
              </div>
              <div className="flex items-start">
                <span className="font-semibold mr-2 text-sm sm:text-base">
                  Location:
                </span>
                <span className="text-sm sm:text-base">{event.location}</span>
              </div>
            </div>
          </div>

          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-200/50">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center">
              <Tag className="mr-3 text-blue-600" size={20} />
              Event Information
            </h3>
            <div className="space-y-3 text-gray-700">
              <div className="flex items-center flex-wrap">
                <span className="font-semibold mr-2 text-sm sm:text-base">
                  Category:
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${getCategoryColor(
                    event.category
                  )} shadow-md`}
                >
                  {getCategoryLabel(event.category)}
                </span>
              </div>
              <div className="flex items-center flex-wrap">
                <span className="font-semibold mr-2 text-sm sm:text-base">
                  Status:
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold shadow-md ${
                    event.isActive
                      ? "text-green-900 bg-green-400"
                      : "text-red-900 bg-red-400"
                  }`}
                >
                  {event.isActive ? "Active" : "Inactive"}
                </span>
              </div>
              {event.isHighlighted && (
                <div className="flex items-center flex-wrap">
                  <span className="font-semibold mr-2 text-sm sm:text-base">
                    Featured:
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold text-yellow-900 bg-yellow-400 shadow-md">
                    Highlighted Event
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        {/* <div className="mt-8 sm:mt-12 text-center">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-200/50">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
              Interested in this event?
            </h3>
            <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
              Contact the UTG Science Association for more information or to
              register.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <button className="px-6 sm:px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg text-sm sm:text-base">
                Register Now
              </button>
              <button className="px-6 sm:px-8 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold rounded-full transition-all duration-300 shadow-md text-sm sm:text-base">
                Contact Us
              </button>
            </div>
          </div>
        </div> */}
      </main>
    </div>
  );
}
