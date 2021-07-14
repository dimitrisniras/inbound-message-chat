import React, { useEffect, useState, useReducer } from "react";
import { useParams } from "react-router-dom";
import { Container } from "../styles/MessageItemStyle";
import SentMessageComponent from "../components/SentMessageComponent";
import { MessageToDisplay } from "./MessageToDisplay";
import { LinearProgress, Box } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { Link } from "react-router-dom";
import useStyles from "../styles/styles";
const initialState = { messages: [], conversation: null, typing: false };

function messagesReducer(state, action) {
  switch (action.type) {
    case "addMessage":
      return { ...state, messages: [...state.messages, action.payload] };
    case "setMessages":
      return { ...state, messages: action.payload };
    case "setConversation":
      return { ...state, conversation: action.payload };
    case "updateMessage":
      return {
        ...state,
        messages: state.messages.map((message) =>
          message.id === action.payload.id ? action.payload : message
        ),
      };
    default:
      throw new Error();
  }
}

const MessageList = ({ nexmoApp }) => {
  const { id } = useParams();
  const classes = useStyles();
  const [state, dispatch] = useReducer(messagesReducer, initialState);
  const [progress, setProgress] = useState(false);

  useEffect(() => {
    setProgress(true);

    const fetchMessages = async () => {
      const conversation = await nexmoApp.conversations.get(id);
      dispatch({ type: "setConversation", payload: conversation });

      const messages = await conversation.getEvents({
        event_type: "text",
        page_size: 15,
      });

      const formattedMessages = Array.from(messages.items).map((i) => i[1]);

      dispatch({ type: "setMessages", payload: formattedMessages });
      setProgress(false);

      conversation.on("text", (member, event) => {
        dispatch({ type: "addMessage", payload: event });
      });
    };

    fetchMessages();

    return function unsubsribe() {
      if (state.conversation) {
        state.conversation.releaseGroup(id);
      }
    };
  }, [id, nexmoApp.conversations, state.conversation]);

  function onSubmit(messageText) {
    state.conversation.sendText(messageText);
  }
  function handleKeyPress(e, newMessage) {
    if (e.key === "Enter" && newMessage.length) {
      onSubmit(newMessage);
    }
  }
  const MessageList = () => {
    return (
      <Box className={classes.box}>
        <Container>
          <Link to="/conversations" className={classes.link}>
            <ArrowBackIosIcon />
          </Link>
          {state.messages.map((message) => {
            return (
              <MessageToDisplay
                key={message.id}
                message={message}
                dispatch={dispatch}
              />
            );
          })}
        </Container>
        {state.messages && (
          <SentMessageComponent
            onSubmit={onSubmit}
            onKeyPress={handleKeyPress}
          />
        )}
      </Box>
    );
  };
  if (progress) {
    return <LinearProgress className={classes.linearProgress} />;
  } else {
    return <MessageList />;
  }
};

export default MessageList;
