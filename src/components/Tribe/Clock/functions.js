import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Platform } from "react-native";

export async function handleCancelAllNotifications() {
  await Notifications.cancelAllScheduledNotificationsAsync();
}

export async function handleSchedulePushNotification(clockIn, attend) {
  if (clockIn && !attend) {
    const clockInTime = new Date();
    const [hours, minutes] = clockIn.split(":");
    clockInTime.setHours(parseInt(hours));
    clockInTime.setMinutes(parseInt(minutes));
    clockInTime.setSeconds(0);
    clockInTime.setMilliseconds(0);

    const now = new Date();
    const tenMinutesBeforeClockIn = new Date(clockInTime.getTime() - 10 * 60000); // 10 minutes before
    const tenMinutesAfterClockIn = new Date(clockInTime.getTime() + 10 * 60000); // 10 minutes after

    await handleCancelAllNotifications();

    // if (now < tenMinutesBeforeClockIn) {
    //   await Notifications.scheduleNotificationAsync({
    //     content: {
    //       title: "Clock-in Reminder",
    //       body: "Please clock-in",
    //     },
    //     trigger: { date: tenMinutesBeforeClockIn },
    //   });
    // }

    if (now < clockInTime) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Clock-in Reminder",
          body: "Please clock-in",
        },
        trigger: { date: clockInTime },
      });
    }

    // if (now < tenMinutesAfterClockIn && attend === null) {
    //   await Notifications.scheduleNotificationAsync({
    //     content: {
    //       title: "Clock-in Reminder",
    //       body: "You still haven't clocked in!",
    //     },
    //     trigger: { date: tenMinutesAfterClockIn },
    //   });
    // }
  }
}

export async function handleSchedulePushNotificationClockOut(clockOut, goHome) {
  if (clockOut && !goHome) {
    const clockOutTime = new Date();
    const [hours, minutes] = clockOut.split(":");
    clockOutTime.setHours(parseInt(hours));
    clockOutTime.setMinutes(parseInt(minutes));
    clockOutTime.setSeconds(0);
    clockOutTime.setMilliseconds(0);

    const tenMinutesAfterClockOut = new Date(clockOutTime.getTime() + 10 * 60000); // 10 minutes after

    const now = new Date();

    await handleCancelAllNotifications();

    if (now < tenMinutesAfterClockOut) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Clock-out Reminder",
          body: "You haven't clocked out yet!",
        },
        trigger: { date: tenMinutesAfterClockOut },
      });
    }
  }
}

export const handleSetupNotifications = async (clockIn, attend, clockOut, goHome) => {
  await handleSchedulePushNotification(clockIn, attend);
  await handleSchedulePushNotificationClockOut(clockOut, goHome);
};

export async function handleRegisterForPushNotifications() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      return;
    }
    try {
      const projectId =
        Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
      if (!projectId) {
        throw new Error("Project ID not found");
      }
      token = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
    } catch (e) {
      token = `${e}`;
    }
  }

  return token;
}
