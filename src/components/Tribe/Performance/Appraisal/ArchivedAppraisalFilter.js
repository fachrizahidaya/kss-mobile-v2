import { StyleSheet, Text, View } from "react-native";
import ActionSheet from "react-native-actions-sheet";

import CustomDateTimePicker from "../../../../styles/timepicker/CustomDateTimePicker";
import Button from "../../../../styles/forms/Button";

const ArchivedAppraisalFilter = ({
  startDate,
  startDateChangeHandler,
  endDate,
  endDateChangeHandler,
  reference,
  handleResetFilter,
}) => {
  return (
    <ActionSheet ref={reference}>
      <View style={styles.wrapper}>
        <View style={{ gap: 5 }}>
          <CustomDateTimePicker
            unlimitStartDate={true}
            defaultValue={startDate ? startDate : null}
            onChange={startDateChangeHandler}
            title="Begin Date"
          />
        </View>
        <View style={{ gap: 5 }}>
          <CustomDateTimePicker
            defaultValue={endDate ? endDate : null}
            onChange={endDateChangeHandler}
            title="End Date"
            minimumDate={startDate}
          />
        </View>
        <Button disabled={!startDate && !endDate} onPress={handleResetFilter} padding={10}>
          <Text style={{ color: "#ffffff" }}>Reset Filter</Text>
        </Button>
      </View>
    </ActionSheet>
  );
};

export default ArchivedAppraisalFilter;

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
