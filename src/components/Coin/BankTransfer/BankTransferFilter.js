import { StyleSheet, View } from "react-native";
import ActionSheet from "react-native-actions-sheet";
import CustomDateTimePicker from "../../../styles/CustomDateTimePicker";
import Select from "../../../styles/forms/Select";

const BankTransferFilter = ({
  startDate,
  endDate,
  handleStartDate,
  handleEndDate,
  types,
  handleAccountToChange,
  valueTo,
  reference,
  handleAccountFromChange,
  valueFrom,
}) => {
  return (
    <ActionSheet ref={reference}>
      <View style={styles.content}>
        <View style={{ gap: 5 }}>
          <Select
            title="Account From"
            items={types}
            value={valueFrom}
            placeHolder="Select account from"
            onChange={(value) => handleAccountFromChange(value)}
          />
        </View>
        <View style={{ gap: 5 }}>
          <Select
            title="Account To"
            items={types}
            value={valueTo}
            placeHolder="Select account to"
            onChange={(value) => handleAccountToChange(value)}
          />
        </View>
        <View style={{ gap: 5 }}>
          <CustomDateTimePicker
            unlimitStartDate={true}
            width="100%"
            defaultValue={startDate ? startDate : null}
            onChange={handleStartDate}
            title="Begin Date"
          />
        </View>

        <View style={{ gap: 5 }}>
          <CustomDateTimePicker
            unlimitStartDate={true}
            width="100%"
            defaultValue={endDate ? endDate : null}
            onChange={handleEndDate}
            title="End Date"
          />
        </View>
      </View>
    </ActionSheet>
  );
};

export default BankTransferFilter;

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
