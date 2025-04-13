import mongoose, { Schema } from "mongoose";
import { Icomment } from "../types/dbTypes/commentModel.types";

// Define the Comment schema with all necessary fields
const CommentSchema = new Schema(
  {
    // Basic comment information
    content: {
      type: String,
      required: true, // Comment content is mandatory
      trim: true, // Remove whitespace from both ends
    },

    // References
    post: {
      type: Schema.Types.ObjectId,
      ref: "Post", // Reference to the Post model
      required: true, // Every comment must belong to a post
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true, // Every comment must have an author
    },
    parentComment: {
      type: Schema.Types.ObjectId,
      ref: "Comment", // Reference to parent comment for nested replies
      default: null, // Null for top-level comments
    },

    // Comment status and interactions
    isEdited: {
      type: Boolean,
      default: false, // Track if comment has been edited
    },
    likes: {
      type: Number,
      default: 0, // Track comment likes
    },
    isReported: {
      type: Boolean,
      default: false, // Track if comment has been reported
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Create and export the Comment model with TypeScript interface
export const Comment = mongoose.model<Icomment>("Comment", CommentSchema);
