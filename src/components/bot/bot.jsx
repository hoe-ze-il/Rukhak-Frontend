import {
  MessageContainer,
  MessagePaper,
  UserPaper,
} from "@/components/bot/botComponent";
import {
  Avatar,
  Box,
  Paper,
  IconButton,
  FormControl,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

export const BotMessage = ({ message }) => (
  <MessageContainer>
    <Paper
      elevation={3}
      sx={{ marginRight: "0.5rem", borderRadius: "100px", padding: "0.25rem" }}
    >
      <Avatar
        alt="chatbot"
        src="/chatbot.png"
        sx={{ width: "2rem", height: "2rem" }}
      />
    </Paper>
    {message && <MessagePaper>{message}</MessagePaper>}
  </MessageContainer>
);

export const UserMessage = ({ message }) => (
  <MessageContainer user>
    <UserPaper>{message}</UserPaper>
  </MessageContainer>
);

export const BottomBar = ({
  onKeyPress,
  handleSend,
  userInput,
  setUserInput,
}) => (
  <Box
    sx={{
      position: "fixed",
      bottom: 0,
      left: 0,
      width: "100%",
      padding: "1rem",
      backgroundColor: "#BED4AD",
    }}
  >
    <FormControl variant="outline" size="small" fullWidth>
      <OutlinedInput
        placeholder="Write something..."
        sx={{ backgroundColor: "white" }}
        endAdornment={
          <InputAdornment position="end">
            <IconButton onClick={handleSend}>
              <SendIcon sx={{ color: "#256C2C" }} />
            </IconButton>
          </InputAdornment>
        }
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        onKeyPress={onKeyPress}
      />
    </FormControl>
  </Box>
);
