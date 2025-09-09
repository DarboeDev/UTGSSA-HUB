import Link from "next/link";
import {
  BookOpen,
  Users,
  Calendar,
  FileText,
  GraduationCap,
  Newspaper,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

const quickLinks = [
  {
    name: "Academic Resources",
    href: "/resources",
    description: "Access study materials, past papers, and research documents",
    icon: BookOpen,
    color: "from-blue-500 to-blue-600",
    hoverColor: "group-hover:from-blue-600 group-hover:to-blue-700",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    count: "500+ Resources",
  },
  {
    name: "Our Leaders",
    href: "/leaders",
    description: "Meet the executive team and department representatives",
    icon: Users,
    color: "from-green-500 to-emerald-600",
    hoverColor: "group-hover:from-green-600 group-hover:to-emerald-700",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    count: "25+ Leaders",
  },
  {
    name: "Events Calendar",
    href: "/events",
    description: "Stay updated with upcoming workshops and seminars",
    icon: Calendar,
    color: "from-purple-500 to-violet-600",
    hoverColor: "group-hover:from-purple-600 group-hover:to-violet-700",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    count: "12+ Events",
  },
  {
    name: "Student Blogs",
    href: "/blogs",
    description: "Read articles and stories from fellow students",
    icon: FileText,
    color: "from-orange-500 to-amber-600",
    hoverColor: "group-hover:from-orange-600 group-hover:to-amber-700",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
    count: "150+ Articles",
  },
  {
    name: "About Us",
    href: "/about",
    description: "Learn about our mission, vision, and activities",
    icon: GraduationCap,
    color: "from-indigo-500 to-blue-600",
    hoverColor: "group-hover:from-indigo-600 group-hover:to-blue-700",
    bgColor: "bg-indigo-50",
    borderColor: "border-indigo-200",
    count: "Our Story",
  },
  {
    name: "Latest News",
    href: "/news",
    description: "Get the latest updates and announcements",
    icon: Newspaper,
    color: "from-red-500 to-rose-600",
    hoverColor: "group-hover:from-red-600 group-hover:to-rose-700",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    count: "50+ Updates",
  },
];

export default function QuickLinks() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 rounded-full px-4 py-2 text-sm font-semibold mb-4">
            <Sparkles className="h-4 w-4" />
            <span>Quick Navigation</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Explore{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Everything
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Navigate quickly to the most important sections of our website and
            discover all the resources we have to offer.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {quickLinks.map((link, index) => (
            <Link
              key={link.name}
              href={link.href}
              className={`group relative block p-8 ${link.bgColor} rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border ${link.borderColor} hover:border-opacity-50 overflow-hidden hover:scale-105 transform`}
            >
              {/* Decorative background elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-white/20 to-white/5 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700"></div>
              <div className="absolute -bottom-2 -left-2 w-16 h-16 bg-gradient-to-tr from-white/10 to-white/5 rounded-full blur-lg group-hover:scale-125 transition-transform duration-500"></div>

              <div className="relative">
                <div className="flex items-start justify-between mb-6">
                  <div
                    className={`p-4 rounded-2xl bg-gradient-to-br ${link.color} ${link.hoverColor} text-white group-hover:scale-110 transition-all duration-300 shadow-lg`}
                  >
                    <link.icon className="h-8 w-8" />
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowUpRight className="h-6 w-6 text-gray-400 group-hover:text-gray-600 transition-colors" />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-gray-800 transition-colors mb-2">
                      {link.name}
                    </h3>
                    <div className="text-sm font-semibold text-gray-500 mb-3">
                      {link.count}
                    </div>
                  </div>

                  <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
                    {link.description}
                  </p>
                </div>

                {/* Hover effect indicator */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </Link>
          ))}
        </div>

        {/* Additional Call-to-Action Section */}
        <div className="mt-20 text-center">
          <div className="bg-white rounded-3xl shadow-xl p-12 border border-gray-200">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Ready to Join Our Community?
              </h3>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Become part of the UTG Science Student Association and unlock
                access to exclusive resources, events, and opportunities.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/about"
                  className="group inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  <span>Learn More</span>
                  <ArrowUpRight className="h-5 w-5 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Link>
                <Link
                  href="/events"
                  className="inline-flex items-center border-2 border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300"
                >
                  View Upcoming Events
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
