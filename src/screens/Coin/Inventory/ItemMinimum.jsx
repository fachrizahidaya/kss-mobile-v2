import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import _ from "lodash";

import { StyleSheet, View } from "react-native";

import DataFilter from "../../../components/Coin/shared/DataFilter";
import ItemMinimumList from "../../../components/Coin/ItemMinimum/ItemMinimumList";
import Screen from "../../../layouts/Screen";
import CustomFilter from "../../../styles/buttons/CustomFilter";
import ItemMinimumFilter from "../../../components/Coin/ItemMinimum/ItemMinimumFilter";
import { useFetch } from "../../../hooks/useFetch";

const ItemMinimum = () => {
  const [hasBeenScrolled, setHasBeenScrolled] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchWarehouseInput, setSearchWarehouseInput] = useState("");
  const [filteredDataArray, setFilteredDataArray] = useState([]);
  const [inputToShow, setInputToShow] = useState("");
  const [warehouseInputToShow, setWarehouseInputToShow] = useState("");
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [warehouse, setWarehouse] = useState(null);

  const navigation = useNavigation();
  const filterSheetRef = useRef(null);
  const selectWarehouseRef = useRef(null);

  const fetchItemMinimumParameters = {
    warehouse_id: warehouse,
    page: currentPage,
    limit: 20,
    search: searchInput,
  };

  const fetchWarehouseParameters = {
    search: searchWarehouseInput,
  };

  const { data, isLoading, isFetching, refetch } = useFetch(
    `/acc/item-stock/minimum-stock`,
    [currentPage, searchInput, warehouse],
    fetchItemMinimumParameters
  );
  const { data: warehouseData } = useFetch(`/acc/warehouse`, [searchWarehouseInput], fetchWarehouseParameters);

  const warehouseOptions = warehouseData?.data?.map((item) => ({
    value: item?.id,
    label: item?.name,
  }));

  const fetchMoreItem = () => {
    if (currentPage < data?.data?.last_page) {
      setCurrentPage(currentPage + 1);
    }
  };

  const searchItemMinimumHandler = useCallback(
    _.debounce((value) => {
      setSearchInput(value);
    }, 300),
    []
  );

  const searchWarehouseHandler = useCallback(
    _.debounce((value) => {
      setSearchWarehouseInput(value);
    }, 300),
    []
  );

  const handleSearch = (value) => {
    searchItemMinimumHandler(value);
    setInputToShow(value);
  };

  const handleSearchWarehouse = (value) => {
    searchWarehouseHandler(value);
    setWarehouseInputToShow(value);
  };

  const handleClearSearch = () => {
    setInputToShow("");
    setSearchInput("");
  };

  const resetFilterHandler = () => {
    setWarehouse(null);
  };

  const handleOpenSheet = () => {
    filterSheetRef.current?.show();
  };

  const handleSelectWarehouse = (value) => {
    setWarehouse(value);
  };

  useEffect(() => {
    setItems([]);
    setFilteredDataArray([]);
  }, [searchInput]);

  useEffect(() => {
    setItems([]);
  }, [warehouse]);

  useEffect(() => {
    if (data?.data?.data?.length) {
      if (!searchInput) {
        setItems((prevData) => [...prevData, ...data?.data?.data]);
        setFilteredDataArray([]);
      } else {
        setFilteredDataArray((prevData) => [...prevData, ...data?.data?.data]);
        setItems([]);
      }
    }
  }, [data]);

  return (
    <Screen
      screenTitle="Item Minimum"
      returnButton={true}
      onPress={() => navigation.goBack()}
      childrenHeader={<CustomFilter toggle={handleOpenSheet} filterAppear={warehouse} />}
    >
      <View style={styles.searchContainer}>
        <DataFilter
          inputToShow={inputToShow}
          handleSearch={handleSearch}
          handleClearSearch={handleClearSearch}
          placeholder="Search"
        />
      </View>
      <ItemMinimumList
        hasBeenScrolled={hasBeenScrolled}
        setHasBeenScrolled={setHasBeenScrolled}
        data={items}
        filteredData={filteredDataArray}
        fetchMore={fetchMoreItem}
        isFetching={isFetching}
        isLoading={isLoading}
        refetch={refetch}
      />
      <ItemMinimumFilter
        reference={filterSheetRef}
        selectWarehouseReference={selectWarehouseRef}
        items={warehouseOptions}
        handleChange={handleSelectWarehouse}
        inputToShow={warehouseInputToShow}
        setInputToShow={setWarehouseInputToShow}
        setSearchInput={setSearchWarehouseInput}
        handleSearch={handleSearchWarehouse}
        warehouse={warehouse}
        handleReset={resetFilterHandler}
      />
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
