import { Platform, Text, View } from "react-native";
import CustomSheet from "../../../layouts/CustomSheet";
import Button from "../../../styles/forms/Button";
import Select from "../../../styles/forms/Select";
import CustomDateTimePicker from "../../../styles/timepicker/CustomDateTimePicker";
import { TextProps } from "../../../styles/CustomStylings";
import { Colors } from "../../../styles/Color";

const ReceiveItemTransferFilter = ({
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
  const render =
    Platform.OS === "ios"
      ? [
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
          <Button disabled={!status && !startDate && !endDate} onPress={handleResetFilter}>
            <Text style={{ color: Colors.fontLight }}>Reset Filter</Text>
          </Button>,
        ]
      : [
          <View>
            <Text style={[TextProps, { marginBottom: 9 }]}>Date</Text>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
              <View style={{ flex: 0.5 }}>
                <CustomDateTimePicker
                  unlimitStartDate={true}
                  width="100%"
                  defaultValue={startDate}
                  onChange={handleStartDate}
                  title="Begin Date"
                />
              </View>
              <View style={{ flex: 0.5 }}>
                <CustomDateTimePicker
                  width="100%"
                  defaultValue={endDate}
                  onChange={handleEndDate}
                  title="End Date"
                  minimumDate={startDate}
                />
              </View>
            </View>
          </View>,
          <Select
            title="Status"
            items={types}
            value={value}
            placeHolder="Select status"
            onChange={(value) => handleStatusChange(value)}
          />,
          <Button disabled={!status && !startDate && !endDate} onPress={handleResetFilter}>
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

export default ReceiveItemTransferFilter;
