import { Request, Response, NextFunction } from "express";
import { ApiError } from "./ApiErrors";


const asyncHandler = (
  requestHandler: (req: Request, res: Response) => Promise<void>) => {
  return async (req: Request, res: Response) => {
    try {
      await requestHandler(req, res);
    } catch (error) {
      console.error("Error", error);
      throw new ApiError(500, "Internal Server Error");
    }
  };
};

export default asyncHandler;


