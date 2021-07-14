import React, { useState } from "react";
import { Container, ActualInput, SendButton } from "../styles/MessageInputStyle";
import SendIcon from "@material-ui/icons/Send";
import useStyles from "../styles/styles";

const SentMessageComponent = ({ onSubmit, onKeyPress }) => {
  const [newMessage, setNewMessage] = useState("");
  const classes = useStyles();

  function onChange(e) {
    setNewMessage(e.target.value);
  }

  function onClick(e) {
    if (newMessage.length) {
      onSubmit(newMessage);
      setNewMessage("");
    }
  }

  return (
    <Container className={classes.sentMessageComponent}>
      <ActualInput
        data-testid="message-input"
        type="text"
        placeholder="Type a message"
        value={newMessage}
        onChange={onChange}
        onKeyPress={(e) => {
          onKeyPress(e, newMessage);
        }}
      />
      <SendButton
        data-testid="send-button"
        variant="contained"
        color="primary"
        onClick={onClick}
      >
        <SendIcon style={{ fill: "green" }} />
      </SendButton>
    </Container>
  );
};

export default SentMessageComponent;
