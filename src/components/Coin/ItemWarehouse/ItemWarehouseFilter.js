import { Text } from "react-native";

import CustomSheet from "../../../layouts/CustomSheet";
import Button from "../../../styles/forms/Button";
import Select from "../../../styles/forms/Select";
import SelectWithSearch from "../../../styles/forms/SelectWithSearch";
import { Colors } from "../../../styles/Color";

const ItemWarehouseFilter = ({
  reference,
  handleChange,
  value,
  items,
  selectReference,
  itemsOption,
  handleChangeOption,
  selectedOption,
  handleSearchOption,
  inputToShow,
  setInputToShow,
  setSearchInput,
  handleReset,
}) => {
  return (
    <CustomSheet reference={reference}>
      <Select title="Search by" items={items} value={value} onChange={handleChange} />
      <SelectWithSearch
        title={value === "Warehouse" ? "Warehouse" : "Item"}
        placeHolder={`Select ${value === "Warehouse" ? "Warehouse" : "Item"}`}
        reference={selectReference}
        items={itemsOption}
        onChange={handleChangeOption}
        value={selectedOption}
        inputToShow={inputToShow}
        setInputToShow={setInputToShow}
        setSearchInput={setSearchInput}
        fieldNameSearch="Search"
        handleSearch={handleSearchOption}
      />
      <Button disabled={!selectedOption} onPress={handleReset} padding={10}>
        <Text style={{ color: Colors.fontLight }}>Reset Filter</Text>
      </Button>
    </CustomSheet>
  );
};

export default ItemWarehouseFilter;
