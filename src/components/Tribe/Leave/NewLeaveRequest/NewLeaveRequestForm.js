import { View, Text, ActivityIndicator } from "react-native";

import Input from "../../../../styles/forms/Input";
import CustomDateTimePicker from "../../../../styles/CustomDateTimePicker";
import FormButton from "../../../../styles/FormButton";
import { TextProps } from "../../../../styles/CustomStylings";
import SelectWithSearch from "../../../../styles/forms/SelectWithSearch";

const NewLeaveRequestForm = ({
  leaveType,
  formik,
  onChangeStartDate,
  onChangeEndDate,
  isLoading,
  isError,
  reference,
  handleSearch,
  inputToShow,
  setInputToShow,
  setSearchInput,
  startDateMore,
}) => {
  const handleChange = (value) => formik.setFieldValue("leave_id", value);
  const handleSubmit = () => {
    if (
      formik.values.leave_id &&
      formik.values.reason &&
      formik.values.begin_date &&
      formik.values.end_date &&
      !isLoading &&
      !isError &&
      !startDateMore
    ) {
      formik.handleSubmit();
    }
  };

  return (
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
        title="Start Date"
      />
      <Text style={{ color: "#FF6262" }}>{formik.errors.begin_date}</Text>
      <CustomDateTimePicker
        defaultValue={formik.values.end_date}
        onChange={onChangeEndDate}
        disabled={!formik.values.leave_id}
        title="End Date"
        minimumDate={formik.values.end_date}
        unlimitStartDate={true}
      />
      <Text style={{ color: "#FF6262" }}>{formik.errors.end_date}</Text>

      {isLoading ? (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
          <ActivityIndicator />
          <Text style={[{ fontSize: 10 }, TextProps]}>Checking availability...</Text>
        </View>
      ) : null}

      <FormButton
        isSubmitting={formik.isSubmitting}
        disabled={
          !formik.values.leave_id ||
          !formik.values.reason ||
          !formik.values.begin_date ||
          !formik.values.end_date ||
          isLoading ||
          isError ||
          startDateMore
        }
        onPress={handleSubmit}
      >
        <Text style={{ color: "#FFFFFF" }}>Submit</Text>
      </FormButton>
    </View>
  );
};

export default NewLeaveRequestForm;
