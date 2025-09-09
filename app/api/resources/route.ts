import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Resource from "@/models/Resource";
import { withAuth } from "@/middleware/auth";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get("limit");

    let query = Resource.find().sort({ createdAt: -1 });

    // Apply limit if provided
    if (limit) {
      const limitNum = parseInt(limit);
      if (!isNaN(limitNum) && limitNum > 0) {
        query = query.limit(limitNum);
      }
    }

    const resources = await query;
    return NextResponse.json(resources);
  } catch (error) {
    console.error("GET resources error:", error);
    return NextResponse.json(
      { error: "Failed to fetch resources" },
      { status: 500 }
    );
  }
}

export const POST = withAuth(async (request: NextRequest) => {
  try {
    console.log("POST /api/resources - Starting resource creation");
    await connectDB();
    console.log("Database connected successfully");

    const requestData = await request.json();
    console.log("Received resource data:", requestData);

    // Extract and validate required fields
    const {
      title,
      description = "",
      type,
      fileUrl,
      filePublicId = "",
      department,
      year,
    } = requestData;

    // Validate required fields
    const missingFields = [];
    if (!title) missingFields.push("title");
    if (!type) missingFields.push("type");
    if (!fileUrl) missingFields.push("fileUrl");
    if (!department) missingFields.push("department");
    if (!year) missingFields.push("year");

    if (missingFields.length > 0) {
      console.log("Missing required fields:", missingFields);
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(", ")}` },
        { status: 400 }
      );
    }

    // Validate type enum - be more flexible
    const validTypes = ["pdf", "document", "link", "video"];
    if (!validTypes.includes(type)) {
      console.log("Invalid type:", type, "Valid types:", validTypes);
      return NextResponse.json(
        { error: `Invalid type. Must be one of: ${validTypes.join(", ")}` },
        { status: 400 }
      );
    }

    // Create resource data
    const resourceData = {
      title: title.trim(),
      description: description.trim(),
      type,
      fileUrl,
      filePublicId,
      department: department.trim(),
      year: year.trim(),
    };

    console.log("Creating resource with data:", resourceData);

    // Try to create the resource
    try {
      const resource = new Resource(resourceData);
      const savedResource = await resource.save();

      console.log("Resource saved successfully:", savedResource._id);
      return NextResponse.json(savedResource, { status: 201 });
    } catch (saveError: any) {
      console.error("Save error details:", saveError);

      // If it's a validation error related to enum, try to handle it
      if (
        saveError.name === "ValidationError" &&
        saveError.message.includes("is not a valid enum value")
      ) {
        console.log(
          "Enum validation error detected, possibly due to old schema cache"
        );

        // Force reload the model and try again
        delete require.cache[require.resolve("@/models/Resource")];
        const FreshResource = require("@/models/Resource").default;

        const freshResource = new FreshResource(resourceData);
        const savedFreshResource = await freshResource.save();

        console.log("Resource saved with fresh model:", savedFreshResource._id);
        return NextResponse.json(savedFreshResource, { status: 201 });
      }

      throw saveError; // Re-throw if it's not the expected error
    }
  } catch (error: any) {
    console.error("Resource creation error:", error);

    // Check if it's a validation error
    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map(
        (err: any) => err.message
      );
      return NextResponse.json(
        { error: `Validation error: ${validationErrors.join(", ")}` },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to create resource", details: error.message },
      { status: 500 }
    );
  }
});
