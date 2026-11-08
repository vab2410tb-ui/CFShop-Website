
export const uploadImageToCloudinary = async(
    file: File
): Promise<string> => {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
        throw new Error(
            "Cloudinary Cloud Name or Upload Preset is missing."
        );
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
            method: "POST",
            body: formData,
        }
    );

    const rawResponse = await response.text();

    console.log("Cloudinary HTTP status:", response.status);
    console.log("Cloudinary raw response:", rawResponse);

    let data: {
        secure_url?: string;
        public_id?: string;
        error?: { message?: string };
    };

    try {
        data = JSON.parse(rawResponse);
    } catch {
        throw new Error(
            `Cloudinary returned invalid JSON: ${rawResponse.slice(0, 300)}`
        );
    }

    if (!response.ok) {
        throw new Error(
            data.error?.message ||
                `Cloudinary upload failed: HTTP ${response.status}`
        );
    }

    if (!data.secure_url) {
        throw new Error(
            "Upload response does not contain secure_url. Check the raw response in Console."
        );
    }

    console.log("Cloudinary image URL:", data.secure_url);

    return data.secure_url;
}
