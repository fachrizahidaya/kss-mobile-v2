import { Text } from "react-native";

import Select from "../../../styles/forms/Select";
import Button from "../../../styles/forms/Button";
import CustomSheet from "../../../styles/CustomSheet";

const COAFilter = ({ types, handleAccountChange, value, reference, handleResetFilter, account }) => {
  return (
    <CustomSheet reference={reference}>
      <Select
        title="COA Type"
        items={types}
        value={value}
        placeHolder="Select COA type"
        onChange={(value) => handleAccountChange(value)}
      />
      <Button disabled={!account} onPress={handleResetFilter} padding={10}>
        <Text style={{ color: "#ffffff" }}>Reset Filter</Text>
      </Button>
    </CustomSheet>
  );
};

export default COAFilter;
