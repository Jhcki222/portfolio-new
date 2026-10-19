import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function ChatAnswer({ content }: { content: string }) {
  return (
    <div className="chat-answer">
      <Markdown
        remarkPlugins={[remarkGfm]}
        skipHtml
        urlTransform={(url, key) => {
          if (key !== "href") return "";
          if (/^\/(?:#[a-z-]+|projects\/[a-z-]+)$/.test(url)) return url;
          if (/^https:\/\/(?:github\.com|www\.mdpi\.com)\//.test(url)) return url;
          if (url === "mailto:jhcki222@gmail.com") return url;
          return "";
        }}
        components={{
          a: ({ href, children }) => !href ? <>{children}</> : (
            <a href={href} {...(href.startsWith("https://") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{children}</a>
          ),
          img: ({ alt }) => <>{alt}</>,
          table: ({ children }) => <div className="chat-table-scroll"><table>{children}</table></div>,
        }}
      >
        {content}
      </Markdown>
    </div>
  );
}
