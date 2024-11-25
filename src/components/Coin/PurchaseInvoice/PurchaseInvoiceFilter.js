import { Text, View } from "react-native";
import CustomSheet from "../../../layouts/CustomSheet";
import CustomDateTimePicker from "../../../styles/timepicker/CustomDateTimePicker";
import Select from "../../../styles/forms/Select";
import Button from "../../../styles/forms/Button";
import { TextProps } from "../../../styles/CustomStylings";

const PurchaseInvoiceFilter = ({
  reference,
  startDate,
  endDate,
  types,
  suppliers,
  value,
  supplierValue,
  handleStartDate,
  handleEndDate,
  handleStatusChange,
  handleSupplierChange,
  status,
  supplier,
  handleResetFilter,
}) => {
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
          <CustomDateTimePicker width="100%" defaultValue={endDate} onChange={handleEndDate} minimumDate={startDate} />
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
      title="Supplier"
      items={suppliers}
      value={supplierValue}
      placeHolder="Select supplier"
      onChange={(value) => handleSupplierChange(value)}
    />,
    <Button disabled={!status && !startDate && !endDate && !supplier} onPress={handleResetFilter} padding={10}>
      <Text style={{ color: "#ffffff" }}>Reset Filter</Text>
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

export default PurchaseInvoiceFilter;
