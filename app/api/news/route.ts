import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import News from "@/models/News";
import { withAuth } from "@/middleware/auth";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get("limit");

    let query = News.find().sort({ createdAt: -1 });

    // Apply limit if provided
    if (limit) {
      const limitNum = parseInt(limit);
      if (!isNaN(limitNum) && limitNum > 0) {
        query = query.limit(limitNum);
      }
    }

    const news = await query;
    return NextResponse.json(news);
  } catch (error) {
    console.error("GET news error:", error);
    return NextResponse.json(
      { error: "Failed to fetch news" },
      { status: 500 }
    );
  }
}

export const POST = withAuth(async (request: NextRequest) => {
  try {
    await connectDB();

    const { title, content, excerpt, image, isPublished } =
      await request.json();

    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 }
      );
    }

    const news = new News({
      title,
      content,
      excerpt: excerpt || content.substring(0, 150) + "...",
      image: image || "",
      isPublished: isPublished !== undefined ? isPublished : true,
    });

    await news.save();

    return NextResponse.json(news, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create news" },
      { status: 500 }
    );
  }
});
