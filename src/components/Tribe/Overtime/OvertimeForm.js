<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 859eea89 (first commit)
=======
>>>>>>> c3ae17e7 (new branch)
import { Text, View } from "react-native";
import Select from "../../../styles/forms/Select";
import Input from "../../../styles/forms/Input";
import CustomTimePicker from "../../../styles/timepicker/CustomTimePicker";
import FormButton from "../../../styles/buttons/FormButton";
import { TextProps } from "../../../styles/CustomStylings";
import { Colors } from "../../../styles/Color";

const OvertimeForm = ({ formik, optionValue, overtimes, disabled }) => {
<<<<<<< HEAD
<<<<<<< HEAD
=======
import { View } from "react-native";
=======
import { Text, View } from "react-native";
>>>>>>> 231aa398 (fix: overtime form)
import Select from "../../../styles/forms/Select";
import Input from "../../../styles/forms/Input";
import CustomTimePicker from "../../../styles/timepicker/CustomTimePicker";
import FormButton from "../../../styles/buttons/FormButton";
import { TextProps } from "../../../styles/CustomStylings";
import { Colors } from "../../../styles/Color";

<<<<<<< HEAD
const OvertimeForm = ({ formik, optionValue, overtimes }) => {
>>>>>>> 4ec5fbc8 (feat: overtime form)
=======
const OvertimeForm = ({ formik, optionValue, overtimes, disabled }) => {
>>>>>>> 231aa398 (fix: overtime form)
=======
>>>>>>> 859eea89 (first commit)
=======
>>>>>>> c3ae17e7 (new branch)
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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
      <CustomTimePicker title="Begin Time" onChange={null} defaultValue={null} />
      <CustomTimePicker title="End Time" onChange={null} defaultValue={null} />
=======
>>>>>>> 4ec5fbc8 (feat: overtime form)
=======
      <CustomTimePicker title="Begin Time" onChange={null} defaultValue={null} />
      <CustomTimePicker title="End Time" onChange={null} defaultValue={null} />
>>>>>>> 231aa398 (fix: overtime form)
=======
      <CustomTimePicker title="Begin Time" onChange={null} defaultValue={null} />
      <CustomTimePicker title="End Time" onChange={null} defaultValue={null} />
>>>>>>> 859eea89 (first commit)
=======
      <CustomTimePicker title="Begin Time" onChange={null} defaultValue={null} />
      <CustomTimePicker title="End Time" onChange={null} defaultValue={null} />
>>>>>>> c3ae17e7 (new branch)
      <Input
        multiline
        formik={formik}
        title={"Reason for Overtime"}
        fieldName="reason"
        placeHolder={"Input reason"}
        value={formik.values.reason}
        editable={true}
      />
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 231aa398 (fix: overtime form)
=======
>>>>>>> 859eea89 (first commit)
=======
>>>>>>> c3ae17e7 (new branch)
      <FormButton
        isSubmitting={formik.isSubmitting}
        disabled={disabled}
        onPress={formik.handleSubmit}
      >
        <Text style={[TextProps, { color: Colors.fontLight }]}>Submit</Text>
      </FormButton>
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
      <CustomTimePicker title="Begin Time" onChange={null} defaultValue={null} />
      <CustomTimePicker title="End Time" onChange={null} defaultValue={null} />
>>>>>>> 4ec5fbc8 (feat: overtime form)
=======
>>>>>>> 231aa398 (fix: overtime form)
=======
>>>>>>> 859eea89 (first commit)
=======
>>>>>>> c3ae17e7 (new branch)
    </View>
  );
};

export default OvertimeForm;
