import { memo, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

import { Text, View } from "react-native";

import CustomDateTimePicker from "../../../../../styles/timepicker/CustomDateTimePicker";
import axiosInstance from "../../../../../config/api";
import { useLoading } from "../../../../../hooks/useLoading";
import { TextProps } from "../../../../../styles/CustomStylings";
import { useDisclosure } from "../../../../../hooks/useDisclosure";
import AlertModal from "../../../../../styles/modals/AlertModal";

const DeadlineSection = ({ deadline, projectDeadline, disabled, taskId }) => {
  const [errorMessage, setErrorMessage] = useState(null);

  const { isOpen, toggle } = useDisclosure(false);
  const { isLoading, start, stop } = useLoading(false);

  /**
   * Handles change of task deadline
   * @param {Date} newDeadline - New task deadline to be submitted
   */
  const changeTaskDeadline = async (newDeadline) => {
    try {
      start();
      await axiosInstance.patch(`/pm/tasks/${taskId}`, newDeadline);
      stop();
    } catch (error) {
      console.log(error);
      setErrorMessage(error.response.data.message);
      toggle();
      stop();
    }
  };

  const formik = useFormik({
    initialValues: {
      deadline: deadline,
    },
    validationSchema: yup.object().shape({
      deadline: yup.date().required("Task deadline is required"),
    }),
    onSubmit: (values) => {
      changeTaskDeadline(values);
    },
  });

  const onChangeDeadline = (value) => {
    formik.setFieldValue("deadline", value);
    formik.handleSubmit();
  };

  const maxDate = projectDeadline?.split(" ")[0];

  return (
    <>
      <View style={{ gap: 10 }}>
        <Text style={[{ fontWeight: "500" }, TextProps]}>DUE DATE</Text>
        <CustomDateTimePicker
          defaultValue={deadline}
          disabled={disabled || isLoading}
          onChange={onChangeDeadline}
          maximumDate={maxDate}
        />
      </View>
      <AlertModal
        isOpen={isOpen}
        toggle={toggle}
        title={"Process error!"}
        type={"danger"}
        description={errorMessage || "Please try again later"}
      />
    </>
  );
};

export default memo(DeadlineSection);
