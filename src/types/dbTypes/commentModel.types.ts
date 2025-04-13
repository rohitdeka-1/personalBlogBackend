import { Document, Types } from "mongoose";

export interface Icomment extends Document {
    // Basic comment information
    content: string;          // Comment content

    // References
    post: Types.ObjectId;     // Reference to Post model
    author: Types.ObjectId;   // Reference to User model
    parentComment: Types.ObjectId | null;  // Reference to parent comment (null for top-level)

    // Comment status and interactions
    isEdited: boolean;        // Whether comment has been edited
    likes: number;            // Number of likes on comment
    isReported: boolean;      // Whether comment has been reported

    // Timestamps (automatically added by Mongoose)
    createdAt: Date;
    updatedAt: Date;
} 