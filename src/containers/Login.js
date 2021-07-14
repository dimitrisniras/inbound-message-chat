import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import {
  Box,
  IconButton,
  Paper,
  InputBase,
  Container,
  LinearProgress,
} from "@material-ui/core";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import useStyles from "../styles/styles";
import axios from "axios";

function Login({ nexmoApp, setNexmoApp }) {
  const classes = useStyles();
  const [progress, setProgress] = useState(false);
  const [userToken, setUserToken] = useState("");

  const handleChange = (event) => {
    setUserToken(event.target.value);
  };

  async function onClick() {
    setProgress(true);
    nexmoApp.login(userToken).then(async (app) => {
      try {
        await axios({
          url: `http://localhost:5001/api/conversations/join/${app.me.id}`,
          method: "post"
        });
      } catch(err) {
        console.log(`Error joining the conversation: ${err}`);
      }
      setProgress(false);
      window.nexmoApp = app;
      setNexmoApp(app);
    });
  }

  if (nexmoApp.me) {
    return <Redirect to="/events" />;
  }

  return (
    <Container>
      {!progress ? (
        <Box className={classes.alignItemsAndJustifyContent}>
          <h1>Please, Login</h1>
          <Paper component="form" className={classes.root}>
            <InputBase
              className={classes.input}
              placeholder="Login Token"
              inputProps={{ "aria-label": "login token" }}
              onChange={handleChange}
            />
            <IconButton
              color="primary"
              type="submit"
              className={classes.iconButton}
              aria-label="directions"
              onClick={onClick}
            >
              <ArrowForwardIcon />
            </IconButton>
          </Paper>
        </Box>
      ) : null}
      {progress ? (
        <Box className={classes.alignItemsAndJustifyContent}>
          <LinearProgress className={classes.linearProgress} />
        </Box>
      ) : null}
    </Container>
  );
}

export default Login;
