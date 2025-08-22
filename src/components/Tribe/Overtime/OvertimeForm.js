import { View } from "react-native";
import Select from "../../../styles/forms/Select";
import Input from "../../../styles/forms/Input";
import CustomTimePicker from "../../../styles/timepicker/CustomTimePicker";

const OvertimeForm = ({ formik, optionValue, overtimes }) => {
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
      <Input
        multiline
        formik={formik}
        title={"Reason for Overtime"}
        fieldName="reason"
        placeHolder={"Input reason"}
        value={formik.values.reason}
        editable={true}
      />
      <CustomTimePicker title="Begin Time" onChange={null} defaultValue={null} />
      <CustomTimePicker title="End Time" onChange={null} defaultValue={null} />
    </View>
  );
};

export default OvertimeForm;
