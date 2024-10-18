import { Text, View } from "react-native";

import CustomDateTimePicker from "../../../styles/timepicker/CustomDateTimePicker";
import Select from "../../../styles/forms/Select";
import Button from "../../../styles/forms/Button";
import CustomSheet from "../../../layouts/CustomSheet";

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
    <Button disabled={!status && !startDate && !endDate} onPress={handleResetFilter} padding={10}>
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

export default DeliveryOrderFilter;
