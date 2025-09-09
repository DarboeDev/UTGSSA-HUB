"use client";
import Link from "next/link";
import {
  ChevronRight,
  Users,
  BookOpen,
  Calendar,
  Play,
  Star,
  Award,
  Microscope,
} from "lucide-react";
import { useState, useEffect } from "react";

const backgroundImages = [
  "/images/picture1.jpg", // Your local image 1
  "/images/picture2.jpg", // Your local image 2
  "/images/picture1.jpg", // Repeat for smoother cycling
  "/images/picture2.jpg", // Repeat for smoother cycling
];

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % backgroundImages.length
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const stats = [
    { number: "500+", label: "Active Members" },
    { number: "50+", label: "Events Annually" },
    { number: "20+", label: "Departments" },
    { number: "95%", label: "Satisfaction Rate" },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Image Slider */}
      <div className="absolute inset-0">
        {backgroundImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <div
              className="w-full h-full bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${image})` }}
            />
          </div>
        ))}
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-indigo-900/85 to-purple-900/90"></div>

      {/* Animated Particles */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-3 h-3 bg-purple-400 rounded-full animate-bounce"></div>
        <div className="absolute bottom-40 left-20 w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
        <div className="absolute top-60 left-1/3 w-1 h-1 bg-white rounded-full animate-pulse"></div>
        <div className="absolute bottom-60 right-1/3 w-2 h-2 bg-blue-300 rounded-full animate-bounce"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 text-white">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center space-x-2 bg-blue-600/20 backdrop-blur-sm border border-blue-400/30 rounded-full px-4 py-2 text-sm font-medium text-blue-200">
              <Star className="h-4 w-4" />
              <span>Empowering Future Scientists</span>
            </div>
            <h1 className="text-4xl md:text-7xl font-bold leading-tight tracking-tight">
              <span className="bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent">
                UTG Science Student
              </span>
              <span className="block bg-gradient-to-r from-blue-300 via-cyan-300 to-purple-300 bg-clip-text text-transparent mt-2">
                Association
              </span>
            </h1>
          </div>

          <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed font-light">
            Empowering the next generation of scientists through collaboration,
            innovation, and academic excellence at the
            <span className="font-semibold text-white">
              {" "}
              University of The Gambia
            </span>
            .
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/about"
              className="group bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-10 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 flex items-center space-x-3 shadow-2xl hover:shadow-blue-500/25 hover:scale-105 transform"
            >
              <span>Discover More</span>
              <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/events"
              className="group border-2 border-white/30 backdrop-blur-sm text-white hover:bg-white hover:text-blue-900 px-10 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 flex items-center space-x-3"
            >
              <Play className="h-5 w-5 group-hover:scale-110 transition-transform" />
              <span>Watch Introduction</span>
            </Link>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-8 border-t border-white/20">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-blue-200 text-sm font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          <div className="group text-center p-8 bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl mb-6 group-hover:scale-110 transition-transform">
              <Users className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-white">
              Vibrant Community
            </h3>
            <p className="text-blue-100 leading-relaxed">
              Connect with passionate science students, share ideas, and build
              lasting friendships in our inclusive community.
            </p>
          </div>

          <div className="group text-center p-8 bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mb-6 group-hover:scale-110 transition-transform">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-white">
              Rich Resources
            </h3>
            <p className="text-blue-100 leading-relaxed">
              Access comprehensive academic materials, research papers, and
              exclusive study resources curated by experts.
            </p>
          </div>

          <div className="group text-center p-8 bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl mb-6 group-hover:scale-110 transition-transform">
              <Microscope className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-white">
              Research Excellence
            </h3>
            <p className="text-blue-100 leading-relaxed">
              Engage in cutting-edge research projects, workshops, and
              scientific seminars to advance your knowledge.
            </p>
          </div>
        </div>

        {/* Image Slider Indicators */}
        <div className="flex justify-center space-x-3 mt-12">
          {backgroundImages.map((_, index) => (
            <button
              title="Slide Indicator"
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentImageIndex
                  ? "bg-white scale-125"
                  : "bg-white/40 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
