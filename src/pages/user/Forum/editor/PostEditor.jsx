import DOMPurify from "dompurify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Button from "@mui/material/Button";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "@/styles/user/forum/post.module.scss";

const sanitizeHTML = (html) => ({
  __html: DOMPurify.sanitize(html),
});

const PostEditor = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [parsedContent, setParsedContent] = useState({
    text: [],
    images: [],
    links: [],
    videos: [],
  });
  const quillRef = useRef(null);

  const handleQuillChange = (content) => {
    setValue(content);
  };

  const handleOnSave = () => {
    navigate("/");
  };

  useEffect(() => {
    const contentToParse = value;
    const parsedContent = parseQuillContent(contentToParse);
    console.log(parsedContent);
    setParsedContent(parsedContent);
  }, [value]);

  const parseQuillContent = (content) => {
    const doc = new DOMParser().parseFromString(content, "text/html");
    const parsedContent = {
      text: [],
      images: [],
      links: [],
      videos: [],
    };

    // Extract text
    parsedContent.text.push(doc.body.textContent.trim());

    // Extract images
    const imgElements = doc.body.querySelectorAll("img");
    imgElements.forEach((img) => {
      const base64Data = img.src.split(",")[1];
      const image = {
        data: base64Data,
        type: img.src.split(";")[0].split(":")[1],
        alt: img.alt,
      };
      parsedContent.images.push(image);
    });

    const linkElements = doc.body.querySelectorAll("a");
    linkElements.forEach((link) => {
      parsedContent.links.push({
        href: link.href,
        text: link.textContent,
      });
    });

    const videoElements = doc.body.querySelectorAll("video");
    videoElements.forEach((video) => {
      parsedContent.videos.push({
        src: video.src,
        type: video.type,
      });
    });

    return parsedContent;
  };

  const clearLocalStorage = () => {
    setValue("");
    setParsedContent({
      text: [],
      images: [],
      links: [],
      videos: [],
    });
  };

  const quillModules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        [{ script: "sub" }, { script: "super" }],
        ["blockquote", "code-block"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
        ["link", "image", "video"],
        ["clean"],
      ],
    },
  };

  return (
    <div className={styles.editor}>
      <h2>New Post</h2>
      <ReactQuill
        ref={quillRef}
        modules={quillModules}
        theme="snow"
        value={value}
        onChange={handleQuillChange}
        className={styles.quill_container}
      />
      <div>
        <Button variant="outlined" onClick={handleOnSave}>
          Save
        </Button>
        <Button variant="outlined" onClick={clearLocalStorage}>
          Clear
        </Button>
      </div>
      <div className={styles.preview}>
        <h3>Preview:</h3>
        <div dangerouslySetInnerHTML={sanitizeHTML(value)} />
      </div>
    </div>
  );
};

export default PostEditor;
