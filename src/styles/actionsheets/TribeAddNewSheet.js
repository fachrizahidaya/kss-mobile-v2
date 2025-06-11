import { useEffect, useState, useRef, useMemo } from "react";
import dayjs from "dayjs";
import * as Location from "expo-location";
import * as Notifications from "expo-notifications";
import { startActivityAsync, ActivityAction } from "expo-intent-launcher";
import { useFormik } from "formik";

import { Alert, AppState, Platform, Linking } from "react-native";

import useCheckAccess from "../../hooks/useCheckAccess";
import { useFetch } from "../../hooks/useFetch";
import { useDisclosure } from "../../hooks/useDisclosure";
import AlertModal from "../modals/AlertModal";
import axiosInstance from "../../config/api";
import { fetchAttend, insertAttend, insertGoHome } from "../../config/db";
import CustomSheet from "../../layouts/CustomSheet";
import SheetItem from "../../components/Tribe/Clock/SheetItem";
import Modals from "../../components/Tribe/Clock/Modals";
import {
  handleRegisterForPushNotifications,
  handleSetupNotifications,
} from "../../components/Tribe/Clock/functions";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const TribeAddNewSheet = (props) => {
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
  const [shiftSelected, setShiftSelected] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [dayDifference, setDayDifference] = useState(null);

  const notificationListener = useRef();
  const responseListener = useRef();
  const selectShiftRef = useRef();

  const createLeaveRequestCheckAccess = useCheckAccess("create", "Leave Requests");
  const joinLiveSessionCheckAccess = useCheckAccess("join", "E-Commerce Live History");
  const currentTime = dayjs().format("HH:mm");
  const currentDate = dayjs().format("YYYY-MM-DD");

  const handleClockInAndClockOut = async () => {
    const employeeClockIn = await fetchAttend();

    setClockIn(
      employeeClockIn[0]?.time ? employeeClockIn[0]?.time : employeeClockIn[1]?.time
    );
    setClockOut(attendance?.data?.off_duty);
  };

  const { data: attendance, refetch: refetchAttendance } = useFetch(
    "/hr/timesheets/personal/attendance-today"
  );
  const { data: profile } = useFetch("/hr/my-profile");

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

  const sheetItems =
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
        // check is location active
        handleActivateLocationAlert();
        return;
      } else {
        // check location permission
        const { granted } = await Location.getForegroundPermissionsAsync();
        setLocationPermission(granted);
        const lastKnownLocation = await Location.getLastKnownPositionAsync();
        const currentLocation = await Location.getCurrentPositionAsync({});

        if (!lastKnownLocation || !currentLocation) {
          handleCheckLocation();
        } else {
          // handle current location
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

    let clock_in = storedEmployeeClockIn[0]?.time
      ? storedEmployeeClockIn[0]?.time
      : storedEmployeeClockIn[1]?.time;

    const clock_out = attendance?.data?.off_duty;

    if (clock_in) {
      setAttend(clock_in);
    } else if (clock_out) {
      setGoHome(clock_out);
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
  const earlyformik = useFormik({
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

  useEffect(() => {
    if (attendance?.data?.time_in) {
      handleCalculateWorkTime(
        attendance?.data?.time_in < attendance?.data?.on_duty
          ? attendance?.data?.on_duty
          : attendance?.data?.time_in,
        dayjs().format("HH:mm")
      );
    }
  }, [attendance?.data?.time_in, attendance?.data?.on_duty, currentTime]);

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

  return (
    <>
      <CustomSheet moduleScreenSheet={true} reference={props.reference}>
        {sheetItems.map((item, index) => {
          return (
            <SheetItem
              item={item}
              attendance={attendance}
              handleSubmit={handleSubmit}
              location={location}
              locationOn={locationOn}
              attendanceModalIsopen={attendanceModalIsopen}
              workDuration={workDuration}
              selectShiftRef={selectShiftRef}
              shiftSelected={shiftSelected}
              minimumDurationReached={minimumDurationReached}
              props={props}
              key={index}
              profile={profile}
              toggleNewLeaveRequestModal={toggleNewLeaveRequestModal}
              setRequestType={setRequestType}
            />
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
          earlyformik={earlyformik}
          earlyType={earlyType}
          lateType={lateType}
          currentTime={currentTime}
          result={result}
          workDuration={workDuration}
          minimumDurationReached={minimumDurationReached}
        />
      </CustomSheet>

      <AlertModal
        isOpen={newLeaveRequestModalIsOpen}
        toggle={toggleNewLeaveRequestModal}
        type={requestType}
        title={"Request sent!"}
        description={"Please wait for approval"}
      />
    </>
  );
};

export default TribeAddNewSheet;
