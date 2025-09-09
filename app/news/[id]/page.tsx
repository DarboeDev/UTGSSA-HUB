"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Calendar,
  ArrowLeft,
  User,
  Eye,
  Share2,
  Clock,
  Facebook,
  Twitter,
  Linkedin,
  Link2,
} from "lucide-react";

interface NewsItem {
  _id: string;
  title: string;
  content: string;
  summary: string;
  publishDate: string;
  createdAt: string;
  author: string;
  category: string;
  image: string;
  isPublished: boolean;
}

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

export default function NewsDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [news, setNews] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetchNews(params.id as string);
    }
  }, [params.id]);

  const fetchNews = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/news/${id}`);
      if (response.ok) {
        const data = await response.json();
        setNews(data);
      } else {
        router.push("/news");
      }
    } catch (error) {
      console.error("Error fetching news:", error);
      router.push("/news");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-32 h-32 border-8 border-blue-100 rounded-full animate-spin mx-auto"></div>
            <div className="w-32 h-32 border-8 border-blue-600 border-t-transparent rounded-full animate-spin absolute top-0 left-1/2 transform -translate-x-1/2"></div>
          </div>
          <p className="mt-8 text-xl text-gray-600 font-medium">
            Loading article...
          </p>
          <div className="mt-4 flex justify-center space-x-1">
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce delay-100"></div>
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce delay-200"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!news) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block p-8 bg-white/60 backdrop-blur-sm rounded-2xl mb-6 shadow-xl border border-white/20">
            <Calendar className="h-16 w-16 text-gray-400 mx-auto" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Article not found
          </h3>
          <p className="text-gray-600 max-w-md mx-auto mb-8">
            The article you're looking for doesn't exist or may have been
            removed.
          </p>
          <button
            onClick={() => router.push("/news")}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to News
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Top Navigation Bar */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="inline-flex items-center text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to News
            </button>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <button
                  className="p-2 text-gray-500 hover:text-blue-600 rounded-full hover:bg-blue-50 transition-colors duration-200"
                  title="Share article"
                  aria-label="Share this article"
                >
                  <Share2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Image Section */}
      {news.image && (
        <div className="relative h-[60vh] md:h-[70vh] overflow-hidden">
          <img
            src={news.image}
            alt={news.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

          {/* Article Meta Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
            <div className="max-w-4xl mx-auto">
              <div className="inline-block mb-4">
                <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wide">
                  {getCategoryLabel(news.category)}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                {news.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-white/90">
                <div className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  <span className="font-medium">
                    {news.author || "UTG-SSA"}
                  </span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  <span>
                    {new Date(news.publishDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  <span>
                    {Math.ceil(news.content.split(" ").length / 200)} min read
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-6 md:px-12 py-12">
        {/* Article Header (when no image) */}
        {!news.image && (
          <div className="mb-12">
            <div className="inline-block mb-6">
              <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wide">
                {getCategoryLabel(news.category)}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 leading-tight">
              {news.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-gray-600 pb-8 border-b border-gray-200">
              <div className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                <span className="font-medium">{news.author || "UTG-SSA"}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                <span>
                  {new Date(news.publishDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                <span>
                  {Math.ceil(news.content.split(" ").length / 200)} min read
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Article Summary */}
        {news.summary && (
          <div className="mb-12">
            <div className="text-xl md:text-2xl text-gray-700 leading-relaxed p-8 bg-gray-50 rounded-2xl border-l-4 border-blue-600">
              {news.summary}
            </div>
          </div>
        )}

        {/* Article Content */}
        <div className="prose prose-lg md:prose-xl max-w-none">
          <div
            className="text-gray-800 leading-relaxed [&>p]:mb-6 [&>h1]:text-3xl [&>h1]:font-bold [&>h1]:mb-6 [&>h1]:text-gray-900 [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:mb-4 [&>h2]:text-gray-900 [&>h3]:text-xl [&>h3]:font-bold [&>h3]:mb-4 [&>h3]:text-gray-900"
            dangerouslySetInnerHTML={{
              __html: news.content
                .replace(/\n\n/g, "</p><p>")
                .replace(/\n/g, "<br />")
                .replace(/^/, "<p>")
                .replace(/$/, "</p>"),
            }}
          />
        </div>

        {/* Article Footer */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            {/* Author Info */}
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <User className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">
                  {news.author || "UTG-SSA"}
                </p>
                <p className="text-sm text-gray-600">
                  Published on{" "}
                  {new Date(news.publishDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>

            {/* Social Share */}
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-600 mr-2">Share:</span>
              <button
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors duration-200"
                title="Share on Facebook"
                aria-label="Share on Facebook"
              >
                <Facebook className="h-5 w-5" />
              </button>
              <button
                className="p-2 text-blue-400 hover:bg-blue-50 rounded-full transition-colors duration-200"
                title="Share on Twitter"
                aria-label="Share on Twitter"
              >
                <Twitter className="h-5 w-5" />
              </button>
              <button
                className="p-2 text-blue-700 hover:bg-blue-50 rounded-full transition-colors duration-200"
                title="Share on LinkedIn"
                aria-label="Share on LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </button>
              <button
                className="p-2 text-gray-600 hover:bg-gray-50 rounded-full transition-colors duration-200"
                title="Copy link"
                aria-label="Copy article link"
              >
                <Link2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Footer */}
        <div className="mt-16 text-center">
          <button
            onClick={() => router.push("/news")}
            className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            <ArrowLeft className="mr-3 h-5 w-5" />
            View All News Articles
          </button>
        </div>
      </div>
    </div>
  );
}
