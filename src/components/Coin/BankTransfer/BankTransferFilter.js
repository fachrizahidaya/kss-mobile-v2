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
    <Button onPress={handleResetFilter} padding={10}>
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
