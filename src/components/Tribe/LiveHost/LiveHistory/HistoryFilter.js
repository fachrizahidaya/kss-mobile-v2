import { Text, View } from "react-native";
import CustomSheet from "../../../../layouts/CustomSheet";
import { TextProps } from "../../../../styles/CustomStylings";
import CustomDateTimePicker from "../../../../styles/timepicker/CustomDateTimePicker";
import Button from "../../../../styles/forms/Button";
import { Colors } from "../../../../styles/Color";

const HistoryFilter = ({ reference, handleResetFilter, handleStartDate, handleEndDate, startDate, endDate }) => {
  const render = [
    <View>
      <Text style={[TextProps, { marginBottom: 9 }]}>Date</Text>

      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
        <View style={{ flex: 0.5 }}>
          <CustomDateTimePicker
            unlimitStartDate={true}
            width="100%"
            defaultValue={startDate}
            onChange={handleStartDate}
          />
        </View>

        <View style={{ flex: 0.5 }}>
          <CustomDateTimePicker width="100%" defaultValue={endDate} onChange={handleEndDate} />
        </View>
      </View>
    </View>,
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
