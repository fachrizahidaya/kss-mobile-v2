import { Text, View } from "react-native";

import CustomDateTimePicker from "../../../styles/timepicker/CustomDateTimePicker";
import Select from "../../../styles/forms/Select";
import Button from "../../../styles/forms/Button";
import CustomSheet from "../../../styles/CustomSheet";

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
      unlimitStartDate={true}
      width="100%"
      defaultValue={startDate ? startDate : null}
      onChange={handleStartDate}
      title="Begin Date"
    />,

    <CustomDateTimePicker
      width="100%"
      defaultValue={endDate ? endDate : null}
      onChange={handleEndDate}
      title="End Date"
      minimumDate={startDate}
    />,
    <Button onPress={handleResetFilter} padding={10}>
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

export default BankTransferFilter;
