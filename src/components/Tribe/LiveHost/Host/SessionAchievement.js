import { Text } from "react-native";

import CustomSheet from "../../../../layouts/CustomSheet";
import FormButton from "../../../../styles/buttons/FormButton";
import Input from "../../../../styles/forms/Input";
import { Colors } from "../../../../styles/Color";
import AlertModal from "../../../../styles/modals/AlertModal";

const SessionAchievement = ({
  reference,
  isLoading,
  formik,
  achievementString,
  toggleAlert,
  alertIsOpen,
  requestType,
  error,
}) => {
  return (
    <CustomSheet reference={reference}>
      <Input
        formik={formik}
        fieldName="actual_achievement"
        title="Achievement"
        placeHolder="Input achievement"
        value={formik.values.actual_achievement}
        keyboardType="numeric"
        onChangeText={(value) =>
          formik.setFieldValue("actual_achievement", value)
        }
        currencyInput={true}
      />
      <FormButton
        disabled={achievementString === formik.values.actual_achievement}
        onPress={formik.handleSubmit}
        isSubmitting={isLoading}
      >
        <Text style={{ color: Colors.fontLight }}>Submit</Text>
      </FormButton>
      <AlertModal
        toggle={toggleAlert}
        isOpen={alertIsOpen}
        type={requestType === "post" ? "info" : "danger"}
        title={
          requestType === "post" ? "Achievement updated!" : "Process error!"
        }
        description={
          requestType === "post"
            ? "Keep it up!"
            : error || "Please try again later"
        }
      />
    </CustomSheet>
  );
};

export default SessionAchievement;
