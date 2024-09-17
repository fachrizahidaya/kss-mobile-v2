import dayjs from "dayjs";

import { Text, View } from "react-native";

import CustomDateTimePicker from "../../../styles/timepicker/CustomDateTimePicker";
import Select from "../../../styles/forms/Select";
import Button from "../../../styles/forms/Button";
import CustomSheet from "../../../styles/CustomSheet";

const AccountHistoryFilter = ({
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
      title="Account"
      items={types}
      value={value}
      placeHolder="Select Account"
      onChange={(value) => handleAccountChange(value)}
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
    <Button
      disabled={!account && startDate === dayjs().format("YYYY-MM-DD") && endDate === dayjs().format("YYYY-MM-DD")}
      onPress={handleResetFilter}
      padding={10}
    >
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

export default AccountHistoryFilter;
