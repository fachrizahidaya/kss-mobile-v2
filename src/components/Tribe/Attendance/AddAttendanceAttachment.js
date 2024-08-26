import { useEffect } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import dayjs from "dayjs";

import { View, StyleSheet, TouchableWithoutFeedback, Keyboard } from "react-native";
import ActionSheet from "react-native-actions-sheet";

import AlertModal from "../../../styles/modals/AlertModal";
import AddAttendanceAttachmentForm from "./AddAttendanceAttachmentForm";

const AddAttendanceAttachment = ({
  handleSelectFile,
  fileAttachment,
  setFileAttachment,
  handleSubmit,
  reference,
  month,
  isOpen,
  toggle,
  requestType,
  error,
  toggleAlert,
  setError,
  setRequestType,
}) => {
  /**
   * Handle create attendance attachment
   */
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: "",
      begin_date: dayjs().format("YYYY-MM-DD") || "",
      end_date: dayjs().format("YYYY-MM-DD") || "",
      attachment: fileAttachment?.name || "",
    },
    validationSchema: yup.object().shape({
      begin_date: yup.date().required("Start date is required"),
      end_date: yup
        .date()
        .required("End date is required")
        .min(yup.ref("begin_date"), "End date can't be less than start date"),
    }),
    onSubmit: (values, { setSubmitting, setStatus }) => {
      setStatus("processing");
      const formData = new FormData();
      for (let key in values) {
        formData.append(key, values[key]);
      }
      handleSubmit(formData, setSubmitting, setStatus);
    },
  });

  /**
   * Handle begin date for attachment
   * @param {*} value
   */
  const onChangeStartDate = (value) => {
    formik.setFieldValue("begin_date", value);
  };

  /**
   * Handle end date for attachment
   * @param {*} value
   */
  const onChangeEndDate = (value) => {
    formik.setFieldValue("end_date", value);
  };

  const handleClose = () => {
    formik.resetForm();
    setFileAttachment(null);
    reference.current?.hide();
  };

  useEffect(() => {
    if (!formik.isSubmitting && formik.status === "success") {
      formik.resetForm();
      setFileAttachment(null);
    }
  }, [formik.isSubmitting, formik.status]);

  useEffect(() => {
    formik.setFieldValue("attachment", fileAttachment ? fileAttachment : "");
  }, [fileAttachment]);

  return (
    <ActionSheet ref={reference} onClose={handleClose}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.wrapper}>
          <AddAttendanceAttachmentForm
            formik={formik}
            onChangeStartDate={onChangeStartDate}
            onChangeEndDate={onChangeEndDate}
            month={month}
            onSelectFile={handleSelectFile}
            fileAttachment={fileAttachment}
            setFileAttachment={setFileAttachment}
            setRequestType={setRequestType}
            setError={setError}
            toggleAlert={toggleAlert}
          />
        </View>
      </TouchableWithoutFeedback>
      <AlertModal
        isOpen={isOpen}
        toggle={toggle}
        type={requestType === "post" ? "info" : "danger"}
        title={requestType === "post" ? "Report submitted!" : "Process error!"}
        description={requestType === "post" ? "Your report is logged" : error || "Please try again later"}
      />
    </ActionSheet>
  );
};

export default AddAttendanceAttachment;

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: 40,
  },
});
