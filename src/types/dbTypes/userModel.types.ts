import { Document } from "mongoose";

export interface Iuser extends Document {
    userName: string;
    password: string;
    email: string;
    fullName: string,
    avatar: string;
    refreshToken?: string;
    accessToken?: string;
    createdAt: Date;
    updatedAt: Date;
    isPasswordCorrect(password: string): Promise<boolean>;
    generateAccessToken(): string;
    generateRefreshToken(): string;
}

