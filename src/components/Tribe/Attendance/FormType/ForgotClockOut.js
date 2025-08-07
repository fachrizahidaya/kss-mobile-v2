import { Text, View } from "react-native";
import FormButton from "../../../../styles/buttons/FormButton";
import Reason from "./shared/Reason";
import { Colors } from "../../../../styles/Color";

const ForgotClockOut = ({ formik, value, handleChange, fieldName, disabled }) => {
  return (
    <View style={{ gap: 10 }}>
      <Reason
        formik={formik}
        value={value}
        fieldName={fieldName}
        onChangeText={handleChange}
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
