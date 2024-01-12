import * as React from "react";
import { Global } from "@emotion/react";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { grey } from "@mui/material/colors";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SlowMotionVideoOutlinedIcon from "@mui/icons-material/SlowMotionVideoOutlined";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import DocumentScannerOutlinedIcon from "@mui/icons-material/DocumentScannerOutlined";
import Dropzone from "./Dropzone";

const FileTypes = [
  { name: "Video", icon: <SlowMotionVideoOutlinedIcon /> },
  { name: "Link", icon: <AttachFileOutlinedIcon /> },
  { name: "File", icon: <DocumentScannerOutlinedIcon /> },
];
const drawerBleeding = 56;

const Root = styled("div")(({ theme }) => ({
  height: "100%",
  backgroundColor:
    theme.palette.mode === "light"
      ? grey[100]
      : theme.palette.background.default,
}));

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#fff" : grey[800],
}));

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === "light" ? grey[300] : grey[900],
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)",
}));

function AttachmentDrawer(props) {
  const { window, onImagesChange, onRemoveFile } = props;
  const [open, setOpen] = React.useState(true);
  const [images, setImages] = React.useState([]);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const onDrop = React.useCallback(
    (acceptedFiles) => {
      const newImages = acceptedFiles.map((file) => {
        return {
          id: new Date(),
          src: URL.createObjectURL(file),
          file: file,
        };
      });

      setImages((prevState) => [...prevState, ...newImages]);
      onImagesChange && onImagesChange([...newImages]);
    },
    [onImagesChange]
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Root>
      <CssBaseline />
      <Global
        styles={{
          ".MuiDrawer-root > .MuiPaper-root": {
            height: `calc(50% - ${drawerBleeding}px)`,
            overflow: "visible",
          },
        }}
      />

      <SwipeableDrawer
        container={container}
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <StyledBox
          sx={{
            position: "absolute",
            top: -drawerBleeding,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: "visible",
            right: 0,
            left: 0,
          }}
        >
          <Puller />

          <Typography sx={{ p: 2, color: "text.secondary" }}>
            Attachment
          </Typography>
        </StyledBox>
        <StyledBox
          sx={{
            px: 2,
            pb: 2,
            height: "100%",
            overflow: "auto",
          }}
        >
          <List>
            <Dropzone onDrop={onDrop} />
            {FileTypes.map(({ name, icon }) => (
              <ListItem key={name} disablePadding>
                <ListItemButton>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText primary={name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </StyledBox>
      </SwipeableDrawer>
    </Root>
  );
}

export default AttachmentDrawer;
