import React, { useState, useRef, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { BotMessage, UserMessage, BottomBar } from "@/components/bot/bot";
import Axios from "axios";
import { ButtonOptions } from "@/components/bot/botComponent";
import { useGetProductsQuery } from "@/features/api/getProductsSlice";
import { handleIntentResponse } from "@/components/bot/botFunction";
import MainTopNavigationBar from "@/components/user/MainTopNavigationBar";

function ChatInterface() {
  const [userInput, setUserInput] = useState("");
  const [products, setProducts] = useState([]);
  const { data, error } = useGetProductsQuery({
    pageNumber: 1,
  });

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const [conversation, setConversation] = useState([
    {
      by: "bot",
      message: "Welcome to our website! I'm Rukhak bot, how can I help you?",
      special: true,
    },
  ]);
  const chatMessagesRef = useRef(null);
  const scrollToBottom = () => {
    chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
  };
  useEffect(() => {
    scrollToBottom();
  }, [conversation]);

  useEffect(() => {
    if (data) {
      setProducts(data.data.docs);
    }
  }, [data]);
  const textQuery = async (text) => {
    if (text.trim() === "") {
      return;
    }

    setConversation((prevConversation) => [
      ...prevConversation,
      { by: "user", message: text },
    ]);

    try {
      const response = await Axios.post(
        import.meta.env.VITE_BASE_URL + "/bot/textquery",
        { text: text }
      );

      const intentResponse = response.data.intent.displayName;
      handleIntentResponse(intentResponse, response, setConversation, products);
    } catch (error) {
      console.error("Error making request to Dialogflow:", error);
    }
  };

  const handleSend = async () => {
    const trimmedInput = userInput.trim();
    if (trimmedInput) {
      await textQuery(trimmedInput);
      setUserInput("");
    }
  };

  const keyPressHandler = (e) => {
    if (e.key === "Enter") {
      const trimmedInput = userInput.trim();
      if (trimmedInput) {
        textQuery(trimmedInput);
        setUserInput("");
      }
    }
  };

  const handleButtonClicked = (buttonContent) => {
    textQuery(buttonContent);
  };

  return (
    <Box component="main" >
      <MainTopNavigationBar />
      <Box sx={{ padding: "1rem", overflowY: "auto",height:"83vh" }} ref={chatMessagesRef}>
        {conversation.map((entry, index) =>
          entry.by === "bot" ? (
            <BotMessage key={index} message={entry.message} />
          ) : entry.by === "user" ? (
            <UserMessage key={index} message={entry.message} />
          ) : (
            <Box key={index}>
              <Typography variant="body1">{entry.message}</Typography>
            </Box>
          )
        )}
        {conversation.length > 0 &&
          conversation[conversation.length - 1].special && (
            <Box>
              <ButtonOptions handleButtonClick={handleButtonClicked} />
            </Box>
          )}
      </Box>
      <BottomBar
        onKeyPress={keyPressHandler}
        handleSend={handleSend}
        userInput={userInput}
        setUserInput={setUserInput}
      />
    </Box>
  );
}

export default ChatInterface;
