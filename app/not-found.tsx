"use client";

import Link from "next/link";
import { ArrowLeft, Home, Search, BookOpen } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 -left-20 w-40 h-40 bg-white/5 rounded-full animate-float"></div>
        <div className="absolute top-40 right-10 w-60 h-60 bg-blue-500/10 rounded-full animate-float-delayed"></div>
        <div className="absolute bottom-20 left-20 w-32 h-32 bg-purple-500/10 rounded-full animate-float"></div>
      </div>

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {/* 404 Display */}
        <div className="mb-8">
          <h1 className="text-9xl md:text-[12rem] font-bold">
            <span className="bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent">
              404
            </span>
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full"></div>
        </div>

        {/* Error Message */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Oops! Page Not Found
          </h2>
          <p className="text-xl text-white/80 leading-relaxed max-w-2xl mx-auto">
            The page you're looking for seems to have wandered off into the
            digital void. Don't worry, even the best explorers get lost
            sometimes!
          </p>
        </div>

        {/* Search Suggestion */}
        <div className="mb-12">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 max-w-md mx-auto">
            <Search className="h-8 w-8 text-blue-300 mx-auto mb-3" />
            <p className="text-white/90 text-sm">
              Try searching for what you need, or navigate back to safety
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 group"
          >
            <Home className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform" />
            Go Home
          </Link>

          <Link
            href="/blogs"
            className="inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 hover:border-white/30 transition-all duration-300 rounded-full group"
          >
            <BookOpen className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform" />
            Browse Blogs
          </Link>

          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 hover:border-white/30 transition-all duration-300 rounded-full group"
          >
            <ArrowLeft className="h-5 w-5 mr-3 group-hover:-translate-x-1 transition-transform" />
            Go Back
          </button>
        </div>

        {/* Fun Quote */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-white/5 to-blue-500/5 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto border border-white/10">
            <p className="text-white/70 italic text-lg mb-2">
              "Not all those who wander are lost... but this page definitely
              is!"
            </p>
            <p className="text-white/50 text-sm">
              — The UTG Science Students Association
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }

        @keyframes float-delayed {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-30px) rotate(-180deg);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
