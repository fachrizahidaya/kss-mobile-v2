import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import _ from "lodash";

import { StyleSheet, View } from "react-native";

import DataFilter from "../../../components/Coin/shared/DataFilter";
import ItemWarehouseList from "../../../components/Coin/ItemWarehouse/ItemWarehouseList";
import Screen from "../../../layouts/Screen";
import ItemWarehouseFilter from "../../../components/Coin/ItemWarehouse/ItemWarehouseFilter";
import CustomFilter from "../../../styles/buttons/CustomFilter";

const ItemWarehouse = () => {
  const [hasBeenScrolled, setHasBeenScrolled] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [filteredDataArray, setFilteredDataArray] = useState([]);
  const [inputToShow, setInputToShow] = useState("");
  const [items, setItems] = useState([]);

  const navigation = useNavigation();
  const filterSheetRef = useRef(null);

  const data = [
    { id: 1, code: "A/001", name: "Handuk A", qty: 1 },
    { id: 2, code: "A/002", name: "Handuk B", qty: 2 },
    { id: 3, code: "A/003", name: "Handuk C", qty: 3 },
  ];

  const searchItemWarehouseHandler = useCallback(
    _.debounce((value) => {
      setSearchInput(value);
    }, 300),
    []
  );

  const handleSearch = (value) => {
    searchItemWarehouseHandler(value);
    setInputToShow(value);
  };

  const handleClearSearch = () => {
    setInputToShow("");
    setSearchInput("");
  };

  const handleOpenSheet = () => {
    filterSheetRef.current?.show();
  };

  useEffect(() => {
    if (data?.length) {
      if (!searchInput) {
        setItems((prevData) => [...prevData, ...data]);
        setFilteredDataArray([]);
      } else {
        setFilteredDataArray((prevData) => [...prevData, ...data]);
        setItems([]);
      }
    }
  }, []);

  return (
    <Screen
      screenTitle="Item per Warehouse"
      returnButton={true}
      onPress={() => navigation.goBack()}
      childrenHeader={<CustomFilter toggle={handleOpenSheet} />}
    >
      <View style={styles.searchContainer}>
        <DataFilter
          inputToShow={inputToShow}
          handleSearch={handleSearch}
          handleClearSearch={handleClearSearch}
          placeholder={"Search"}
        />
      </View>
      <ItemWarehouseList
        data={items}
        hasBeenScrolled={hasBeenScrolled}
        setHasBeenScrolled={setHasBeenScrolled}
        filteredData={filteredDataArray}
      />
      <ItemWarehouseFilter reference={filterSheetRef} />
    </Screen>
  );
};

export default ItemWarehouse;

const styles = StyleSheet.create({
  searchContainer: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    gap: 10,
    borderTopColor: "#E8E9EB",
    backgroundColor: "#FFFFFF",
  },
});
