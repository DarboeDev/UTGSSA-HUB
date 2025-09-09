import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import News from "@/models/News";
import { withAuth } from "@/middleware/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const news = await News.findById(params.id);

    if (!news) {
      return NextResponse.json({ error: "News not found" }, { status: 404 });
    }

    return NextResponse.json(news);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch news" },
      { status: 500 }
    );
  }
}

export const PUT = withAuth(
  async (request: NextRequest, { params }: { params: { id: string } }) => {
    try {
      await connectDB();

      const { title, content, excerpt, image, isPublished } =
        await request.json();

      const updateData: any = {
        title,
        content,
      };

      // Only include fields if they're provided
      if (excerpt !== undefined) {
        updateData.excerpt = excerpt;
      }

      if (image !== undefined) {
        updateData.image = image;
      }

      if (isPublished !== undefined) {
        updateData.isPublished = isPublished;
      }

      const news = await News.findByIdAndUpdate(params.id, updateData, {
        new: true,
      });

      if (!news) {
        return NextResponse.json({ error: "News not found" }, { status: 404 });
      }

      return NextResponse.json(news);
    } catch (error) {
      return NextResponse.json(
        { error: "Failed to update news" },
        { status: 500 }
      );
    }
  }
);

export const DELETE = withAuth(
  async (request: NextRequest, { params }: { params: { id: string } }) => {
    try {
      await connectDB();

      const news = await News.findByIdAndDelete(params.id);

      if (!news) {
        return NextResponse.json({ error: "News not found" }, { status: 404 });
      }

      return NextResponse.json({ message: "News deleted successfully" });
    } catch (error) {
      return NextResponse.json(
        { error: "Failed to delete news" },
        { status: 500 }
      );
    }
  }
);
