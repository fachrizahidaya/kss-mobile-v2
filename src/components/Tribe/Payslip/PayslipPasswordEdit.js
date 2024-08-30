import { useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

import { View, Text, TouchableWithoutFeedback, Keyboard, StyleSheet } from "react-native";
import ActionSheet from "react-native-actions-sheet";

import FormButton from "../../../styles/FormButton";
import Input from "../../../styles/forms/Input";
import AlertModal from "../../../styles/modals/AlertModal";

const PayslipPasswordEdit = ({
  hideNewPassword,
  setHideNewPassword,
  hideOldPassword,
  setHideOldPassword,
  hideConfirmPassword,
  setHideConfirmPassword,
  handleUpdatePassword,
  reference,
  isOpen,
  toggle,
  requestType,
  errorMessage,
}) => {
  const handleClose = () => {
    formik.resetForm();
    reference.current?.hide();
  };

  const handleHidePassword = (hide, setHide) => {
    setHide(!hide);
  };

  /**
   * Handle change password
   */
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      old_password: "",
      new_password: "",
      confirm_password: "",
    },
    validationSchema: yup.object().shape({
      old_password: yup.string().required("Old Password is required"),
      new_password: yup.string().required("New Password is required"),
      confirm_password: yup
        .string()
        .oneOf([yup.ref("new_password"), null], "Password doesn't match")
        .required("Confirm Password is required"),
    }),
    onSubmit: (values, { setSubmitting, setStatus }) => {
      setStatus("processing");
      handleUpdatePassword(values, setSubmitting, setStatus);
    },
  });

  useEffect(() => {
    if (!formik.isSubmitting && formik.status === "success") {
      formik.resetForm();
    }
  }, [formik.isSubmitting, formik.status]);

  return (
    <ActionSheet ref={reference} onClose={handleClose}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.wrapper}>
          <View style={{ gap: 5 }}>
            <Input
              formik={formik}
              title="Old Password"
              fieldName="old_password"
              value={formik.values.old_password}
              placeHolder="Input old password"
              secureTextEntry={hideOldPassword}
              endIcon={hideOldPassword ? "eye-outline" : "eye-off-outline"}
              onPressEndIcon={() => handleHidePassword(hideOldPassword, setHideOldPassword)}
            />
          </View>

          <View style={{ gap: 5 }}>
            <Input
              formik={formik}
              title="New Password"
              fieldName="new_password"
              value={formik.values.new_password}
              placeHolder="Input new password"
              secureTextEntry={hideNewPassword}
              endIcon={hideNewPassword ? "eye-outline" : "eye-off-outline"}
              onPressEndIcon={() => handleHidePassword(hideNewPassword, setHideNewPassword)}
            />
          </View>

          <View style={{ gap: 5 }}>
            <Input
              formik={formik}
              title="Confirm New Password"
              fieldName="confirm_password"
              value={formik.values.confirm_password}
              placeHolder="Confirm new password"
              secureTextEntry={hideConfirmPassword}
              endIcon={hideConfirmPassword ? "eye-outline" : "eye-off-outline"}
              onPressEndIcon={() => handleHidePassword(hideConfirmPassword, setHideConfirmPassword)}
            />
          </View>
          {formik.values.old_password && formik.values.new_password && formik.values.confirm_password ? (
            <FormButton isSubmitting={formik.isSubmitting} onPress={formik.handleSubmit}>
              <Text style={{ color: "#FFFFFF" }}>Submit</Text>
            </FormButton>
          ) : (
            <FormButton opacity={0.5}>
              <Text style={{ color: "#FFFFFF" }}>Submit</Text>
            </FormButton>
          )}
        </View>
      </TouchableWithoutFeedback>
      <AlertModal
        isOpen={isOpen}
        toggle={toggle}
        type={requestType === "patch" ? "success" : "danger"}
        title={requestType === "patch" ? "Changes saved!" : "Process error!"}
        description={requestType === "patch" ? "Data successfully saved" : errorMessage || "Please try again later"}
      />
    </ActionSheet>
  );
};

export default PayslipPasswordEdit;

const styles = StyleSheet.create({
  wrapper: {
    gap: 21,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
});
