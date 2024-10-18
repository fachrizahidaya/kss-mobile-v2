import { Text } from "react-native";

import CustomSheet from "../../../layouts/CustomSheet";
import Select from "../../../styles/forms/Select";
import Button from "../../../styles/forms/Button";

const ItemFilter = ({ types, handleStatusChange, value, reference, handleReset, category }) => {
  return (
    <CustomSheet reference={reference}>
      <Select
        title="Category"
        items={types}
        value={value}
        placeHolder="Select category"
        onChange={(value) => handleStatusChange(value)}
      />
      <Button disabled={!category} onPress={handleReset} padding={10}>
        <Text style={{ color: "#ffffff" }}>Reset Filter</Text>
      </Button>
    </CustomSheet>
  );
};

export default ItemFilter;
