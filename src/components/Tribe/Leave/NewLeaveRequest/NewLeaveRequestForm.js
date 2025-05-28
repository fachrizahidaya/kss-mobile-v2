import { View, Text, ActivityIndicator } from "react-native";

import Input from "../../../../styles/forms/Input";
import CustomDateTimePicker from "../../../../styles/timepicker/CustomDateTimePicker";
import FormButton from "../../../../styles/buttons/FormButton";
import { TextProps } from "../../../../styles/CustomStylings";
import SelectWithSearch from "../../../../styles/forms/SelectWithSearch";
import { Colors } from "../../../../styles/Color";

const NewLeaveRequestForm = ({
  leaveType,
  formik,
  onChangeStartDate,
  onChangeEndDate,
  isLoading,
  reference,
  handleSearch,
  inputToShow,
  setInputToShow,
  setSearchInput,
  availableLeaves,
}) => {
  const disabled =
    !formik.values.leave_id ||
    !formik.values.reason ||
    !formik.values.begin_date ||
    !formik.values.end_date ||
    processIsLoading ||
    isError ||
    startDateMore ||
    formik.errors.reason;

  const handleChange = (value) => formik.setFieldValue("leave_id", value);

  return (
    availableLeaves && (
      <View style={{ gap: 10 }}>
        <SelectWithSearch
          reference={reference}
          placeHolder="Select leave type"
          title="Type"
          items={leaveType}
          formik={formik}
          value={formik.values.leave_id}
          fieldName="leave_id"
          onChange={handleChange}
          key="leave_id"
          inputToShow={inputToShow}
          setInputToShow={setInputToShow}
          setSearchInput={setSearchInput}
          fieldNameSearch="search"
          handleSearch={handleSearch}
        />

        <Input
          multiline
          formik={formik}
          title="Purpose of Leaving"
          fieldName="reason"
          placeHolder="Input reason"
          value={formik.values.reason}
          editable={!formik.values.leave_id ? false : true}
        />

        <CustomDateTimePicker
          defaultValue={formik.values.begin_date}
          onChange={onChangeStartDate}
          disabled={!formik.values.leave_id}
          unlimitStartDate={true}
          title="Begin Date"
        />
        <Text style={{ color: Colors.errorToast }}>{formik.errors.begin_date}</Text>
        <CustomDateTimePicker
          defaultValue={formik.values.end_date}
          onChange={onChangeEndDate}
          disabled={!formik.values.leave_id}
          title="End Date"
          minimumDate={formik.values.begin_date}
          unlimitStartDate={true}
        />
        <Text style={{ color: Colors.errorToast }}>{formik.errors.end_date}</Text>

        {isLoading ? (
          <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
            <ActivityIndicator />
            <Text style={[{ fontSize: 10 }, TextProps]}>Checking availability...</Text>
          </View>
        ) : null}

        <FormButton
          isSubmitting={formik.isSubmitting}
          disabled={disabled}
          onPress={formik.handleSubmit}
          text="Submit"
        >
          <Text style={[TextProps, { color: Colors.fontLight }]}>Submit</Text>
        </FormButton>
      </View>
    )
  );
};

export default NewLeaveRequestForm;
