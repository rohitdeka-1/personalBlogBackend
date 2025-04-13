import mongoose, { Schema } from "mongoose";
import { Ipost } from "../types/dbTypes/postModel.types";

// Define the Post schema with all necessary fields
const PostSchema = new Schema(
  {
    // Basic post information
    title: {
      type: String,
      required: true, // Title is mandatory
      trim: true, // Remove whitespace from both ends
      index: true, // Create an index for faster queries
    },
    content: {
      type: String,
      required: true, // Main content is mandatory
    },
    slug: {
      type: String,
      required: true, // URL-friendly version of title
      unique: true, // Each post must have a unique slug
      lowercase: true, // Convert to lowercase
      trim: true, // Remove whitespace
    },
    excerpt: {
      type: String,
      required: true, // Short summary for preview
      trim: true,
    },

    // Media fields
    thumbnail: {
      type: String, // URL to the main image
    },
    images: [
      {
        // Array of additional images
        type: String, // URLs to additional images
      },
    ],

    // References and categorization
    author: {
      type: Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true, // Every post must have an author
    },
    category: {
      type: String,
      required: true, // Post must belong to a category
      trim: true,
    },
    tags: [
      {
        // Array of tags for better content organization
        type: String,
        trim: true,
      },
    ],

    // Post status and statistics
    isPublished: {
      type: Boolean,
      default: false, // Posts start as drafts
    },
    publishedAt: {
      type: Date, // When the post was published
    },
    views: {
      type: Number,
      default: 0, // Track post views
    },
    likes: {
      type: Number,
      default: 0, // Track post likes
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment", // Reference to comments on this post
      },
    ],
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Pre-save middleware to automatically generate slug from title
PostSchema.pre("save", function (next) {
  if (this.isModified("title")) {
    // Convert title to URL-friendly slug:
    // 1. Convert to lowercase
    // 2. Replace non-alphanumeric characters with hyphens
    // 3. Replace multiple hyphens with single hyphen
    // 4. Remove leading/trailing whitespace
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]/g, "-")
      .replace(/-+/g, "-")
      .trim();
  }
  next();
});

// Create and export the Post model
export const Post = mongoose.model<Ipost>("Post", PostSchema);
