"use client";
import Image from "next/image";
import {
  Mail,
  Users,
  Crown,
  Award,
  Star,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { useEffect, useState } from "react";
import Loader from "@/components/ui/Loader";

const backgroundImages = [
  "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80", // Students studying
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80", // University campus
  "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80", // Science lab
  "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80", // Students collaboration
];

// Fake executive team data for demonstration
const fakeExecutiveTeam = [
  {
    id: "1",
    name: "Amina Ceesay",
    position: "President",
    department: "Biology",
    year: "Year 4",
    bio: "Passionate about environmental conservation and research. Leading initiatives to improve student welfare and academic excellence.",
    email: "amina.ceesay@utg.edu.gm",
    image:
      "https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1",
  },
  {
    id: "2",
    name: "Ousman Jallow",
    position: "Vice President",
    department: "Chemistry",
    year: "Year 3",
    bio: "Dedicated to fostering collaboration between departments and organizing impactful academic events.",
    email: "ousman.jallow@utg.edu.gm",
    image:
      "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1",
  },
  {
    id: "3",
    name: "Fatou Drammeh",
    position: "Secretary General",
    department: "Physics",
    year: "Year 3",
    bio: "Ensuring effective communication and record-keeping while promoting research opportunities for students.",
    email: "fatou.drammeh@utg.edu.gm",
    image:
      "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1",
  },
  {
    id: "4",
    name: "Lamin Kinteh",
    position: "Treasurer",
    department: "Mathematics",
    year: "Year 4",
    bio: "Managing financial resources responsibly and ensuring transparency in all association activities.",
    email: "lamin.kinteh@utg.edu.gm",
    image:
      "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1",
  },
  {
    id: "5",
    name: "Mariama Sowe",
    position: "Public Relations Officer",
    department: "Computer Science",
    year: "Year 3",
    bio: "Building bridges between the association and the wider community while managing our digital presence.",
    email: "mariama.sowe@utg.edu.gm",
    image:
      "https://images.pexels.com/photos/3778876/pexels-photo-3778876.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1",
  },
  {
    id: "6",
    name: "Ebrima Touray",
    position: "Sports & Recreation Officer",
    department: "Environmental Science",
    year: "Year 2",
    bio: "Promoting physical wellness and organizing recreational activities to build a stronger student community.",
    email: "ebrima.touray@utg.edu.gm",
    image:
      "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1",
  },
];
//     image: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1',
//   },
//   {
//     id: '4',
//     name: 'Lamin Kinteh',
//     position: 'Treasurer',
//     department: 'Mathematics',
//     year: 'Year 4',
//     bio: 'Managing financial resources responsibly and ensuring transparency in all association activities.',
//     email: 'lamin.kinteh@utg.edu.gm',
//     image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1',
//   },
// ];

const departmentReps = [
  {
    department: "Biology",
    name: "Khadija Sanneh",
    year: "Year 2",
    email: "khadija.sanneh@utg.edu.gm",
  },
  {
    department: "Chemistry",
    name: "Modou Bah",
    year: "Year 3",
    email: "modou.bah@utg.edu.gm",
  },
  {
    department: "Physics",
    name: "Isatou Njie",
    year: "Year 2",
    email: "isatou.njie@utg.edu.gm",
  },
  {
    department: "Mathematics",
    name: "Bakary Touray",
    year: "Year 4",
    email: "bakary.touray@utg.edu.gm",
  },
  {
    department: "Computer Science",
    name: "Muhammed Darboe",
    year: "Year 3",
    email: "muhammed.darboe@utg.edu.gm",
  },
  {
    department: "Environmental Science",
    name: "Awa Camara",
    year: "Year 2",
    email: "awa.camara@utg.edu.gm",
  },
];
interface ExecutiveMember {
  _id: string;
  name: string;
  position: string;
  department: string;
  year: string;
  bio: string;
  email: string;
  image: string;
  phone?: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function Leaders() {
  const [executiveTeam, setExecutiveTeam] = useState<ExecutiveMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % backgroundImages.length
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const getExecutiveTeam = async () => {
    // Fetch executive team data from the API
    try {
      const response = await fetch("http://localhost:5000/api/leaders");
      const data = await response.json();
      setExecutiveTeam(data);
    } catch (error) {
      console.error("Error fetching executive team:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getExecutiveTeam();
  }, []);

  if (loading) {
    return <Loader text="Loading our amazing leaders..." fullScreen />;
  }

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
              <Crown className="h-20 w-20 text-white drop-shadow-lg" />
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 animate-fade-in drop-shadow-2xl">
              Our{" "}
              <span className="bg-gradient-to-r from-blue-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent">
                Leaders
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/95 max-w-4xl mx-auto leading-relaxed animate-slide-up mb-12 drop-shadow-lg">
              Meet the dedicated executive team and department representatives
              working tirelessly to serve the UTG Science Student Association
              and advance our collective goals.
            </p>

            {/* CTA Button */}
            <div className="mb-16">
              <button className="group bg-white/20 backdrop-blur-md hover:bg-white/30 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 border border-white/30 shadow-xl">
                <span className="flex items-center">
                  Meet Our Team
                  <Users className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
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
          {/* Executive Team */}
          <section className="mb-32">
            <div className="text-center mb-16">
              <div className="inline-block p-3 bg-gray-100 rounded-xl mb-6">
                <Crown className="h-8 w-8 text-gray-600" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Executive Team
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our executive leadership committed to driving excellence and
                innovation
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {executiveTeam.map((member, index) => (
                <div key={member._id} className="group relative">
                  <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-gray-200 transform hover:-translate-y-2">
                    {/* Image Section */}
                    <div className="relative overflow-hidden">
                      <Image
                        src={member.image}
                        alt={member.name}
                        width={400}
                        height={400}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      {/* Simple rank indicator */}
                      <div className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md">
                        <span className="text-gray-700 font-semibold text-xs">
                          {index + 1}
                        </span>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6">
                      <div className="mb-4">
                        <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors line-clamp-1">
                          {member.name}
                        </h3>
                        <p className="text-sm font-medium text-blue-600 mb-2">
                          {member.position}
                        </p>
                        <div className="flex items-center space-x-2 text-xs text-gray-500 mb-3">
                          <span className="bg-gray-100 px-2 py-1 rounded-md">
                            {member.department}
                          </span>
                          <span className="bg-gray-100 px-2 py-1 rounded-md">
                            {member.year}
                          </span>
                        </div>
                      </div>

                      <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
                        {member.bio}
                      </p>

                      <div className="pt-4 border-t border-gray-100">
                        <a
                          href={`mailto:${member.email}`}
                          className="group/btn inline-flex items-center text-gray-700 hover:text-blue-600 text-sm font-medium transition-colors"
                        >
                          <Mail className="h-4 w-4 mr-2" />
                          Contact
                          <ChevronRight className="h-3 w-3 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Department Representatives */}
          <section className="mb-20">
            <div className="text-center mb-16">
              <div className="inline-block p-3 bg-gray-100 rounded-xl mb-6">
                <Users className="h-8 w-8 text-gray-600" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Department Representatives
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Student representatives from each department ensuring your voice
                is heard
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {departmentReps.map((rep, index) => (
                <div key={index} className="group">
                  <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-gray-200">
                    {/* Department header */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-medium text-gray-700 bg-gray-100 px-3 py-1 rounded-lg">
                        {rep.department}
                      </span>
                      <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      </div>
                    </div>

                    {/* Representative info */}
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                        {rep.name}
                      </h3>
                      <p className="text-sm text-gray-500">{rep.year}</p>
                    </div>

                    {/* Contact */}
                    <a
                      href={`mailto:${rep.email}`}
                      className="group/btn inline-flex items-center text-gray-600 hover:text-blue-600 text-sm font-medium transition-colors"
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Contact
                      <ChevronRight className="h-3 w-3 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Simple CTA */}
            <div className="mt-16 text-center">
              <div className="bg-gray-50 rounded-xl p-8 border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Interested in Leadership?
                </h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  Join our team and represent your department in the SSA
                  community.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors">
                    Learn More
                  </button>
                  <button className="bg-white border border-gray-200 hover:border-gray-300 text-gray-700 font-medium py-2 px-6 rounded-lg transition-colors">
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
