import { Document, Types } from "mongoose";

export interface Ipost extends Document{
    title: string,          // Blog post title
    content: string,        // Main content of the blog
    slug: string,          // URL-friendly version of title
    excerpt: string,       // Short summary for preview
    
    // Media
    thumbnail: string,     // Main image URL
    images: string[],      // Additional images
    
    // Metadata
    author: Types.ObjectId,      // Reference to User model
    category: string,      // Blog category
    tags: string[],        // Related tags
    
    // Status & Stats
    isPublished: boolean,  // Draft or published
    publishedAt: Date,     // When it was published
    views: number,         // View count
    likes: number,         // Like count
    
    // SEO
    metaTitle: string,     // SEO title
    metaDescription: string, // SEO description
    
    // Timestamps (automatically handled by Mongoose)
    createdAt: Date,
    updatedAt: Date
}