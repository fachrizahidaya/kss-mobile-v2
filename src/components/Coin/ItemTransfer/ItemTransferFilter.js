import { Text, View } from "react-native";
import Button from "../../../styles/forms/Button";
import Select from "../../../styles/forms/Select";
import CustomDateTimePicker from "../../../styles/timepicker/CustomDateTimePicker";
import CustomSheet from "../../../layouts/CustomSheet";
import { TextProps } from "../../../styles/CustomStylings";
import { Colors } from "../../../styles/Color";

const ItemTransferFilter = ({
  startDate,
  endDate,
  handleStartDate,
  handleEndDate,
  types,
  handleStatusChange,
  value,
  reference,
  handleResetFilter,
  status,
}) => {
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
    <Select
      title="Status"
      items={types}
      value={value}
      placeHolder="Select status"
      onChange={(value) => handleStatusChange(value)}
    />,
    <Button disabled={!status && !startDate && !endDate} onPress={handleResetFilter} padding={10}>
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

export default ItemTransferFilter;
