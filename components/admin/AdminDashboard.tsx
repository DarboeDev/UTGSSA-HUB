"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  LogOut,
  Users,
  FileText,
  Calendar,
  BookOpen,
  Newspaper,
  FolderOpen,
  Plus,
  Edit,
  Trash2,
  Search,
  Upload,
  X,
} from "lucide-react";
import axios from "axios";

interface AdminDashboardProps {
  onLogout: () => void;
}

interface Leader {
  _id: string;
  name: string;
  position: string;
  department: string;
  image: string;
  bio: string;
  email: string;
  linkedIn?: string;
}

interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image: string;
  category: string;
  isActive: boolean;
}

interface Blog {
  _id: string;
  title: string;
  content: string;
  author: string;
  image: string;
  category: string;
  tags: string[];
  isPublished: boolean;
  createdAt: string;
}

interface News {
  _id: string;
  title: string;
  content: string;
  image: string;
  isPublished: boolean;
  createdAt: string;
}

interface Resource {
  _id: string;
  title: string;
  description: string;
  type: string;
  department: string;
  year: string;
  fileUrl: string;
  downloadCount: number;
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [uploading, setUploading] = useState(false);

  // Data states
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [news, setNews] = useState<News[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);

  // Loading states
  const [loading, setLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
  const [stats, setStats] = useState({
    totalLeaders: 0,
    upcomingEvents: 0,
    publishedBlogs: 0,
    publishedNews: 0,
    totalResources: 0,
  });
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const tabs = [
    { id: "overview", label: "Overview", icon: FileText },
    { id: "leaders", label: "Leaders", icon: Users },
    { id: "events", label: "Events", icon: Calendar },
    { id: "blogs", label: "Blogs", icon: BookOpen },
    { id: "news", label: "News", icon: Newspaper },
    { id: "resources", label: "Resources", icon: FolderOpen },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [leadersRes, eventsRes, blogsRes, newsRes, resourcesRes] =
        await Promise.all([
          fetch("/api/leaders"),
          fetch("/api/events"),
          fetch("/api/blogs"),
          fetch("/api/news"),
          fetch("/api/resources"),
        ]);

      // Check if all responses are ok
      if (
        !leadersRes.ok ||
        !eventsRes.ok ||
        !blogsRes.ok ||
        !newsRes.ok ||
        !resourcesRes.ok
      ) {
        throw new Error("Failed to fetch some data");
      }

      const [leadersData, eventsData, blogsData, newsData, resourcesData] =
        await Promise.all([
          leadersRes.json(),
          eventsRes.json(),
          blogsRes.json(),
          newsRes.json(),
          resourcesRes.json(),
        ]);

      // Extract data from API response structure
      const leaders = leadersData.data || leadersData || [];
      const events = eventsData.data || eventsData || [];
      const blogs = blogsData.data || blogsData || [];
      const news = newsData.data || newsData || [];
      const resources = resourcesData.data || resourcesData || [];

      setLeaders(leaders);
      setEvents(events);
      setBlogs(blogs);
      setNews(news);
      setResources(resources);

      setStats({
        totalLeaders: leaders.length,
        upcomingEvents: events.filter(
          (e: Event) => new Date(e.date) > new Date()
        ).length,
        publishedBlogs: blogs.filter((b: Blog) => b.isPublished).length,
        publishedNews: news.filter((n: News) => n.isPublished).length,
        totalResources: resources.length,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to load data. Please refresh the page.");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (
    files: FileList
  ): Promise<Array<{ url: string; publicId: string }>> => {
    if (files.length === 0) return [];
    setUploading(true);
    const uploadedData: Array<{ url: string; publicId: string }> = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "unsigned_preset");
      const cloudName = "dkpi5ij2t";

      // Use different resource type for documents vs images
      const isDocument =
        file.type.includes("pdf") ||
        file.type.includes("document") ||
        file.name.endsWith(".doc") ||
        file.name.endsWith(".docx");
      const resourceType = isDocument ? "raw" : "image";

      const url = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

      try {
        const res = await axios.post(url, formData);
        uploadedData.push({
          url: res.data.secure_url,
          publicId: res.data.public_id,
        });
        console.log("Upload successful:", res.data);
      } catch (error) {
        console.error("Upload failed:", error);
      }
    }

    setUploading(false);
    return uploadedData;
  };

  const openModal = (type: string, item?: any) => {
    if (item) {
      // When editing, preserve the original type fields
      if (type === "resource") {
        setEditingItem({ ...item, itemType: type, resourceType: item.type });
      } else {
        setEditingItem({ ...item, itemType: type });
      }
    } else {
      // When creating new
      setEditingItem({ itemType: type });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingItem(null);
  };

  async function handleDelete(endpoint: string, id: string) {
    if (!confirm("Are you sure you want to delete this item?")) return;

    setDeleteLoading(id);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await fetch(`/api/${endpoint}/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setSuccessMessage("Item deleted successfully!");
        await fetchData(); // Refresh data
        // Clear success message after 3 seconds
        setTimeout(() => setSuccessMessage(null), 3000);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Delete failed");
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "Delete failed");
      setTimeout(() => setError(null), 5000);
    } finally {
      setDeleteLoading(null);
    }
  }

  async function handleSave(data: any) {
    setSaveLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      // Ensure we have a valid item type
      if (!data.itemType) {
        throw new Error("Invalid item type");
      }

      // Create proper endpoint mapping
      const endpointMap: { [key: string]: string } = {
        leader: "leaders",
        event: "events",
        blog: "blogs",
        news: "news",
        resource: "resources",
      };

      const endpoint = endpointMap[data.itemType];
      if (!endpoint) {
        throw new Error(`Unknown item type: ${data.itemType}`);
      }

      const method = data._id ? "PUT" : "POST";
      const url = data._id
        ? `/api/${endpoint}/${data._id}`
        : `/api/${endpoint}`;

      // Remove the itemType field from data before sending (but keep type for resources)
      const { itemType, resourceType, ...dataToSend } = data;

      // For resources, use the resourceType as the type field
      if (data.itemType === "resource" && resourceType) {
        dataToSend.type = resourceType;
      }

      console.log("Saving to:", url, "Method:", method, "Data:", dataToSend);

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        setSuccessMessage(
          `${data.itemType.charAt(0).toUpperCase() + data.itemType.slice(1)} ${
            data._id ? "updated" : "created"
          } successfully!`
        );
        await fetchData(); // Refresh data
        closeModal();
        // Clear success message after 3 seconds
        setTimeout(() => setSuccessMessage(null), 3000);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Save failed");
      }
    } catch (error) {
      console.error("Save error:", error);
      setError(error instanceof Error ? error.message : "Save failed");
    } finally {
      setSaveLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-gray-900">
              Admin Dashboard
            </h1>
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => window.open("/", "_blank")}
                variant="outline"
                size="sm"
                className="flex items-center gap-2 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
                Visit Website
              </Button>
              <Button
                onClick={onLogout}
                variant="outline"
                size="sm"
                className="flex items-center gap-2 hover:bg-red-50 hover:text-red-600 hover:border-red-300"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Error and Success Messages */}
        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <X className="h-5 w-5" />
              </div>
              <div className="ml-3">
                <p className="text-sm">{error}</p>
              </div>
              <div className="ml-auto pl-3">
                <div className="-mx-1.5 -my-1.5">
                  <button
                    onClick={() => setError(null)}
                    title="Close error message"
                    className="inline-flex bg-red-50 rounded-md p-1.5 text-red-400 hover:bg-red-100"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {successMessage && (
          <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <div className="flex-shrink-0">
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  </div>
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm">{successMessage}</p>
              </div>
              <div className="ml-auto pl-3">
                <div className="-mx-1.5 -my-1.5">
                  <button
                    onClick={() => setSuccessMessage(null)}
                    title="Close success message"
                    className="inline-flex bg-green-50 rounded-md p-1.5 text-green-400 hover:bg-green-100"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Navigation */}
        <nav className="mb-8">
          <div className="flex flex-wrap gap-2 bg-white rounded-lg p-2 shadow-sm">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? "bg-blue-600 text-white shadow-md"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Content */}
        {activeTab === "overview" && (
          <OverviewTab stats={stats} loading={loading} />
        )}
        {activeTab === "leaders" && (
          <DataManagement
            title="Leaders"
            data={leaders}
            onAdd={() => openModal("leader")}
            onEdit={(item) => openModal("leader", item)}
            onDelete={(id) => handleDelete("leaders", id)}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            renderItem={(leader: Leader) => (
              <Card
                key={leader._id}
                className="hover:shadow-md transition-shadow"
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <img
                      src={leader.image || "/api/placeholder/64/64"}
                      alt={leader.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{leader.name}</h3>
                      <p className="text-gray-600">{leader.position}</p>
                      <Badge variant="secondary">{leader.department}</Badge>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openModal("leader", leader)}
                        disabled={deleteLoading === leader._id}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete("leaders", leader._id)}
                        disabled={deleteLoading === leader._id}
                        className="text-red-600 hover:bg-red-50"
                      >
                        {deleteLoading === leader._id ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          />
        )}
        {activeTab === "events" && (
          <DataManagement
            title="Events"
            data={events}
            onAdd={() => openModal("event")}
            onEdit={(item) => openModal("event", item)}
            onDelete={(id) => handleDelete("events", id)}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            renderItem={(event: Event) => (
              <Card
                key={event._id}
                className="hover:shadow-md transition-shadow"
              >
                <CardContent className="p-4">
                  <div className="flex items-start space-x-4">
                    <img
                      src={event.image || "/api/placeholder/80/80"}
                      alt={event.title}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{event.title}</h3>
                      <p className="text-gray-600 line-clamp-2">
                        {event.description}
                      </p>
                      <div className="flex items-center space-x-4 mt-2">
                        <Badge
                          variant={event.isActive ? "default" : "secondary"}
                        >
                          {event.isActive ? "Active" : "Inactive"}
                        </Badge>
                        <span className="text-sm text-gray-500">
                          {new Date(event.date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openModal("event", event)}
                        disabled={deleteLoading === event._id}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete("events", event._id)}
                        disabled={deleteLoading === event._id}
                        className="text-red-600 hover:bg-red-50"
                      >
                        {deleteLoading === event._id ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          />
        )}
        {activeTab === "blogs" && (
          <DataManagement
            title="Blogs"
            data={blogs}
            onAdd={() => openModal("blog")}
            onEdit={(item) => openModal("blog", item)}
            onDelete={(id) => handleDelete("blogs", id)}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            renderItem={(blog: Blog) => (
              <Card
                key={blog._id}
                className="hover:shadow-md transition-shadow"
              >
                <CardContent className="p-4">
                  <div className="flex items-start space-x-4">
                    <img
                      src={blog.image || "/api/placeholder/80/80"}
                      alt={blog.title}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{blog.title}</h3>
                      <p className="text-gray-600 line-clamp-2">
                        {blog.content.substring(0, 150)}...
                      </p>
                      <div className="flex items-center space-x-4 mt-2">
                        <Badge
                          variant={blog.isPublished ? "default" : "secondary"}
                        >
                          {blog.isPublished ? "Published" : "Draft"}
                        </Badge>
                        <span className="text-sm text-gray-500">
                          By {blog.author}
                        </span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openModal("blog", blog)}
                        disabled={deleteLoading === blog._id}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete("blogs", blog._id)}
                        disabled={deleteLoading === blog._id}
                        className="text-red-600 hover:bg-red-50"
                      >
                        {deleteLoading === blog._id ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          />
        )}
        {activeTab === "news" && (
          <DataManagement
            title="News"
            data={news}
            onAdd={() => openModal("news")}
            onEdit={(item) => openModal("news", item)}
            onDelete={(id) => handleDelete("news", id)}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            renderItem={(newsItem: News) => (
              <Card
                key={newsItem._id}
                className="hover:shadow-md transition-shadow"
              >
                <CardContent className="p-4">
                  <div className="flex items-start space-x-4">
                    <img
                      src={newsItem.image || "/api/placeholder/80/80"}
                      alt={newsItem.title}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">
                        {newsItem.title}
                      </h3>
                      <p className="text-gray-600 line-clamp-2">
                        {newsItem.content.substring(0, 150)}...
                      </p>
                      <div className="flex items-center space-x-4 mt-2">
                        <Badge
                          variant={
                            newsItem.isPublished ? "default" : "secondary"
                          }
                        >
                          {newsItem.isPublished ? "Published" : "Draft"}
                        </Badge>
                        <span className="text-sm text-gray-500">
                          {new Date(newsItem.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openModal("news", newsItem)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete("news", newsItem._id)}
                        className="text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          />
        )}
        {activeTab === "resources" && (
          <DataManagement
            title="Resources"
            data={resources}
            onAdd={() => openModal("resource")}
            onEdit={(item) => openModal("resource", item)}
            onDelete={(id) => handleDelete("resources", id)}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            renderItem={(resource: Resource) => (
              <Card
                key={resource._id}
                className="hover:shadow-md transition-shadow"
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">
                        {resource.title}
                      </h3>
                      <p className="text-gray-600 line-clamp-2">
                        {resource.description}
                      </p>
                      <div className="flex items-center space-x-4 mt-2">
                        <Badge variant="outline">{resource.type}</Badge>
                        <Badge variant="secondary">{resource.department}</Badge>
                        <span className="text-sm text-gray-500">
                          Year {resource.year}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        Downloads: {resource.downloadCount}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openModal("resource", resource)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete("resources", resource._id)}
                        className="text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          />
        )}
      </div>

      {/* Modal */}
      {showModal && editingItem && (
        <Modal
          item={editingItem}
          onClose={closeModal}
          onSave={handleSave}
          onImageUpload={handleImageUpload}
          uploading={uploading}
          saveLoading={saveLoading}
        />
      )}
    </div>
  );
}

function OverviewTab({ stats, loading }: { stats: any; loading: boolean }) {
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Dashboard Overview
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 opacity-80" />
              <div className="ml-4">
                <p className="text-blue-100">Total Leaders</p>
                <p className="text-3xl font-bold">{stats.totalLeaders}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 opacity-80" />
              <div className="ml-4">
                <p className="text-green-100">Upcoming Events</p>
                <p className="text-3xl font-bold">{stats.upcomingEvents}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 opacity-80" />
              <div className="ml-4">
                <p className="text-purple-100">Published Blogs</p>
                <p className="text-3xl font-bold">{stats.publishedBlogs}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center">
              <Newspaper className="h-8 w-8 opacity-80" />
              <div className="ml-4">
                <p className="text-red-100">Published News</p>
                <p className="text-3xl font-bold">{stats.publishedNews}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center">
              <FolderOpen className="h-8 w-8 opacity-80" />
              <div className="ml-4">
                <p className="text-yellow-100">Total Resources</p>
                <p className="text-3xl font-bold">{stats.totalResources}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function DataManagement({
  title,
  data,
  onAdd,
  onEdit,
  onDelete,
  searchTerm,
  setSearchTerm,
  renderItem,
}: {
  title: string;
  data: any[];
  onAdd: () => void;
  onEdit: (item: any) => void;
  onDelete: (id: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  renderItem: (item: any) => JSX.Element;
}) {
  // Ensure data is always an array
  const safeData = Array.isArray(data) ? data : [];
  const filteredData = safeData.filter((item) =>
    Object.values(item).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{title} Management</h2>
        <Button onClick={onAdd} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add {title.slice(0, -1)}
        </Button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder={`Search ${title.toLowerCase()}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="space-y-4">
        {filteredData.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-gray-500">No {title.toLowerCase()} found.</p>
            </CardContent>
          </Card>
        ) : (
          filteredData.map(renderItem)
        )}
      </div>
    </div>
  );
}

function Modal({
  item,
  onClose,
  onSave,
  onImageUpload,
  uploading,
  saveLoading,
}: {
  item: any;
  onClose: () => void;
  onSave: (data: any) => void;
  onImageUpload: (
    files: FileList
  ) => Promise<Array<{ url: string; publicId: string }>>;
  uploading: boolean;
  saveLoading: boolean;
}) {
  const [formData, setFormData] = useState(item);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  // Helper function to format date for HTML input
  const formatDateForInput = (dateString: string) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "";
      return date.toISOString().split("T")[0]; // Returns YYYY-MM-DD
    } catch {
      return "";
    }
  };

  // Helper function to format time for HTML input
  const formatTimeForInput = (timeString: string) => {
    if (!timeString) return "";
    // If time is already in HH:MM format, return as is
    if (/^\d{2}:\d{2}$/.test(timeString)) {
      return timeString;
    }
    // If time includes seconds, remove them
    if (/^\d{2}:\d{2}:\d{2}$/.test(timeString)) {
      return timeString.substring(0, 5);
    }
    return timeString;
  };

  // Initialize form data with proper formatting for events
  useEffect(() => {
    if (item.itemType === "event") {
      setFormData({
        ...item,
        date: formatDateForInput(item.date),
        time: formatTimeForInput(item.time),
      });
    } else if (item.itemType === "resource" && item.resourceType) {
      // For resources, set the type field to the resourceType for the form
      setFormData({
        ...item,
        type: item.resourceType,
      });
    } else {
      setFormData(item);
    }
  }, [item]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let finalData = { ...formData };

    // Add the itemType to the final data
    finalData.itemType = item.itemType;

    // Handle file uploads based on item type
    if (selectedFiles && selectedFiles.length > 0) {
      if (
        item.itemType === "resource" &&
        (formData.type === "pdf" ||
          formData.type === "document" ||
          formData.type === "file")
      ) {
        // For resources with file types
        const uploadedData = await onImageUpload(selectedFiles);
        if (uploadedData.length > 0) {
          finalData.fileUrl = uploadedData[0].url;
          finalData.filePublicId = uploadedData[0].publicId;
        }
      } else {
        // For images (leaders, events, blogs, news)
        const uploadedData = await onImageUpload(selectedFiles);
        if (uploadedData.length > 0) {
          finalData.image = uploadedData[0].url;
        }
      }
    }

    // For resources, save the resourceType
    if (item.itemType === "resource") {
      finalData.resourceType = formData.type;
    }

    // Keep the type field - it's needed for the save operation
    console.log("Modal submitting data:", finalData);
    onSave(finalData);
  };

  const renderFormFields = () => {
    switch (item.itemType) {
      case "leader":
        return (
          <>
            <Input
              placeholder="Name"
              value={formData.name || ""}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
            <Input
              placeholder="Position"
              value={formData.position || ""}
              onChange={(e) =>
                setFormData({ ...formData, position: e.target.value })
              }
              required
            />
            <Input
              placeholder="Department"
              value={formData.department || ""}
              onChange={(e) =>
                setFormData({ ...formData, department: e.target.value })
              }
              required
            />
            <Input
              placeholder="Email"
              type="email"
              value={formData.email || ""}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
            <Input
              placeholder="LinkedIn URL (optional)"
              value={formData.linkedIn || ""}
              onChange={(e) =>
                setFormData({ ...formData, linkedIn: e.target.value })
              }
            />
            <Textarea
              placeholder="Bio"
              value={formData.bio || ""}
              onChange={(e) =>
                setFormData({ ...formData, bio: e.target.value })
              }
              rows={4}
            />
          </>
        );

      case "event":
        return (
          <>
            <Input
              placeholder="Event Title"
              value={formData.title || ""}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
            />
            <Textarea
              placeholder="Description"
              value={formData.description || ""}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={3}
            />
            <Input
              placeholder="Date"
              type="date"
              value={formData.date || ""}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              required
            />
            <Input
              placeholder="Time"
              type="time"
              value={formData.time || ""}
              onChange={(e) =>
                setFormData({ ...formData, time: e.target.value })
              }
              required
            />
            <Input
              placeholder="Location"
              value={formData.location || ""}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              required
            />
            <Input
              placeholder="Category"
              value={formData.category || ""}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            />
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive || false}
                onChange={(e) =>
                  setFormData({ ...formData, isActive: e.target.checked })
                }
              />
              <label htmlFor="isActive">Active Event</label>
            </div>
          </>
        );

      case "blog":
        return (
          <>
            <Input
              placeholder="Blog Title"
              value={formData.title || ""}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
            />
            <Textarea
              placeholder="Content"
              value={formData.content || ""}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              rows={6}
              required
            />
            <Input
              placeholder="Author"
              value={formData.author || ""}
              onChange={(e) =>
                setFormData({ ...formData, author: e.target.value })
              }
              required
            />
            <Input
              placeholder="Category"
              value={formData.category || ""}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            />
            <Input
              placeholder="Tags (comma separated)"
              value={formData.tags ? formData.tags.join(", ") : ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  tags: e.target.value
                    .split(",")
                    .map((tag: string) => tag.trim()),
                })
              }
            />
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isPublished"
                checked={formData.isPublished || false}
                onChange={(e) =>
                  setFormData({ ...formData, isPublished: e.target.checked })
                }
              />
              <label htmlFor="isPublished">Publish Blog</label>
            </div>
          </>
        );

      case "news":
        return (
          <>
            <Input
              placeholder="News Title"
              value={formData.title || ""}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
            />
            <Textarea
              placeholder="Content"
              value={formData.content || ""}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              rows={6}
              required
            />
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isPublished"
                checked={formData.isPublished || false}
                onChange={(e) =>
                  setFormData({ ...formData, isPublished: e.target.checked })
                }
              />
              <label htmlFor="isPublished">Publish News</label>
            </div>
          </>
        );

      case "resource":
        return (
          <>
            <Input
              placeholder="Resource Title"
              value={formData.title || ""}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
            />
            <Textarea
              placeholder="Description"
              value={formData.description || ""}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={3}
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Resource Type
              </label>
              <select
                title="Select a resource type"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={formData.type || ""}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
                required
              >
                <option value="">Select a type</option>
                <option value="pdf">PDF Documents</option>
                <option value="document">Documents</option>
                <option value="link">External Links</option>
                <option value="video">Videos</option>
                <option value="presentation">Presentations</option>
                <option value="image">Images</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Department
              </label>
              <select
                title="Select a department"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={formData.department || ""}
                onChange={(e) =>
                  setFormData({ ...formData, department: e.target.value })
                }
                required
              >
                <option value="">Select a department</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Biology">Biology</option>
              </select>
            </div>
            <Input
              placeholder="Year"
              value={formData.year || ""}
              onChange={(e) =>
                setFormData({ ...formData, year: e.target.value })
              }
              required
            />

            {/* Conditional File Upload or URL Input */}
            {formData.type === "pdf" ||
            formData.type === "document" ||
            formData.type === "file" ? (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload File
                </label>
                <input
                  title="Upload File"
                  type="file"
                  accept={
                    formData.type === "pdf"
                      ? ".pdf"
                      : formData.type === "document"
                      ? ".doc,.docx,.pdf"
                      : "*"
                  }
                  onChange={(e) => {
                    const files = e.target.files;
                    if (files && files.length > 0) {
                      setSelectedFiles(files);
                    }
                  }}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {formData.fileUrl && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-600">Current file:</p>
                    <a
                      href={formData.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-sm underline"
                    >
                      View current file
                    </a>
                  </div>
                )}
              </div>
            ) : (
              <Input
                placeholder={`${
                  formData.type === "link"
                    ? "External Link URL"
                    : formData.type === "video"
                    ? "Video URL (YouTube, Vimeo, etc.)"
                    : "Resource URL"
                }`}
                type="url"
                value={formData.fileUrl || ""}
                onChange={(e) =>
                  setFormData({ ...formData, fileUrl: e.target.value })
                }
                required
              />
            )}
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold">
              {item._id ? "Edit" : "Add"}{" "}
              {item.itemType.charAt(0).toUpperCase() + item.itemType.slice(1)}
            </h3>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {renderFormFields()}

            {/* Image Upload */}
            {item.itemType !== "resource" && (
              <div>
                <label className="block text-sm font-medium mb-2">
                  {item.itemType === "leader"
                    ? "Profile Image"
                    : "Featured Image"}
                </label>
                <input
                  title="Upload Image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setSelectedFiles(e.target.files)}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {formData.image && (
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="mt-2 w-20 h-20 object-cover rounded"
                  />
                )}
              </div>
            )}

            <div className="flex justify-end space-x-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={saveLoading || uploading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={uploading || saveLoading}>
                {uploading
                  ? "Uploading..."
                  : saveLoading
                  ? "Saving..."
                  : "Save"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
