import dayjs from "dayjs";

import { Text, View } from "react-native";

import CustomDateTimePicker from "../../../styles/timepicker/CustomDateTimePicker";
import Select from "../../../styles/forms/Select";
import Button from "../../../styles/forms/Button";
import CustomSheet from "../../../layouts/CustomSheet";
import { TextProps } from "../../../styles/CustomStylings";
import { Colors } from "../../../styles/Color";

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
    <View>
      <Text style={[TextProps, { marginBottom: 9 }]}>Date</Text>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
        <View style={{ flex: 0.5 }}>
          <CustomDateTimePicker
            unlimitStartDate={true}
            width="100%"
            defaultValue={startDate ? startDate : null}
            onChange={handleStartDate}
          />
        </View>
        <View style={{ flex: 0.5 }}>
          <CustomDateTimePicker
            width="100%"
            defaultValue={endDate ? endDate : null}
            onChange={handleEndDate}
            minimumDate={startDate}
          />
        </View>
      </View>
    </View>,
    <Button
      disabled={!account && startDate === dayjs().format("YYYY-MM-DD") && endDate === dayjs().format("YYYY-MM-DD")}
      onPress={handleResetFilter}
      padding={10}
    >
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

export default AccountHistoryFilter;
