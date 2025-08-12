import { Text, View } from "react-native";
import FormButton from "../../../../styles/buttons/FormButton";
import Reason from "./shared/Reason";
import { Colors } from "../../../../styles/Color";
import { TextProps } from "../../../../styles/CustomStylings";
import { date } from "yup";

const ForgotClockOut = ({
  formik,
  value,
  handleChange,
  fieldName,
  disabled,
  approvalClockOut,
  isEditable,
}) => {
  return (
    <View style={{ gap: 10 }}>
      {date?.approvalClockOut ? (
        <Text style={[TextProps, { color: Colors.error }]}>
          {`Waiting for approval by ${approvalClockOut?.approval_by}`}
        </Text>
      ) : null}
      <Reason
        formik={formik}
        value={value}
        fieldName={fieldName}
        onChangeText={handleChange}
        title="Forgot to Clock Out Reason"
        isEditable={isEditable}
      />
      <FormButton
        isSubmitting={formik.isSubmitting}
        onPress={formik.handleSubmit}
        disabled={disabled}
      >
        <Text style={{ color: Colors.fontLight }}>Save</Text>
      </FormButton>
    </View>
  );
};

export default ForgotClockOut;
