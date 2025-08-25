import { Text, View } from "react-native";
import Select from "../../../styles/forms/Select";
import FormButton from "../../../styles/buttons/FormButton";
import { TextProps } from "../../../styles/CustomStylings";
import { Colors } from "../../../styles/Color";

const ShiftForm = ({ shifts, formik, optionValue, disabled }) => {
  return (
    <View style={{ gap: 10 }}>
      <Select
        title={"Shift"}
        items={shifts}
        formik={formik}
        value={optionValue}
        placeHolder={"Select shift"}
        onChange={(value) => formik.setFieldValue("shift", value)}
        fieldName="shift"
      />

      <FormButton
        isSubmitting={formik.isSubmitting}
        disabled={disabled}
        onPress={formik.handleSubmit}
      >
        <Text style={[TextProps, { color: Colors.fontLight }]}>Submit</Text>
      </FormButton>
    </View>
  );
};

export default ShiftForm;
