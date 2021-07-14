const path = require("path");
const CS_URL = "https://api.nexmo.com";
const conversation_name = "inboundMessagesConversation";
const user = "FBMessengerUser";

const rtcEvent = async (req, res, next) => {
  const { logger } = req.nexmo;
  try {
    logger.info("event", { event: req.body });
    res.json({});
  } catch (err) {
    logger.error("Error on rtcEvent function");
  }
};

const voiceEvent = async (req, res, next) => {
  const { logger } = req.nexmo;
  try {
      logger.info("event", { event: req.body});
      res.json({});
  } catch (err) {
      logger.error("Error on voiceEvent function")
  }
}

const voiceAnswer = async (req, res, next) => {
  const { logger } = req.nexmo;
  logger.info("req", { req_body: req.body});
  try {
      return res.json([{}]);
  } catch (err) {
      logger.error("Error on voiceAnswer function");
  }
}

const messagesInbound = (req, res) => {
  res.json([
    {
      action: "message",
      conversation_name,
      user,
      geo: "us-1",
    },
  ]);
};

const messagesStatus = () => {};

const route = (app, express) => {
  app.use(express.static(path.join(__dirname, "build")));

  app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "build", "index.html"));
  });

  app.get("/api/conversations", async (req, res) => {
    const { csClient } = req.nexmo;

    const conversation = await csClient({
      url: `${CS_URL}/v0.3/conversations`,
    });

    res.json(conversation.data);
  });

  app.get("/api/conversationEvents", async (req, res) => {
    const { logger, csClient } = req.nexmo;

    const conversation = await csClient({
      url: `${CS_URL}/v0.3/conversations?name=${conversation_name}`,
    });
    logger.info(conversation.data, `Conversation is `);

    const conversation_id = conversation.data._embedded.conversations[0].id;
    const events = await csClient({
      url: `${CS_URL}/v0.3/conversations/${conversation_id}/events`,
    });
    res.json(events.data);
  });

  app.post("/api/conversations/join/:user_id", async (req, res) => {
    const { csClient } = req.nexmo;
    const { user_id } = req.params;

    const createMember = async (conversation_id) => {
      try {
        const member = await csClient({
          url: `${CS_URL}/v0.3/conversations/${conversation_id}/members`,
          method: "post",
          data: {
            state: "joined",
            channel: { type: "app" },
            user: {
              id: user_id,
            },
          },
        });
        res.json(member);
      } catch (err) {
        res.json(err);
      }
    };

    const conversation = await csClient({
      url: `${CS_URL}/v0.3/conversations?name=${conversation_name}`,
    });
    
    if (conversation?.data?._embedded?.conversations.length > 0) {
      const conversation_id = conversation.data._embedded.conversations[0].id;
      return createMember(conversation_id);
    } else {
      try {
        const conversation = await csClient({
          url: `${CS_URL}/v0.3/conversations`,
          method: "post",
          data: {
            name: conversation_name,
            display_name: conversation_name,
          },
        });
        return createMember(conversation.data.id);
      } catch(err) {
        res.json(err);
      }
    }
  });
};

module.exports = {
  rtcEvent,
  route,
  voiceEvent,
  voiceAnswer,
  messagesInbound,
  messagesStatus,
};