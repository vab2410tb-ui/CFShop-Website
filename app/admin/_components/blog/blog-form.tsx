"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBlog } from "@/actions/blog/create-blog";
import { updateBlog } from "@/actions/blog/update-blog";
import { generateSlug } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Textarea from "@/components/ui/floating-textarea";
import BlogEditor from "@/components/blog/blog-editor";
import { uploadBlogThumbnail } from "@/lib/upload/upload-blog-thumbnail";
import { toast } from "sonner";

interface BlogFormData {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  content: string;
  thumbnail: string | null;
  published: boolean;
}

interface BlogFormProps {
  initialData?: BlogFormData;
}

export const BlogForm = ({ initialData }: BlogFormProps) => {
  const router = useRouter();
  const isEditing = Boolean(initialData);

  const [title, setTitle] = useState(initialData?.title ?? "");
  const [slug, setSlug] = useState(initialData?.slug ?? "");
  const [description, setDescription] = useState(
    initialData?.description ?? "",
  );
  const [content, setContent] = useState(initialData?.content ?? "");
  const [thumbnail, setThumbnail] = useState(initialData?.thumbnail ?? "");
  const [published, setPublished] = useState(initialData?.published ?? false);

  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleContentChange = (value: string) => {
    setContent(value);
  };

  const handleTitleChange = (value: string) => {
    setTitle(value);
    setSlug(generateSlug(value));
  };

  const handleThumbnailUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file.");
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must not exceed 5 MB.");
      event.target.value = "";
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const result = await uploadBlogThumbnail(formData);

      if (!result.success || !result.url) {
        toast.error(result.message ?? "Image upload failed.");
        return;
      }

      setThumbnail(result.url);
      toast.success("Thumbnail uploaded successfully.");
    } catch {
      toast.error("Unable to upload thumbnail.");
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const plainTextContent = content
      .replace(/<[^>]*>/g, " ")
      .replace(/&nbsp;/g, " ")
      .trim();

    if (!title.trim() || !plainTextContent) {
      toast.error("Title and content are required.");
      return;
    }

    setSaving(true);

    try {
      const data = {
        title: title.trim(),
        slug: generateSlug(slug || title),
        description: description.trim(),
        content: content.trim(),
        thumbnail,
        published,
      };

      const result = isEditing
        ? await updateBlog(initialData!.id, data)
        : await createBlog(data);

      if (!result.success) {
        toast.error(result.message ?? "Unable to save blog.");
        return;
      }

      toast.success(
        isEditing ? "Blog updated successfully!" : "Blog created successfully!",
      );
      router.push("/admin/blog");
      router.refresh();
    } catch {
      toast.error("An unexpected error occurred.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title */}
      <div className="space-y-2">
        <label htmlFor="title" className="text-sm font-medium">
          Title <span className="text-red-500">*</span>
        </label>

        <Input
          id="title"
          value={title}
          onChange={(event) => handleTitleChange(event.target.value)}
          placeholder="How to Choose an Espresso Machine"
          maxLength={200}
          required
        />
      </div>

      {/* Slug */}
      <div className="space-y-2">
        <label htmlFor="slug" className="text-sm font-medium">
          Slug
        </label>

        <Input
          id="slug"
          value={slug}
          onChange={(event) => setSlug(generateSlug(event.target.value))}
          placeholder="how-to-choose-an-espresso-machine"
        />

        <p className="text-xs text-muted-foreground">
          URL: /blog/{slug || "your-blog-slug"}
        </p>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label htmlFor="description" className="text-sm font-medium">
          Description
        </label>

        <Textarea
          id="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Write a short description for your blog..."
          maxLength={500}
          rows={3}
        />

        <p className="text-xs text-muted-foreground">
          {description.length}/500 characters
        </p>
      </div>

      {/* Content */}
      <div className="space-y-2">
        <label htmlFor="content" className="text-sm font-medium">
          Content <span className="text-red-500">*</span>
        </label>

        <BlogEditor initialContent={content} onChange={handleContentChange} />

        <p className="text-xs text-muted-foreground">
          Use the toolbar to format text, create headings, and add numbered or bulleted lists.
        </p>
      </div>

      {/* Thumbnail */}
      <div className="space-y-3">
        <label htmlFor="thumbnail" className="text-sm font-medium">
          Thumbnail
        </label>

        <Input
          id="thumbnail"
          type="file"
          accept="image/*"
          onChange={handleThumbnailUpload}
          disabled={uploading || saving}
        />

        <p className="text-xs text-muted-foreground">
          Maximum file size: 5 MB.
        </p>

        {uploading && (
          <p className="text-sm text-muted-foreground">
            Uploading thumbnail...
          </p>
        )}

        {thumbnail && (
          <div className="space-y-3">
            <Image
              src={thumbnail}
              alt="Blog thumbnail preview"
              width={48}
              height={48}
              className="h-48 w-full max-w-md rounded-lg border object-cover"
            />

            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={uploading || saving}
              onClick={() => setThumbnail("")}
            >
              Remove thumbnail
            </Button>
          </div>
        )}
      </div>

      {/* Published */}
      <div className="flex items-start gap-3 rounded-lg border p-4">
        <input
          id="published"
          type="checkbox"
          checked={published}
          onChange={(event) => setPublished(event.target.checked)}
          className="mt-1 size-4 accent-black"
        />

        <div className="space-y-1">
          <label
            htmlFor="published"
            className="cursor-pointer text-sm font-medium"
          >
            Publish this blog
          </label>

          <p className="text-sm text-muted-foreground">
            {published
              ? "This blog will be marked as published."
              : "Save this blog as a draft."}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap justify-end gap-3 border-t pt-5">
        <Button
          type="button"
          variant="outline"
          disabled={saving || uploading}
          onClick={() => router.push("/admin/blog")}
        >
          Cancel
        </Button>

        <Button type="submit" disabled={saving || uploading}>
          {uploading
            ? "Uploading..."
            : saving
              ? "Saving..."
              : isEditing
                ? "Update Blog"
                : "Create Blog"}
        </Button>
      </div>
    </form>
  );
};
