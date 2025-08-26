import { Text, View } from "react-native";
import Select from "../../../styles/forms/Select";
import Input from "../../../styles/forms/Input";
import CustomTimePicker from "../../../styles/timepicker/CustomTimePicker";
import FormButton from "../../../styles/buttons/FormButton";
import { TextProps } from "../../../styles/CustomStylings";
import { Colors } from "../../../styles/Color";

const OvertimeForm = ({ formik, optionValue, overtimes, disabled }) => {
  return (
    <View style={{ gap: 10 }}>
      <Select
        title={"Overtime"}
        items={overtimes}
        formik={formik}
        value={optionValue}
        placeHolder={"Select overtime"}
        onChange={(value) => formik.setFieldValue("overtime", value)}
        fieldName="overtime"
      />
      <CustomTimePicker title="Begin Time" onChange={null} defaultValue={null} />
      <CustomTimePicker title="End Time" onChange={null} defaultValue={null} />
      <Input
        multiline
        formik={formik}
        title={"Reason for Overtime"}
        fieldName="reason"
        placeHolder={"Input reason"}
        value={formik.values.reason}
        editable={true}
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

export default OvertimeForm;
