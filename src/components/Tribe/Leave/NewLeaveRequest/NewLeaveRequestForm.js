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
  return (
    <View style={{ marginTop: 20, gap: 20 }}>
      <SelectWithSearch
        reference={reference}
        placeHolder="Select leave type"
        title="Leave Type"
        items={leaveType}
        formik={formik}
        value={formik.values.leave_id}
        fieldName="leave_id"
        onChange={(value) => {
          formik.setFieldValue("leave_id", value);
        }}
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
          disabled={!formik.values.leave_id ? true : false}
          unlimitStartDate={true}
        />
        <Text style={{ color: "#FF6262" }}>{formik.errors.begin_date}</Text>
        <Text style={[{ fontSize: 14 }, TextProps]}>End Date</Text>
        <CustomDateTimePicker
          defaultValue={formik.values.end_date}
          onChange={onChangeEndDate}
          disabled={!formik.values.leave_id ? true : false}
        />
        <Text style={{ color: "#FF6262" }}>{formik.errors.end_date}</Text>
      </View>

      {isLoading && (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
          <ActivityIndicator />
          <Text style={[{ fontSize: 10 }, TextProps]}>Checking availability...</Text>
        </View>
      )}

      {formik.values.leave_id &&
      formik.values.reason &&
      formik.values.begin_date &&
      formik.values.end_date &&
      !isLoading &&
      !isError &&
      !startDateMore ? (
        <FormButton isSubmitting={formik.isSubmitting} disabled={false} onPress={formik.handleSubmit}>
          <Text style={{ color: "#FFFFFF" }}>Submit</Text>
        </FormButton>
      ) : (
        <FormButton opacity={0.5} isSubmitting={null} disabled={true} onPress={null}>
          <Text style={{ color: "#FFFFFF" }}>Submit</Text>
        </FormButton>
      )}
    </View>
  );
};

export default NewLeaveRequestForm;
