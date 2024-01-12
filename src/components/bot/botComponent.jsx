import ProductCard from "@/components/user/ProductCard";
import { Box, Paper, Typography, Button, Stack } from "@mui/material";

export const MessageContainer = ({ children, user }) => {
  const hasTail = typeof user !== "undefined";

  return (
    <Stack
      direction={user ? "row-reverse" : "row"}
      alignItems={user ? "flex-end" : "flex-start"}
      mb={2}
      sx={{
        "&::after": hasTail && {
          content: '""',
          position: user ? "absolute" : "relative",
          top: user ? "0" : "unset",
          bottom: user ? "unset" : "-10px",
          left: user ? "20px" : "unset",
          right: user ? "unset" : "20px",
          width: "20px",
          height: "20px",
          backgroundColor: user ? "#E0E0E0" : "#4CAF50",
          transform: user
            ? "translateY(-50%) rotate(45deg)"
            : "translateY(50%) rotate(45deg)",
          clipPath: user
            ? "polygon(-50% -50%, 100% 0, 0 100%)"
            : "polygon(100% 50%, 0 0, 100% 0)",
        },
      }}
    >
      {children}
    </Stack>
  );
};

export const MessagePaper = ({ children }) => (
  <Paper
    sx={{
      padding: "8px 16px",
      backgroundColor: "#E0E0E0",
      borderRadius: "20px",
      borderTopLeftRadius: 0,
      maxWidth: "75%",
      color: "#000000",
      fontSize: "0.875rem",
      fontWeight: "400",
      lineHeight: 1.43,
      textAlign: "left",
      wordBreak: "break-word",
      "&::after": {
        content: '""',
        position: "absolute",
        top: "0",
        left: "20px",
        width: "20px",
        height: "20px",
        backgroundColor: "#E0E0E0",
        transform: "translateY(-50%) rotate(45deg)",
        clipPath: "polygon(-50% -50%, 100% 0, 0 100%)",
      },
    }}
  >
    <Typography variant="body1">{children}</Typography>
  </Paper>
);

export const UserPaper = ({ children }) => (
  <Paper
    sx={{
      padding: "8px 16px",
      backgroundColor: "#4CAF50",
      color: "white",
      borderRadius: "20px",
      borderBottomRightRadius: 0,
      maxWidth: "75%",
      fontSize: "0.875rem",
      fontWeight: "400",
      lineHeight: 1.43,
      textAlign: "left",
      wordBreak: "break-word",
      "&::after": {
        content: '""',
        position: "absolute",
        bottom: "-10px",
        right: "20px",
        width: "20px",
        height: "20px",
        transform: "translateY(50%) rotate(45deg)",
        clipPath: "polygon(100% 50%, 0 0, 100% 0)",
      },
    }}
  >
    <Typography variant="body1">{children}</Typography>
  </Paper>
);

export const ProductCardRow = ({ products }) => (
  <Box
    display="flex"
    overflow="scroll"
    padding="8px 0"
    gap="0.5rem"
    height="280px"
    marginBottom="10px"
  >
    {products.map((product, index) => (
      <ProductCard key={index} product={product} />
    ))}
  </Box>
);
const option = [
  "Do you want me to recommend?",
  "Do you want to see product?",
  "Do you want to read ours return policy?",
];

export const getButtonClickText = (label) => {
  switch (label) {
    case "Do you want me to recommend?":
      return "I want you to recommend me product";
    case "Do you want to see product?":
      return "I want you to show me product";
    case "Do you want to read ours return policy?":
      return "show me return policy";
    default:
      return "";
  }
};

export const ButtonOptions = ({ handleButtonClick }) => (
  <Stack spacing={1} direction="column">
    {option.map((label, index) => (
      <Button
        key={index}
        variant="contained"
        onClick={() => handleButtonClick(getButtonClickText(label))}
        sx={{
          backgroundColor: "transparent",
          color: "black",
          border: "1px solid #256C2C",
          width: "90%",
          textTransform: "none",
          marginBottom: "8px",
        }}
      >
        {label}
      </Button>
    ))}
  </Stack>
);

export const StatusShippingMessage = ({ status }) => (
  <Paper elevation={3} className="shipping-status-container">
    <Typography variant="body1" className="status-text">
      Shipping Status: {status}
    </Typography>
    {/* Add more information or styling as needed */}
  </Paper>
);
