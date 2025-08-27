<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import { useEffect, useRef, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
<<<<<<< HEAD
<<<<<<< HEAD
=======
import { useEffect, useRef, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
>>>>>>> 859eea89 (first commit)
=======
import { useEffect, useRef, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
>>>>>>> c3ae17e7 (new branch)
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
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
import { useEffect, useState } from "react";
>>>>>>> bfa7e57c (fix: map)
=======
import { useEffect, useRef, useState } from "react";
>>>>>>> ed94efae (fix: map location for ios)
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
=======
>>>>>>> 3a5fb5d5 (fix: location status)
=======
import { useFormik } from "formik";
import dayjs from "dayjs";
>>>>>>> 16ba8713 (feat: submit attendance with location and selfie)

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

<<<<<<< HEAD
<<<<<<< HEAD
  const navigation = useNavigation();
>>>>>>> 000b5e7c (feat: attendance location and selfie)
=======
=======
  /**
   * Handle for Early type
   */
  const earlyType = [
    { label: "Went Home Early", value: "Went Home Early" },
    { label: "Permit", value: "Permit" },
    { label: "Other", value: "Other" },
  ];

>>>>>>> 16ba8713 (feat: submit attendance with location and selfie)
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
>>>>>>> ed94efae (fix: map location for ios)

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
>>>>>>> 859eea89 (first commit)
=======
>>>>>>> c3ae17e7 (new branch)

  const handleReturn = () => {
    navigation.goBack();
  };

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  const handleSuccess = () => {
=======
  const handleSubmit = () => {
>>>>>>> ba143aea (fix: attendance map location, qr generate)
=======
  const handleSuccess = () => {
>>>>>>> 16ba8713 (feat: submit attendance with location and selfie)
=======
  const handleSuccess = () => {
>>>>>>> 859eea89 (first commit)
=======
  const handleSuccess = () => {
>>>>>>> c3ae17e7 (new branch)
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
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
  const handleSubmit = () => {
    toggleSubmissionSuccess();
    navigation.goBack();
  };

>>>>>>> 84ce2474 (fix: selfie location)
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

<<<<<<< HEAD
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

=======
>>>>>>> 3a5fb5d5 (fix: location status)
  return (
    <Screen
<<<<<<< HEAD
<<<<<<< HEAD
=======

  return (
    <Screen
>>>>>>> 859eea89 (first commit)
=======

  return (
    <Screen
>>>>>>> c3ae17e7 (new branch)
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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 859eea89 (first commit)
=======
>>>>>>> c3ae17e7 (new branch)
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
<<<<<<< HEAD
<<<<<<< HEAD
=======
  return (
<<<<<<< HEAD
    <Screen screenTitle={"Clock In"} returnButton={true} onPress={handleReturn}></Screen>
>>>>>>> 000b5e7c (feat: attendance location and selfie)
=======
    <Screen screenTitle={"Clock In"} returnButton={true} onPress={handleReturn}>
=======
      screenTitle={attendance?.data?.time_in ? "Clock Out" : "Clock In"}
=======
      screenTitle={data?.data?.time_in ? "Clock Out" : "Clock In"}
>>>>>>> ba143aea (fix: attendance map location, qr generate)
      returnButton={true}
      onPress={handleReturn}
    >
>>>>>>> 9d6a7cd4 (fix: dashboard tribe, coin)
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
        <FormButton onPress={toggleConfirmation} disabled={null} isSubmitting={null}>
=======
>>>>>>> 16ba8713 (feat: submit attendance with location and selfie)
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
>>>>>>> 066d8525 (feat: map view)
=======
>>>>>>> 859eea89 (first commit)
=======
>>>>>>> c3ae17e7 (new branch)
  );
};

export default Clock;
