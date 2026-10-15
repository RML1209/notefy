import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import cloudinary from "@/lib/cloudinary";

export async function POST(request: Request) {
  try {
    // --------------------------------------------------
    // Check authentication
    // --------------------------------------------------

    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized.",
        },
        {
          status: 401,
        },
      );
    }

    // --------------------------------------------------
    // Get uploaded file
    // --------------------------------------------------

    const formData = await request.formData();

    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        {
          success: false,
          message: "No image file was provided.",
        },
        {
          status: 400,
        },
      );
    }

    // --------------------------------------------------
    // Validate file type
    // --------------------------------------------------

    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        {
          success: false,
          message: "Only JPG, PNG, WEBP, and GIF images are allowed.",
        },
        {
          status: 400,
        },
      );
    }

    // --------------------------------------------------
    // Validate file size
    // --------------------------------------------------

    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
      return NextResponse.json(
        {
          success: false,
          message: "Image must be smaller than 5 MB.",
        },
        {
          status: 400,
        },
      );
    }

    // --------------------------------------------------
    // Convert File → Buffer
    // --------------------------------------------------

    const bytes = await file.arrayBuffer();

    const buffer = Buffer.from(bytes);

    // --------------------------------------------------
    // Upload to Cloudinary
    // --------------------------------------------------

    const uploadResult = await new Promise<{
      secure_url: string;
      public_id: string;
    }>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "notefy/profile-images",
          resource_type: "image",
        },
        (error, result) => {
          if (error || !result) {
            reject(error ?? new Error("Cloudinary upload failed."));

            return;
          }

          resolve({
            secure_url: result.secure_url,
            public_id: result.public_id,
          });
        },
      );

      uploadStream.end(buffer);
    });

    // --------------------------------------------------
    // Save image URL to database
    // --------------------------------------------------

    const updatedUser = await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        image: uploadResult.secure_url,
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
      },
    });

    // --------------------------------------------------
    // Return result
    // --------------------------------------------------

    return NextResponse.json({
      success: true,
      imageUrl: uploadResult.secure_url,
      publicId: uploadResult.public_id,
      user: updatedUser,
    });
  } catch (error) {
    console.error("Profile image upload error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to upload profile image.",
      },
      {
        status: 500,
      },
    );
  }
}
