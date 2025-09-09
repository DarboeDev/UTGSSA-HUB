import mongoose, { Document, Schema } from "mongoose";

export interface INews extends Document {
  title: string;
  summary: string;
  content: string;
  image?: string;
  author: string;
  category: "announcement" | "achievement" | "event" | "general";
  isPublished: boolean;
  publishDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

const NewsSchema = new Schema<INews>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    summary: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    author: {
      type: String,
      default: "UTG-SSA",
    },
    category: {
      type: String,
      enum: ["announcement", "achievement", "event", "general"],
      default: "general",
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    publishDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.News ||
  mongoose.model<INews>("News", NewsSchema);
