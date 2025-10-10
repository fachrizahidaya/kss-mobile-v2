import {
  getMessaging,
  getToken,
  requestPermission as firebaseRequestPermission,
  isDeviceRegisteredForRemoteMessages,
  registerDeviceForRemoteMessages,
} from "@react-native-firebase/messaging";
import { Platform, PermissionsAndroid, Alert } from "react-native";

export const requestNotificationPermission = async () => {
  const messaging = getMessaging();

  try {
    if (Platform.OS === "ios") {
      // 1️⃣ Ask for notification permission
      const authStatus = await firebaseRequestPermission(messaging);
      const enabled = authStatus === 1 || authStatus === 2;

      if (!enabled) {
        Alert.alert(
          "Notification Permission",
          "Please enable notifications in Settings to receive alerts."
        );
        return null;
      }

      // 2️⃣ Ensure device is registered with APNs before getting FCM token
      const isRegistered = await isDeviceRegisteredForRemoteMessages(messaging);
      if (!isRegistered) {
        await registerDeviceForRemoteMessages(messaging);
      }

      // 3️⃣ Get FCM token
      const token = await getToken(messaging);
      return token;
    }

    // ANDROID: Ask permission for Android 13+ (API 33+)
    if (Platform.OS === "android") {
      const granted = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
      );

      if (!granted) {
        const result = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
        );

        if (result !== PermissionsAndroid.RESULTS.GRANTED) {
          console.warn("Notification permission denied");
          return null;
        }
      }

      const token = await getToken(messaging);
      return token;
    }
  } catch (err) {
    console.error("❌ Error requesting notification permission:", err);
    return null;
  }
};
