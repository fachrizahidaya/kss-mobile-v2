import { AppRegistry } from "react-native/types";
import App from "./App";
import { name as appname } from "./app.json";
import messaging, { getMessaging } from "@react-native-firebase/messaging";

// messaging().setBackgroundMessageHandler(async (remoteMessage) => {
//   console.log("Message handled in the background!", remoteMessage);
// });
setBackgroundMessageHandler(async (remoteMessage) => {
  console.log("Message handled in the background!", remoteMessage);
});
onMessage(getMessaging(), async (remoteMessage) => {
  console.log("Message received in foreground:", remoteMessage);
});
AppRegistry.registerComponent(appname, () => App);
