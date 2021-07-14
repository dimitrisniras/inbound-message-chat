# inbound-message-chat

This React application allows you to receive inbound messages from Facebook users to your Facebook Page and persists the events in a conversation named `inboundMessagesConversation`. During the initial login, you pass a
user token and the user is being added automatically to the `inboundMessagesConversation` conversation, listening for all the events that are coming through.

## Capabilities

Adds Messages capability to your nexmo application and configures the `Inbound URL` and `Status URL` webhooks (`messagesInbound` and `messagesStatus` in `index.js`).

## Linking a Facebook page

Currently the `conversation-api-function` cli tool doesn't support linking a facebook page to your nexmo applications, so this step has to be done manually via the vonage dashboard.

To link a FB page to your application:
* Link your FB page to your vonage account https://dashboard.nexmo.com/messages/social-channels/facebook-connect
* Go to your application (Application information can be found by running `conversation-api-function config`)
* Click `Link social channels` tab and link your FB page

## To run the server

Pre-requisite: node version >= 14 `nvm use`

`npm run server`

## Endpoints

The application exposes two endpoints:
* GET `/api/conversations`: Lists all the conversations associated with your nexmo application
* GET `/api/conversationEvents`: Lists all the events of the conversation name `inboundMessagesConversation`

## To run the client

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
