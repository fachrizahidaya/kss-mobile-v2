import { AppRegistry } from "react-native/types";
import App from "./App";
import { name as appname } from "./app.json";
// import messaging from "@react-native-firebase/messaging";

// messaging().setBackgroundMessageHandler(async (remoteMessage) => {
//   console.log("Message handled in the background!", remoteMessage);
// });
AppRegistry.registerComponent(appname, () => App);
