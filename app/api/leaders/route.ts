import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Leader from "@/models/Leader";
import { withAuth } from "@/middleware/auth";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get("limit");

    let query = Leader.find().sort({ isExecutive: -1, createdAt: -1 });

    // Apply limit if provided
    if (limit) {
      const limitNum = parseInt(limit);
      if (!isNaN(limitNum) && limitNum > 0) {
        query = query.limit(limitNum);
      }
    }

    const leaders = await query;
    return NextResponse.json(leaders);
  } catch (error) {
    console.error("GET leaders error:", error);
    return NextResponse.json(
      { error: "Failed to fetch leaders" },
      { status: 500 }
    );
  }
}

export const POST = withAuth(async (request: NextRequest) => {
  try {
    await connectDB();

    const {
      name,
      position,
      department,
      year,
      bio,
      email,
      image,
      imagePublicId,
      isExecutive,
    } = await request.json();

    if (
      !name ||
      !position ||
      !department ||
      !year ||
      !bio ||
      !email ||
      !image ||
      !imagePublicId
    ) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const leader = new Leader({
      name,
      position,
      department,
      year,
      bio,
      email,
      image,
      imagePublicId,
      isExecutive: isExecutive || false,
    });

    await leader.save();

    return NextResponse.json(leader, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create leader" },
      { status: 500 }
    );
  }
});
