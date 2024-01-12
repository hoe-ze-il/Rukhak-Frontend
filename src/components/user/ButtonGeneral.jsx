import LoadingButton from "@mui/lab/LoadingButton";

function ButtonGeneral({
  fullWidth,
  text,
  onClick,
  type,
  onChange,
  buttonBGColor = "#256c2c",
  buttonHover = "#3D8B3D",
  isLoading,
  canClick = true,
  float,
}) {
  return (
    <LoadingButton
      type="submit"
      onClick={onClick}
      variant="contained"
      loading={isLoading}
      disabled={!canClick}
      fullWidth={fullWidth === "100%" && true}
      sx={{
        float: float,
        mb: 2,
        margin: "0px",
        borderRadius: "20px",
        height: "40px",
        position: "relative",
        backgroundColor: buttonBGColor,
        "&:hover": {
          backgroundColor: buttonHover,
        },
        color: "white",
        cursor: "pointer",
      }}
    >
      {text}
      {type === "file" && (
        <input
          type="file"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            opacity: 0,
            width: "100%",
            height: "100%",
          }}
          accept="image/*"
          onChange={onChange}
        />
      )}
    </LoadingButton>
  );
}

export default ButtonGeneral;
