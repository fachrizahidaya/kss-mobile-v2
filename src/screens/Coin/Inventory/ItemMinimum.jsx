import { useCallback, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import _ from "lodash";

import { Pressable, SafeAreaView, StyleSheet, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { SheetManager } from "react-native-actions-sheet";

import PageHeader from "../../../styles/PageHeader";
import DataFilter from "../../../components/Coin/shared/DataFilter";
import Select from "../../../styles/forms/Select";
import ItemMinimumList from "../../../components/Coin/ItemMinimum/ItemMinimumList";

const ItemMinimum = () => {
  const [hasBeenScrolled, setHasBeenScrolled] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [filteredDataArray, setFilteredDataArray] = useState([]);
  const [inputToShow, setInputToShow] = useState("");
  const [items, setItems] = useState([]);

  const navigation = useNavigation();

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
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <PageHeader title="Item Minimum Stock" onPress={() => navigation.goBack()} />
          <Pressable
            style={styles.content}
            onPress={() =>
              SheetManager.show("form-sheet", {
                payload: {
                  children: (
                    <View style={styles.wrapper}>
                      <View style={{ gap: 5 }}>
                        <Select />
                      </View>
                    </View>
                  ),
                },
              })
            }
          >
            <View style={{ alignItems: "center", gap: 5 }}>
              <MaterialCommunityIcons name="tune-variant" size={20} color="#3F434A" />
            </View>
          </Pressable>
        </View>
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
    </SafeAreaView>
  );
};

export default ItemMinimum;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    position: "relative",
  },
  header: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 15,
  },
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
});
