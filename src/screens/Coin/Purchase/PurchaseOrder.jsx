import { useCallback, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import _ from "lodash";

import { StyleSheet, View } from "react-native";

import DataFilter from "../../../components/Coin/shared/DataFilter";
import PurchaseOrderList from "../../../components/Coin/PurchaseOrder/PurchaseOrderList";
import { useFetch } from "../../../hooks/useFetch";
import Screen from "../../../styles/Screen";

const PurchaseOrder = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [filteredDataArray, setFilteredDataArray] = useState([]);
  const [inputToShow, setInputToShow] = useState("");
  const [hasBeenScrolled, setHasBeenScrolled] = useState(false);
  const [purchaseOrder, setPurchaseOrder] = useState([]);

  const navigation = useNavigation();

  const fetchPurchaseOrderParameters = {
    page: currentPage,
    search: searchInput,
    limit: 20,
  };

  const { data, isFetching, isLoading, refetch } = useFetch(
    `/acc/po`,
    [currentPage, searchInput],
    fetchPurchaseOrderParameters
  );

  const fetchMorePurchaseOrder = () => {
    if (currentPage < data?.data?.last_page) {
      setCurrentPage(currentPage + 1);
    }
  };

  const searchPurchaseOrderHandler = useCallback(
    _.debounce((value) => {
      setSearchInput(value);
      setCurrentPage(1);
    }, 300),
    []
  );

  const handleClearSearch = () => {
    setInputToShow("");
    setSearchInput("");
  };

  const handleSearch = (value) => {
    searchPurchaseOrderHandler(value);
    setInputToShow(value);
  };

  useEffect(() => {
    setPurchaseOrder([]);
    setFilteredDataArray([]);
  }, [searchInput]);

  useEffect(() => {
    if (data?.data?.data.length) {
      if (!searchInput) {
        setPurchaseOrder((prevData) => [...prevData, ...data?.data?.data]);
        setFilteredDataArray([]);
      } else {
        setFilteredDataArray((prevData) => [...prevData, ...data?.data?.data]);
        setPurchaseOrder([]);
      }
    }
  }, [data]);

  return (
    <Screen screenTitle="Purchase Order" returnButton={true} onPress={() => navigation.goBack()}>
      <View style={styles.searchContainer}>
        <DataFilter
          handleSearch={handleSearch}
          handleClearSearch={handleClearSearch}
          inputToShow={inputToShow}
          setInputToShow={setInputToShow}
          setSearchInput={setSearchInput}
          placeholder="Search"
        />
      </View>
      <PurchaseOrderList
        data={purchaseOrder}
        isFetching={isFetching}
        isLoading={isLoading}
        refetch={refetch}
        fetchMore={fetchMorePurchaseOrder}
        filteredData={filteredDataArray}
        hasBeenScrolled={hasBeenScrolled}
        setHasBeenScrolled={setHasBeenScrolled}
        navigation={navigation}
      />
    </Screen>
  );
};

export default PurchaseOrder;

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
