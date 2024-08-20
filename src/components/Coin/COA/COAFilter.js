import { StyleSheet, View } from "react-native";
import ActionSheet from "react-native-actions-sheet";
import Select from "../../../styles/forms/Select";
import CustomDateTimePicker from "../../../styles/CustomDateTimePicker";

const COAFilter = ({
  types,
  handleAccountChange,
  value,
  reference,
  startDate,
  endDate,
  handleStartDate,
  handleEndDate,
}) => {
  return (
    <ActionSheet ref={reference}>
      <View style={styles.content}>
        <View style={{ gap: 5 }}>
          <Select
            title="Account"
            items={types}
            value={value}
            placeHolder="Select Account"
            onChange={(value) => handleAccountChange(value)}
          />
        </View>
        <View style={{ gap: 5 }}>
          <CustomDateTimePicker
            unlimitStartDate={true}
            width="100%"
            defaultValue={startDate}
            onChange={handleStartDate}
            title="Begin Date"
          />
        </View>

        <View style={{ gap: 5 }}>
          <CustomDateTimePicker
            unlimitStartDate={true}
            width="100%"
            defaultValue={endDate}
            onChange={handleEndDate}
            title="End Date"
          />
        </View>
      </View>
    </ActionSheet>
  );
};

export default COAFilter;

const styles = StyleSheet.create({
  wrapper: {
    padding: 5,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#E8E9EB",
    backgroundColor: "#FFFFFF",
  },
  content: { gap: 21, paddingHorizontal: 20, paddingVertical: 16, paddingBottom: 40 },
});
