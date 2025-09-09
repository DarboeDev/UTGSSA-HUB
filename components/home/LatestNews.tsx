"use client";
import Link from "next/link";
import { ArrowRight, Calendar, Eye, TrendingUp } from "lucide-react";
import { useState, useEffect } from "react";

interface NewsItem {
  _id: string;
  title: string;
  description: string;
  content?: string;
  image?: string;
  author?: string;
  createdAt: string;
  updatedAt: string;
}

const getCategoryColor = (category: string) => {
  switch (category.toLowerCase()) {
    case "research":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "events":
      return "bg-purple-100 text-purple-800 border-purple-200";
    case "scholarships":
      return "bg-green-100 text-green-800 border-green-200";
    case "academic":
      return "bg-orange-100 text-orange-800 border-orange-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

export default function LatestNews() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("/api/news?limit=4");
        if (!response.ok) {
          throw new Error("Failed to fetch news");
        }

        const data = await response.json();
        setNewsItems(data || []);
      } catch (err) {
        console.error("Error fetching news:", err);
        setError(err instanceof Error ? err.message : "Failed to load news");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  // Helper function to determine category based on title/content
  const getItemCategory = (item: NewsItem) => {
    const title = item.title.toLowerCase();
    if (title.includes("research") || title.includes("lab")) return "Research";
    if (
      title.includes("event") ||
      title.includes("fair") ||
      title.includes("seminar")
    )
      return "Events";
    if (title.includes("scholarship") || title.includes("award"))
      return "Scholarships";
    return "Academic";
  };

  // Helper function to calculate read time
  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(" ").length;
    const readTime = Math.ceil(wordCount / wordsPerMinute);
    return `${readTime} min read`;
  };

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 rounded-full px-4 py-2 text-sm font-semibold mb-4">
              <TrendingUp className="h-4 w-4" />
              <span>Latest Updates</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Stay{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Informed
              </span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100 animate-pulse"
              >
                <div className="w-full h-48 lg:h-56 bg-gray-200"></div>
                <div className="p-8">
                  <div className="h-4 bg-gray-200 rounded mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
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
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-red-600">Error loading news: {error}</p>
        </div>
      </section>
    );
  }
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 rounded-full px-4 py-2 text-sm font-semibold mb-4">
            <TrendingUp className="h-4 w-4" />
            <span>Latest Updates</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Stay{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Informed
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Stay updated with the latest announcements, developments, and
            exciting news from the UTG Science Student Association community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8">
          {newsItems.map((item, index) => {
            const category = getItemCategory(item);
            const readTime = calculateReadTime(
              item.content || item.description
            );

            return (
              <article
                key={item._id}
                className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-blue-200"
              >
                <div className="relative overflow-hidden">
                  <div className="aspect-w-16 aspect-h-9">
                    <img
                      src={item.image || "/images/picture1.jpg"}
                      alt={item.title}
                      className="w-full h-48 lg:h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="absolute top-4 left-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold border ${getCategoryColor(
                        category
                      )}`}
                    >
                      {category}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                <div className="p-8">
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(item.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </div>
                      <div className="flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        {Math.floor(Math.random() * 300) + 50}
                      </div>
                    </div>
                    <span className="text-blue-600 font-medium">
                      {readTime}
                    </span>
                  </div>

                  <h3 className="font-bold text-xl text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {item.title}
                  </h3>

                  <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">
                    {item.description}
                  </p>

                  <Link
                    href={`/news/${item._id}`}
                    className="group/link inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                  >
                    <span>Read full story</span>
                    <ArrowRight className="h-4 w-4 ml-2 group-hover/link:translate-x-2 transition-transform duration-300" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        <div className="text-center mt-16">
          <Link
            href="/news"
            className="group inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            <span>Explore All News</span>
            <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
