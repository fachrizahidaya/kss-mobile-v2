import { StyleSheet, Text, View } from "react-native";
import ActionSheet from "react-native-actions-sheet";

import Button from "../../../styles/forms/Button";
import CustomMonthPicker from "../../../styles/timepicker/CustomMonthPicker";

const SalesFilter = ({
  reference,
  handleResetDate,
  months,
  selectMonthHandler,
  selectYearHandler,
  selectedMonth,
  selectedYear,
}) => {
  return (
    <ActionSheet ref={reference}>
      <View style={styles.content}>
        <View style={{ gap: 5 }}>
          <CustomMonthPicker
            months={months}
            handleSelectedMonth={selectMonthHandler}
            handleSelectedYear={selectYearHandler}
            selectedMonth={selectedMonth}
            selectedYear={selectedYear}
          />
        </View>

        {/* <Button onPress={handleResetDate}>
          <Text style={{ color: "#ffffff" }}>Reset Filter</Text>
        </Button> */}
      </View>
    </ActionSheet>
  );
};

export default SalesFilter;

const styles = StyleSheet.create({
  content: {
    gap: 21,
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: 40,
  },
});
