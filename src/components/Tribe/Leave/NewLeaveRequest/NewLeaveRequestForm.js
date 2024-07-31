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
    <View style={{ marginTop: 20, gap: 20 }}>
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

      <View style={{ gap: 10 }}>
        <Text style={[{ fontSize: 14 }, TextProps]}>Start Date</Text>
        <CustomDateTimePicker
          defaultValue={formik.values.begin_date}
          onChange={onChangeStartDate}
          disabled={!formik.values.leave_id}
          unlimitStartDate={true}
        />
        <Text style={{ color: "#FF6262" }}>{formik.errors.begin_date}</Text>
        <Text style={[{ fontSize: 14 }, TextProps]}>End Date</Text>
        <CustomDateTimePicker
          defaultValue={formik.values.end_date}
          onChange={onChangeEndDate}
          disabled={!formik.values.leave_id}
        />
        <Text style={{ color: "#FF6262" }}>{formik.errors.end_date}</Text>
      </View>

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
