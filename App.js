import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar, Alert, PermissionsAndroid, Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClientProvider, QueryClient } from "react-query";
import messaging from "@react-native-firebase/messaging";
import * as Notifications from "expo-notifications";
import * as Linking from "expo-linking";
import { RootSiblingParent } from "react-native-root-siblings";
import { SheetProvider } from "react-native-actions-sheet";

import { Navigations } from "./src/navigation";
import UserModuleVerificationGuard from "./src/hoc/UserModuleVerificationGuard";
import { WebsocketContextProvider } from "./src/hoc/WebsocketContextProvider";
import "./src/styles/actionsheets/sheets";
import { Colors } from "./src/styles/Color";

const queryClient = new QueryClient();

export default function App() {
  const [devicePushToken, setDevicePushToken] = useState(null);

  const requestPermission = async () => {
    // Ask permission for ios
    if (Platform.OS === "ios") {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (!enabled) {
        Alert.alert(
          "You haven't given permission for Nest to send notification \n \n Please enable notifications to enhance your app experience"
        );
      }
    } else {
      // Ask permission for android
      const granted = await PermissionsAndroid.check("android.permission.POST_NOTIFICATIONS");

      if (!granted) {
        PermissionsAndroid.request("android.permission.POST_NOTIFICATIONS");
      }
    }
  };

  // async function registerForPushNotificationAsync() {
  //   const { status: existingStatus } = await Notifications.getPermissionsAsync();

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
    requestPermission();
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
