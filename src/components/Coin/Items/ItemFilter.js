import { Text } from "react-native";

import CustomSheet from "../../../layouts/CustomSheet";
import Select from "../../../styles/forms/Select";
import Button from "../../../styles/forms/Button";
import { TextProps } from "../../../styles/CustomStylings";
import { Colors } from "../../../styles/Color";

const ItemFilter = ({ types, handleStatusChange, value, reference, handleReset, category }) => {
  return (
    <CustomSheet reference={reference}>
      <Text style={[TextProps]}>Filter</Text>

      <Select
        title="Category"
        items={types}
        value={value}
        placeHolder="Select category"
        onChange={(value) => handleStatusChange(value)}
      />
      <Button disabled={!category} onPress={handleReset}>
        <Text style={{ color: Colors.fontLight }}>Reset Filter</Text>
      </Button>
    </CustomSheet>
  );
};

export default ItemFilter;
