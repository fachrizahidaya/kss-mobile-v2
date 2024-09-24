import { Text } from "react-native";

import CustomSheet from "../../../layouts/CustomSheet";
import Button from "../../../styles/forms/Button";
import Select from "../../../styles/forms/Select";

const ItemMinimumFilter = ({ reference }) => {
  return (
    <CustomSheet reference={reference}>
      <Select />
      {/* <Button disabled={null} onPress={null} padding={10}>
        <Text style={{ color: "#ffffff" }}>Reset Filter</Text>
      </Button> */}
    </CustomSheet>
  );
};

export default ItemMinimumFilter;
