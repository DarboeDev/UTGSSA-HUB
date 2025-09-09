import Link from "next/link";
import { GraduationCap, Mail, MapPin, Phone, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-50 to-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold text-gray-900">
                  UTG Science SA
                </span>
                <div className="text-sm text-gray-500">Student Association</div>
              </div>
            </div>
            <p className="text-gray-600 text-sm max-w-md leading-relaxed">
              Empowering science students at the University of The Gambia
              through unity, academic excellence, and innovation. Building a
              stronger scientific community together.
            </p>

            {/* Contact Info */}
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2 text-gray-600">
                <MapPin className="h-4 w-4 text-blue-600" />
                <span>University of The Gambia, Faraba Campus</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Mail className="h-4 w-4 text-blue-600" />
                <span>info@utgsciencesa.gm</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Phone className="h-4 w-4 text-blue-600" />
                <span>+220 123 4567</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/leaders"
                  className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
                >
                  Our Leaders
                </Link>
              </li>
              <li>
                <Link
                  href="/news"
                  className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
                >
                  News
                </Link>
              </li>
              <li>
                <Link
                  href="/events"
                  className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
                >
                  Events
                </Link>
              </li>
              <li>
                <Link
                  href="/blogs"
                  className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
                >
                  Student Blogs
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Resources
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/resources"
                  className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
                >
                  Academic Resources
                </Link>
              </li>
              <li>
                <Link
                  href="/resources"
                  className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
                >
                  Study Materials
                </Link>
              </li>
              <li>
                <Link
                  href="/resources"
                  className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
                >
                  Past Papers
                </Link>
              </li>
              <li>
                <Link
                  href="/resources"
                  className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
                >
                  Research Papers
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 mt-10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <p className="text-sm text-gray-500">
              &copy; 2025 UTG Science Student Association. All rights reserved.
            </p>
            <div className="flex items-center space-x-1 text-sm text-gray-500">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-500 fill-current" />
              <span>for science students</span>
            </div>
            <div className="flex items-center space-x-1 text-sm text-gray-500">
              <span>Designed & Developed by</span>
              <Link
                href="https://darboedev.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-2 py-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-xs font-medium rounded-full transition-all duration-200 hover:scale-105"
              >
                DarboeDev ↗
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
