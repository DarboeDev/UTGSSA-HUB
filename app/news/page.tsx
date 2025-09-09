"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Calendar,
  ArrowRight,
  Search,
  Newspaper,
  TrendingUp,
  Eye,
  User,
  RefreshCw,
} from "lucide-react";
import Loader from "@/components/ui/Loader";

const backgroundImages = [
  "/images/picture1.jpg", // Your local image 1
  "/images/picture2.jpg", // Your local image 2
  "/images/picture1.jpg", // Repeat for smoother cycling
  "/images/picture2.jpg", // Repeat for smoother cycling
];

interface NewsItem {
  _id: string;
  title: string;
  summary: string;
  content: string;
  image?: string;
  author: string;
  category: "announcement" | "achievement" | "event" | "general";
  isPublished: boolean;
  publishDate: string;
  createdAt: string;
  updatedAt: string;
}

// Helper function to get category labels
const getCategoryLabel = (category: string) => {
  switch (category) {
    case "announcement":
      return "Announcement";
    case "achievement":
      return "Achievement";
    case "event":
      return "Event";
    case "general":
      return "General";
    default:
      return "General";
  }
};

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
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
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await fetch(
        "https://utgssa-backend.onrender.com/api/news"
      );
      if (response.ok) {
        const data = await response.json();
        setNews(data);
      }
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredNews = news.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <Loader text="Loading news..." fullScreen />;
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
              <Newspaper className="h-20 w-20 text-white drop-shadow-lg" />
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 animate-fade-in drop-shadow-2xl">
              Latest{" "}
              <span className="bg-gradient-to-r from-blue-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent">
                News
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/95 max-w-4xl mx-auto leading-relaxed animate-slide-up mb-12 drop-shadow-lg">
              Stay updated with the latest announcements, achievements, and
              developments from the UTG Science Student Association community.
            </p>

            {/* Search Bar in Hero */}
            <div className="max-w-md mx-auto mb-16">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search news..."
                  className="w-full pl-12 pr-6 py-4 bg-white/20 backdrop-blur-md border border-white/30 rounded-full focus:ring-2 focus:ring-white/50 focus:border-white/50 text-white placeholder-white/70 font-medium transition-all duration-300"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
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
          {/* News Grid */}
          {filteredNews.length === 0 ? (
            <div className="text-center py-20">
              <div className="inline-block p-8 bg-white/60 backdrop-blur-sm rounded-2xl mb-6 shadow-xl border border-white/20">
                <Newspaper className="h-16 w-16 text-gray-400 mx-auto" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                No news found
              </h3>
              <p className="text-gray-600 max-w-md mx-auto">
                {searchTerm
                  ? `No news articles match "${searchTerm}". Try a different search term.`
                  : "No news articles available at the moment. Check back later!"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {filteredNews.map((newsItem, index) => (
                <article
                  key={newsItem._id}
                  className="group relative bg-white/90 backdrop-blur-md rounded-3xl overflow-hidden hover:bg-white/95 transition-all duration-500 shadow-xl hover:shadow-2xl transform hover:-translate-y-4 border border-white/40 hover:border-white/60"
                >
                  {/* News Image */}
                  <div className="relative overflow-hidden">
                    <div className="aspect-[16/10] bg-gradient-to-br from-blue-100 to-purple-100">
                      {newsItem.image ? (
                        <img
                          src={newsItem.image}
                          alt={newsItem.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-200 to-purple-200">
                          <Newspaper className="h-16 w-16 text-gray-400" />
                        </div>
                      )}
                      {/* Image overlay for better text readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>

                    {/* Floating badges */}
                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-full shadow-xl border border-white/50 group-hover:bg-blue-50/95 transition-all duration-300">
                      <span className="text-xs font-bold text-blue-600">
                        {new Date(newsItem.publishDate).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "2-digit",
                          }
                        )}
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4">
                      <div className="flex items-center space-x-2">
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full shadow-lg group-hover:from-blue-700 group-hover:to-purple-700 transition-all duration-300 border border-white/20">
                          <span className="text-xs font-semibold uppercase tracking-wide">
                            {getCategoryLabel(newsItem.category)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6 space-y-4">
                    <h3 className="text-xl font-bold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300 leading-tight">
                      {newsItem.title}
                    </h3>

                    <p className="text-gray-600 line-clamp-3 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                      {newsItem.summary}
                    </p>

                    {/* Author and Stats */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 group-hover:border-gray-200 transition-colors duration-300">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300 shadow-lg">
                          <User className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <span className="text-sm font-semibold text-gray-800 group-hover:text-gray-900 transition-colors duration-300">
                            {newsItem.author || "SSA Team"}
                          </span>
                          <p className="text-xs text-gray-500">
                            {new Date(
                              newsItem.publishDate
                            ).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      {/* <div className="flex items-center space-x-4 text-sm text-gray-500 group-hover:text-gray-600 transition-colors duration-300">
                        <div className="flex items-center space-x-1">
                          <Eye className="h-4 w-4" />
                          <span>{Math.floor(Math.random() * 500) + 50}</span>
                        </div>
                      </div> */}
                    </div>

                    {/* Action Button */}
                    <Link
                      href={`/news/${newsItem._id}`}
                      className="block w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-center py-3 px-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl group-hover:shadow-blue-500/25 transform group-hover:scale-[1.02]"
                    >
                      <span className="flex items-center justify-center">
                        Read Full Story
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </Link>
                  </div>

                  {/* Subtle glow effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl"></div>
                </article>
              ))}
            </div>
          )}

          {/* Load More Button */}
          {filteredNews.length > 0 && (
            <div className="text-center mt-16">
              <button className="inline-flex items-center px-8 py-4 bg-white/80 backdrop-blur-md hover:bg-white/90 text-gray-900 font-semibold rounded-2xl transition-all duration-300 transform hover:-translate-y-1 shadow-xl hover:shadow-2xl border border-white/30 group">
                <RefreshCw className="mr-2 h-5 w-5 group-hover:rotate-180 transition-transform duration-500" />
                Load More News
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
