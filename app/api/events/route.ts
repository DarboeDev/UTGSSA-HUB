import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Event from "@/models/Event";
import { withAuth } from "@/middleware/auth";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get("limit");
    const upcoming = searchParams.get("upcoming"); // filter for upcoming events

    let query = Event.find();

    // Filter for upcoming events if requested
    if (upcoming === "true") {
      query = query.where("date").gte(new Date().getTime());
    }

    query = query.sort({ date: 1 }); // Sort upcoming events by earliest first

    // Apply limit if provided
    if (limit) {
      const limitNum = parseInt(limit);
      if (!isNaN(limitNum) && limitNum > 0) {
        query = query.limit(limitNum);
      }
    }

    const events = await query;
    return NextResponse.json(events);
  } catch (error) {
    console.error("GET events error:", error);
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}

export const POST = withAuth(async (request: NextRequest) => {
  try {
    await connectDB();

    const {
      title,
      description,
      date,
      time,
      location,
      image,
      category,
      isActive,
      isHighlighted,
    } = await request.json();

    if (!title || !description || !date || !time || !location) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const event = new Event({
      title,
      description,
      date,
      time,
      location,
      image: image || "",
      category: category || "general",
      isActive: isActive !== undefined ? isActive : true,
      isHighlighted: isHighlighted !== undefined ? isHighlighted : false,
    });

    await event.save();

    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create event" },
      { status: 500 }
    );
  }
});
