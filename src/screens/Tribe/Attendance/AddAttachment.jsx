import { useEffect, useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { useNavigation, useRoute } from "@react-navigation/native";
import dayjs from "dayjs";

import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import Screen from "../../../layouts/Screen";
import { Colors } from "../../../styles/Color";
import AddAttendanceAttachmentForm from "../../../components/Tribe/Attendance/AddAttendanceAttachmentForm";
import PickImage from "../../../styles/buttons/PickImage";
import { useDisclosure } from "../../../hooks/useDisclosure";
import ReturnConfirmationModal from "../../../styles/modals/ReturnConfirmationModal";
import axiosInstance from "../../../config/api";
import AlertModal from "../../../styles/modals/AlertModal";

const AddAttachment = () => {
  const [attachment, setAttachment] = useState(null);
  const [request, setRequest] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [unattendanceDate, setUnattendanceDate] = useState(null);

  const route = useRoute();
  const navigation = useNavigation();

  const { toggle, setRequestType, setError } = route.params;

  const { toggle: togglePickImage, isOpen: pickImageIsOpen } = useDisclosure(false);
  const { toggle: toggleReturn, isOpen: returnIsOpen } = useDisclosure(false);
  const { toggle: toggleError, isOpen: errorIsOpen } = useDisclosure(false);

  const handleSubmitAttachment = async (data, setSubmitting, setStatus) => {
    try {
      await axiosInstance.post(`/hr/timesheets/personal/attachments`, data, {
        headers: { "content-type": "multipart/form-data" },
      });
      setRequestType("post");
      setStatus("success");
      setSubmitting(false);
    } catch (err) {
      console.log(err);
      setRequest("error");
      setErrorMessage(err.response.data.message);
      toggleError();
      setStatus("error");
      setSubmitting(false);
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: "",
      begin_date: dayjs().format("YYYY-MM-DD") || "",
      end_date: dayjs().format("YYYY-MM-DD") || "",
      attachment: "",
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
      handleSubmitAttachment(formData, setSubmitting, setStatus);
    },
  });

  /**
   * Handle begin date for attachment
   * @param {*} value
   */
  const handleChangeStartDate = (value) => {
    if (unattendanceDate) {
      formik.setFieldValue("begin_date", unattendanceDate);
    } else {
      formik.setFieldValue("begin_date", value);
    }
  };

  /**
   * Handle end date for attachment
   * @param {*} value
   */
  const handleChangeEndDate = (value) => {
    formik.setFieldValue("end_date", value);
  };

  const handleReturn = () => {
    if (formik.values.attachment || attachment !== null) {
      if (!formik.isSubmitting && formik.status !== "processing") {
        toggleReturn();
      }
    } else {
      if (!formik.isSubmitting && formik.status !== "processing") {
        navigation.goBack();
      }
      formik.resetForm();
      setAttachment(null);
    }
  };

  const handleReturnConfirmation = () => {
    toggleReturn();
    navigation.goBack();
    setAttachment(null);
  };

  useEffect(() => {
    formik.setFieldValue("end_date", formik.values.begin_date);
  }, [formik.values.begin_date]);

  useEffect(() => {
    if (!formik.isSubmitting && formik.status === "success") {
      formik.resetForm();
      setAttachment(null);
      toggle();
      navigation.goBack();
      //   refetchAttachment();
      //   refetchSickAttachment();
    }
  }, [formik.isSubmitting, formik.status]);

  useEffect(() => {
    formik.setFieldValue("attachment", attachment ? attachment : "");
  }, [attachment]);

  return (
    <TouchableWithoutFeedback>
      <Screen
        screenTitle="Add Attachment"
        returnButton={true}
        onPress={handleReturn}
        backgroundColor={Colors.secondary}
      >
        <View style={styles.container}>
          <AddAttendanceAttachmentForm
            formik={formik}
            onChangeStartDate={handleChangeStartDate}
            onChangeEndDate={handleChangeEndDate}
            onSelectFile={null}
            fileAttachment={attachment}
            setFileAttachment={setAttachment}
            setRequestType={setRequestType}
            setError={setError}
            toggleAlert={toggle}
            toggleImage={togglePickImage}
          />
        </View>
        <PickImage
          setImage={setAttachment}
          modalIsOpen={pickImageIsOpen}
          toggleModal={togglePickImage}
        />
        <ReturnConfirmationModal
          isOpen={returnIsOpen}
          toggle={toggleReturn}
          onPress={handleReturnConfirmation}
          description="Are you sure want to exit? It will be deleted."
        />
        <AlertModal
          isOpen={errorIsOpen}
          toggle={toggleError}
          type={request}
          title={"Process error!"}
          description={errorMessage || "Please try again later"}
        />
      </Screen>
    </TouchableWithoutFeedback>
  );
};

export default AddAttachment;

const styles = StyleSheet.create({
  container: {
    marginVertical: 14,
    marginHorizontal: 16,
    gap: 10,
  },
});
