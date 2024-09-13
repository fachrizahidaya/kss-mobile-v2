import { memo } from "react";

import { ActivityIndicator, Text, View } from "react-native";

import axiosInstance from "../../config/api";
import { useLoading } from "../../hooks/useLoading";
import Button from "../forms/Button";
import { TextProps } from "../CustomStylings";
import LateOrEarly from "../../components/Tribe/Attendance/FormType/LateOrEarly";
import CustomModal from "./CustomModal";

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
  timeOut,
  minimumDurationReached,
  forAttendance,
}) => {
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
      if (timeIn && timeOut) {
        formik.handleSubmit();
      }
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
    <CustomModal
      isOpen={isOpen}
      toggle={handleBackdropPress}
      handleAfterModalHide={handleAfterModalHide}
      hideModalContentWhileAnimating={true}
    >
      <View style={{ gap: 5 }}>
        {forAttendance ? (
          <Text style={[{ textAlign: "center", fontWeight: "700", fontSize: 16 }, TextProps]}>
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
          onPress={handleConfirm}
          startIcon={processIsLoading ? <ActivityIndicator /> : null}
          flex={1}
          padding={10}
          disabled={processIsLoading}
        >
          <Text style={{ color: "#FFFFFF" }}>{processIsLoading ? <ActivityIndicator /> : "Confirm"}</Text>
        </Button>
      </View>
    </CustomModal>
  );
};

export default memo(ConfirmationModal);
