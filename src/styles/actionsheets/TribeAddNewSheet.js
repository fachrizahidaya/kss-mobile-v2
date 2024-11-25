import { useNavigation } from "@react-navigation/native";
import { useEffect, useState, useRef, useMemo } from "react";
import dayjs from "dayjs";
import * as Location from "expo-location";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { startActivityAsync, ActivityAction } from "expo-intent-launcher";
import { useFormik } from "formik";

import ActionSheet from "react-native-actions-sheet";
import { Alert, Pressable, StyleSheet, Text, View, AppState, Platform, Linking } from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import useCheckAccess from "../../hooks/useCheckAccess";
import { useFetch } from "../../hooks/useFetch";
import ClockAttendance from "../../components/Tribe/Clock/ClockAttendance";
import { TextProps } from "../CustomStylings";
import { useDisclosure } from "../../hooks/useDisclosure";
import AlertModal from "../modals/AlertModal";
import ConfirmationModal from "../modals/ConfirmationModal";
import ReasonModal from "../../components/Tribe/Clock/ReasonModal";
import axiosInstance from "../../config/api";
import { fetchAttend, fetchGoHome, insertAttend, insertGoHome, insertTimeGroup, fetchTimeGroup } from "../../config/db";
import SelectSheet from "./SelectSheet";
import NewLiveSessionForm from "../../components/Tribe/LiveHost/LiveSession/NewLiveSessionForm";
import CustomSheet from "../../layouts/CustomSheet";
import { useLoading } from "../../hooks/useLoading";

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
  const [timeGroup, setTimeGroup] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [dayDifference, setDayDifference] = useState(null);
  const [session, setSession] = useState(null);
  const [hostType, setHostType] = useState(1);

  const notificationListener = useRef();
  const responseListener = useRef();
  const selectShiftRef = useRef();
  const joinSessionRef = useRef();

  const navigation = useNavigation();
  const createLeaveRequestCheckAccess = useCheckAccess("create", "Leave Requests");
  // const joinLiveSessionCheckAccess = useCheckAccess("create", "Live Sessions");
  const currentTime = dayjs().format("HH:mm");
  const currentDate = dayjs().format("YYYY-MM-DD");

  const sequenceIndex = (dayDifference % timeGroup?.length) + 1;
  const sequenceSelected = sequenceIndex === 0 ? timeGroup?.length : sequenceIndex;
  const selectedItem = timeGroup?.find((item) => item?.seq === sequenceSelected);

  const clockInAndClockOut = () => {
    setClockIn(selectedItem?.on_duty);
    setClockOut(selectedItem?.off_duty);
  };

  const { data: attendance, refetch: refetchAttendance } = useFetch("/hr/timesheets/personal/attendance-today");
  const { data: profile } = useFetch("/hr/my-profile");
  const { data: myTimeGroup } = useFetch("/hr/my-time-group");
  const { data: sessions } = useFetch("/hr/ecom-live-schedule/session/today");

  const { isOpen: clockModalIsOpen, toggle: toggleClockModal } = useDisclosure(false);
  const { isOpen: alertIsOpen, toggle: toggleAlert } = useDisclosure(false);
  const { isOpen: attendanceModalIsopen, toggle: toggleAttendanceModal } = useDisclosure(false);
  const { isOpen: attendanceReasonModalIsOpen, toggle: toggleAttendanceReasonModal } = useDisclosure(false);
  const { isOpen: locationIsEmptyIsOpen, toggle: toggleLocationIsEmpty } = useDisclosure(false);
  const { isOpen: newLeaveRequestModalIsOpen, toggle: toggleNewLeaveRequestModal } = useDisclosure(false);
  const { isOpen: newJoinSessionModalIsOpen, toggle: toggleNewJoinSessionModal } = useDisclosure(false);

  const { isLoading: joinSessionIsLoading, toggle: toggleJoinSession } = useLoading(false);

  const items = [
    {
      icons: "clipboard-clock-outline",
      title: `New Leave Request ${createLeaveRequestCheckAccess ? "" : "(No access)"}`,
    },
    {
      icons: "video-outline",
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

  const sessionOptions = sessions?.data?.map((item) => ({
    value: item?.id,
    label: `Session: ${item?.session} ${item?.begin_time} ${item?.brand?.name}`,
  }));

  const hostTypeRadioButtons = useMemo(
    () => [
      {
        id: 1,
        value: "Reguler",
        label: "Reguler",
      },
      {
        id: 2,
        value: "Training",
        label: "Training",
      },
    ],
    []
  );

  const handleChangeShift = (value) => {
    setShiftSelected(value);
    selectShiftRef.current?.hide();
  };

  /**
   * Handle open setting to check location service
   */
  const openSetting = () => {
    if (Platform.OS == "ios") {
      Linking.openURL("app-settings:");
    } else {
      startActivityAsync(ActivityAction.LOCATION_SOURCE_SETTINGS);
    }
  };

  /**
   * Handle modal to turn on location service
   */
  const showAlertToActivateLocation = () => {
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
          onPress: () => openSetting(),
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
  const showAlertToAllowPermission = () => {
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

  // const leaveCondition =
  //   attendance?.data?.att_type === "Leave" &&
  //   (attendance?.data?.day_type === "Work Day" || attendance?.data?.day_type === "Day Off");

  // const holidayCondition =
  //   (attendance?.data?.att_type === "Holiday" &&
  //     (attendance?.data?.day_type === "Work Day" || attendance?.data?.day_type === "Day Off")) ||
  //   attendance?.data?.day_type === "Holiday";

  // const weekend = attendance?.data?.day_type === "Weekend";

  // const dayoff = attendance?.data?.day_type === "Day Off";

  const checkIsLocationActiveAndLocationPermissionAndGetCurrentLocation = async () => {
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

        if (!lastKnownLocation || !currentLocation) {
          checkIsLocationActiveAndLocationPermissionAndGetCurrentLocation();
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

  const calculateWorkTimeHandler = (timeIn, currentTime) => {
    const timeInObj = dayjs(`1970-01-01T${timeIn}`);
    const timeOutObj = dayjs(`1970-01-01T${currentTime}`);

    const diffMinutes = timeOutObj.diff(timeInObj, "minute");
    const hours = Math.floor(Math.max(diffMinutes, 0) / 60);
    const minutes = Math.max(diffMinutes, 0) % 60;

    const diffHoursZero = "00:00";
    const diffHoursFormatted = `${String(isNaN(hours) ? "00" : hours).padStart(2, "0")}:${String(
      isNaN(minutes) ? "00" : minutes
    ).padStart(2, "0")}`;

    setWorkDuration(diffMinutes < 0 ? diffHoursZero : diffHoursFormatted);

    if (diffMinutes >= 0 && diffHoursFormatted >= attendance?.data?.work_time) {
      setMinimumDurationReached(true);
    }
  };

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
        const projectId = Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
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

  const setUserClock = async () => {
    try {
      await insertAttend(dayjs(attendance?.data?.time_in).format("HH:mm") || null);
      if (attendance?.data) {
        await insertGoHome(dayjs(attendance?.data?.time_out).format("HH:mm") || null);
      } else {
        await insertGoHome(dayjs(result?.data?.time_out).format("HH:mm") || null);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const setMyTimeGroup = async () => {
    try {
      await insertTimeGroup(
        myTimeGroup?.data?.time_group_id || null,
        myTimeGroup?.data?.time_group?.name || null,
        myTimeGroup?.data?.time_group?.start_date || null,
        myTimeGroup?.data?.time_group?.detail || null
      );
    } catch (err) {
      console.log(err);
    }
  };

  const getUserClock = async () => {
    const storedEmployeeClockIn = await fetchAttend();
    const storedEmployeeClockOut = await fetchGoHome();

    const clock_in = storedEmployeeClockIn[0]?.time ? storedEmployeeClockIn[0]?.time : storedEmployeeClockIn[1]?.time;
    const clock_out = storedEmployeeClockOut[0]?.time
      ? storedEmployeeClockOut[0]?.time
      : storedEmployeeClockOut[1]?.time;

    if (clock_in) {
      setAttend(clock_in);
    } else if (clock_out) {
      setGoHome(clock_out);
    }
  };

  const getMyTimeGroup = async () => {
    const storedTimeGroup = await fetchTimeGroup();

    const timeGroup = storedTimeGroup[0]?.detail
      ? JSON.parse(storedTimeGroup[0]?.detail)
      : JSON.parse(storedTimeGroup[1]?.detail);

    const start_date = storedTimeGroup[0]?.start_date ? storedTimeGroup[0]?.start_date : storedTimeGroup[1]?.start_date;

    if (timeGroup) {
      setTimeGroup(timeGroup);
    }
    if (start_date) {
      setStartDate(start_date);
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
      attendanceReportSubmitHandler(result?.id, values, setSubmitting, setStatus);
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
      earlyReasonSubmitHandler(result?.id, values, setSubmitting, setStatus);
    },
  });

  /**
   * Handle submit attendance clock-in and out
   */
  const attendanceSubmit = () => {
    if (!locationOn) {
      showAlertToActivateLocation();
      return;
    }
    if (!locationPermission) {
      showAlertToAllowPermission();
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
  const attendanceReportSubmitHandler = async (attendance_id, data, setSubmitting, setStatus) => {
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

  const earlyReasonSubmitHandler = async (attendance_id, data, setSubmitting, setStatus) => {
    try {
      const res = await axiosInstance.patch(`/hr/timesheets/personal/${attendance_id}`, data);
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

  const handleJoinSession = async () => {
    try {
      toggleJoinSession();
      const res = await axiosInstance.post(`/hr/ecom-live-schedule/session/${session}/join`, {
        host_type: hostType === 1 ? "Reguler" : "Training",
      });
      setRequestType("post");
      toggleAlert();
      if (Platform.OS === "ios") {
        navigation.goBack();
      } else {
        joinSessionRef.current?.hide();
        props.reference.current?.show();
      }
      toggleJoinSession();
      setSession(null);
      setHostType(1);
    } catch (err) {
      console.log(err);
      setRequestType("error");
      setError(err.response.data.message);
      toggleJoinSession();
    }
  };

  useEffect(() => {
    if (attendance?.data?.time_in) {
      calculateWorkTimeHandler(
        dayjs(attendance?.data?.time_in).format("HH:mm") < attendance?.data?.on_duty
          ? attendance?.data?.on_duty
          : dayjs(attendance?.data?.time_in).format("HH:mm"),
        dayjs().format("HH:mm")
      );
    }
  }, [attendance?.data?.time_in, attendance?.data?.on_duty, currentTime]);

  useEffect(() => {
    const checkPermissionRequest = async () => {
      if (!locationPermission) {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          showAlertToAllowPermission();
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
        checkIsLocationActiveAndLocationPermissionAndGetCurrentLocation();
        calculateWorkTimeHandler(
          dayjs(attendance?.data?.time_in).format("HH:mm") < attendance?.data?.on_duty
            ? attendance?.data?.on_duty
            : dayjs(attendance?.data?.time_in).format("HH:mm"),
          dayjs().format("HH:mm")
        );
        setUserClock();
        setMyTimeGroup();
        getUserClock();
        getMyTimeGroup();
        differenceBetweenStartAndCurrentDate(startDate, currentDate);
        clockInAndClockOut();
        setupNotifications();
      } else {
        checkIsLocationActiveAndLocationPermissionAndGetCurrentLocation();
        calculateWorkTimeHandler(
          dayjs(attendance?.data?.time_in).format("HH:mm") < attendance?.data?.on_duty
            ? attendance?.data?.on_duty
            : dayjs(attendance?.data?.time_in).format("HH:mm"),
          dayjs().format("HH:mm")
        );
        setUserClock();
        setMyTimeGroup();
        getUserClock();
        getMyTimeGroup();
        differenceBetweenStartAndCurrentDate(startDate, currentDate);
        clockInAndClockOut();
        setupNotifications();
      }
    };

    AppState.addEventListener("change", handleAppStateChange);
    checkIsLocationActiveAndLocationPermissionAndGetCurrentLocation(); // Initial run when the component mounts
    calculateWorkTimeHandler(
      dayjs(attendance?.data?.time_in).format("HH:mm") < attendance?.data?.on_duty
        ? attendance?.data?.on_duty
        : dayjs(attendance?.data?.time_in).format("HH:mm"),
      dayjs().format("HH:mm")
    );
    setUserClock();
    setMyTimeGroup();
    getUserClock();
    getMyTimeGroup();
    differenceBetweenStartAndCurrentDate(startDate, currentDate);
    clockInAndClockOut();
    setupNotifications();
  }, [
    locationOn,
    locationPermission,
    attendance?.data?.time_in,
    attendance?.data?.time_out,
    attendance?.data?.on_duty,
    attendance?.data?.off_duty,
    currentTime,
    startDate,
    sequenceIndex,
    sequenceSelected,
  ]);

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => token && setExpoPushToken(token));

    if (Platform.OS === "android") {
      Notifications.getNotificationChannelsAsync().then((value) => setChannels(value ?? []));
    }
    notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {});

    return () => {
      notificationListener.current && Notifications.removeNotificationSubscription(notificationListener.current);
      responseListener.current && Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <>
      <ActionSheet ref={props.reference}>
        <View style={styles.container}>
          {items.map((item, idx) => {
            return item.title !== "Clock in" ? (
              <Pressable
                key={idx}
                style={styles.wrapper}
                onPress={() => {
                  if (item.title === "New Leave Request ") {
                    navigation.navigate("New Leave Request", {
                      employeeId: profile?.data?.id,
                      toggle: toggleNewLeaveRequestModal,
                      setRequestType: setRequestType,
                      setError: setErrorMessage,
                    });
                  } else if (item.title === "New Reimbursement") {
                    navigation.navigate("New Reimbursement");
                  } else if (item.title === "New Live Session") {
                    navigation.navigate("New Live Session", {
                      setRequestType: setRequestType,
                      toggleAlert: toggleNewJoinSessionModal,
                      setError: setErrorMessage,
                    });
                  }
                  props.reference.current?.hide();
                }}
              >
                <View style={styles.flex}>
                  <View style={styles.item}>
                    <MaterialCommunityIcons name={item.icons} size={20} color="#3F434A" />
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
                  onClock={attendanceSubmit}
                  location={location}
                  locationOn={locationOn}
                  modalIsOpen={attendanceModalIsopen}
                  workDuration={workDuration}
                  timeIn={attendance?.data?.time_in}
                  reference={selectShiftRef}
                  shiftValue={shiftSelected}
                />
              </Pressable>
            );
          })}
        </View>

        <ConfirmationModal
          isOpen={attendanceModalIsopen}
          toggle={toggleAttendanceModal}
          apiUrl={`/hr/timesheets/personal/attendance-check`}
          body={{ longitude: location?.longitude, latitude: location?.latitude, check_from: "Mobile App" }}
          hasSuccessFunc={true}
          onSuccess={refetchAttendance}
          description={`Are you sure want to ${!attendance?.data?.time_in ? "Clock-in" : "Clock-out"}?`}
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
        />

        <ReasonModal
          isOpen={attendanceReasonModalIsOpen}
          toggle={toggleAttendanceReasonModal}
          formik={formik}
          title={result?.late && !result?.late_reason ? "Late Type" : "Eearly Type"}
          types={result?.late && !result?.late_reason ? lateType : earlyType}
          timeInOrOut={
            result?.late && !result?.late_reason
              ? dayjs(result?.time_in).format("HH:mm")
              : dayjs(result?.time_out).format("HH:mm")
          }
          lateOrEarly={result?.late && !result?.late_reason ? result?.late : result?.early}
          timeDuty={result?.late && !result?.late_reason ? result?.on_duty : result?.off_duty}
          clockInOrOutTitle={result?.late && !result?.late_reason ? "Clock-in Time" : "Clock-out Time"}
          onOrOffDuty={result?.late && !result?.late_reason ? "On Duty" : "Off Duty"}
          lateOrEarlyType={result?.late && !result?.late_reason ? "Select Late Type" : "Select Early Type"}
          fieldType={result?.late && !result?.late_reason ? "late_type" : "early_type"}
          fieldReaason={result?.late && !result?.late_reason ? "late_reason" : "early_reason"}
          lateOrEarlyInputValue={
            result?.late && !result?.late_reason ? formik.values.late_reason : formik.values.early_reason
          }
          lateOrEarlyInputType={
            result?.late && !result?.late_reason ? formik.values.late_type : formik.values.early_type
          }
          toggleOtherModal={toggleAlert}
          notApplyDisable={true}
          withoutSaveButton={false}
        />

        <AlertModal
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
                      ? dayjs(attendance?.data?.time_in).format("HH:mm")
                      : dayjs(attendance?.data?.time_out).format("HH:mm") || dayjs().format("HH:mm")
                    : Platform.OS === "ios" && !result?.time_out
                    ? dayjs(result?.time_in).format("HH:mm")
                    : dayjs(result?.time_out).format("HH:mm") || dayjs().format("HH:mm")
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
          result={result}
          toggleOtherModal={toggleAttendanceReasonModal}
          withLoading={true}
          timeIn={attendance?.data?.time_in || result?.time_in}
          timeOut={attendance?.data?.time_out || result?.time_out}
        />

        <AlertModal
          isOpen={alertIsOpen}
          toggle={toggleAlert}
          type={requestType === "post" ? "info" : "danger"}
          title={requestType === "post" ? "Report submitted!" : "Process error!"}
          description={requestType === "post" ? "Your report is logged" : errorMessage || "Please try again later"}
        />

        <AlertModal
          isOpen={locationIsEmptyIsOpen}
          toggle={toggleLocationIsEmpty}
          type={"danger"}
          title={"Location not found!"}
          description={"Please try again"}
        />
        {/* <SelectSheet reference={selectShiftRef} children={shifts} onChange={handleChangeShift} /> */}
      </ActionSheet>

      <CustomSheet handleClose={() => props.reference.current?.show()} reference={joinSessionRef}>
        <NewLiveSessionForm
          items={sessionOptions}
          value={session}
          handleChange={setSession}
          handlePress={setHostType}
          selectedId={hostType}
          radioButtons={hostTypeRadioButtons}
          isLoading={joinSessionIsLoading}
          handleSubmit={handleJoinSession}
        />
      </CustomSheet>

      <AlertModal
        isOpen={newLeaveRequestModalIsOpen}
        toggle={toggleNewLeaveRequestModal}
        type={requestType === "post" ? "info" : "danger"}
        title={requestType === "post" ? "Request sent!" : "Process error!"}
        description={requestType === "post" ? "Please wait for approval" : errorMessage || "Please try again later"}
      />

      <AlertModal
        isOpen={newJoinSessionModalIsOpen}
        toggle={toggleNewJoinSessionModal}
        type={requestType === "post" ? "info" : "danger"}
        title={requestType === "post" ? "Session submitted!" : "Process error!"}
        description={
          requestType === "post" ? "You joined the online session" : errorMessage || "Please try again later"
        }
      />
    </>
  );
};

export default TribeAddNewSheet;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 40,
  },
  wrapper: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: "#E8E9EB",
  },
  flex: {
    flexDirection: "row",
    alignItems: "center",
    gap: 21,
  },
  item: {
    backgroundColor: "#f7f7f7",
    borderRadius: 5,
    height: 32,
    width: 32,
    alignItems: "center",
    justifyContent: "center",
  },
});
