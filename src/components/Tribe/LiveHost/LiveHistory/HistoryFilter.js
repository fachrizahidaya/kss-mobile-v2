import { Text, View } from "react-native";
import CustomSheet from "../../../../layouts/CustomSheet";
import { TextProps } from "../../../../styles/CustomStylings";
import CustomDateTimePicker from "../../../../styles/timepicker/CustomDateTimePicker";
import Button from "../../../../styles/forms/Button";
import { Colors } from "../../../../styles/Color";
import Select from "../../../../styles/forms/Select";
import SelectWithSearch from "../../../../styles/forms/SelectWithSearch";

const HistoryFilter = ({
  reference,
  handleResetFilter,
  handleStartDate,
  handleEndDate,
  startDate,
  endDate,
  brand,
  host,
  handleChangeBrand,
  handleChangeHost,
  valueBrand,
  valueHost,
}) => {
  const render = [
    <CustomDateTimePicker
      title="Begin Date"
      unlimitStartDate={true}
      width="100%"
      defaultValue={startDate}
      onChange={handleStartDate}
    />,

    <CustomDateTimePicker
      title="End Date"
      width="100%"
      defaultValue={endDate}
      onChange={handleEndDate}
    />,
    <Select
      title="Brand"
      items={brand}
      value={valueBrand}
      placeHolder="Select brand"
      onChange={(value) => handleChangeBrand(value)}
    />,
    <Select
      title="Host"
      items={host}
      value={valueHost}
      placeHolder="Select host"
      onChange={(value) => handleChangeHost(value)}
    />,
    // <SelectWithSearch />,
    <Button
      disabled={!startDate && !endDate && !valueBrand && !valueHost}
      onPress={handleResetFilter}
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

export default HistoryFilter;
