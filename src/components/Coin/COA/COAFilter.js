import { Text } from "react-native";

import Select from "../../../styles/forms/Select";
import Button from "../../../styles/forms/Button";
import CustomSheet from "../../../layouts/CustomSheet";
import { TextProps } from "../../../styles/CustomStylings";
import { Colors } from "../../../styles/Color";

const COAFilter = ({ types, handleAccountChange, value, reference, handleResetFilter, account }) => {
  return (
    <CustomSheet reference={reference}>
      <Text style={[TextProps]}>Filter</Text>
      <Select
        title="COA Type"
        items={types}
        value={value}
        placeHolder="Select COA type"
        onChange={(value) => handleAccountChange(value)}
      />
      <Button disabled={!account} onPress={handleResetFilter}>
        <Text style={{ color: Colors.fontLight }}>Reset Filter</Text>
      </Button>
    </CustomSheet>
  );
};

export default COAFilter;
