import { StyleSheet, Text, View } from "react-native";
import ActionSheet from "react-native-actions-sheet";
import Select from "../../../styles/forms/Select";
import CustomDateTimePicker from "../../../styles/CustomDateTimePicker";
import Button from "../../../styles/forms/Button";

const COAFilter = ({ types, handleAccountChange, value, reference, handleResetFilter, account }) => {
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
        <Button disabled={!account} onPress={handleResetFilter} padding={10}>
          <Text style={{ color: "#ffffff" }}>Reset Filter</Text>
        </Button>
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
