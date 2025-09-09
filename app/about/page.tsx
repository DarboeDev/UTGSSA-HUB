"use client";
import {
  Mail,
  MapPin,
  Phone,
  Target,
  Eye,
  Users,
  Beaker,
  Lightbulb,
  Award,
  BookOpen,
} from "lucide-react";
import { useState, useEffect } from "react";

const backgroundImages = [
  "/images/picture1.jpg", // Your local image 1
  "/images/picture2.jpg", // Your local image 2
  "/images/picture1.jpg", // Repeat for smoother cycling
  "/images/picture2.jpg", // Repeat for smoother cycling
];

export default function About() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % backgroundImages.length
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

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
              <Beaker className="h-20 w-20 text-white drop-shadow-lg" />
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 animate-fade-in drop-shadow-2xl">
              About{" "}
              <span className="bg-gradient-to-r from-blue-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent">
                UTG Science Student Association
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/95 max-w-4xl mx-auto leading-relaxed animate-slide-up mb-12 drop-shadow-lg">
              We are a vibrant community of science students at the University
              of The Gambia, dedicated to fostering academic excellence,
              innovation, and collaboration among our peers.
            </p>

            {/* CTA Button */}
            <div className="mb-16">
              <button className="group bg-white/20 backdrop-blur-md hover:bg-white/30 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 border border-white/30 shadow-xl">
                <span className="flex items-center">
                  Learn More About Us
                  <BookOpen className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
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
        {/* Decorative background elements positioned after the header */}
        <div className="absolute top-20 left-[10%] w-32 h-32 bg-blue-100 rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute top-32 right-[20%] w-24 h-24 bg-purple-100 rounded-full blur-2xl opacity-40 animate-float"></div>
        <div className="absolute top-80 left-[25%] w-28 h-28 bg-cyan-100 rounded-full blur-3xl opacity-20 animate-float-delayed"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* Mission & Vision Section */}
          <div className="mb-32">
            <div className="text-center mb-20">
              <div className="inline-block p-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-8 animate-pulse">
                <Target className="h-12 w-12 text-white" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
                Our Foundation
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Built on strong principles and forward-thinking vision
              </p>
              <div className="mt-8 flex justify-center">
                <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div className="group relative">
                {/* Background decoration */}
                <div className="absolute -top-6 -left-6 w-full h-full bg-gradient-to-br from-blue-100 to-blue-50 rounded-3xl transform rotate-3 group-hover:rotate-6 transition-transform duration-500 opacity-50"></div>

                <div className="relative bg-white rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-700 p-12 border border-gray-100 hover:border-blue-200 transform hover:-translate-y-4">
                  <div className="flex items-center mb-10">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-3xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity"></div>
                      <div className="relative p-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded-3xl group-hover:scale-110 transition-transform duration-300">
                        <Target className="h-12 w-12 text-white" />
                      </div>
                    </div>
                    <h3 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent ml-6">
                      Our Mission
                    </h3>
                  </div>

                  <div className="space-y-6">
                    <p className="text-gray-700 leading-relaxed text-lg">
                      To empower science students at UTG by providing a platform
                      for academic growth, professional development, and
                      meaningful collaboration.
                    </p>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      We strive to bridge the gap between theoretical knowledge
                      and practical application while fostering innovation and
                      research excellence among our members.
                    </p>
                  </div>

                  <div className="mt-8 flex space-x-2">
                    <div className="h-2 w-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
                    <div className="h-2 w-8 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full"></div>
                    <div className="h-2 w-4 bg-gradient-to-r from-blue-300 to-blue-400 rounded-full"></div>
                  </div>
                </div>
              </div>

              <div className="group relative">
                {/* Background decoration */}
                <div className="absolute -top-6 -right-6 w-full h-full bg-gradient-to-br from-purple-100 to-purple-50 rounded-3xl transform -rotate-3 group-hover:-rotate-6 transition-transform duration-500 opacity-50"></div>

                <div className="relative bg-white rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-700 p-12 border border-gray-100 hover:border-purple-200 transform hover:-translate-y-4">
                  <div className="flex items-center mb-10">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-purple-600 rounded-3xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity"></div>
                      <div className="relative p-6 bg-gradient-to-r from-purple-500 to-purple-600 rounded-3xl group-hover:scale-110 transition-transform duration-300">
                        <Eye className="h-12 w-12 text-white" />
                      </div>
                    </div>
                    <h3 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent ml-6">
                      Our Vision
                    </h3>
                  </div>

                  <div className="space-y-6">
                    <p className="text-gray-700 leading-relaxed text-lg">
                      To be the leading student organization that nurtures the
                      next generation of scientists and innovators in The
                      Gambia.
                    </p>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      We envision a community where every science student has
                      access to quality resources, mentorship, and opportunities
                      to contribute meaningfully to scientific advancement.
                    </p>
                  </div>

                  <div className="mt-8 flex space-x-2">
                    <div className="h-2 w-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full"></div>
                    <div className="h-2 w-8 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full"></div>
                    <div className="h-2 w-4 bg-gradient-to-r from-purple-300 to-purple-400 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* What We Do Section */}
          <div className="mb-32">
            <div className="text-center mb-20">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mb-8 animate-spin-slow">
                <Lightbulb className="h-10 w-10 text-white animate-pulse" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-6">
                What We Do
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Our association is actively involved in various initiatives to
                support and develop our student community
              </p>
              <div className="mt-8 flex justify-center">
                <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"></div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {/* Academic Support */}
              <div className="group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-3xl transform rotate-1 group-hover:rotate-3 transition-transform duration-500"></div>
                <div className="relative bg-white rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-700 border border-gray-100 hover:border-blue-200 transform hover:-translate-y-6 group">
                  <div className="relative mb-8">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                    <div className="relative w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-3xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-2xl">
                      <BookOpen className="h-10 w-10 text-white" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 group-hover:text-blue-600 transition-colors">
                    Academic Support
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-lg mb-6">
                    Comprehensive tutoring sessions, collaborative study groups,
                    and extensive academic resources to help students achieve
                    excellence.
                  </p>
                  <div className="flex items-center text-blue-600 font-semibold group-hover:translate-x-2 transition-transform">
                    <span>Learn More</span>
                    <BookOpen className="ml-2 h-4 w-4" />
                  </div>
                </div>
              </div>

              {/* Research Promotion */}
              <div className="group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-green-600/5 rounded-3xl transform -rotate-1 group-hover:-rotate-3 transition-transform duration-500"></div>
                <div className="relative bg-white rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-700 border border-gray-100 hover:border-green-200 transform hover:-translate-y-6 group">
                  <div className="relative mb-8">
                    <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-600 rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                    <div className="relative w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-3xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-2xl">
                      <Beaker className="h-10 w-10 text-white" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 group-hover:text-green-600 transition-colors">
                    Research Promotion
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-lg mb-6">
                    Innovative research workshops, student-faculty
                    collaboration, and platforms to showcase groundbreaking
                    research projects.
                  </p>
                  <div className="flex items-center text-green-600 font-semibold group-hover:translate-x-2 transition-transform">
                    <span>Learn More</span>
                    <Beaker className="ml-2 h-4 w-4" />
                  </div>
                </div>
              </div>

              {/* Professional Development */}
              <div className="group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-purple-600/5 rounded-3xl transform rotate-1 group-hover:rotate-3 transition-transform duration-500"></div>
                <div className="relative bg-white rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-700 border border-gray-100 hover:border-purple-200 transform hover:-translate-y-6 group">
                  <div className="relative mb-8">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-purple-600 rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                    <div className="relative w-20 h-20 bg-gradient-to-r from-purple-500 to-purple-600 rounded-3xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-2xl">
                      <Award className="h-10 w-10 text-white" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 group-hover:text-purple-600 transition-colors">
                    Professional Development
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-lg mb-6">
                    Career guidance seminars, industry expert talks, and
                    networking events to prepare students for successful
                    careers.
                  </p>
                  <div className="flex items-center text-purple-600 font-semibold group-hover:translate-x-2 transition-transform">
                    <span>Learn More</span>
                    <Award className="ml-2 h-4 w-4" />
                  </div>
                </div>
              </div>

              {/* Community Building */}
              <div className="group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-orange-600/5 rounded-3xl transform -rotate-1 group-hover:-rotate-3 transition-transform duration-500"></div>
                <div className="relative bg-white rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-700 border border-gray-100 hover:border-orange-200 transform hover:-translate-y-6 group">
                  <div className="relative mb-8">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                    <div className="relative w-20 h-20 bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-2xl">
                      <Users className="h-10 w-10 text-white" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 group-hover:text-orange-600 transition-colors">
                    Community Building
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-lg mb-6">
                    Foster unity and belonging through engaging social events,
                    collaborative projects, and team-building activities.
                  </p>
                  <div className="flex items-center text-orange-600 font-semibold group-hover:translate-x-2 transition-transform">
                    <span>Learn More</span>
                    <Users className="ml-2 h-4 w-4" />
                  </div>
                </div>
              </div>

              {/* Resource Sharing */}
              <div className="group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-red-600/5 rounded-3xl transform rotate-1 group-hover:rotate-3 transition-transform duration-500"></div>
                <div className="relative bg-white rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-700 border border-gray-100 hover:border-red-200 transform hover:-translate-y-6 group">
                  <div className="relative mb-8">
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                    <div className="relative w-20 h-20 bg-gradient-to-r from-red-500 to-red-600 rounded-3xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-2xl">
                      <Target className="h-10 w-10 text-white" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 group-hover:text-red-600 transition-colors">
                    Resource Sharing
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-lg mb-6">
                    Comprehensive digital library with academic resources,
                    research papers, and educational materials for student
                    access.
                  </p>
                  <div className="flex items-center text-red-600 font-semibold group-hover:translate-x-2 transition-transform">
                    <span>Learn More</span>
                    <Target className="ml-2 h-4 w-4" />
                  </div>
                </div>
              </div>

              {/* Innovation Hub */}
              <div className="group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-indigo-600/5 rounded-3xl transform -rotate-1 group-hover:-rotate-3 transition-transform duration-500"></div>
                <div className="relative bg-white rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-700 border border-gray-100 hover:border-indigo-200 transform hover:-translate-y-6 group">
                  <div className="relative mb-8">
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                    <div className="relative w-20 h-20 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-3xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-2xl">
                      <Lightbulb className="h-10 w-10 text-white" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 group-hover:text-indigo-600 transition-colors">
                    Innovation Hub
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-lg mb-6">
                    Encourage creative thinking and provide dynamic platforms
                    for students to present innovative ideas and solutions.
                  </p>
                  <div className="flex items-center text-indigo-600 font-semibold group-hover:translate-x-2 transition-transform">
                    <span>Learn More</span>
                    <Lightbulb className="ml-2 h-4 w-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Us Section */}
          <div className="relative mb-20">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-600 rounded-3xl transform rotate-1 opacity-5"></div>
            <div className="absolute inset-0 bg-gradient-to-tl from-purple-600 via-blue-600 to-indigo-600 rounded-3xl transform -rotate-1 opacity-5"></div>

            <div className="relative bg-white/90 backdrop-blur-xl rounded-2xl md:rounded-3xl shadow-2xl p-8 md:p-16 border border-gray-200 overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full blur-2xl md:blur-3xl opacity-60 animate-pulse"></div>
              <div className="absolute -bottom-10 -left-10 w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-full blur-xl md:blur-2xl opacity-50 animate-float"></div>

              <div className="relative">
                <div className="text-center mb-12 md:mb-16">
                  <div className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-8 md:mb-10 shadow-2xl animate-bounce-slow">
                    <Mail className="h-10 w-10 md:h-12 md:w-12 text-white" />
                  </div>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6 md:mb-8">
                    Get in Touch
                  </h2>
                  <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-6 md:mb-8 px-4">
                    Ready to join our community or have questions? We're here to
                    help and excited to hear from you!
                  </p>
                  <div className="flex justify-center">
                    <div className="w-24 md:w-32 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-full"></div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12">
                  {/* Address Card */}
                  <div className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl md:rounded-3xl transform rotate-1 group-hover:rotate-3 transition-all duration-500 opacity-10"></div>
                    <div className="relative bg-white rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-xl hover:shadow-2xl transition-all duration-700 border border-gray-100 hover:border-blue-200 transform hover:-translate-y-2 md:hover:-translate-y-6">
                      <div className="text-center">
                        <div className="relative mb-6 md:mb-8">
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full blur-xl md:blur-2xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
                          <div className="relative w-16 h-16 md:w-24 md:h-24 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-xl md:shadow-2xl">
                            <MapPin className="h-8 w-8 md:h-12 md:w-12 text-white" />
                          </div>
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6 group-hover:text-blue-600 transition-colors">
                          Visit Us
                        </h3>
                        <div className="space-y-2 text-gray-600 text-base md:text-lg leading-relaxed">
                          <p className="font-semibold text-gray-800">
                            University of The Gambia
                          </p>
                          <p>Faraba Campus</p>
                          <p>Science Building, Room 105</p>
                        </div>
                        <div className="mt-6 md:mt-8 flex justify-center">
                          <div className="w-12 md:w-16 h-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Email Card */}
                  <div className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl md:rounded-3xl transform -rotate-1 group-hover:-rotate-3 transition-all duration-500 opacity-10"></div>
                    <div className="relative bg-white rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-xl hover:shadow-2xl transition-all duration-700 border border-gray-100 hover:border-purple-200 transform hover:-translate-y-2 md:hover:-translate-y-6">
                      <div className="text-center">
                        <div className="relative mb-6 md:mb-8">
                          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full blur-xl md:blur-2xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
                          <div className="relative w-16 h-16 md:w-24 md:h-24 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-xl md:shadow-2xl">
                            <Mail className="h-8 w-8 md:h-12 md:w-12 text-white" />
                          </div>
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6 group-hover:text-purple-600 transition-colors">
                          Email Us
                        </h3>
                        <div className="text-center">
                          <a
                            href="mailto:info@utgsciencesa.gm"
                            className="text-base md:text-lg text-purple-600 hover:text-purple-700 font-semibold transition-colors hover:underline decoration-2 underline-offset-4 break-all md:break-normal"
                          >
                            info@utgsciencesa.gm
                          </a>
                          <p className="text-gray-600 mt-3 md:mt-4 text-sm md:text-base">
                            We typically respond within 24 hours
                          </p>
                        </div>
                        <div className="mt-6 md:mt-8 flex justify-center">
                          <div className="w-12 md:w-16 h-1 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Phone Card */}
                  <div className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-2xl md:rounded-3xl transform rotate-1 group-hover:rotate-3 transition-all duration-500 opacity-10"></div>
                    <div className="relative bg-white rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-xl hover:shadow-2xl transition-all duration-700 border border-gray-100 hover:border-cyan-200 transform hover:-translate-y-2 md:hover:-translate-y-6">
                      <div className="text-center">
                        <div className="relative mb-6 md:mb-8">
                          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-full blur-xl md:blur-2xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
                          <div className="relative w-16 h-16 md:w-24 md:h-24 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-xl md:shadow-2xl">
                            <Phone className="h-8 w-8 md:h-12 md:w-12 text-white" />
                          </div>
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6 group-hover:text-cyan-600 transition-colors">
                          Call Us
                        </h3>
                        <div className="text-center">
                          <a
                            href="tel:+2201234567"
                            className="text-base md:text-lg text-cyan-600 hover:text-cyan-700 font-semibold transition-colors hover:underline decoration-2 underline-offset-4"
                          >
                            +220 123 4567
                          </a>
                          <p className="text-gray-600 mt-3 md:mt-4 text-sm md:text-base">
                            Available Mon-Fri, 9AM-5PM
                          </p>
                        </div>
                        <div className="mt-6 md:mt-8 flex justify-center">
                          <div className="w-12 md:w-16 h-1 bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA Section */}
                <div className="text-center mt-12 md:mt-16">
                  <div className="inline-flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                    <button className="group bg-white/80 backdrop-blur-sm hover:bg-white text-gray-800 font-semibold py-3 md:py-4 px-6 md:px-8 rounded-full transition-all duration-300 transform hover:scale-105 border border-gray-200 hover:border-gray-300 shadow-lg hover:shadow-xl">
                      <span className="flex items-center justify-center">
                        Download Brochure
                        <BookOpen className="ml-2 h-4 w-4 md:h-5 md:w-5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
