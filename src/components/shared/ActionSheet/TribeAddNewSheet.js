import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import * as Location from "expo-location";
import { startActivityAsync, ActivityAction } from "expo-intent-launcher";
import { useFormik } from "formik";

import ActionSheet from "react-native-actions-sheet";
import { Alert, Pressable, StyleSheet, Text, TouchableOpacity, View, AppState, Platform, Linking } from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import useCheckAccess from "../../../hooks/useCheckAccess";
import { useFetch } from "../../../hooks/useFetch";
import ClockAttendance from "../../Tribe/Clock/ClockAttendance";
import { TextProps } from "../CustomStylings";
import { useDisclosure } from "../../../hooks/useDisclosure";
import SuccessModal from "../Modal/SuccessModal";
import ConfirmationModal from "../Modal/ConfirmationModal";
import ReasonModal from "../../Tribe/Clock/ReasonModal";
import axiosInstance from "../../../config/api";

const TribeAddNewSheet = (props) => {
  const [location, setLocation] = useState({});
  const [locationOn, setLocationOn] = useState(null);
  const [locationPermission, setLocationPermission] = useState(null);
  const [requestType, setRequestType] = useState("");
  const [result, setResult] = useState(null);

  const navigation = useNavigation();
  const createLeaveRequestCheckAccess = useCheckAccess("create", "Leave Requests");

  const { data: attendance, refetch: refetchAttendance } = useFetch("/hr/timesheets/personal/attendance-today");
  const { data: profile } = useFetch("/hr/my-profile");

  const { toggle: toggleClockModal, isOpen: clockModalIsOpen } = useDisclosure(false);
  const { toggle: toggleNewLeaveRequestModal, isOpen: newLeaveRequestModalIsOpen } = useDisclosure(false);
  const { isOpen: attendanceModalIsopen, toggle: toggleAttendanceModal } = useDisclosure(false);
  const { isOpen: attendanceReasonModalIsOpen, toggle: toggleAttendanceReasonModal } = useDisclosure(false);
  const { isOpen: attendanceReasonSuccessIsOpen, toggle: toggleAttendanceReasonSuccess } = useDisclosure(false);
  const { isOpen: errorModalIsOpen, toggle: toggleErrorModal } = useDisclosure(false);

  const items = [
    {
      icons: "clipboard-clock-outline",
      title: `New Leave Request ${createLeaveRequestCheckAccess ? "" : "(No access)"}`,
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
        if (Platform.OS === "ios") {
          setLocation(currentLocation ? currentLocation?.coords : lastKnownLocation?.coords);
        } else {
        }
        setLocation(currentLocation?.coords);
      }
    } catch (err) {
      console.log(err);
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
    onSubmit: (values, { resetForm, setSubmitting, setStatus }) => {
      setStatus("processing");
      attendanceReportSubmitHandler(result?.id, values, setSubmitting, setStatus);
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
      setSubmitting(false);
      setStatus("success");
      if (Platform.OS === "android") {
        toggleAttendanceReasonSuccess();
      }
      setRequestType("info");
      toggleAttendanceReasonModal();
    } catch (err) {
      console.log(err);
      toggleErrorModal();
      setRequestType("warning");
      setSubmitting(false);
      setStatus("error");
    }
  };

  useEffect(() => {
    if (Platform.OS === "android") {
      if (
        (result?.time_in && result?.late && !result?.late_reason) ||
        (result?.time_out && result?.early && !result?.early_reason)
      ) {
        toggleAttendanceReasonModal();
      }
    }
  }, [attendance?.data]);

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
      } else {
        checkIsLocationActiveAndLocationPermissionAndGetCurrentLocation();
      }
    };

    AppState.addEventListener("change", handleAppStateChange);
    checkIsLocationActiveAndLocationPermissionAndGetCurrentLocation(); // Initial run when the component mounts
  }, [locationOn, locationPermission]);

  return (
    <>
      <ActionSheet ref={props.reference}>
        <View style={styles.container}>
          {items.map((item, idx) => {
            return item.title !== "Clock in" ? (
              <TouchableOpacity
                key={idx}
                style={styles.wrapper}
                onPress={() => {
                  if (item.title === "New Leave Request ") {
                    navigation.navigate("New Leave Request", {
                      employeeId: profile?.data?.id,
                      toggle: toggleNewLeaveRequestModal,
                      setRequestType: setRequestType,
                      toggleError: toggleErrorModal,
                    });
                  } else if (item.title === "New Reimbursement") {
                    navigation.navigate("New Reimbursement");
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
              </TouchableOpacity>
            ) : !attendance?.data ? null : (
              <Pressable key={idx} style={styles.wrapper}>
                <ClockAttendance
                  attendance={attendance?.data}
                  onClock={attendanceSubmit}
                  location={location}
                  locationOn={locationOn}
                  modalIsOpen={attendanceModalIsopen}
                />
              </Pressable>
            );
          })}
        </View>

        <ConfirmationModal
          isOpen={attendanceModalIsopen}
          toggle={toggleAttendanceModal}
          apiUrl={`/hr/timesheets/personal/attendance-check`}
          body={{
            longitude: location?.longitude,
            latitude: location?.latitude,
            check_from: "Mobile App",
          }}
          hasSuccessFunc={true}
          onSuccess={() => {
            setRequestType("clock");
            refetchAttendance();
          }}
          description={`Are you sure want to ${attendance?.data?.att_type === "Alpa" ? "Clock-in" : "Clock-out"}?`}
          successMessage={`Process success`}
          isDelete={false}
          isGet={false}
          isPatch={false}
          toggleOtherModal={toggleClockModal}
          showSuccessToast={false}
          setResult={setResult}
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
          toggleOtherModal={toggleAttendanceReasonSuccess}
        />

        <SuccessModal
          isOpen={clockModalIsOpen}
          toggle={toggleClockModal}
          title={`${
            Platform.OS === "android"
              ? attendance?.data?.time_in
                ? "Clock-in"
                : "Clock-out"
              : Platform.OS === "ios" && !result?.time_out
              ? "Clock-in"
              : "Clock-out"
          } success!`}
          description={`at ${
            Platform.OS === "android"
              ? attendance?.data?.time_in
                ? dayjs(attendance?.data?.time_in).format("HH:mm")
                : dayjs(attendance?.data?.time_out).format("HH:mm") || dayjs().format("HH:mm")
              : Platform.OS === "ios" && !result?.time_out
              ? dayjs(result?.time_in).format("HH:mm")
              : dayjs(result?.time_out).format("HH:mm") || dayjs().format("HH:mm")
          }`}
          color={
            Platform.OS === "android"
              ? attendance?.data?.time_in
                ? "#FCFF58"
                : "#92C4FF"
              : Platform.OS === "ios" && !result?.time_out
              ? "#FCFF58"
              : "#92C4FF"
          }
          toggleOtherModal={toggleAttendanceReasonModal}
        />

        <SuccessModal
          isOpen={attendanceReasonSuccessIsOpen}
          toggle={toggleAttendanceReasonSuccess}
          type={requestType}
          title="Report submitted!"
          description="Your report is logged"
        />

        <SuccessModal
          isOpen={errorModalIsOpen}
          toggle={toggleErrorModal}
          type={requestType}
          title="Process error!"
          description="Please try again later"
        />
      </ActionSheet>

      <SuccessModal
        isOpen={newLeaveRequestModalIsOpen}
        toggle={toggleNewLeaveRequestModal}
        type={requestType}
        title="Request sent!"
        description="Please wait for approval"
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
