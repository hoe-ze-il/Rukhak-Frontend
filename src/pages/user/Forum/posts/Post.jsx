import { useCallback } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { useCreatePostMutation } from "@/features/api/post.api";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import MyDropzone from "@/components/user/forum/Dropzone";
import { uniqueId } from "lodash";
import useInput from "@/hooks/user/useInput";
import { useSelector } from "react-redux";
import { selectCurrentUserId } from "@/features/auth/authSlice";
import CircularProgress from "@mui/material/CircularProgress";

function Post() {
  const userId = useSelector((state) => selectCurrentUserId(state));
  const navigate = useNavigate();
  const [images, setImages] = useState([]);

  const [createPost, { isLoading }] = useCreatePostMutation();
  const [type, bindType, resetType] = useInput("public");
  const [title, bindTitle, resetTitle] = useInput("");
  const [content, bindContent, resetContent] = useInput("");

  const onDrop = useCallback((acceptedFiles) => {
    const newImages = acceptedFiles.map((file) => {
      return {
        id: uniqueId(),
        src: URL.createObjectURL(file),
        file: file,
      };
    });

    setImages((prevState) => [...prevState, ...newImages]);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("author", userId);
    formData.append("type", type);
    formData.append("title", title);
    formData.append("content", content);

    images.forEach((image) => {
      formData.append(`media`, image.file);
    });

    try {
      await createPost(formData).unwrap();

      resetType();
      resetContent();
      resetTitle();
      navigate("/forum");
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };
  if (isLoading) {
    return (
      <Box
        height={"100%"}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <CircularProgress />
      </Box>
    );
  }
  return (
    <>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: "8px" }}
      >
        <FormControl sx={{ m: 1 }} variant="standard">
          <Select id="pravacy_type" {...bindType}>
            <MenuItem value="public">Public</MenuItem>
            <MenuItem value="restricted">Restricted</MenuItem>
            <MenuItem value="private">Private</MenuItem>
          </Select>
        </FormControl>
        <TextField label="Title" variant="filled" required {...bindTitle} />
        <TextField
          minRows={5}
          label="Content"
          variant="filled"
          required
          {...bindContent}
        />
        <Button type="submit">Save</Button>
        <MyDropzone onDrop={onDrop} accept={"image/*"} />
      </Box>
    </>
  );
}

export default Post;
