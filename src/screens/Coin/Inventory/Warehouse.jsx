import { useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import _ from "lodash";

import { StyleSheet, View } from "react-native";

import { useFetch } from "../../../hooks/useFetch";
import Screen from "../../../layouts/Screen";
import DataFilter from "../../../components/Coin/shared/DataFilter";
import WarehouseList from "../../../components/Coin/Warehouses/WarehouseList";

const Warehouse = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [filteredDataArray, setFilteredDataArray] = useState([]);
  const [inputToShow, setInputToShow] = useState("");
  const [hasBeenScrolled, setHasBeenScrolled] = useState(false);
  const [warehouse, setWarehouse] = useState([]);

  const navigation = useNavigation();

  const fetchWarehouseParameters = {
    page: currentPage,
    search: searchInput,
    limit: 20,
  };

  const { data, isLoading, isFetching, refetch } = useFetch(
    `/acc/warehouse`,
    [currentPage, searchInput],
    fetchWarehouseParameters
  );

  const fetchMoreWarehouse = () => {
    if (currentPage < data?.data?.last_page) {
      setCurrentPage(currentPage + 1);
    }
  };

  const searchWarehouseHandler = useCallback(
    _.debounce((value) => {
      setSearchInput(value);
      setCurrentPage(1);
    }, 300),
    []
  );

  const handleSearch = (value) => {
    searchWarehouseHandler(value);
    setInputToShow(value);
  };

  const handleClearSearch = () => {
    setInputToShow("");
    setSearchInput("");
  };

  useEffect(() => {
    setWarehouse([]);
    setFilteredDataArray([]);
  }, [searchInput]);

  useEffect(() => {
    if (data?.data?.data.length) {
      if (!searchInput) {
        setWarehouse((prevData) => [...prevData, ...data?.data?.data]);
        setFilteredDataArray([]);
      } else {
        setFilteredDataArray((prevData) => [...prevData, ...data?.data?.data]);
        setWarehouse([]);
      }
    }
  }, [data]);

  return (
    <Screen screenTitle="Warehouses" returnButton={true} backgroundColor="#FFFFFF" onPress={() => navigation.goBack()}>
      <View style={styles.searchContainer}>
        <DataFilter
          inputToShow={inputToShow}
          handleSearch={handleSearch}
          handleClearSearch={handleClearSearch}
          placeholder="Search"
        />
      </View>
      <WarehouseList
        data={warehouse}
        hasBeenScrolled={hasBeenScrolled}
        setHasBeenScrolled={setHasBeenScrolled}
        filteredData={filteredDataArray}
        navigation={navigation}
        fetchMore={fetchMoreWarehouse}
        refetch={refetch}
        isFetching={isFetching}
        isLoading={isLoading}
      />
    </Screen>
  );
};

export default Warehouse;

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
