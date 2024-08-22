import { StyleSheet, View } from "react-native";
import ActionSheet from "react-native-actions-sheet";
import Select from "../../../styles/forms/Select";
import CustomDateTimePicker from "../../../styles/CustomDateTimePicker";

const COAFilter = ({ types, handleAccountChange, value, reference }) => {
  return (
    <ActionSheet ref={reference}>
      <View style={styles.content}>
        <View style={{ gap: 5 }}>
          <Select
            title="COA Type"
            items={types}
            value={value}
            placeHolder="Select COA type"
            onChange={(value) => handleAccountChange(value)}
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
