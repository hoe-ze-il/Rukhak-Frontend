import Box from "@mui/material/Box";

const NoContentPage = ({ context }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h3>There is no {context} yet</h3>
      <Box padding="0 2rem">
        <img src="../no-content.svg" alt="No content banner" />
      </Box>
      <span>Let's grow your {context}</span>
    </Box>
  );
};

export default NoContentPage;
