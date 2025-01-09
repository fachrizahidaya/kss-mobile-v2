import { Platform, Text, View } from "react-native";

import CustomDateTimePicker from "../../../styles/timepicker/CustomDateTimePicker";
import Select from "../../../styles/forms/Select";
import Button from "../../../styles/forms/Button";
import CustomSheet from "../../../layouts/CustomSheet";
import { TextProps } from "../../../styles/CustomStylings";
import { Colors } from "../../../styles/Color";

const DeliveryOrderFilter = ({
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
  handleCourierChange,
  handleCustomerChange,
  courierOptions,
  courier,
  customerOptions,
  customer,
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
            minimumDate={startDate}
            title="End Date"
          />,
          <Select
            title="Status"
            items={types}
            value={value}
            placeHolder="Select status"
            onChange={(value) => handleStatusChange(value)}
          />,
          <Select
            title="Courier"
            items={courierOptions}
            value={courier}
            placeHolder="Select courier"
            onChange={(value) => handleCourierChange(value)}
          />,
          <Select
            title="Customer"
            items={customerOptions}
            value={customer}
            placeHolder="Select customer"
            onChange={(value) => handleCustomerChange(value)}
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
                />
              </View>
              <View style={{ flex: 0.5 }}>
                <CustomDateTimePicker
                  width="100%"
                  defaultValue={endDate}
                  onChange={handleEndDate}
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
          <Select
            title="Courier"
            items={courierOptions}
            value={courier}
            placeHolder="Select courier"
            onChange={(value) => handleCourierChange(value)}
          />,
          <Select
            title="Customer"
            items={customerOptions}
            value={customer}
            placeHolder="Select customer"
            onChange={(value) => handleCustomerChange(value)}
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

export default DeliveryOrderFilter;
