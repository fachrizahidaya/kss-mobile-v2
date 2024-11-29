import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

import { Keyboard, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";

import FormButton from "../../../styles/buttons/FormButton";
import Input from "../../../styles/forms/Input";
import AlertModal from "../../../styles/modals/AlertModal";
import CustomSheet from "../../../layouts/CustomSheet";
import { Colors } from "../../../styles/Color";

const PayslipDownload = ({ reference, toggleDownloadDialog, handleDownloadPayslip, isOpen, toggle, error }) => {
  const [hidePassword, setHidePassword] = useState(true);

  const handleHidePassword = (hide, setHide) => {
    setHide(!hide);
  };

  /**
   * Handle input password payslip
   */
  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validationSchema: yup.object().shape({
      password: yup.string().required("Password is required"),
    }),
    onSubmit: (values, { setSubmitting, setStatus }) => {
      setStatus("processing");
      handleDownloadPayslip(values, setSubmitting, setStatus);
    },
  });

  const handleClose = () => {
    formik.resetForm();
    toggleDownloadDialog();
  };

  useEffect(() => {
    if (!formik.isSubmitting && formik.status === "success") {
      formik.resetForm();
    }
  }, [formik.isSubmitting, formik.status]);

  return (
    <CustomSheet reference={reference} handleClose={handleClose}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Input
          formik={formik}
          title="Password"
          fieldName="password"
          value={formik.values.password}
          placeHolder="Input your password"
          secureTextEntry={hidePassword}
          endIcon={hidePassword ? "eye-outline" : "eye-off-outline"}
          onPressEndIcon={() => handleHidePassword(hidePassword, setHidePassword)}
        />

        <FormButton
          disabled={!formik.values.password || formik.isSubmitting}
          isSubmitting={formik.isSubmitting}
          onPress={formik.handleSubmit}
        >
          <Text style={{ color: Colors.fontLight }}>Download</Text>
        </FormButton>
      </TouchableWithoutFeedback>

      <AlertModal
        isOpen={isOpen}
        toggle={toggle}
        type="danger"
        title="Process error!"
        description={error || "Please try again later"}
      />
    </CustomSheet>
  );
};

export default PayslipDownload;

const styles = StyleSheet.create({
  wrapper: {
    gap: 21,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
});
