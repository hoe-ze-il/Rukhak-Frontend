import { useEffect } from "react";
import { useDropzone } from "react-dropzone";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import PhotoSizeSelectActualOutlinedIcon from "@mui/icons-material/PhotoSizeSelectActualOutlined";

function Dropzone({ onDrop }) {
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    onDrop,
  });
  useEffect(() => {
    console.log(acceptedFiles);
  }, [acceptedFiles]);

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <ListItem key="Image" disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <PhotoSizeSelectActualOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Image" />
        </ListItemButton>
      </ListItem>
    </div>
  );
}

export default Dropzone;
