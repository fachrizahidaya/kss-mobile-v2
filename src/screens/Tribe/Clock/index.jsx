<<<<<<< HEAD
<<<<<<< HEAD
import { useEffect, useRef, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useFormik } from "formik";
import dayjs from "dayjs";

import { Text, TouchableOpacity, View } from "react-native";

import Screen from "../../../layouts/Screen";
import MapLocation from "../../../components/Tribe/Clock/MapLocation";
import { useDisclosure } from "../../../hooks/useDisclosure";
import SelfieLocation from "../../../components/Tribe/Clock/SelfieLocation";
import PickImage from "../../../styles/buttons/PickImage";
import FormButton from "../../../styles/buttons/FormButton";
import { Colors } from "../../../styles/Color";
import { useFetch } from "../../../hooks/useFetch";
import ConfirmationModal from "../../../styles/modals/ConfirmationModal";

const Clock = () => {
  const [attachment, setAttachment] = useState(null);
  const [success, setSuccess] = useState(false);

  const navigation = useNavigation();
  const route = useRoute();
  const mapRef = useRef(null);
  const currentTime = dayjs().format("HH:mm");

  const {
    location,
    locationOn,
    locationPermission,
    toggleClockSuccess,
    setRequestType,
    setErrorMessage,
    attendance,
    result,
    minimumDurationReached,
    workDuration,
    setResult,
  } = route.params;
  const { data, refetch } = useFetch("/hr/timesheets/personal/attendance-today");

  const { isOpen: locationIsEmptyIsOpen, toggle: toggleLocationIsEmpty } =
    useDisclosure(false);
  const { isOpen: addImageModalIsOpen, toggle: toggleAddImageModal } =
    useDisclosure(false);
  const { isOpen: confirmationIsOpen, toggle: toggleConfirmation } = useDisclosure(false);

  /**
   * Handle for Early type
   */
  const earlyType = [
    { label: "Went Home Early", value: "Early" },
    { label: "Permit", value: "Permit" },
    { label: "Other", value: "Other" },
  ];

  const focusMap = () => {
    if (mapRef.current) {
      const INITIAL_LOCATION = {
        latitude: location?.latitude,
        longitude: location?.longitude,
        latitudeDelta: 0.0,
        longitudeDelta: 0.0,
      };

      mapRef.current.animateToRegion(INITIAL_LOCATION, 100);
    }
  };

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
=======
=======
import { useEffect, useState } from "react";
>>>>>>> bfa7e57c (fix: map)
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";

import { AppState, Platform } from "react-native";

import Screen from "../../../layouts/Screen";
import MapLocation from "../../../components/Tribe/Clock/MapLocation";
import { useDisclosure } from "../../../hooks/useDisclosure";

const Clock = () => {
  const [location, setLocation] = useState({});
  const [locationOn, setLocationOn] = useState(null);
  const [locationPermission, setLocationPermission] = useState(null);

  const { isOpen: locationIsEmptyIsOpen, toggle: toggleLocationIsEmpty } =
    useDisclosure(false);

  const navigation = useNavigation();
>>>>>>> 000b5e7c (feat: attendance location and selfie)

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

  const handleReturn = () => {
    navigation.goBack();
  };

<<<<<<< HEAD
<<<<<<< HEAD
  const handleSuccess = () => {
    refetch();
    navigation.goBack();
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={focusMap}>
          <View style={{ padding: 10 }}>
            <Text>Focus</Text>
          </View>
        </TouchableOpacity>
      ),
    });
  }, []);
=======
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
>>>>>>> bfa7e57c (fix: map)

  return (
    <Screen
      screenTitle={data?.data?.time_in ? "Clock Out" : "Clock In"}
      returnButton={true}
      onPress={handleReturn}
    >
      <MapLocation
        latitude={location?.latitude}
        longitude={location?.longitude}
        ref={mapRef}
        locationOn={locationOn}
        locationPermission={locationPermission}
      />

      <SelfieLocation
        toggle={toggleAddImageModal}
        handleAttachment={setAttachment}
        attachment={attachment}
      />
      <PickImage
        setImage={setAttachment}
        modalIsOpen={addImageModalIsOpen}
        toggleModal={toggleAddImageModal}
        useGallery={false}
      />
      <View style={{ marginHorizontal: 16, marginVertical: 14 }}>
        <FormButton
          onPress={toggleConfirmation}
          disabled={Object.keys(location).length === 0}
          isSubmitting={null}
        >
          <Text style={{ color: Colors.fontLight }}>Submit</Text>
        </FormButton>
      </View>

      <ConfirmationModal
        isOpen={confirmationIsOpen}
        toggle={toggleConfirmation}
        apiUrl={`/hr/timesheets/personal/attendance-check`}
        body={{
          longitude: location?.longitude,
          latitude: location?.latitude,
          check_from: "Mobile App",
        }}
        hasSuccessFunc={true}
        description={`
      Are you sure want to ${data?.data?.time_in ? "Clock-out" : "Clock-in"}?`}
        onSuccess={handleSuccess}
        toggleOtherModal={toggleClockSuccess}
        setSuccess={setSuccess}
        success={success}
        setResult={setResult}
        setRequestType={setRequestType}
        setError={setErrorMessage}
        isDelete={false}
        isGet={false}
        isPatch={false}
        formik={earlyReasonformik}
        clockInOrOutTitle="Clock-out Time"
        types={earlyType}
        timeInOrOut={dayjs(currentTime).format("HH:mm")}
        title="Early Type"
        lateOrEarlyInputValue={earlyReasonformik.values.early_reason}
        onOrOffDuty="Off Duty"
        timeDuty={attendance?.off_duty || result?.off_duty}
        lateOrEarly={result?.early}
        lateOrEarlyType="Select Early Type"
        fieldType="early_type"
        lateOrEarlyInputType={earlyReasonformik.values.early_type}
        fieldReason="early_reason"
        withoutSaveButton={true}
        withDuration={true}
        duration={workDuration}
        timeIn={attendance?.time_in || result?.time_in}
        timeOut={result?.time_out}
        minimumDurationReached={minimumDurationReached}
        forAttendance={true}
      />
    </Screen>
=======
  return (
<<<<<<< HEAD
    <Screen screenTitle={"Clock In"} returnButton={true} onPress={handleReturn}></Screen>
>>>>>>> 000b5e7c (feat: attendance location and selfie)
=======
    <Screen screenTitle={"Clock In"} returnButton={true} onPress={handleReturn}>
      <MapLocation latitude={location?.latitude} longitude={location?.longitude} />
    </Screen>
>>>>>>> 066d8525 (feat: map view)
  );
};

export default Clock;
