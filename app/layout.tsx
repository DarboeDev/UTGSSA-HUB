import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import LayoutWrapper from "@/components/layout/LayoutWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "UTG Science Student Association",
  description:
    "Official website of the University of The Gambia Science Student Association",
  icons: {
    icon: "/favicon.ico",
  },
  keywords: [
    "UTG",
    "Science Student Association",
    "University of The Gambia",
    "Student Organization",
    "Academic Excellence",
    "Scientific Community",
    "Workshops",
    "Events",
    "Research",
    "Innovation",
    "Collaboration",
    "Networking",
    "Student Resources",
    "Scholarships",
    "Competitions",
    "Leadership",
    "Community Engagement",
    "STEM",
    "Science Education",
    "UTGSSA",
    "Gambia Students",
    "Science Club",
    "Student Activities",
    "Campus Life",
    "Professional Development",
    "Science Projects",
    "UTG Events",
    "Student Support",
    "Academic Resources",
    "Science News",
    "Student Leadership",
    "Science Workshops",
    "Student Networking",
    "The Gambia Education",
    "the gambia university",
    "THe Gambia",
  ],
  authors: [{ name: "Muhammed Darboe", url: "https://utgssa.org" }],
  creator: "Muhammed Darboe",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
