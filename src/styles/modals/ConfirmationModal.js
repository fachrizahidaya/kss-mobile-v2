import { memo } from "react";

import { ActivityIndicator, Dimensions, Platform, StyleSheet, Text, View } from "react-native";
import Modal from "react-native-modal";

import axiosInstance from "../../config/api";
import { useLoading } from "../../hooks/useLoading";
import Button from "../forms/Button";
import { TextProps } from "../CustomStylings";
import LateOrEarly from "../../components/Tribe/Attendance/FormType/LateOrEarly";

const ConfirmationModal = ({
  isOpen,
  toggle,
  apiUrl,
  hasSuccessFunc = false,
  onSuccess,
  description,
  body = {},
  isDelete = true,
  isPatch = false,
  isGet = false,
  toggleOtherModal,
  setResult,
  setError,
  setRequestType,
  success,
  setSuccess,
  clockOut,
  formik,
  clockInOrOutTitle,
  types,
  timeInOrOut,
  title,
  lateOrEarlyInputValue,
  onOrOffDuty,
  timeDuty,
  lateOrEarly,
  lateOrEarlyType,
  fieldType,
  lateOrEarlyInputType,
  fieldReason,
  withoutSaveButton,
  withDuration,
  duration,
  currentTime,
  timeIn,
  minimumDurationReached,
  forAttendance,
}) => {
  const deviceWidth = Dimensions.get("window").width;
  const deviceHeight =
    Platform.OS === "ios"
      ? Dimensions.get("window").height
      : require("react-native-extra-dimensions-android").get("REAL_WINDOW_HEIGHT");

  const { isLoading: processIsLoading, toggle: toggleProcess } = useLoading(false);

  const handleAfterModalHide = () => {
    if (success) {
      toggleOtherModal();
    }
  };

  const handleBackdropPress = () => {
    if (!processIsLoading) {
      toggle();
    }
  };

  const handleCancel = () => {
    if (!processIsLoading) {
      if (setSuccess) {
        setSuccess(false);
      }
      toggle();
    }
  };

  const handleConfirm = () => {
    if (setSuccess) {
      setSuccess(true);
      handlePress();
    }
  };

  const handleConfirmClockOut = () => {
    if (setSuccess) {
      setSuccess(true);
      handlePress();
      formik.handleSubmit();
    }
  };

  const handlePress = async () => {
    try {
      toggleProcess();
      if (isDelete) {
        const res = await axiosInstance.delete(apiUrl);
        if (setResult) {
          setResult(res.data?.data);
        }
        if (setRequestType) {
          setRequestType("remove");
        }
      } else if (isPatch) {
        const res = await axiosInstance.patch(apiUrl);
        if (setResult) {
          setResult(res.data?.data);
        }
        if (setRequestType) {
          setRequestType("patch");
        }
      } else if (isGet) {
        const res = await axiosInstance.get(apiUrl);
        if (setResult) {
          setResult(res.data?.data);
        }
        if (setRequestType) {
          setRequestType("fetch");
        }
      } else {
        const res = await axiosInstance.post(apiUrl, body);
        if (setResult) {
          setResult(res.data?.data);
        }
        if (setRequestType) {
          setRequestType("post");
        }
      }
      toggle();
      toggleProcess();

      // If hasSuccessFunc passed then run the available onSuccess function
      if (hasSuccessFunc) {
        onSuccess();
      }
    } catch (error) {
      console.log(error);
      if (setRequestType) {
        setRequestType("error");
      }
      if (setError) {
        setError(error.response.data.message);
      }
      toggleProcess();
    }
  };

  return (
    <Modal
      isVisible={isOpen}
      onBackdropPress={handleBackdropPress}
      deviceHeight={deviceHeight}
      deviceWidth={deviceWidth}
      hideModalContentWhileAnimating={true}
      useNativeDriver={true}
      onModalHide={handleAfterModalHide}
    >
      <View style={styles.container}>
        <View style={{ alignItems: "center" }}>
          {forAttendance ? (
            <Text style={[{ textAlign: "center", fontWeight: "700" }, TextProps]}>
              {timeIn ? "Clock-out" : "Clock-in"}
            </Text>
          ) : null}
          <Text style={[{ textAlign: "center" }, TextProps]}>{description}</Text>
        </View>

        {timeIn && (
          <LateOrEarly
            formik={formik}
            titleTime={clockInOrOutTitle}
            arrayList={types}
            time={timeInOrOut}
            title={title}
            inputValue={lateOrEarlyInputValue}
            inputOnChangeText={(value) => formik.setFieldValue(fieldReason, value)}
            selectOnValueChange={(value) => formik.setFieldValue(fieldType, value)}
            titleDuty={onOrOffDuty}
            timeDuty={timeDuty}
            timeLateOrEarly={lateOrEarly}
            placeholder={lateOrEarlyType}
            fieldOption={fieldType}
            inputType={lateOrEarlyInputType}
            notApplyDisable={true}
            withoutSaveButton={withoutSaveButton}
            withDuration={withDuration}
            duration={duration}
            currentTime={currentTime}
            minimumDurationReached={minimumDurationReached}
          />
        )}

        <View style={{ flexDirection: "row", gap: 5 }}>
          <Button
            disabled={processIsLoading}
            onPress={handleCancel}
            flex={1}
            variant="outline"
            backgroundColor="#FD7972"
            padding={10}
          >
            <Text style={{ color: "#FD7972" }}>Cancel</Text>
          </Button>

          <Button
            bgColor={processIsLoading ? "coolGray.500" : "red.600"}
            onPress={timeIn && forAttendance ? handleConfirmClockOut : handleConfirm}
            startIcon={processIsLoading ? <ActivityIndicator /> : null}
            flex={1}
            padding={10}
          >
            <Text style={{ color: "#FFFFFF" }}>{processIsLoading ? <ActivityIndicator /> : "Confirm"}</Text>
          </Button>
        </View>
      </View>
    </Modal>
  );
};

export default memo(ConfirmationModal);

const styles = StyleSheet.create({
  container: {
    gap: 10,
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 10,
  },
  image: {
    height: 150,
    width: 150,
    resizeMode: "contain",
  },
});
