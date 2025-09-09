import mongoose, { Document, Schema } from "mongoose";

export type ResourceType = "pdf" | "document" | "link" | "video";

export interface IResource extends Document {
  title: string;
  description?: string;
  type: ResourceType;
  fileUrl: string;
  filePublicId?: string;
  department: string;
  year: string;
  createdAt: Date;
  updatedAt: Date;
}

const ResourceSchema = new Schema<IResource>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    type: {
      type: String,
      required: [true, "Type is required"],
      enum: {
        values: ["pdf", "document", "link", "video"],
        message: "Type must be one of: pdf, document, link, video",
      },
    },
    fileUrl: {
      type: String,
      required: [true, "File URL is required"],
    },
    filePublicId: {
      type: String,
      default: "",
    },
    department: {
      type: String,
      required: [true, "Department is required"],
      trim: true,
    },
    year: {
      type: String,
      required: [true, "Year is required"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create indexes for better query performance
ResourceSchema.index({ department: 1 });
ResourceSchema.index({ year: -1 });
ResourceSchema.index({ type: 1 });

// Force model recompilation in development
if (process.env.NODE_ENV === "development" && mongoose.models.Resource) {
  delete mongoose.models.Resource;
}

export default mongoose.models.Resource ||
  mongoose.model<IResource>("Resource", ResourceSchema);
