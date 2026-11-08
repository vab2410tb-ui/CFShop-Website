
"use server";

import { auth } from "@/auth";
import cloudinary from "@/lib/services/cloudinary";

export async function uploadBlogThumbnail(formData: FormData) {
  const session = await auth();

  if (session?.user?.role !== "ADMIN") {
    return {
      success: false,
      message: "You are not authorized to upload images.",
    };
  }

  const file = formData.get("file");

  if (!(file instanceof File) || file.size === 0) {
    return {
      success: false,
      message: "Please select an image.",
    };
  }

  if (!file.type.startsWith("image/")) {
    return {
      success: false,
      message: "Only image files are allowed.",
    };
  }

  if (file.size > 5 * 1024 * 1024) {
    return {
      success: false,
      message: "Image size must not exceed 5 MB.",
    };
  }

  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await new Promise<{
      secure_url: string;
    }>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "nab_coffee/blog",
            resource_type: "image",
          },
          (error, result) => {
            if (error) {
              reject(error);
              return;
            }

            if (!result?.secure_url) {
              reject(new Error("Cloudinary upload failed."));
              return;
            }

            resolve({
              secure_url: result.secure_url,
            });
          }
        )
        .end(buffer);
    });

    return {
      success: true,
      url: result.secure_url,
    };
  } catch (error) {
    console.error("uploadBlogThumbnail error:", error);

    return {
      success: false,
      message: "Unable to upload thumbnail.",
    };
  }
}
