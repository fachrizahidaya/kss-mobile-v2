import { View } from "react-native";

import Button from "../../../styles/forms/Button";
import CustomMonthPicker from "../../../styles/timepicker/CustomMonthPicker";
import CustomSheet from "../../../layouts/CustomSheet";

const PurchaseFilter = ({
  reference,
  handleResetDate,
  months,
  selectMonthHandler,
  selectYearHandler,
  selectedMonth,
  selectedYear,
}) => {
  return (
    <CustomSheet reference={reference}>
      <View>
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
    </CustomSheet>
  );
};

export default PurchaseFilter;
