import { useCallback, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import _ from "lodash";

import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { SheetManager } from "react-native-actions-sheet";

import PageHeader from "../../../styles/PageHeader";
import DataFilter from "../../../components/Coin/shared/DataFilter";
import ItemWarehouseList from "../../../components/Coin/ItemWarehouse/ItemWarehouseList";
import Select from "../../../styles/forms/Select";

const ItemWarehouse = () => {
  const [hasBeenScrolled, setHasBeenScrolled] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [filteredDataArray, setFilteredDataArray] = useState([]);
  const [inputToShow, setInputToShow] = useState("");
  const [items, setItems] = useState([]);

  const navigation = useNavigation();

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
          <PageHeader title="Item Per Warehouse" onPress={() => navigation.goBack()} />
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
      <ItemWarehouseList
        data={items}
        hasBeenScrolled={hasBeenScrolled}
        setHasBeenScrolled={setHasBeenScrolled}
        filteredData={filteredDataArray}
      />
    </SafeAreaView>
  );
};

export default ItemWarehouse;

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
