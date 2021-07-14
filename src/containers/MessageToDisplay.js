import React from "react";
import useStyles from "../styles/styles";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

import TranslateIcon from "@material-ui/icons/Translate";
import {
  MessageItemMe,
  MessageItemFrom,
  Contents,
  Timestamp,
} from "../styles/MessageItemStyle";
import moment from "moment";
import config from "../config";
const axios = require("axios");

export const MessageToDisplay = ({ message, dispatch }) => {
  const { rapid_api_key } = config;
  const classes = useStyles();

  async function translate(text, to) {
    let response = await axios({
      method: "POST",
      url: "https://microsoft-translator-text.p.rapidapi.com/translate",
      headers: {
        "content-type": "application/json",
        // "x-rapidapi-host": "microsoft-translator-text.p.rapidapi.com",
        "x-rapidapi-key": rapid_api_key,
        accept: "application/json",
        useQueryString: true,
      },
      params: {
        // "from": from,
        profanityAction: "NoAction",
        textType: "plain",
        to: to,
        "api-version": "3.0",
      },
      data: [{ Text: text }],
    });
    return response.data[0].translations[0].text;
  }

  const onTranslateClick = async (message) => {
    const translatedMessage = message;
    try {
      translatedMessage.body.text = await translate(message.body.text, "it");
    } catch (e) {
      console.log("Translation request failed", e.message);
    }
    dispatch({ type: "updateMessage", payload: translatedMessage });
  };
  function findUsername(my_member_id) {
    let username;

    if (message.from !== my_member_id) {
      let name_to_change = message.conversation.members.get(my_member_id).user
        .name;
      if (name_to_change === "Joe") {
        username = "Jane";
      } else {
        username = "Joe";
      }
    }

    return username;
  }
  let username_from = findUsername(message.conversation.me.id);

  return message.conversation.me.id === message.from ? (
    <MessageItemMe data-testid="message-item" key={message.id}>
      <Typography
        variant="overline"
        display="block"
        gutterBottom
        color="secondary"
        className={classes.username}
      >
        ME
      </Typography>
      <Contents data-testid="message-content">{message?.body?.text}</Contents>
      <Timestamp data-testid="message-date">
        {moment(message.timestamp).format("HH:mm")}
      </Timestamp>
    </MessageItemMe>
  ) : (
    <MessageItemFrom data-testid="message-item" key={message.id}>
      <Typography
        variant="overline"
        display="block"
        gutterBottom
        color="secondary"
        className={classes.username}
      >
        {username_from}
      </Typography>
      <Contents data-testid="message-content">{message?.body?.text}</Contents>

      <Timestamp data-testid="message-date">
        {moment(message.timestamp).format("HH:mm")}
      </Timestamp>
      <IconButton
        color="secondary"
        aria-label="add an alarm"
        onClick={() => onTranslateClick(message)}
      >
        <TranslateIcon />
      </IconButton>
    </MessageItemFrom>
  );
};
