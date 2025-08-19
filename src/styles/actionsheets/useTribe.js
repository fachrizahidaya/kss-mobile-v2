import { useNavigation } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import * as Location from "expo-location";
import * as Notifications from "expo-notifications";
import { startActivityAsync, ActivityAction } from "expo-intent-launcher";
import { useFormik } from "formik";

import useCheckAccess from "../../hooks/useCheckAccess";
import { useDisclosure } from "../../hooks/useDisclosure";
import { useFetch } from "../../hooks/useFetch";
import { fetchAttend, fetchGoHome, insertAttend, insertGoHome } from "../../config/db";
import {
  handleSetupNotifications,
  handleRegisterForPushNotifications,
} from "../../components/Tribe/Clock/functions";
import { Alert, AppState, Platform } from "react-native";
import axiosInstance from "../../config/api";

export const useTribe = () => {
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
  const [startDate, setStartDate] = useState(null);
  const [dayDifference, setDayDifference] = useState(null);
  const [shiftSelected, setShiftSelected] = useState(null);

  const notificationListener = useRef();
  const responseListener = useRef();
  const selectShiftRef = useRef();

  const navigation = useNavigation();
  const createLeaveRequestCheckAccess = useCheckAccess("create", "Leave Requests");
  const joinLiveSessionCheckAccess = useCheckAccess("join", "E-Commerce Live History");
  // const shiftSelectCheckAccess = useCheckAccess();
  const currentTime = dayjs().format("HH:mm");
  const currentDate = dayjs().format("YYYY-MM-DD");

  const { isOpen: clockModalIsOpen, toggle: toggleClockModal } = useDisclosure(false);
  const { isOpen: alertIsOpen, toggle: toggleAlert } = useDisclosure(false);
  const { isOpen: attendanceModalIsopen, toggle: toggleAttendanceModal } =
    useDisclosure(false);
  const { isOpen: attendanceReasonModalIsOpen, toggle: toggleAttendanceReasonModal } =
    useDisclosure(false);
  const { isOpen: locationIsEmptyIsOpen, toggle: toggleLocationIsEmpty } =
    useDisclosure(false);
  const { isOpen: newLeaveRequestModalIsOpen, toggle: toggleNewLeaveRequestModal } =
    useDisclosure(false);

  const { data: attendance, refetch: refetchAttendance } = useFetch(
    "/hr/timesheets/personal/attendance-today"
  );
  const { data: profile } = useFetch("/hr/my-profile");
  const { data: myTimeGroup } = useFetch("/hr/my-time-group");

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
        title: `New Work Session`,
      },
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
        title: `New Work Session`,
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
      {
        icons: "clock-outline",
        title: `New Work Session`,
      },
    ];
  }
  // else if (shiftSelectCheckAccess) {
  //   items = [
  //     {
  //       icons: "work-outline",
  //       title: `New Work Session`,
  //     },

  //   ]

  // }
  else {
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
    { label: "Went Home Early", value: "Early" },
    { label: "Permit", value: "Permit" },
    { label: "Other", value: "Other" },
  ];

  const shifts = [
    { label: "Shift 1", value: "shift_1" },
    { label: "Shift 2", value: "shift_2" },
  ];

  const handleClockInAndClockOut = async () => {
    const employeeClockIn = await fetchAttend();
    const employeeClockOut = await fetchGoHome();

    const clockInData = employeeClockIn[employeeClockIn?.length - 1];
    const clockOutData = employeeClockOut[employeeClockOut?.length - 1];

    // handleSetupNotifications(
    //   clockInData?.time,
    //   clockInData?.time,
    //   clockOutData?.time,
    //   clockOutData?.time
    // );

    setClockIn(clockInData?.time);
    setClockOut(clockOutData?.time);
  };

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
      }
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
      }
    );
  };

  const handleCheckLocation = async () => {
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
      "0"
    )}:${String(isNaN(minutes) ? "00" : minutes).padStart(2, "0")}`;

    setWorkDuration(diffMinutes < 0 ? diffHoursZero : diffHoursFormatted);

    if (diffMinutes >= 0 && diffHoursFormatted >= attendance?.data?.work_time) {
      setMinimumDurationReached(true);
    } else {
      setMinimumDurationReached(false);
    }
  };

  const handleSetUserClock = async () => {
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

  const handleGetUserClock = async () => {
    const storedEmployeeClockIn = await fetchAttend();
    const storedEmployeeClockOut = await fetchGoHome();
    const clockInData = storedEmployeeClockIn[storedEmployeeClockIn?.length - 1];
    const clockOutData = storedEmployeeClockOut[storedEmployeeClockOut?.length - 1];

    // handleSetupNotifications(
    //   clockInData?.time,
    //   clockInData?.time,
    //   clockOutData?.time,
    //   clockOutData?.time
    // );

    if (clockInData) {
      setAttend(clockInData?.time);
    } else if (clockOutData) {
      setGoHome(clockOutData?.time);
    }
  };

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
      handleSubmitAttendanceReport(result?.id, values, setSubmitting, setStatus);
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
    setStatus
  ) => {
    try {
      await axiosInstance.patch(`/hr/timesheets/personal/${attendance_id}`, data);
      setRequestType("post");
      toggleAttendanceReasonModal();
      setSubmitting(false);
      setStatus("success");
    } catch (err) {
      console.log(err);
      setErrorMessage(err.response?.data.message);
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
    setStatus
  ) => {
    try {
      const res = await axiosInstance.patch(
        `/hr/timesheets/personal/${attendance_id}`,
        data
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

  function differenceBetweenStartAndCurrentDate(start_date, current_date) {
    const start = new Date(start_date);
    const current = new Date(current_date);

    const timeDifference = current - start;

    const day_difference = timeDifference / (1000 * 60 * 60 * 24);

    if (day_difference) {
      setDayDifference(day_difference);
    }
  }

  useEffect(() => {
    if (attendance?.data?.time_in) {
      const timeIn =
        attendance?.data?.time_in < attendance?.data?.on_duty
          ? attendance?.data?.on_duty
          : attendance?.data?.time_in;

      handleCalculateWorkTime(timeIn, dayjs().format("HH:mm"));

      const interval = setInterval(() => {
        handleCalculateWorkTime(timeIn, dayjs().format("HH:mm"));
      }, 60000); // Update every 1 minute (60000ms)

      return () => clearInterval(interval);
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
          dayjs().format("HH:mm")
        );
        handleSetUserClock();
        handleGetUserClock();
        differenceBetweenStartAndCurrentDate(startDate, currentDate);
        handleClockInAndClockOut();
        handleSetupNotifications(clockIn, attend, clockOut, goHome);
      } else {
        handleCheckLocation();
        handleCalculateWorkTime(
          attendance?.data?.time_in < attendance?.data?.on_duty
            ? attendance?.data?.on_duty
            : attendance?.data?.time_in,
          dayjs().format("HH:mm")
        );
        handleSetUserClock();
        handleGetUserClock();
        differenceBetweenStartAndCurrentDate(startDate, currentDate);
        handleClockInAndClockOut();
        handleSetupNotifications(clockIn, attend, clockOut, goHome);
      }
    };

    AppState.addEventListener("change", handleAppStateChange);
    handleCheckLocation(); // Initial run when the component mounts
    handleCalculateWorkTime(
      attendance?.data?.time_in < attendance?.data?.on_duty
        ? attendance?.data?.on_duty
        : attendance?.data?.time_in,
      dayjs().format("HH:mm")
    );
    handleSetUserClock();
    handleGetUserClock();
    differenceBetweenStartAndCurrentDate(startDate, currentDate);
    handleClockInAndClockOut();
    handleSetupNotifications(clockIn, attend, clockOut, goHome);
  }, [
    locationOn,
    locationPermission,
    attendance?.data?.time_in,
    attendance?.data?.time_out,
    attendance?.data?.on_duty,
    attendance?.data?.off_duty,
    currentTime,
    startDate,
  ]);

  useEffect(() => {
    handleRegisterForPushNotifications().then(
      (token) => token && setExpoPushToken(token)
    );

    if (Platform.OS === "android") {
      Notifications.getNotificationChannelsAsync().then((value) =>
        setChannels(value ?? [])
      );
    }
    notificationListener.current = Notifications.addNotificationReceivedListener(
      (notification) => {
        setNotification(notification);
      }
    );

    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (response) => {}
    );

    return () => {
      notificationListener.current &&
        Notifications.removeNotificationSubscription(notificationListener.current);
      responseListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return {
    location,
    setLocation,
    locationOn,
    setLocationOn,
    locationPermission,
    setLocationPermission,
    requestType,
    setRequestType,
    result,
    setResult,
    errorMessage,
    setErrorMessage,
    workDuration,
    setWorkDuration,
    minimumDurationReached,
    setMinimumDurationReached,
    setExpoPushToken,
    setChannels,
    setNotification,
    attend,
    setAttend,
    goHome,
    setGoHome,
    clockIn,
    setClockIn,
    clockOut,
    setClockOut,
    success,
    setSuccess,
    startDate,
    setStartDate,
    dayDifference,
    setDayDifference,
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
    attendance,
    refetchAttendance,
    profile,
    myTimeGroup,
    currentTime,
    items,
    lateType,
    earlyType,
    shifts,
    formik,
    earlyReasonformik,
    handleSubmit,
  };
};
