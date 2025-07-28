import { memo } from "react";

import { ActivityIndicator, Text, View } from "react-native";

import axiosInstance from "../../config/api";
import { useLoading } from "../../hooks/useLoading";
import Button from "../forms/Button";
import { TextProps } from "../CustomStylings";
import LateOrEarly from "../../components/Tribe/Attendance/FormType/LateOrEarly";
import CustomModal from "./CustomModal";
import { deleteAttend, deleteGoHome, insertAttend, insertGoHome } from "../../config/db";
import { Colors } from "../Color";
import FormButton from "../buttons/FormButton";

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

  var renderDisabled;

  if (!lateOrEarlyInputType) {
    renderDisabled = false;
  } else if (lateOrEarlyInputType !== "Went Home Early") {
    renderDisabled = true;
  }

  const handleAfterModalHide = () => {
    if (success) {
      toggleOtherModal();
    } else {
      return;
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

      if (timeIn && !minimumDurationReached) {
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
        toggle();
      } else if (isPatch) {
        const res = await axiosInstance.patch(apiUrl);
        if (setResult) {
          setResult(res.data?.data);
        }
        if (setRequestType) {
          setRequestType("patch");
        }
        toggle();
      } else if (isGet) {
        const res = await axiosInstance.get(apiUrl);
        if (setResult) {
          setResult(res.data?.data);
        }
        if (setRequestType) {
          setRequestType("fetch");
        }
        toggle();
      } else if (!apiUrl) {
        toggle();
      } else {
        const res = await axiosInstance.post(apiUrl, body);
        if (setResult) {
          setResult(res.data?.data);
        }

        if (res.data?.data?.time_in && !res.data?.data?.time_out) {
          await insertAttend(res.data?.data?.time_in);
          await deleteGoHome();
        } else if (res.data?.data?.time_in && res.data?.data?.time_out) {
          await insertGoHome(res.data?.data?.time_out);
          await deleteAttend();
        }

        if (setRequestType) {
          setRequestType("post");
        }
        toggle();
      }
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
          <Text
            style={[{ textAlign: "center", fontWeight: "700", fontSize: 16 }, TextProps]}
          >
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
          height={45}
        >
          <Text style={TextProps}>Cancel</Text>
        </Button>

        <FormButton
          height={45}
          onPress={handleConfirm}
          flex={1}
          disabled={renderDisabled}
          isSubmitting={processIsLoading}
        >
          <Text style={{ color: Colors.fontLight }}>Confirm</Text>
        </FormButton>
      </View>
    </CustomModal>
  );
};

export default memo(ConfirmationModal);
