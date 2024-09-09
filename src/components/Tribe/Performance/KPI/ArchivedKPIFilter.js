import { StyleSheet, View } from "react-native";
import ActionSheet from "react-native-actions-sheet";

import CustomDateTimePicker from "../../../../styles/CustomDateTimePicker";

const ArchivedKPIFilter = ({ startDate, startDateChangeHandler, endDate, endDateChangeHandler, reference }) => {
  return (
    <ActionSheet ref={reference}>
      <View style={styles.wrapper}>
        <View style={{ gap: 5 }}>
          <CustomDateTimePicker
            unlimitStartDate={true}
            defaultValue={startDate}
            onChange={startDateChangeHandler}
            title="Begin Date"
          />
        </View>
        <View style={{ gap: 5 }}>
          <CustomDateTimePicker
            defaultValue={endDate}
            onChange={endDateChangeHandler}
            title="End Date"
            minimumDate={startDate}
          />
        </View>
      </View>
    </ActionSheet>
  );
};

export default ArchivedKPIFilter;

const styles = StyleSheet.create({
  container: {
    padding: 5,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#E8E9EB",
    backgroundColor: "#FFFFFF",
  },
  wrapper: {
    gap: 21,
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: 40,
  },
});
