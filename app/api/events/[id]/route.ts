import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Event from "@/models/Event";
import { withAuth } from "@/middleware/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const event = await Event.findById(params.id);

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    return NextResponse.json(event);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch event" },
      { status: 500 }
    );
  }
}

export const PUT = withAuth(
  async (request: NextRequest, { params }: { params: { id: string } }) => {
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

      const updateData: any = {
        title,
        description,
        date,
        time,
        location,
      };

      // Only include image if it's provided
      if (image !== undefined) {
        updateData.image = image;
      }

      // Only include category if it's provided
      if (category !== undefined) {
        updateData.category = category;
      }

      // Only include isActive if it's provided
      if (isActive !== undefined) {
        updateData.isActive = isActive;
      }

      // Only include isHighlighted if it's provided
      if (isHighlighted !== undefined) {
        updateData.isHighlighted = isHighlighted;
      }

      const event = await Event.findByIdAndUpdate(params.id, updateData, {
        new: true,
      });

      if (!event) {
        return NextResponse.json({ error: "Event not found" }, { status: 404 });
      }

      return NextResponse.json(event);
    } catch (error) {
      return NextResponse.json(
        { error: "Failed to update event" },
        { status: 500 }
      );
    }
  }
);

export const DELETE = withAuth(
  async (request: NextRequest, { params }: { params: { id: string } }) => {
    try {
      await connectDB();

      const event = await Event.findByIdAndDelete(params.id);

      if (!event) {
        return NextResponse.json({ error: "Event not found" }, { status: 404 });
      }

      return NextResponse.json({ message: "Event deleted successfully" });
    } catch (error) {
      return NextResponse.json(
        { error: "Failed to delete event" },
        { status: 500 }
      );
    }
  }
);
