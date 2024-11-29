import { Text, View } from "react-native";

import Button from "../../../styles/forms/Button";
import CustomDateTimePicker from "../../../styles/timepicker/CustomDateTimePicker";
import CustomSheet from "../../../layouts/CustomSheet";
import { Colors } from "../../../styles/Color";

const ProfitLossFilter = ({ startDate, endDate, handleBeginDate, handleEndDate, handleResetDate, reference }) => {
  const render = [
    <CustomDateTimePicker
      unlimitStartDate={true}
      defaultValue={startDate}
      onChange={handleBeginDate}
      title="Begin Date"
    />,
    <CustomDateTimePicker defaultValue={endDate} onChange={handleEndDate} title="End Date" minimumDate={startDate} />,
    <Button disabled={!startDate && !endDate} onPress={handleResetDate}>
      <Text style={{ color: Colors.fontLight }}>Reset Filter</Text>
    </Button>,
  ];

  return (
    <CustomSheet reference={reference}>
      {render.map((item, index) => {
        return <View key={index}>{item}</View>;
      })}
    </CustomSheet>
  );
};

export default ProfitLossFilter;
