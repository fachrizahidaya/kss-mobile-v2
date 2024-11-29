import { Text } from "react-native";

import CustomSheet from "../../../layouts/CustomSheet";
import Button from "../../../styles/forms/Button";
import SelectWithSearch from "../../../styles/forms/SelectWithSearch";
import { TextProps } from "../../../styles/CustomStylings";
import { Colors } from "../../../styles/Color";

const ItemMinimumFilter = ({
  reference,
  selectWarehouseReference,
  items,
  handleChange,
  inputToShow,
  setInputToShow,
  setSearchInput,
  handleSearch,
  warehouse,
  handleReset,
}) => {
  return (
    <CustomSheet reference={reference}>
      <Text style={[TextProps]}>Filter</Text>

      <SelectWithSearch
        reference={selectWarehouseReference}
        placeHolder="Select warehouse"
        title="Warehouse"
        items={items}
        onChange={handleChange}
        value={warehouse}
        inputToShow={inputToShow}
        setInputToShow={setInputToShow}
        setSearchInput={setSearchInput}
        fieldNameSearch="Search"
        handleSearch={handleSearch}
      />
      <Button disabled={!warehouse} onPress={handleReset}>
        <Text style={{ color: Colors.fontLight }}>Reset Filter</Text>
      </Button>
    </CustomSheet>
  );
};

export default ItemMinimumFilter;
