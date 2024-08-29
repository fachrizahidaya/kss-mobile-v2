import { StyleSheet, Text, View } from "react-native";
import ActionSheet from "react-native-actions-sheet";

import Button from "../../../styles/forms/Button";
import CustomDateTimePicker from "../../../styles/CustomDateTimePicker";

const ProfitLossFilter = ({ startDate, endDate, handleBeginDate, handleEndDate, handleResetDate, reference }) => {
  return (
    <ActionSheet ref={reference}>
      <View style={styles.content}>
        <View style={{ gap: 5 }}>
          <CustomDateTimePicker
            unlimitStartDate={true}
            defaultValue={startDate}
            onChange={handleBeginDate}
            title="Begin Date"
          />
        </View>
        <View style={{ gap: 5 }}>
          <CustomDateTimePicker
            defaultValue={endDate}
            onChange={handleEndDate}
            title="End Date"
            minimumDate={startDate}
          />
        </View>
        <Button disabled={!startDate && !endDate} onPress={handleResetDate} padding={10}>
          <Text style={{ color: "#ffffff" }}>Reset Filter</Text>
        </Button>
      </View>
    </ActionSheet>
  );
};

export default ProfitLossFilter;

const styles = StyleSheet.create({
  content: {
    gap: 21,
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: 40,
  },
});
