import { Text, View } from "react-native";

import CustomDateTimePicker from "../../../styles/timepicker/CustomDateTimePicker";
import Select from "../../../styles/forms/Select";
import Button from "../../../styles/forms/Button";
import CustomSheet from "../../../styles/CustomSheet";

const PaymentFilter = ({
  startDate,
  endDate,
  handleStartDate,
  handleEndDate,
  types,
  handleAccountChange,
  value,
  reference,
  handleResetFilter,
  account,
}) => {
  const render = [
    <Select
      title="Bank"
      items={types}
      value={value}
      placeHolder="Select bank"
      onChange={(value) => handleAccountChange(value)}
    />,
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

    <Button disabled={!account && !startDate && !endDate} onPress={handleResetFilter} padding={10}>
      <Text style={{ color: "#ffffff" }}>Reset Filter</Text>
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

export default PaymentFilter;
