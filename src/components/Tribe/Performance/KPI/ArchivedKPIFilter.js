import { Text, View } from "react-native";

import CustomDateTimePicker from "../../../../styles/timepicker/CustomDateTimePicker";
import Button from "../../../../styles/forms/Button";
import CustomSheet from "../../../../layouts/CustomSheet";
import { Colors } from "../../../../styles/Color";

const ArchivedKPIFilter = ({
  startDate,
  startDateChangeHandler,
  endDate,
  endDateChangeHandler,
  reference,
  handleResetFilter,
}) => {
  const render = [
    <CustomDateTimePicker
      unlimitStartDate={true}
      defaultValue={startDate}
      onChange={startDateChangeHandler}
      title="Begin Date"
    />,
    <CustomDateTimePicker
      defaultValue={endDate}
      onChange={endDateChangeHandler}
      title="End Date"
      minimumDate={startDate}
    />,
    <Button disabled={!startDate && !endDate} onPress={handleResetFilter}>
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

export default ArchivedKPIFilter;
