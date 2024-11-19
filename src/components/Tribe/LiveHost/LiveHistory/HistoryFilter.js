import { Text, View } from "react-native";
import CustomSheet from "../../../../layouts/CustomSheet";
import { TextProps } from "../../../../styles/CustomStylings";
import CustomDateTimePicker from "../../../../styles/timepicker/CustomDateTimePicker";
import Button from "../../../../styles/forms/Button";
import { Colors } from "../../../../styles/Color";

const HistoryFilter = ({ reference, handleResetFilter, handleStartDate, handleEndDate, startDate, endDate }) => {
  const render = [
    <CustomDateTimePicker
      unlimitStartDate={true}
      width="100%"
      defaultValue={startDate}
      onChange={handleStartDate}
      title="Begin Date"
    />,
    <CustomDateTimePicker
      width="100%"
      defaultValue={endDate}
      onChange={handleEndDate}
      title="End Date"
      minimumDate={startDate}
    />,
    <Button disabled={!startDate && !endDate} onPress={handleResetFilter} padding={10}>
      <Text style={{ color: Colors.fontLight }}>Reset Filter</Text>
    </Button>,
  ];

  return (
    <CustomSheet reference={reference}>
      <Text style={[TextProps]}>Filter</Text>
      {render.map((item, index) => {
        return <View key={index}>{item}</View>;
      })}
    </CustomSheet>
  );
};

export default HistoryFilter;
