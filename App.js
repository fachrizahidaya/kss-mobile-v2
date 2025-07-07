import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar, Alert, PermissionsAndroid, Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClientProvider, QueryClient } from "react-query";
import messaging, {
  getMessaging,
  getToken,
  isDeviceRegisteredForRemoteMessages,
  registerDeviceForRemoteMessages,
  requestPermission,
} from "@react-native-firebase/messaging";
import * as Notifications from "expo-notifications";
import * as Linking from "expo-linking";
import { RootSiblingParent } from "react-native-root-siblings";
import { SheetProvider } from "react-native-actions-sheet";

import { Navigations } from "./src/navigations";
import UserModuleVerificationGuard from "./src/hoc/UserModuleVerificationGuard";
import { WebsocketContextProvider } from "./src/hoc/WebsocketContextProvider";
import "./src/styles/actionsheets/sheets";
import { Colors } from "./src/styles/Color";

const queryClient = new QueryClient();

export default function App() {
  const [devicePushToken, setDevicePushToken] = useState(null);

  const requestNotificationPermission = async () => {
    const messaging = getMessaging();

    // Ask permission for ios
    if (Platform.OS === "ios") {
      // const authStatus = await messaging().requestPermission();
      const authStatus = await requestPermission(messaging);
      const enabled = authStatus === 1 || authStatus === 2;

      if (!enabled) {
        Alert.alert(
          "You haven't given permission for Nest to send notification \n \n Please enable notifications to enhance your app experience",
        );
      }
      const isRegistered = await isDeviceRegisteredForRemoteMessages(messaging);

      if (!isRegistered) {
        await registerDeviceForRemoteMessages(messaging);
      }
      // const token = await getToken(messaging);
      // return token;
    } else {
      // Ask permission for android
      const granted = await PermissionsAndroid.check(
        "android.permission.POST_NOTIFICATIONS",
      );

      if (!granted) {
        PermissionsAndroid.request(
          PermissionsAndroid.PermissionsAndroid.POST_NOTIFICATIONS,
        );
        if (result !== PermissionsAndroid.RESULTS.GRANTED) {
          console.log("Notification permission denied");
          return null;
        }
      }

      // const token = await getToken(messaging);
      // return token;
    }
  };

  // async function registerForPushNotificationAsync() {
  //   const { status: existingStatus } =
  //     await Notifications.getPermissionsAsync();

  //   if (existingStatus === "denied") {
  //     return null;
  //   } else if (existingStatus === "undetermined") {
  //     const { status } = await Notifications.requestPermissionsAsync();
  //     if (status !== "granted") {
  //       return null;
  //     }
  //   }
  //   const token = (await Notifications.getDevicePushTokenAsync()).data;
  //   if (Platform.OS === "android") {
  //     await Notifications.setNotificationChannelAsync("default", {
  //       name: "default",
  //       importance: Notifications.AndroidImportance.MAX,
  //       sound: "nest_notification_sound.wav",
  //     });
  //   }

  //   return token;
  // }

  // useEffect(() => {
  //   registerForPushNotificationAsync().then(setDevicePushToken);
  // }, []);

  // useEffect(() => {
  //   const handleUrl = (event) => {
  //     const url = event.url;
  //     if (url.includes("/project/task-list")) {
  //       console.log("Navigating to task list from deep link");
  //     }
  //   };

  //   Linking.addEventListener("url", handleUrl);

  //   return () => {
  //     Linking.removeEventListener("url", handleUrl);
  //   };
  // }, []);

  useEffect(() => {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
    requestNotificationPermission();
=======
    if (requestPermission()) {
      requestPermission();
      messaging().getToken();
    }
=======
    // if (requestPermission()) {
    requestPermission();
    // messaging().getToken();
    // }
>>>>>>> 287ea31f (chore: remove unnecessary)

    // messaging()
    //   .getInitialNotification()
    //   .then(async (remoteMessage) => {});

    // messaging().onNotificationOpenedApp((remoteMessage) => {});

    // messaging().setBackgroundMessageHandler(async (remoteMessage) => {});

    // const unsubscribe = messaging().onMessage(async (remoteMessage) => {});

<<<<<<< HEAD
    return unsubscribe;
>>>>>>> 852b1f2c (fix: firebase messaging)
=======
    // return unsubscribe;
>>>>>>> 287ea31f (chore: remove unnecessary)
=======
    requestPermission();
>>>>>>> 9972371b (chore: remove unnecessary)
  }, []);

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <SheetProvider>
          <RootSiblingParent>
            <WebsocketContextProvider>
              <NavigationContainer>
                {Platform.OS === "android" ? (
                  <StatusBar backgroundColor={Colors.secondary} barStyle="dark-content" />
                ) : null}
                <SafeAreaProvider>
                  <UserModuleVerificationGuard>
                    <Navigations />
                  </UserModuleVerificationGuard>
                </SafeAreaProvider>
              </NavigationContainer>
            </WebsocketContextProvider>
          </RootSiblingParent>
        </SheetProvider>
      </QueryClientProvider>
    </Provider>
  );
}
