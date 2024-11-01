import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import _ from "lodash";

import { StyleSheet, View } from "react-native";

import DataFilter from "../../../components/Coin/shared/DataFilter";
import ItemWarehouseList from "../../../components/Coin/ItemWarehouse/ItemWarehouseList";
import Screen from "../../../layouts/Screen";
import ItemWarehouseFilter from "../../../components/Coin/ItemWarehouse/ItemWarehouseFilter";
import CustomFilter from "../../../styles/buttons/CustomFilter";
import { useFetch } from "../../../hooks/useFetch";

const ItemWarehouse = () => {
  const [hasBeenScrolled, setHasBeenScrolled] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [filteredDataItem, setFilteredDataItem] = useState([]);
  const [filteredDataWarehouse, setFilteredDataWarehouse] = useState([]);
  const [inputToShow, setInputToShow] = useState("");
  const [items, setItems] = useState([]);
  const [searchBy, setSearchBy] = useState("Warehouse");
  const [warehouse, setWarehouse] = useState(null);
  const [item, setItem] = useState(null);
  const [warehouses, setWarehouses] = useState([]);
  const [searchWarehouseInput, setSearchWarehouseInput] = useState("");
  const [warehouseInputToShow, setWarehouseInputToShow] = useState("");
  const [searchItemInput, setSearchItemInput] = useState("");
  const [itemInputToShow, setItemInputToShow] = useState("");
  const [currentPageItem, setCurrentPageItem] = useState(1);
  const [currentPageWarehouse, setCurrentPageWarehouse] = useState(1);

  const navigation = useNavigation();
  const filterSheetRef = useRef(null);
  const selectSearchRef = useRef(null);

  const fetchItemByWarehouseParameters = {
    warehouse_id: warehouse,
    page: currentPageItem,
    limit: 20,
    search: searchInput,
  };

  const fetchWarehouseByItemParameters = {
    item_id: item,
    page: currentPageWarehouse,
    limit: 20,
    search: searchInput,
  };

  const fetchWarehouseParameters = {
    search: searchWarehouseInput,
  };

  const fetchItemParameters = {
    search: searchItemInput,
  };

  const searchByOptions = [
    { label: "Warehouse", value: "Warehouse" },
    { label: "Item", value: "Item" },
  ];

  const {
    data: itemByWarehouse,
    isFetching: itemByWarehouseIsFetching,
    isLoading: itemByWarehouseIsLoading,
    refetch: refetchItemByWarehouse,
  } = useFetch(`/acc/item-warehouse`, [warehouse, currentPageItem], fetchItemByWarehouseParameters);

  const {
    data: warehouseByItem,
    isFetching: warehouseByItemIsFetching,
    isLoading: warehouseByItemIsLoading,
    refetch: refetchWarehouseByItem,
  } = useFetch(`/acc/item-warehouse`, [item], fetchWarehouseByItemParameters);

  const { data: warehouseData } = useFetch(
    searchBy === "Warehouse" && `/acc/warehouse`,
    [searchWarehouseInput],
    fetchWarehouseParameters
  );
  const { data: itemData } = useFetch(searchBy === "Item" && `acc/item`, [searchItemInput], fetchItemParameters);

  const warehouseOptions = warehouseData?.data?.map((item) => ({
    value: item?.id,
    label: item?.name,
  }));

  const itemOptions = itemData?.data?.map((item) => ({
    value: item?.id,
    label: item?.name,
  }));

  const fetchMoreItem = () => {
    if (currentPageItem < data?.data?.last_page) {
      setCurrentPageItem(currentPageItem + 1);
    }
  };

  const fetchMoreWarehouse = () => {
    if (currentPageWarehouse < data?.data?.last_page) {
      setCurrentPageWarehouse(currentPageWarehouse + 1);
    }
  };

  const searchItemWarehouseHandler = useCallback(
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

  const searchItemHandler = useCallback(
    _.debounce((value) => {
      setSearchItemInput(value);
    }, 300),
    []
  );

  const handleSearch = (value) => {
    searchItemWarehouseHandler(value);
    setInputToShow(value);
  };

  const handleSearchItem = (value) => {
    searchItemHandler(value);
    setItemInputToShow(value);
  };

  const handleSearchWarehouse = (value) => {
    searchWarehouseHandler(value);
    setWarehouseInputToShow(value);
  };

  const handleClearSearch = () => {
    setInputToShow("");
    setSearchInput("");
  };

  const handleOpenSheet = () => {
    filterSheetRef.current?.show();
  };

  const handleChangeFetchBy = (value) => {
    if (value === "Item") {
      setWarehouse(null);
      setWarehouses([]);
    } else {
      setItem(null);
      setItems([]);
    }
    setSearchBy(value);
  };

  const handleSelectWarehouse = (value) => {
    setWarehouse(value);
  };

  const handleSelectItem = (value) => {
    setItem(value);
  };

  const resetFilterHandler = () => {
    setSearchBy("Warehouse");
    setWarehouse(null);
    setItem(null);
  };

  useEffect(() => {
    setItems([]);
    setFilteredDataItem([]);
  }, [searchInput]);

  useEffect(() => {
    setWarehouses([]);
    setFilteredDataWarehouse([]);
  }, [searchInput]);

  useEffect(() => {
    setWarehouses([]);
  }, [item]);

  useEffect(() => {
    setItems([]);
  }, [warehouse]);

  useEffect(() => {
    if (itemByWarehouse?.data?.data?.length) {
      if (!searchInput) {
        setItems((prevData) => [...prevData, ...itemByWarehouse?.data?.data]);
        setFilteredDataItem([]);
      } else {
        setFilteredDataItem((prevData) => [...prevData, ...itemByWarehouse?.data?.data]);
        setItems([]);
      }
    }
  }, [itemByWarehouse]);

  useEffect(() => {
    if (warehouseByItem?.data?.data?.length) {
      if (!searchInput) {
        setWarehouses((prevData) => [...prevData, ...warehouseByItem?.data?.data]);
        setFilteredDataWarehouse([]);
      } else {
        setFilteredDataWarehouse((prevData) => [...prevData, ...warehouseByItem?.data?.data]);
        setWarehouses([]);
      }
    }
  }, [warehouseByItem]);

  return (
    <Screen
      screenTitle="Item per Warehouse"
      returnButton={true}
      onPress={() => navigation.goBack()}
      childrenHeader={<CustomFilter toggle={handleOpenSheet} filterAppear={warehouse || item} />}
    >
      <View style={styles.searchContainer}>
        <DataFilter
          inputToShow={inputToShow}
          handleSearch={handleSearch}
          handleClearSearch={handleClearSearch}
          placeholder="Search"
        />
      </View>
      <ItemWarehouseList
        data={items?.length > 0 ? items : warehouses}
        hasBeenScrolled={hasBeenScrolled}
        setHasBeenScrolled={setHasBeenScrolled}
        filteredData={filteredDataItem?.length > 0 ? filteredDataItem : filteredDataWarehouse}
        isFetching={
          items?.length || filteredDataItem?.length > 0 > 0 ? itemByWarehouseIsFetching : warehouseByItemIsFetching
        }
        isLoading={
          items?.length > 0 || filteredDataItem?.length > 0 ? itemByWarehouseIsLoading : warehouseByItemIsLoading
        }
        refetch={items?.length > 0 || filteredDataItem?.length > 0 ? refetchItemByWarehouse : refetchWarehouseByItem}
        fetchMore={items?.length > 0 || filteredDataItem?.length > 0 ? fetchMoreItem : fetchMoreWarehouse}
        warehouse={warehouse}
      />
      <ItemWarehouseFilter
        reference={filterSheetRef}
        handleChange={handleChangeFetchBy}
        value={searchBy}
        items={searchByOptions}
        selectReference={selectSearchRef}
        itemsOption={searchBy === "Warehouse" ? warehouseOptions : itemOptions}
        setSearchInput={searchBy === "Warehouse" ? setSearchWarehouseInput : setSearchItemInput}
        setInputToShow={searchBy === "Warehouse" ? setWarehouseInputToShow : setItemInputToShow}
        selectedOption={searchBy === "Warehouse" ? warehouse : item}
        handleChangeOption={searchBy === "Warehouse" ? handleSelectWarehouse : handleSelectItem}
        handleSearchOption={searchBy === "Warehouse" ? handleSearchWarehouse : handleSearchItem}
        handleReset={resetFilterHandler}
        inputToShow={searchBy === "Warehouse" ? warehouseInputToShow : itemInputToShow}
      />
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
