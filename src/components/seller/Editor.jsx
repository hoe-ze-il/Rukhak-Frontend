import { useRef } from "react";
import ReactQuill, { Quill } from "react-quill";
import * as Emoji from "quill-emoji";
import "react-quill/dist/quill.snow.css";
import "quill-emoji/dist/quill-emoji.css";
import { useContext } from "react";
import { ProductFormContext } from "@/contexts/seller/ProductFormContext";

Quill.register("modules/emoji", Emoji);

const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, false] }],
  ["bold", "italic", "underline", "strike", "blockquote", "link"],
  [{ list: "ordered" }, { list: "bullet" }],
  ["emoji"],
  ["clean"],
];

function Editor({ attemptedSubmit, validDescription, setValidDescription }) {
  const { description, setDescription } = useContext(ProductFormContext);
  const reactQuillRef = useRef(null);
  const onChange = (content) => {
    setDescription(content);
    if (attemptedSubmit) {
      setValidDescription(!!content && content !== "<p><br></p>");
    }
  };

  return (
    <>
      <ReactQuill
        className={attemptedSubmit && !validDescription ? "invalid-desc" : ""}
        ref={reactQuillRef}
        theme="snow"
        placeholder="Start writing... *"
        modules={{
          toolbar: {
            container: TOOLBAR_OPTIONS,
          },
          "emoji-toolbar": true,
          "emoji-textarea": false,
          "emoji-shortname": true,
        }}
        value={description}
        onChange={onChange}
      />
    </>
  );
}

export default Editor;
