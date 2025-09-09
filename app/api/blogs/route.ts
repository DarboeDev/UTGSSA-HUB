import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const tag = searchParams.get("tag");
    const search = searchParams.get("search");
    const limit = searchParams.get("limit");

    // Build query string
    const queryParams = new URLSearchParams();
    if (category && category !== "all")
      queryParams.append("category", category);
    if (tag) queryParams.append("tag", tag);
    if (search) queryParams.append("search", search);
    if (limit) queryParams.append("limit", limit);

    const queryString = queryParams.toString();
    const url = `https://utgssa-backend.onrender.com/api/blogs${
      queryString ? `?${queryString}` : ""
    }`;

    console.log("Fetching from:", url);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store", // Ensure fresh data
    });

    console.log("Response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Backend error:", errorText);
      throw new Error(
        `HTTP error! status: ${response.status}, body: ${errorText}`
      );
    }

    const data = await response.json();
    console.log("Data received:", data);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch blogs",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("Creating blog with data:", body);

    const response = await fetch(
      "https://utgssa-backend.onrender.com/api/blogs",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Backend error:", errorData);
      return NextResponse.json(
        { success: false, error: "Failed to create blog" },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log("Blog created:", data);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error creating blog:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create blog",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
