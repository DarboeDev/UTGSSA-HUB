"use client";

import { useState, useEffect } from "react";
import {
  FileText,
  Calendar,
  BookOpen,
  Download,
  Search,
  Filter,
  Eye,
  Clock,
  Users,
  TrendingUp,
  FolderOpen,
  Star,
  ExternalLink,
} from "lucide-react";
import Loader from "@/components/ui/Loader";

const backgroundImages = [
  "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80", // Library books
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80", // University campus
  "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80", // Study group
  "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80", // Science lab
];

interface Resource {
  _id: string;
  title: string;
  description: string;
  type: string;
  url: string;
  file: string;
  department: string;
  subject: string;
  year: string;
  semester: string;
  downloadCount: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

const resourceTypeIcons = {
  pdf: FileText,
  link: ExternalLink,
  video: Eye,
  document: FileText,
  file: FolderOpen,
};

const resourceTypeColors = {
  pdf: "bg-red-100 text-red-800 border-red-200",
  link: "bg-blue-100 text-blue-800 border-blue-200",
  video: "bg-purple-100 text-purple-800 border-purple-200",
  document: "bg-green-100 text-green-800 border-green-200",
  file: "bg-orange-100 text-orange-800 border-orange-200",
};

const departments = ["Biology", "Chemistry", "Physics", "Mathematics"];

const years = ["Year 1", "Year 2", "Year 3", "Year 4"];

export default function ResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState<string>("all");
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % backgroundImages.length
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/resources");
      if (response.ok) {
        const data = await response.json();
        setResources(data);
      }
    } catch (error) {
      console.error("Error fetching resources:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.subject.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDepartment =
      selectedDepartment === "all" ||
      resource.department === selectedDepartment;

    const matchesYear =
      selectedYear === "all" || resource.year === selectedYear;

    const matchesType =
      selectedType === "all" || resource.type === selectedType;

    return matchesSearch && matchesDepartment && matchesYear && matchesType;
  });

  const handleDownload = async (resourceId: string) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/resources/${resourceId}`
      );
      if (response.ok) {
        const resource = await response.json();
        // Open the resource URL in a new tab
        window.open(resource.url, "_blank");
      }
    } catch (error) {
      console.error("Error downloading resource:", error);
    }
  };

  const getResourceStats = () => {
    const totalResources = resources.length;
    const totalDownloads = resources.reduce(
      (sum, resource) => sum + resource.downloadCount,
      0
    );
    const resourceTypes = Array.from(
      new Set(resources.map((r) => r.type))
    ).length;
    const activeDepartments = Array.from(
      new Set(resources.map((r) => r.department))
    ).length;

    return { totalResources, totalDownloads, resourceTypes, activeDepartments };
  };

  if (loading) {
    return <Loader text="Loading academic resources..." fullScreen />;
  }

  const stats = getResourceStats();

  return (
    <div>
      {/* Hero Header Section */}
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
              <BookOpen className="h-20 w-20 text-white drop-shadow-lg" />
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 animate-fade-in drop-shadow-2xl">
              Academic{" "}
              <span className="bg-gradient-to-r from-blue-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent">
                Resources
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/95 max-w-4xl mx-auto leading-relaxed animate-slide-up mb-12 drop-shadow-lg">
              Access study materials, past papers, research documents, and
              educational resources shared by the UTG Science Student
              Association community.
            </p>

            {/* Resource Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-16">
              <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/30 transform hover:scale-105 transition-all duration-300">
                <div className="text-3xl font-bold text-white mb-2">
                  {stats.totalResources}
                </div>
                <div className="text-white/80 text-sm">Total Resources</div>
              </div>
              <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/30 transform hover:scale-105 transition-all duration-300">
                <div className="text-3xl font-bold text-white mb-2">
                  {stats.totalDownloads}
                </div>
                <div className="text-white/80 text-sm">Downloads</div>
              </div>
              <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/30 transform hover:scale-105 transition-all duration-300">
                <div className="text-3xl font-bold text-white mb-2">
                  {stats.resourceTypes}
                </div>
                <div className="text-white/80 text-sm">Resource Types</div>
              </div>
              <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/30 transform hover:scale-105 transition-all duration-300">
                <div className="text-3xl font-bold text-white mb-2">
                  {stats.activeDepartments}
                </div>
                <div className="text-white/80 text-sm">Departments</div>
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
          {/* Search and Filter Section */}
          <div className="mb-12">
            <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/40">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Find Your Resources
              </h2>

              {/* Search Bar */}
              <div className="relative mb-6">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search resources, subjects, or topics..."
                  className="w-full pl-12 pr-6 py-4 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-medium transition-all duration-300"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Filter Options */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Department
                  </label>
                  <select
                    title="Select a department"
                    className="w-full p-3 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                  >
                    <option value="all">All Departments</option>
                    {departments.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Year Level
                  </label>
                  <select
                    title="Select a year level"
                    className="w-full p-3 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                  >
                    <option value="all">All Years</option>
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Resource Type
                  </label>
                  <select
                    title="Select a resource type"
                    className="w-full p-3 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                  >
                    <option value="all">All Types</option>
                    <option value="pdf">PDF Documents</option>
                    <option value="link">External Links</option>
                    <option value="video">Videos</option>
                    <option value="document">Documents</option>
                    <option value="file">Files</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Resources Grid */}
          {filteredResources.length === 0 ? (
            <div className="text-center py-20">
              <div className="inline-block p-8 bg-white/60 backdrop-blur-sm rounded-3xl mb-6 shadow-xl border border-white/20">
                <BookOpen className="h-16 w-16 text-gray-400 mx-auto" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                No resources found
              </h3>
              <p className="text-gray-600 max-w-md mx-auto">
                {searchTerm ||
                selectedDepartment !== "all" ||
                selectedYear !== "all" ||
                selectedType !== "all"
                  ? "No resources found matching your criteria. Try adjusting your search or filters."
                  : "No resources available at the moment. Check back later for new resources!"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredResources.map((resource) => {
                const IconComponent =
                  resourceTypeIcons[
                    resource.type as keyof typeof resourceTypeIcons
                  ] || FileText;
                const colorClass =
                  resourceTypeColors[
                    resource.type as keyof typeof resourceTypeColors
                  ] || "bg-gray-100 text-gray-800 border-gray-200";

                return (
                  <article
                    key={resource._id}
                    className="group relative bg-white/90 backdrop-blur-md rounded-3xl overflow-hidden hover:bg-white/95 transition-all duration-500 shadow-xl hover:shadow-2xl transform hover:-translate-y-4 border border-white/40 hover:border-white/60"
                  >
                    {/* Resource Header */}
                    <div className="relative p-6 bg-gradient-to-br from-blue-600/10 to-purple-600/10">
                      {/* Resource Type Badge */}
                      <div className="absolute top-4 right-4">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide border ${colorClass}`}
                        >
                          <IconComponent className="h-3 w-3 mr-1" />
                          {resource.type}
                        </span>
                      </div>

                      {/* Resource Icon */}
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <IconComponent className="h-8 w-8 text-white" />
                      </div>

                      {/* Resource Title */}
                      <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
                        {resource.title}
                      </h3>

                      {/* Resource Description */}
                      <p className="text-gray-600 line-clamp-3 leading-relaxed mb-4 group-hover:text-gray-700 transition-colors duration-300">
                        {resource.description}
                      </p>
                    </div>

                    {/* Resource Details */}
                    <div className="p-6 space-y-4 border-t border-gray-100 group-hover:border-gray-200 transition-colors duration-300">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-gray-500 mb-1">Department</div>
                          <div className="font-medium text-gray-900">
                            {resource.department}
                          </div>
                        </div>
                        <div>
                          <div className="text-gray-500 mb-1">Year</div>
                          <div className="font-medium text-gray-900">
                            {resource.year}
                          </div>
                        </div>
                        <div>
                          <div className="text-gray-500 mb-1">Subject</div>
                          <div className="font-medium text-gray-900">
                            {resource.subject}
                          </div>
                        </div>
                        <div>
                          <div className="text-gray-500 mb-1">Semester</div>
                          <div className="font-medium text-gray-900">
                            {resource.semester}
                          </div>
                        </div>
                      </div>

                      {/* Resource Stats */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100 group-hover:border-gray-200 transition-colors duration-300">
                        <div className="flex items-center space-x-4 text-sm text-gray-500 group-hover:text-gray-600 transition-colors duration-300">
                          <div className="flex items-center space-x-1">
                            <Download className="h-4 w-4" />
                            <span>{resource.downloadCount} downloads</span>
                          </div>
                        </div>

                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>
                            {new Date(resource.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>

                      {/* Download/Access Button */}
                      <button
                        onClick={() => handleDownload(resource._id)}
                        className="block w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-center py-3 px-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl group-hover:shadow-blue-500/25 transform group-hover:scale-[1.02]"
                      >
                        <span className="flex items-center justify-center">
                          {resource.type === "link" ? (
                            <>
                              <ExternalLink className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                              Access Resource
                            </>
                          ) : (
                            <>
                              <Download className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                              Download
                            </>
                          )}
                        </span>
                      </button>
                    </div>

                    {/* Subtle glow effect */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl"></div>
                  </article>
                );
              })}
            </div>
          )}

          {/* Load More Button */}
          {filteredResources.length > 0 && (
            <div className="text-center mt-16">
              <button className="inline-flex items-center px-8 py-4 bg-white/80 backdrop-blur-md hover:bg-white/90 text-gray-900 font-semibold rounded-2xl transition-all duration-300 transform hover:-translate-y-1 shadow-xl hover:shadow-2xl border border-white/30 group">
                <BookOpen className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                Explore More Resources
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
