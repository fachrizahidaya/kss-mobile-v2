import { Text, View } from "react-native";

import CustomDateTimePicker from "../../../styles/timepicker/CustomDateTimePicker";
import Select from "../../../styles/forms/Select";
import Button from "../../../styles/forms/Button";
import CustomSheet from "../../../layouts/CustomSheet";
import { TextProps } from "../../../styles/CustomStylings";
import { Colors } from "../../../styles/Color";

const BankTransferFilter = ({
  startDate,
  endDate,
  handleStartDate,
  handleEndDate,
  types,
  handleAccountToChange,
  valueTo,
  reference,
  handleAccountFromChange,
  valueFrom,
  handleResetFilter,
}) => {
  const render = [
    <Select
      title="Account From"
      items={types}
      value={valueFrom}
      placeHolder="Select account from"
      onChange={(value) => handleAccountFromChange(value)}
    />,
    <Select
      title="Account To"
      items={types}
      value={valueTo}
      placeHolder="Select account to"
      onChange={(value) => handleAccountToChange(value)}
    />,
    <CustomDateTimePicker
      title="Begin Date"
      unlimitStartDate={true}
      width="100%"
      defaultValue={startDate ? startDate : null}
      onChange={handleStartDate}
    />,
    <CustomDateTimePicker
      title="End Date"
      width="100%"
      defaultValue={endDate ? endDate : null}
      onChange={handleEndDate}
      minimumDate={startDate}
    />,

    <Button
      onPress={handleResetFilter}
      disabled={!valueFrom || !valueTo || startDate || endDate}
    >
      <Text style={{ color: Colors.iconLight }}>Reset Filter</Text>
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

export default BankTransferFilter;
