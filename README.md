# Personal Blog Backend

A robust backend API for a personal blogging platform built with Node.js, Express, and MongoDB.

## Features

- 🔐 User Authentication (Register, Login, Logout)
- 📝 Blog Post Management (Create, Read, Update, Delete)
- 💬 Comment System
- 🖼️ Image Upload with Cloudinary
- 🔄 Token-based Authentication
- ⚡ Rate Limiting
- 🛡️ Error Handling
- 📦 TypeScript Support

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB
- **Language:** TypeScript
- **Authentication:** JWT
- **File Storage:** Cloudinary
- **Validation:** Express Validator
- **Security:** bcrypt, helmet
- **Rate Limiting:** express-rate-limit

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Cloudinary Account (for image uploads)
- Git

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
PORT=8800
MONGODB_URI=your_mongodb_uri
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_EXPIRY=7d
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/personalBlogBackend.git
cd personalBlogBackend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register a new user
- `POST /api/v1/auth/login` - Login user
- `POST /api/v1/auth/logout` - Logout user

### Posts
- `GET /api/v1/posts` - Get all posts
- `GET /api/v1/posts/:id` - Get a single post
- `POST /api/v1/posts` - Create a new post
- `PUT /api/v1/posts/:id` - Update a post
- `DELETE /api/v1/posts/:id` - Delete a post

### Comments
- `GET /api/v1/comments/:postId` - Get comments for a post
- `POST /api/v1/comments` - Add a comment
- `PUT /api/v1/comments/:id` - Update a comment
- `DELETE /api/v1/comments/:id` - Delete a comment

## Project Structure

### Key Files and Their Purposes

- **app.ts**: Main application file that sets up Express, middleware, and routes
- **controllers/**: Handle business logic and request processing
- **models/**: Define database schemas and methods
- **routes/**: Define API endpoints and route handlers
- **types/**: TypeScript interfaces for type safety
- **utils/**: Reusable utility functions and configurations

### Configuration Files

- **.env**: Environment variables for configuration
- **tsconfig.json**: TypeScript compiler options
- **package.json**: Project metadata and dependencies
