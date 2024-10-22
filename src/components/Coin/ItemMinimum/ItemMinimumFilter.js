import { Text } from "react-native";

import CustomSheet from "../../../layouts/CustomSheet";
import Button from "../../../styles/forms/Button";
import SelectWithSearch from "../../../styles/forms/SelectWithSearch";

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
      <Button disabled={!warehouse} onPress={handleReset} padding={10}>
        <Text style={{ color: "#ffffff" }}>Reset Filter</Text>
      </Button>
    </CustomSheet>
  );
};

export default ItemMinimumFilter;
