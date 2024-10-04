import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import _ from "lodash";

import { StyleSheet, View } from "react-native";

import DataFilter from "../../../components/Coin/shared/DataFilter";
import ItemMinimumList from "../../../components/Coin/ItemMinimum/ItemMinimumList";
import Screen from "../../../layouts/Screen";
import CustomFilter from "../../../styles/buttons/CustomFilter";
import ItemMinimumFilter from "../../../components/Coin/ItemMinimum/ItemMinimumFilter";

const ItemMinimum = () => {
  const [hasBeenScrolled, setHasBeenScrolled] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [filteredDataArray, setFilteredDataArray] = useState([]);
  const [inputToShow, setInputToShow] = useState("");
  const [items, setItems] = useState([]);

  const navigation = useNavigation();
  const filterSheetRef = useRef(null);

  const data = [
    { id: 1, code: "A/001", name: "Handuk A", available_qty: 1, supplier: "PT A", ordered_qty: 1, requested_qty: 1 },
    { id: 2, code: "A/002", name: "Handuk B", available_qty: 2, supplier: "PT B", ordered_qty: 1, requested_qty: 1 },
    { id: 3, code: "A/003", name: "Handuk C", available_qty: 3, supplier: "PT C", ordered_qty: 1, requested_qty: 1 },
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
      screenTitle="Item Minimum"
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
      <ItemMinimumList
        hasBeenScrolled={hasBeenScrolled}
        setHasBeenScrolled={setHasBeenScrolled}
        data={items}
        filteredData={filteredDataArray}
      />
      <ItemMinimumFilter reference={filterSheetRef} />
    </Screen>
  );
};

export default ItemMinimum;

const styles = StyleSheet.create({
  wrapper: {
    gap: 21,
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: -20,
  },
  content: {
    padding: 5,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#E8E9EB",
    backgroundColor: "#FFFFFF",
  },
  searchContainer: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    gap: 10,
    borderTopColor: "#E8E9EB",
    backgroundColor: "#FFFFFF",
  },
});
