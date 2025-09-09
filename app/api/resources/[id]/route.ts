import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Resource from "@/models/Resource";
import { withAuth } from "@/middleware/auth";
import { deleteFromCloudinary } from "@/lib/cloudinary";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const resource = await Resource.findById(params.id);

    if (!resource) {
      return NextResponse.json(
        { error: "Resource not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(resource);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch resource" },
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
        type,
        fileUrl,
        filePublicId,
        department,
        year,
      } = await request.json();

      const updateData: any = {
        title,
        type,
        fileUrl,
      };

      // Only include fields if they're provided
      if (description !== undefined) {
        updateData.description = description;
      }

      if (filePublicId !== undefined) {
        updateData.filePublicId = filePublicId;
      }

      if (department !== undefined) {
        updateData.department = department;
      }

      if (year !== undefined) {
        updateData.year = year;
      }

      const resource = await Resource.findByIdAndUpdate(params.id, updateData, {
        new: true,
      });

      if (!resource) {
        return NextResponse.json(
          { error: "Resource not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(resource);
    } catch (error) {
      return NextResponse.json(
        { error: "Failed to update resource" },
        { status: 500 }
      );
    }
  }
);

export const DELETE = withAuth(
  async (request: NextRequest, { params }: { params: { id: string } }) => {
    try {
      await connectDB();

      const resource = await Resource.findById(params.id);

      if (!resource) {
        return NextResponse.json(
          { error: "Resource not found" },
          { status: 404 }
        );
      }

      // Delete file from Cloudinary
      await deleteFromCloudinary(resource.filePublicId);

      // Delete resource from database
      await Resource.findByIdAndDelete(params.id);

      return NextResponse.json({ message: "Resource deleted successfully" });
    } catch (error) {
      return NextResponse.json(
        { error: "Failed to delete resource" },
        { status: 500 }
      );
    }
  }
);
