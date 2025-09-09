"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  User,
  ArrowLeft,
  Clock,
  Eye,
  Heart,
  Tag,
  Share2,
} from "lucide-react";
import Loader from "@/components/ui/Loader";

interface Blog {
  _id: string;
  title: string;
  content: string;
  summary: string;
  author: string;
  image: string;
  category: string;
  tags: string[];
  publishDate: string;
  createdAt: string;
  likes: number;
  readingTime: number;
  isPublished: boolean;
}

export default function BlogDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (params.id) {
      fetchBlog(params.id as string);
    }
  }, [params.id]);

  const fetchBlog = async (id: string) => {
    try {
      const response = await fetch(`/api/blogs/${id}`);
      if (response.ok) {
        const result = await response.json();
        setBlog(result.data);
      } else {
        router.push("/blogs");
      }
    } catch (error) {
      console.error("Error fetching blog:", error);
      router.push("/blogs");
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async () => {
    if (!blog || liked) return;

    try {
      const response = await fetch(`/api/blogs/${blog._id}/like`, {
        method: "POST",
      });
      if (response.ok) {
        const result = await response.json();
        setBlog((prev) =>
          prev ? { ...prev, likes: result.data.likes } : null
        );
        setLiked(true);
      }
    } catch (error) {
      console.error("Error liking blog:", error);
    }
  };

  if (loading) {
    return <Loader text="Loading article..." variant="light" fullScreen />;
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center px-4">
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl font-bold">
              <span className="bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent">
                404
              </span>
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full mt-4"></div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">
            Blog post not found
          </h2>
          <p className="text-white/70 text-lg mb-8">
            The article you're looking for doesn't exist or has been moved.
          </p>
          <Link
            href="/blogs"
            className="mt-6 inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 group"
          >
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
            Back to blogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[70vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 z-10" />
        <Image
          src={blog.image}
          alt={blog.title}
          fill
          className="object-cover"
          priority
        />

        {/* Content overlay */}
        <div className="absolute inset-0 z-20 flex flex-col justify-end">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
            {/* Back button */}
            <Link
              href="/blogs"
              className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 hover:border-white/30 transition-all duration-300 rounded-full mb-8 group"
            >
              <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
              <span className="font-medium">Back to blogs</span>
            </Link>

            {/* Category badge */}
            <div className="mb-4">
              <span
                className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium text-white ${
                  blog.category === "research"
                    ? "bg-green-500/90"
                    : blog.category === "tutorial"
                    ? "bg-blue-500/90"
                    : blog.category === "experience"
                    ? "bg-purple-500/90"
                    : blog.category === "opinion"
                    ? "bg-orange-500/90"
                    : "bg-gray-500/90"
                }`}
              >
                <Tag className="h-4 w-4 mr-2" />
                {blog.category.charAt(0).toUpperCase() + blog.category.slice(1)}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              {blog.title}
            </h1>

            {/* Meta information */}
            <div className="flex flex-wrap items-center text-white/90 text-sm mb-6 gap-6">
              <div className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                <span className="font-medium">{blog.author}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                {new Date(blog.publishDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                {blog.readingTime} min read
              </div>
            </div>

            {/* Summary */}
            <p className="text-xl text-white/90 leading-relaxed max-w-3xl">
              {blog.summary}
            </p>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Engagement bar */}
        <div className="flex items-center justify-between mb-12 p-6 bg-gray-50 rounded-2xl border border-gray-100">
          <div className="flex items-center space-x-6">
            <button
              onClick={handleLike}
              disabled={liked}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all ${
                liked
                  ? "bg-red-500 text-white"
                  : "bg-white text-gray-700 hover:bg-red-50 hover:text-red-600 border border-gray-200"
              }`}
            >
              <Heart className={`h-5 w-5 ${liked ? "fill-current" : ""}`} />
              <span>{blog.likes.toLocaleString()}</span>
            </button>

            <button className="flex items-center space-x-2 px-4 py-2 rounded-full bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 border border-gray-200 transition-all">
              <Share2 className="h-5 w-5" />
              <span>Share</span>
            </button>
          </div>
        </div>

        {/* Article content */}
        <div className="prose prose-lg max-w-none">
          <div
            className="text-gray-800 leading-relaxed"
            style={{
              fontSize: "18px",
              lineHeight: "1.8",
            }}
          >
            {blog.content.split("\n").map((paragraph, index) => (
              <p key={index} className="mb-6">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
            <div className="flex flex-wrap gap-3">
              {blog.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-4 py-2 rounded-full text-sm bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 transition-colors cursor-pointer"
                >
                  <Tag className="h-4 w-4 mr-2" />
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Author info */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              About the Author
            </h3>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                  <User className="h-8 w-8 text-white" />
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900">
                  {blog.author}
                </h4>
                <p className="text-gray-600 mt-2">
                  Science student at the University of The Gambia, passionate
                  about sharing knowledge and experiences with fellow students.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Back to blogs button */}
        <div className="mt-12 text-center">
          <Link
            href="/blogs"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            More Student Blogs
          </Link>
        </div>
      </div>
    </div>
  );
}
