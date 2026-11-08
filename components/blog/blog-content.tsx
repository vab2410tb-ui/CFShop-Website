
import DOMPurify from "isomorphic-dompurify";

interface BlogContentProps {
  content: string;
}

const BlogContent = ({ content }: BlogContentProps) => {
  const sanitizedContent = DOMPurify.sanitize(content, {
    USE_PROFILES: { html: true },
  });

  return (
    <article
      className="blog-content "
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
    />
  );
};

export default BlogContent;
