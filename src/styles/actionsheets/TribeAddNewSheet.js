<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> c3ae17e7 (new branch)
import * as Notifications from "expo-notifications";

import AlertModal from "../modals/AlertModal";
import CustomSheet from "../../layouts/CustomSheet";
import SheetItem from "../../components/Tribe/Clock/SheetItem";
import Modals from "../../components/Tribe/Clock/Modals";
import { useTribe } from "./hooks/useTribe";
<<<<<<< HEAD
<<<<<<< HEAD
=======
import { useEffect, useState, useRef, useMemo } from "react";
=======
import { useNavigation } from "@react-navigation/native";
<<<<<<< HEAD
import { useEffect, useState, useRef } from "react";
>>>>>>> 9d6a7cd4 (fix: dashboard tribe, coin)
=======
import { useEffect, useState, useRef, useMemo } from "react";
>>>>>>> d3d4ef0a (fix:)
import dayjs from "dayjs";
import * as Location from "expo-location";
=======
>>>>>>> df8542bd (fix:)
import * as Notifications from "expo-notifications";

import AlertModal from "../modals/AlertModal";
<<<<<<< HEAD
import ConfirmationModal from "../modals/ConfirmationModal";
import ReasonModal from "../../components/Tribe/Clock/ReasonModal";
import axiosInstance from "../../config/api";
import { fetchAttend, insertAttend, insertGoHome } from "../../config/db";
=======
import * as Notifications from "expo-notifications";

import AlertModal from "../modals/AlertModal";
>>>>>>> 859eea89 (first commit)
import CustomSheet from "../../layouts/CustomSheet";
<<<<<<< HEAD
<<<<<<< HEAD
import SheetItem from "../../components/Tribe/Clock/SheetItem";
import Modals from "../../components/Tribe/Clock/Modals";
<<<<<<< HEAD
import {
  handleRegisterForPushNotifications,
  handleSetupNotifications,
} from "../../components/Tribe/Clock/functions";
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> 2a9d5213 (fix: tribe add new)
=======
import SelectSheet from "./SelectSheet";
>>>>>>> a33df56f (feat: shift atttendance)
=======
>>>>>>> ef3f9ffb (fix: clock in/out from database)
=======
import { Colors } from "../Color";
<<<<<<< HEAD
>>>>>>> b3952fcb (chore: keep current changes)
=======
import SelectSheet from "./SelectSheet";
>>>>>>> 167f9859 (chore: remove unnecessary)
=======
import { Colors } from "../Color";
import SheetItem from "../../components/Tribe/Clock/SheetItem";
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> 16ba8713 (feat: submit attendance with location and selfie)
=======
import { handleSetupNotifications } from "../../components/Tribe/Clock/functions";
>>>>>>> 48323e56 (chore: add necessary)
=======
import {
  handleSetupNotifications,
  handleRegisterForPushNotifications,
} from "../../components/Tribe/Clock/functions";
import Modals from "../../components/Tribe/Clock/Modals";
>>>>>>> d3d4ef0a (fix:)
=======
import CustomSheet from "../../layouts/CustomSheet";
import SheetItem from "../../components/Tribe/Clock/SheetItem";
import Modals from "../../components/Tribe/Clock/Modals";
import { useTribe } from "./useTribe";
>>>>>>> df8542bd (fix:)
=======
>>>>>>> 394d1d73 (fix: hooks on)
=======
import { useTribe } from "./hooks/useTribe";
>>>>>>> 859eea89 (first commit)
=======
>>>>>>> c3ae17e7 (new branch)

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const TribeAddNewSheet = (props) => {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  const [location, setLocation] = useState({});
  const [locationOn, setLocationOn] = useState(null);
  const [locationPermission, setLocationPermission] = useState(null);
  const [requestType, setRequestType] = useState("");
  const [result, setResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [success, setSuccess] = useState(false);
  const [workDuration, setWorkDuration] = useState(null);
  const [minimumDurationReached, setMinimumDurationReached] = useState(false);
  const [expoPushToken, setExpoPushToken] = useState("");
  const [channels, setChannels] = useState([]);
  const [notification, setNotification] = useState(undefined);
  const [attend, setAttend] = useState(null);
  const [goHome, setGoHome] = useState(null);
  const [clockIn, setClockIn] = useState(null);
  const [clockOut, setClockOut] = useState(null);
<<<<<<< HEAD
  const [shiftSelected, setShiftSelected] = useState(null);
=======
>>>>>>> 9d6a7cd4 (fix: dashboard tribe, coin)
  const [startDate, setStartDate] = useState(null);
  const [dayDifference, setDayDifference] = useState(null);
  const [shiftSelected, setShiftSelected] = useState(null);

  const notificationListener = useRef();
  const responseListener = useRef();
  const selectShiftRef = useRef();

<<<<<<< HEAD
<<<<<<< HEAD
=======
  const navigation = useNavigation();
>>>>>>> 000b5e7c (feat: attendance location and selfie)
=======
  const navigation = useNavigation();
>>>>>>> b3952fcb (chore: keep current changes)
  const createLeaveRequestCheckAccess = useCheckAccess("create", "Leave Requests");
  const joinLiveSessionCheckAccess = useCheckAccess("join", "E-Commerce Live History");
  const currentTime = dayjs().format("HH:mm");
  const currentDate = dayjs().format("YYYY-MM-DD");

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  const sequenceIndex = (dayDifference % timeGroup?.length) + 1;
  const sequenceSelected = sequenceIndex === 0 ? timeGroup?.length : sequenceIndex;
  const selectedItem = timeGroup?.find((item) => item?.seq === sequenceSelected);
<<<<<<< HEAD
=======
  // const sequenceIndex = (dayDifference % timeGroup?.length) + 1;
  // const sequenceSelected = sequenceIndex === 0 ? timeGroup?.length : sequenceIndex;
  // const selectedItem = timeGroup?.find((item) => item?.seq === sequenceSelected);
>>>>>>> 2f2a1a97 (fix: clock in reminder)
=======
>>>>>>> 000b5e7c (feat: attendance location and selfie)

=======
>>>>>>> 55e33872 (fix: reminder clock in clock out)
=======
>>>>>>> bfa7e57c (fix: map)
  const clockInAndClockOut = () => {
=======
  const handleClockInAndClockOut = () => {
>>>>>>> 2a9d5213 (fix: tribe add new)
    setClockIn(attendance?.data?.on_duty);
=======
  const handleClockInAndClockOut = async () => {
    const employeeClockIn = await fetchAttend();
    const employeeClockOut = await fetchGoHome();

<<<<<<< HEAD
<<<<<<< HEAD
    setClockIn(
      employeeClockIn[0]?.time ? employeeClockIn[0]?.time : employeeClockIn[1]?.time
    );
>>>>>>> 5ff79603 (fix:)
=======
    setClockIn(dataToFetch?.time);
>>>>>>> b784d36d (fix: reminder clock in)
    setClockOut(attendance?.data?.off_duty);
=======
    const clockInData = employeeClockIn[employeeClockIn?.length - 1];
    const clockOutData = employeeClockOut[employeeClockOut?.length - 1];

<<<<<<< HEAD
    handleSetupNotifications(
      clockInData?.time,
      clockInData?.time,
      clockOutData?.time,
      clockOutData?.time
    );
<<<<<<< HEAD
    // setClockIn(clockInData?.time);
    // setClockOut(clockOutData?.time);
>>>>>>> ef3f9ffb (fix: clock in/out from database)
=======
=======
    // handleSetupNotifications(
    //   clockInData?.time,
    //   clockInData?.time,
    //   clockOutData?.time,
    //   clockOutData?.time
    // );

>>>>>>> 2f80cd83 (fix: clock out/clock in)
    setClockIn(clockInData?.time);
    setClockOut(clockOutData?.time);
>>>>>>> d54b1c15 (fix:)
=======
  const clockInAndClockOut = () => {
    setClockIn(attendance?.data?.time_in);
=======
  const handleClockInAndClockOut = async () => {
    const employeeClockIn = await fetchAttend();

    setClockIn(
      employeeClockIn[0]?.time ? employeeClockIn[0]?.time : employeeClockIn[1]?.time
    );
>>>>>>> 55a55d14 (fix:)
    setClockOut(attendance?.data?.time_out);
>>>>>>> b3952fcb (chore: keep current changes)
  };

  const { data: attendance, refetch: refetchAttendance } = useFetch(
    "/hr/timesheets/personal/attendance-today",
  );
  const { data: profile } = useFetch("/hr/my-profile");
<<<<<<< HEAD
  const { data: myTimeGroup } = useFetch("/hr/my-time-group");
<<<<<<< HEAD
=======

<<<<<<< HEAD
>>>>>>> 55e33872 (fix: reminder clock in clock out)
  const { isOpen: clockModalIsOpen, toggle: toggleClockModal } = useDisclosure(false);
=======

<<<<<<< HEAD
  const { isOpen: clockModalIsOpen, toggle: toggleClockModal } =
    useDisclosure(false);
>>>>>>> 22c1806e (fix: reminder clock in)
=======
  const { isOpen: clockModalIsOpen, toggle: toggleClockModal } = useDisclosure(false);
>>>>>>> 2f2a1a97 (fix: clock in reminder)
=======
  const { isOpen: clockModalIsOpen, toggle: toggleClockModal } = useDisclosure(false);
>>>>>>> 000b5e7c (feat: attendance location and selfie)
  const { isOpen: alertIsOpen, toggle: toggleAlert } = useDisclosure(false);
  const { isOpen: attendanceModalIsopen, toggle: toggleAttendanceModal } =
    useDisclosure(false);
  const { isOpen: attendanceReasonModalIsOpen, toggle: toggleAttendanceReasonModal } =
    useDisclosure(false);
  const { isOpen: locationIsEmptyIsOpen, toggle: toggleLocationIsEmpty } =
    useDisclosure(false);
  const { isOpen: newLeaveRequestModalIsOpen, toggle: toggleNewLeaveRequestModal } =
    useDisclosure(false);

<<<<<<< HEAD
  const items =
    createLeaveRequestCheckAccess && joinLiveSessionCheckAccess
      ? [
          {
            icons: "clipboard-clock-outline",
            title: `New Leave Request`,
          },
          {
            icons: "video-plus-outline",
            title: `New Live Session`,
          },
          // {
          //   icons: "clipboard-minus-outline",
          //   title: "New Reimbursement",
          // },
          {
            icons: "clock-outline",
            title: `Clock in`,
          },
        ]
      : createLeaveRequestCheckAccess
        ? [
            {
              icons: "clipboard-clock-outline",
              title: `New Leave Request`,
            },

            {
              icons: "clock-outline",
              title: `Clock in`,
            },
          ]
        : joinLiveSessionCheckAccess
          ? [
              {
                icons: "video-plus-outline",
                title: `New Live Session`,
              },

              {
                icons: "clock-outline",
                title: `Clock in`,
              },
            ]
          : [
              // {
              //   icons: "clipboard-minus-outline",
              //   title: "New Reimbursement",
              // },
              {
                icons: "clock-outline",
                title: `Clock in`,
              },
            ];
=======
  var items;

  if (createLeaveRequestCheckAccess && joinLiveSessionCheckAccess) {
    items = [
      {
        icons: "clipboard-clock-outline",
        title: `New Leave Request`,
      },
      {
        icons: "video-plus-outline",
        title: `New Live Session`,
      },
      // {
      //   icons: "clipboard-minus-outline",
      //   title: "New Reimbursement",
      // },
      {
        icons: "clock-outline",
        title: `Clock in`,
      },
    ];
  } else if (createLeaveRequestCheckAccess) {
    items = [
      {
        icons: "clipboard-clock-outline",
        title: `New Leave Request`,
      },

      {
        icons: "clock-outline",
        title: `Clock in`,
      },
    ];
  } else if (joinLiveSessionCheckAccess) {
    items = [
      {
        icons: "video-plus-outline",
        title: `New Live Session`,
      },

      {
        icons: "clock-outline",
        title: `Clock in`,
      },
    ];
  } else {
    items = [
      // {
      //   icons: "clipboard-minus-outline",
      //   title: "New Reimbursement",
      // },
      {
        icons: "clock-outline",
        title: `Clock in`,
      },
    ];
  }
>>>>>>> a11cb56f (fix: dbc)

  /**
   * Handle for Late type
   */
  const lateType = attendance?.data?.available_day_off
    ? [
        { label: "Late", value: "Late" },
        { label: "Permit", value: "Permit" },
        { label: "Other", value: "Other" },
        { label: "Day Off", value: "Day Off" },
      ]
    : [
        { label: "Late", value: "Late" },
        { label: "Permit", value: "Permit" },
        { label: "Other", value: "Other" },
      ];

  /**
   * Handle for Early type
   */
  const earlyType = [
    { label: "Went Home Early", value: "Went Home Early" },
    { label: "Permit", value: "Permit" },
    { label: "Other", value: "Other" },
  ];

  const shifts = [
    { label: "Shift 1", value: "shift_1" },
    { label: "Shift 2", value: "shift_2" },
  ];

  /**
   * Handle open setting to check location service
   */
  const handleOpenSetting = () => {
    if (Platform.OS == "ios") {
      Linking.openURL("app-settings:");
    } else {
      startActivityAsync(ActivityAction.LOCATION_SOURCE_SETTINGS);
    }
  };

  /**
   * Handle modal to turn on location service
   */
  const handleActivateLocationAlert = () => {
    Alert.alert(
      "Activate location",
      "In order to clock-in or clock-out, you must turn the location on.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Go to Settings",
          onPress: () => handleOpenSetting(),
          style: "default",
        },
      ],
      {
        cancelable: false,
      },
    );
  };

  /**
   * Handle modal to allow location permission
   */
  const handleAllowPermissionAlert = () => {
    Alert.alert(
      "Permission needed",
      "In order to clock-in or clock-out, you must give permission to access the location. You can grant this permission in the Settings app.",
      [
        {
          text: "OK",
        },
      ],
      {
        cancelable: false,
      },
    );
  };

<<<<<<< HEAD
<<<<<<< HEAD
  const handleCheckLocation = async () => {
    try {
      const isLocationEnabled = await Location.hasServicesEnabledAsync();
      setLocationOn(isLocationEnabled);

      if (!isLocationEnabled) {
        showAlertToActivateLocation();
        return;
      } else {
        const { granted } = await Location.getForegroundPermissionsAsync();
        setLocationPermission(granted);
        const lastKnownLocation = await Location.getLastKnownPositionAsync();
        const currentLocation = await Location.getCurrentPositionAsync({});

<<<<<<< HEAD
        if (!lastKnownLocation || !currentLocation) {
          checkIsLocationActiveAndLocationPermissionAndGetCurrentLocation();
        } else {
<<<<<<< HEAD
          // handle current location
=======
  // const weekend = attendance?.data?.day_type === "Weekend";

  // const dayoff = attendance?.data?.day_type === "Day Off";

=======
>>>>>>> 9d6a7cd4 (fix: dashboard tribe, coin)
  const checkIsLocationActiveAndLocationPermissionAndGetCurrentLocation = async () => {
=======
  const handleCheckLocation = async () => {
>>>>>>> 16ba8713 (feat: submit attendance with location and selfie)
    try {
      const isLocationEnabled = await Location.hasServicesEnabledAsync();
      setLocationOn(isLocationEnabled);

      if (!isLocationEnabled) {
        handleActivateLocationAlert();
        return;
      } else {
        const { granted } = await Location.getForegroundPermissionsAsync();
        setLocationPermission(granted);
        const lastKnownLocation = await Location.getLastKnownPositionAsync();
        const currentLocation = await Location.getCurrentPositionAsync({});

        if (!lastKnownLocation || !currentLocation) {
          handleCheckLocation();
        } else {
>>>>>>> 000b5e7c (feat: attendance location and selfie)
=======
>>>>>>> b3952fcb (chore: keep current changes)
          if (Platform.OS === "ios") {
            setLocation(lastKnownLocation?.coords);
          } else {
            setLocation(currentLocation?.coords);
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleCalculateWorkTime = (timeIn, currentTime) => {
    const timeInObj = dayjs(`1970-01-01T${timeIn}`);
    const timeOutObj = dayjs(`1970-01-01T${currentTime}`);

    const diffMinutes = timeOutObj.diff(timeInObj, "minute");
    const hours = Math.floor(Math.max(diffMinutes, 0) / 60);
    const minutes = Math.max(diffMinutes, 0) % 60;

    const diffHoursZero = "00:00";
    const diffHoursFormatted = `${String(isNaN(hours) ? "00" : hours).padStart(
      2,
      "0",
    )}:${String(isNaN(minutes) ? "00" : minutes).padStart(2, "0")}`;

    setWorkDuration(diffMinutes < 0 ? diffHoursZero : diffHoursFormatted);

    if (diffMinutes >= 0 && diffHoursFormatted >= attendance?.data?.work_time) {
      setMinimumDurationReached(true);
    } else {
      setMinimumDurationReached(false);
    }
  };

<<<<<<< HEAD
  const handleSetUserClock = async () => {
=======
  async function cancelAllNotifications() {
    await Notifications.cancelAllScheduledNotificationsAsync();
  }

  async function schedulePushNotification(clockIn, attend) {
    if (clockIn && attend === null) {
      const clockInTime = new Date();
      const [hours, minutes] = clockIn.split(":");
      clockInTime.setHours(parseInt(hours));
      clockInTime.setMinutes(parseInt(minutes));
      clockInTime.setSeconds(0);
      clockInTime.setMilliseconds(0);

      const now = new Date();
      const tenMinutesBeforeClockIn = new Date(clockInTime.getTime() - 10 * 60000); // 10 minutes before
      const tenMinutesAfterClockIn = new Date(clockInTime.getTime() + 10 * 60000); // 10 minutes after

      await cancelAllNotifications();

      if (now < tenMinutesBeforeClockIn) {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: "Clock-in Reminder",
            body: "Please clock-in",
          },
          trigger: { date: tenMinutesBeforeClockIn },
        });
      }

      if (now < clockInTime) {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: "Clock-in Reminder",
            body: "Please clock-in",
          },
          trigger: { date: clockInTime },
        });
      }

      if (now < tenMinutesAfterClockIn && attend === null) {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: "Clock-in Reminder",
            body: "You still haven't clocked in!",
          },
          trigger: { date: tenMinutesAfterClockIn },
        });
      }
    }
  }

  async function schedulePushNotificationClockOut(clockOut, goHome) {
    if (clockOut && goHome === null) {
      const clockOutTime = new Date();
      const [hours, minutes] = clockOut.split(":");
      clockOutTime.setHours(parseInt(hours));
      clockOutTime.setMinutes(parseInt(minutes));
      clockOutTime.setSeconds(0);
      clockOutTime.setMilliseconds(0);

      const tenMinutesAfterClockOut = new Date(clockOutTime.getTime() + 10 * 60000); // 10 minutes after

      const now = new Date();

      await cancelAllNotifications();

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

  const setupNotifications = async () => {
    await schedulePushNotification(clockIn, attend);
    await schedulePushNotificationClockOut(clockOut, goHome);
  };

  async function registerForPushNotificationsAsync() {
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

<<<<<<< HEAD
  const setUserClock = async () => {
>>>>>>> 000b5e7c (feat: attendance location and selfie)
=======
  const handleSetUserClock = async () => {
>>>>>>> 55a55d14 (fix:)
    try {
      await insertAttend(attendance?.data?.on_duty);
      if (attendance?.data) {
        await insertGoHome(attendance?.data?.time_out);
      } else {
        await insertGoHome(result?.data?.time_out);
      }
    } catch (err) {
      console.log(err);
    }
  };

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  const setMyTimeGroup = async () => {
    try {
      await insertTimeGroup(
        myTimeGroup?.data?.time_group_id || null,
        myTimeGroup?.data?.time_group?.name || null,
        myTimeGroup?.data?.time_group?.start_date || null,
        myTimeGroup?.data?.time_group?.detail || null,
      );
    } catch (err) {
      console.log(err);
=======
  const getUserClock = async () => {
    let clock_in = null;

    while (!clock_in) {
      if (clock_in) {
        setAttend(clock_in);
        break;
      }

      await new Promise((resolve) => setTimeout(resolve, 3000));
>>>>>>> 2075a560 (feat: new user)
    }
  };
=======
  // const setMyTimeGroup = async () => {
  //   try {
  //     await insertTimeGroup(
  //       myTimeGroup?.data?.time_group_id || null,
  //       myTimeGroup?.data?.time_group?.name || null,
  //       myTimeGroup?.data?.time_group?.start_date || null,
  //       myTimeGroup?.data?.time_group?.detail || null
  //     );
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
>>>>>>> 2f2a1a97 (fix: clock in reminder)
=======
  const handleGetUserClock = async () => {
    const storedEmployeeClockIn = await fetchAttend();
    const dataToFetch = storedEmployeeClockIn[storedEmployeeClockIn?.length - 1];

    let clock_in = dataToFetch?.time;
>>>>>>> 55a55d14 (fix:)

=======
>>>>>>> 55e33872 (fix: reminder clock in clock out)
=======
>>>>>>> bfa7e57c (fix: map)
  const getUserClock = async () => {
=======
  const handleGetUserClock = async () => {
<<<<<<< HEAD
>>>>>>> 2a9d5213 (fix: tribe add new)
    let clock_in = attendance?.data?.off_duty;
=======
    const storedEmployeeClockIn = await fetchAttend();
    const storedEmployeeClockOut = await fetchGoHome();
    const clockInData = storedEmployeeClockIn[storedEmployeeClockIn?.length - 1];
    const clockOutData = storedEmployeeClockOut[storedEmployeeClockOut?.length - 1];

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
    let clock_in = storedEmployeeClockIn[0]?.time
      ? storedEmployeeClockIn[0]?.time
      : storedEmployeeClockIn[1]?.time;
>>>>>>> 5ff79603 (fix:)

=======
    let clock_in = dataToFetch?.time;
>>>>>>> b784d36d (fix: reminder clock in)
    const clock_out = attendance?.data?.off_duty;

    if (clock_in) {
      setAttend(clock_in);
    } else if (clock_out) {
      setGoHome(clock_out);
    }
=======
    handleSetupNotifications(
      clockInData?.time,
      clockInData?.time,
      clockOutData?.time,
      clockOutData?.time
    );
<<<<<<< HEAD
    // if (clockInData) {
    //   setAttend(clockInData?.time);
    // } else if (clockOutData) {
    //   setGoHome(clockOutData?.time);
    // }
>>>>>>> ef3f9ffb (fix: clock in/out from database)
=======
=======
    // handleSetupNotifications(
    //   clockInData?.time,
    //   clockInData?.time,
    //   clockOutData?.time,
    //   clockOutData?.time
    // );

>>>>>>> 2f80cd83 (fix: clock out/clock in)
    if (clockInData) {
      setAttend(clockInData?.time);
    } else if (clockOutData) {
      setGoHome(clockOutData?.time);
    }
>>>>>>> d54b1c15 (fix:)
  };

  function differenceBetweenStartAndCurrentDate(start_date, current_date) {
    const start = new Date(start_date);
    const current = new Date(current_date);

    const timeDifference = current - start;

    const day_difference = timeDifference / (1000 * 60 * 60 * 24);

    if (day_difference) {
      setDayDifference(day_difference);
    }
  }

  /**
   * Handle create attendance report
   */
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      late_type: result?.late_type || "",
      late_reason: result?.late_reason || "",
      early_type: result?.early_type || "",
      early_reason: result?.early_reason || "",
      att_type: result?.attendance_type || "",
      att_reason: result?.attendance_reason || "",
    },
    onSubmit: (values, { setSubmitting, setStatus }) => {
      setStatus("processing");
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
      handleSubmitAttendanceReport(result?.id, values, setSubmitting, setStatus);
=======
      attendanceReportSubmitHandler(result?.id, values, setSubmitting, setStatus);
>>>>>>> 000b5e7c (feat: attendance location and selfie)
=======
      attendanceReportSubmitHandler(result?.id, values, setSubmitting, setStatus);
>>>>>>> b3952fcb (chore: keep current changes)
=======
      handleSubmitAttendanceReport(result?.id, values, setSubmitting, setStatus);
>>>>>>> 16ba8713 (feat: submit attendance with location and selfie)
    },
  });

  /**
   * Handle create attendance report
   */
  const earlyReasonformik = useFormik({
    enableReinitialize: true,
    initialValues: {
      early_type: result?.early_type || "",
      early_reason: result?.early_reason || "",
      att_type: result?.attendance_type || "",
      att_reason: result?.attendance_reason || "",
    },
    onSubmit: (values, { setSubmitting, setStatus }) => {
      setStatus("processing");
      handleSubmitEarlyReason(result?.id, values, setSubmitting, setStatus);
    },
  });

  /**
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 16ba8713 (feat: submit attendance with location and selfie)
   * Handle submit attendance clock-in and out
   */
  const handleSubmit = () => {
    if (!locationOn) {
      handleActivateLocationAlert();
      return;
    }
    if (!locationPermission) {
      handleAllowPermissionAlert();
      return;
    }
    if (Object.keys(location).length === 0) {
      toggleLocationIsEmpty();
      return;
    }
    if (dayjs().format("HH:mm") !== attendance?.data?.time_out || !attendance) {
      toggleAttendanceModal();
    }
  };

  /**
<<<<<<< HEAD
=======
>>>>>>> 9d6a7cd4 (fix: dashboard tribe, coin)
=======
>>>>>>> 16ba8713 (feat: submit attendance with location and selfie)
   * Handle submit attendance report
   * @param {*} attendance_id
   * @param {*} data
   * @param {*} setSubmitting
   * @param {*} setStatus
   */
  const handleSubmitAttendanceReport = async (
    attendance_id,
    data,
    setSubmitting,
    setStatus,
  ) => {
    try {
      await axiosInstance.patch(`/hr/timesheets/personal/${attendance_id}`, data);
      setRequestType("post");
      toggleAttendanceReasonModal();
      setSubmitting(false);
      setStatus("success");
    } catch (err) {
      console.log(err);
      setErrorMessage(err.response.data.message);
      setRequestType("error");
      toggleAttendanceReasonModal();
      setSubmitting(false);
      setStatus("error");
    }
  };

  const handleSubmitEarlyReason = async (
    attendance_id,
    data,
    setSubmitting,
    setStatus,
  ) => {
    try {
      const res = await axiosInstance.patch(
        `/hr/timesheets/personal/${attendance_id}`,
        data,
      );
      setRequestType("post");
      setSubmitting(false);
      setStatus("success");
    } catch (err) {
      console.log(err);
      setErrorMessage(err.response.data.message);
      setRequestType("error");
      setSubmitting(false);
      setStatus("error");
    }
  };

  useEffect(() => {
    if (attendance?.data?.time_in) {
      const timeIn =
        attendance?.data?.time_in < attendance?.data?.on_duty
          ? attendance?.data?.on_duty
<<<<<<< HEAD
          : attendance?.data?.time_in,
        dayjs().format("HH:mm"),
      );
=======
          : attendance?.data?.time_in;

      // Run immediately once when mounted
      handleCalculateWorkTime(timeIn, dayjs().format("HH:mm"));

      // Update every minute in real-time
      const interval = setInterval(() => {
        handleCalculateWorkTime(timeIn, dayjs().format("HH:mm"));
      }, 60000); // Update every 1 minute (60000ms)

      return () => clearInterval(interval); // Cleanup on unmount
>>>>>>> 74ffc495 (fix: duration)
    }
  }, [attendance?.data?.time_in, attendance?.data?.on_duty]);

  useEffect(() => {
    const checkPermissionRequest = async () => {
      if (!locationPermission) {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          handleAllowPermissionAlert();
          return;
        }
      }
    };

    checkPermissionRequest();
  }, [locationPermission]);

  useEffect(() => {
    /**
     * Handle device state change
     * @param {*} nextAppState
     */
    const handleAppStateChange = (nextAppState) => {
      if (nextAppState == "active") {
        handleCheckLocation();
        handleCalculateWorkTime(
          attendance?.data?.time_in < attendance?.data?.on_duty
            ? attendance?.data?.on_duty
            : attendance?.data?.time_in,
          dayjs().format("HH:mm"),
        );
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
        handleSetUserClock();
        handleGetUserClock();
=======
        setUserClock();
        getUserClock();
>>>>>>> bfa7e57c (fix: map)
=======
        setUserClock();
        getUserClock();
>>>>>>> b3952fcb (chore: keep current changes)
=======
        handleSetUserClock();
        handleGetUserClock();
>>>>>>> 55a55d14 (fix:)
        differenceBetweenStartAndCurrentDate(startDate, currentDate);
        handleClockInAndClockOut();
        setupNotifications();
      } else {
        handleCheckLocation();
        handleCalculateWorkTime(
          attendance?.data?.time_in < attendance?.data?.on_duty
            ? attendance?.data?.on_duty
            : attendance?.data?.time_in,
          dayjs().format("HH:mm"),
        );
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
        handleSetUserClock();
        handleGetUserClock();
=======
        setUserClock();
        getUserClock();
>>>>>>> bfa7e57c (fix: map)
=======
        setUserClock();
        getUserClock();
>>>>>>> b3952fcb (chore: keep current changes)
=======
        handleSetUserClock();
        handleGetUserClock();
>>>>>>> 55a55d14 (fix:)
        differenceBetweenStartAndCurrentDate(startDate, currentDate);
        handleClockInAndClockOut();
        setupNotifications();
      }
    };

    AppState.addEventListener("change", handleAppStateChange);
    handleCheckLocation(); // Initial run when the component mounts
    handleCalculateWorkTime(
      attendance?.data?.time_in < attendance?.data?.on_duty
        ? attendance?.data?.on_duty
        : attendance?.data?.time_in,
      dayjs().format("HH:mm"),
    );
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
    handleSetUserClock();
    handleGetUserClock();
=======
    setUserClock();
    getUserClock();
>>>>>>> bfa7e57c (fix: map)
=======
    setUserClock();
    getUserClock();
>>>>>>> b3952fcb (chore: keep current changes)
=======
    handleSetUserClock();
    handleGetUserClock();
>>>>>>> 55a55d14 (fix:)
    differenceBetweenStartAndCurrentDate(startDate, currentDate);
    handleClockInAndClockOut();
    setupNotifications();
  }, [
=======
  const {
    location,
>>>>>>> df8542bd (fix:)
=======
  const {
    location,
>>>>>>> 859eea89 (first commit)
=======
  const {
    location,
>>>>>>> c3ae17e7 (new branch)
    locationOn,
    locationPermission,
    requestType,
    setRequestType,
    result,
    setResult,
    errorMessage,
    setErrorMessage,
    workDuration,
    minimumDurationReached,
    success,
    setSuccess,
    shiftSelected,
    setShiftSelected,
    clockModalIsOpen,
    toggleClockModal,
    alertIsOpen,
    toggleAlert,
    attendanceModalIsopen,
    toggleAttendanceModal,
    attendanceReasonModalIsOpen,
    toggleAttendanceReasonModal,
    locationIsEmptyIsOpen,
    toggleLocationIsEmpty,
    newLeaveRequestModalIsOpen,
    toggleNewLeaveRequestModal,
    navigation,
    profile,
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
    myTimeGroup,
    currentTime,
    startDate,
<<<<<<< HEAD
=======
    myTimeGroup,
>>>>>>> bfa7e57c (fix: map)
  ]);

  useEffect(() => {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
    handleRegisterForPushNotifications().then(
      (token) => token && setExpoPushToken(token)
    );
=======
    registerForPushNotificationsAsync().then((token) => token && setExpoPushToken(token));
>>>>>>> 000b5e7c (feat: attendance location and selfie)
=======
    registerForPushNotificationsAsync().then((token) => token && setExpoPushToken(token));
>>>>>>> b3952fcb (chore: keep current changes)
=======
    handleRegisterForPushNotifications().then(
      (token) => token && setExpoPushToken(token)
    );
>>>>>>> 74ffc495 (fix: duration)

    if (Platform.OS === "android") {
      Notifications.getNotificationChannelsAsync().then((value) =>
        setChannels(value ?? []),
      );
    }
    notificationListener.current = Notifications.addNotificationReceivedListener(
      (notification) => {
        setNotification(notification);
<<<<<<< HEAD
<<<<<<< HEAD
      },
    );

    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (response) => {},
=======
      }
    );

    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (response) => {}
>>>>>>> 2f2a1a97 (fix: clock in reminder)
=======
      }
    );

    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (response) => {}
>>>>>>> 000b5e7c (feat: attendance location and selfie)
    );

    return () => {
      notificationListener.current &&
        Notifications.removeNotificationSubscription(notificationListener.current);
      responseListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
=======
    myTimeGroup,
    currentTime,
=======
    myTimeGroup,
    currentTime,
>>>>>>> 859eea89 (first commit)
=======
    myTimeGroup,
    currentTime,
>>>>>>> c3ae17e7 (new branch)
    attendance,
    refetchAttendance,
    items,
    lateType,
    earlyType,
    shifts,
    formik,
    earlyReasonformik,
    handleSubmit,
  } = useTribe();
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> df8542bd (fix:)
=======
>>>>>>> 859eea89 (first commit)
=======
>>>>>>> c3ae17e7 (new branch)

  return (
    <>
      <CustomSheet moduleScreenSheet={true} reference={props.reference}>
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
        {sheetItems.map((item, index) => {
=======
        {items.map((item, index) => {
>>>>>>> 16ba8713 (feat: submit attendance with location and selfie)
=======
        {items.map((item, index) => {
>>>>>>> 859eea89 (first commit)
=======
        {items.map((item, index) => {
>>>>>>> c3ae17e7 (new branch)
          return (
            <SheetItem
              item={item}
              attendance={attendance}
              handleSubmit={handleSubmit}
              location={location}
              locationOn={locationOn}
              attendanceModalIsopen={attendanceModalIsopen}
              workDuration={workDuration}
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
              selectShiftRef={selectShiftRef}
              shiftSelected={shiftSelected}
=======
              shiftSelected={shiftSelected}
              setShiftSelected={setShiftSelected}
>>>>>>> 16ba8713 (feat: submit attendance with location and selfie)
=======
              shiftSelected={shiftSelected}
              setShiftSelected={setShiftSelected}
>>>>>>> 859eea89 (first commit)
=======
              shiftSelected={shiftSelected}
              setShiftSelected={setShiftSelected}
>>>>>>> c3ae17e7 (new branch)
              minimumDurationReached={minimumDurationReached}
              props={props}
              key={index}
              profile={profile}
              toggleNewLeaveRequestModal={toggleNewLeaveRequestModal}
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
              toggleClockModal={toggleClockModal}
>>>>>>> 859eea89 (first commit)
=======
              toggleClockModal={toggleClockModal}
>>>>>>> c3ae17e7 (new branch)
              setRequestType={setRequestType}
              setErrorMessage={setErrorMessage}
              type={
                "Clock"
                // ||
                // "Scan QR"
                // ||
                // "Generate QR"
              }
              locationPermission={locationPermission}
              shifts={shifts}
              result={result}
              setResult={setResult}
            />
=======
        {items.map((item, idx) => {
          return item.title !== "Clock in" ? (
            <Pressable
              key={idx}
              style={styles.wrapper}
              onPress={() => {
                if (item.title === "New Leave Request") {
                  navigation.navigate("New Leave Request", {
                    employeeId: profile?.data?.id,
                    toggle: toggleNewLeaveRequestModal,
                    setRequestType: setRequestType,
                    setError: setErrorMessage,
                  });
                } else if (item.title === "New Reimbursement") {
                  navigation.navigate("New Reimbursement");
                } else if (item.title === "New Live Session") {
                  navigation.navigate("New Live Session");
                }
                props.reference.current?.hide();
              }}
            >
              <View style={styles.content}>
                <View style={styles.item}>
                  <MaterialCommunityIcons
                    name={item.icons}
                    size={20}
                    color={Colors.iconDark}
                  />
                </View>
                <Text key={item.title} style={[{ fontSize: 14 }, TextProps]}>
                  {item.title}
                </Text>
              </View>
            </Pressable>
          ) : !attendance?.data ? null : (
            <Pressable key={idx} style={styles.wrapper}>
              <ClockAttendance
                attendance={attendance?.data}
                clockIn={attendance?.data?.time_in}
                mainSheetRef={props.reference}
                startTime={attendance?.data?.on_duty}
                endTime={attendance?.data?.off_duty}
                location={location}
                locationOn={locationOn}
                locationPermission={locationPermission}
                type={
                  // "Clock"
                  // || "Scan QR"
                  // ||
                  "Generate QR"
                }
              />
            </Pressable>
>>>>>>> 000b5e7c (feat: attendance location and selfie)
=======
              toggleClockModal={toggleClockModal}
              setRequestType={setRequestType}
              setErrorMessage={setErrorMessage}
              type={
                "Clock"
                // ||
                // "Scan QR"
                // ||
                // "Generate QR"
              }
              locationPermission={locationPermission}
              shifts={shifts}
              result={result}
              setResult={setResult}
            />
>>>>>>> 16ba8713 (feat: submit attendance with location and selfie)
          );
        })}

        <Modals
          attendanceModalIsopen={attendanceModalIsopen}
          toggleAttendanceModal={toggleAttendanceModal}
          location={location}
          refetchAttendance={refetchAttendance}
          attendanceReasonModalIsOpen={attendanceReasonModalIsOpen}
          toggleAttendanceReasonModal={toggleAttendanceReasonModal}
          attendance={attendance}
          clockModalIsOpen={clockModalIsOpen}
          toggleClockModal={toggleClockModal}
          locationIsEmptyIsOpen={locationIsEmptyIsOpen}
          toggleLocationIsEmpty={toggleLocationIsEmpty}
          setResult={setResult}
          success={success}
          setSuccess={setSuccess}
          requestType={requestType}
          setRequestType={setRequestType}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
          alertIsOpen={alertIsOpen}
          toggleAlert={toggleAlert}
          formik={formik}
          earlyformik={earlyReasonformik}
          earlyType={earlyType}
          lateType={lateType}
          currentTime={currentTime}
          result={result}
          workDuration={workDuration}
          minimumDurationReached={minimumDurationReached}
        />
<<<<<<< HEAD

        {/* <ConfirmationModal
          isOpen={attendanceModalIsopen}
          toggle={toggleAttendanceModal}
          apiUrl={`/hr/timesheets/personal/attendance-check`}
          body={{
            longitude: location?.longitude,
            latitude: location?.latitude,
            check_from: "Mobile App",
          }}
          hasSuccessFunc={true}
          onSuccess={refetchAttendance}
          description={`Are you sure want to ${
            !attendance?.data?.time_in ? "Clock-in" : "Clock-out"
          }?`}
          isDelete={false}
          isGet={false}
          isPatch={false}
          toggleOtherModal={toggleClockModal}
          setResult={setResult}
          success={success}
          setSuccess={setSuccess}
          setRequestType={setRequestType}
          setError={setErrorMessage}
          formik={earlyReasonformik}
          clockInOrOutTitle="Clock-out Time"
          types={earlyType}
          timeInOrOut={dayjs(currentTime).format("HH:mm")}
          title="Early Type"
          lateOrEarlyInputValue={earlyReasonformik.values.early_reason}
          onOrOffDuty="Off Duty"
          timeDuty={attendance?.data?.off_duty || result?.off_duty}
          lateOrEarly={result?.early}
          lateOrEarlyType="Select Early Type"
          fieldType="early_type"
          lateOrEarlyInputType={earlyReasonformik.values.early_type}
          fieldReason="early_reason"
          withoutSaveButton={true}
          withDuration={true}
          duration={workDuration}
          timeIn={attendance?.data?.time_in || result?.time_in}
          timeOut={result?.time_out}
          minimumDurationReached={minimumDurationReached}
          forAttendance={true}
        /> */}

        {/* <ReasonModal
          isOpen={attendanceReasonModalIsOpen}
          toggle={toggleAttendanceReasonModal}
          formik={formik}
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
          earlyformik={earlyReasonformik}
          earlyType={earlyType}
          lateType={lateType}
          currentTime={currentTime}
=======
=======
>>>>>>> 000b5e7c (feat: attendance location and selfie)
          title={result?.late && !result?.late_reason ? "Late Type" : "Eearly Type"}
          types={result?.late && !result?.late_reason ? lateType : earlyType}
          timeInOrOut={
            result?.late && !result?.late_reason ? result?.time_in : result?.time_out
          }
          lateOrEarly={
            result?.late && !result?.late_reason ? result?.late : result?.early
          }
          timeDuty={
            result?.late && !result?.late_reason ? result?.on_duty : result?.off_duty
          }
          clockInOrOutTitle={
            result?.late && !result?.late_reason ? "Clock-in Time" : "Clock-out Time"
          }
          onOrOffDuty={result?.late && !result?.late_reason ? "On Duty" : "Off Duty"}
          lateOrEarlyType={
            result?.late && !result?.late_reason
              ? "Select Late Type"
              : "Select Early Type"
          }
          fieldType={result?.late && !result?.late_reason ? "late_type" : "early_type"}
          fieldReaason={
            result?.late && !result?.late_reason ? "late_reason" : "early_reason"
          }
          lateOrEarlyInputValue={
            result?.late && !result?.late_reason
              ? formik.values.late_reason
              : formik.values.early_reason
          }
          lateOrEarlyInputType={
            result?.late && !result?.late_reason
              ? formik.values.late_type
              : formik.values.early_type
          }
          toggleOtherModal={toggleAlert}
          notApplyDisable={false}
          withoutSaveButton={false}
        /> */}

        {/* <AlertModal
          isOpen={clockModalIsOpen}
          toggle={toggleClockModal}
          title={
            requestType === "post"
              ? `${
                  Platform.OS === "android"
                    ? attendance?.data?.time_in
                      ? "Clock-in"
                      : "Clock-out"
                    : Platform.OS === "ios" && !result?.time_out
                    ? "Clock-in"
                    : "Clock-out"
                } success!`
              : "Process error!"
          }
          description={
            requestType === "post"
              ? `at ${
                  Platform.OS === "android"
                    ? attendance?.data?.time_in
                      ? attendance?.data?.time_in
                      : attendance?.data?.time_out || dayjs().format("HH:mm")
                    : Platform.OS === "ios" && !result?.time_out
                    ? result?.time_in
                    : result?.time_out || dayjs().format("HH:mm")
                }`
              : errorMessage || "Please try again later"
          }
          color={
            Platform.OS === "android"
              ? attendance?.data?.time_in
                ? "#FCFF58"
                : "#92C4FF"
              : Platform.OS === "ios" && !result?.time_out
              ? "#FCFF58"
              : "#92C4FF"
          }
>>>>>>> 2f2a1a97 (fix: clock in reminder)
=======
          earlyformik={earlyformik}
          earlyType={earlyType}
          lateType={lateType}
          currentTime={currentTime}
>>>>>>> 2a9d5213 (fix: tribe add new)
          result={result}
<<<<<<< HEAD
<<<<<<< HEAD
          workDuration={workDuration}
          minimumDurationReached={minimumDurationReached}
=======
=======
>>>>>>> b3952fcb (chore: keep current changes)
          toggleOtherModal={toggleAttendanceReasonModal}
          withLoading={true}
          timeIn={attendance?.data?.time_in || result?.time_in}
          timeOut={attendance?.data?.time_out || result?.time_out}
        /> */}

        {/* <AlertModal
          isOpen={alertIsOpen}
          toggle={toggleAlert}
          type={requestType === "post" ? "info" : "danger"}
          title={requestType === "post" ? "Report submitted!" : "Process error!"}
          description={
            requestType === "post"
              ? "Your report is logged"
              : errorMessage || "Please try again later"
          }
        /> */}

        {/* <AlertModal
          isOpen={locationIsEmptyIsOpen}
          toggle={toggleLocationIsEmpty}
          type="danger"
          title="Location not found!"
          description="Please try again"
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> 000b5e7c (feat: attendance location and selfie)
=======
>>>>>>> b3952fcb (chore: keep current changes)
        />
=======
        /> */}
>>>>>>> d3d4ef0a (fix:)
=======
>>>>>>> df8542bd (fix:)
      </CustomSheet>

      <AlertModal
        isOpen={newLeaveRequestModalIsOpen}
        toggle={toggleNewLeaveRequestModal}
        type={requestType === "post" ? "info" : "danger"}
        title={requestType === "post" ? "Request sent!" : "Process error!"}
        description={
          requestType === "post"
            ? "Please wait for approval"
            : errorMessage || "Please try again later"
        }
      />
    </>
  );
};

export default TribeAddNewSheet;
