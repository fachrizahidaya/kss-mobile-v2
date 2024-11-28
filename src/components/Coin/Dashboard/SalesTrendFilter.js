import { Text } from "react-native";

import Button from "../../../styles/forms/Button";
import CustomMonthPicker from "../../../styles/timepicker/CustomMonthPicker";
import CustomSheet from "../../../layouts/CustomSheet";
import { Colors } from "../../../styles/Color";

const SalesTrendFilter = ({
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
      <CustomMonthPicker
        months={months}
        handleSelectedMonth={selectMonthHandler}
        handleSelectedYear={selectYearHandler}
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
      />

      <Button onPress={handleResetDate} padding={10}>
        <Text style={{ color: Colors.fontLight }}>Reset Filter</Text>
      </Button>
    </CustomSheet>
  );
};

export default SalesTrendFilter;
