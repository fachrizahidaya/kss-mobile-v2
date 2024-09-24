import { useCallback, useEffect, useState } from "react";
import _ from "lodash";
import { useNavigation } from "@react-navigation/native";

import { StyleSheet, View } from "react-native";

import { useFetch } from "../../../hooks/useFetch";
import ReceiptPurchaseOrderList from "../../../components/Coin/ReceiptPurchaseOrder/ReceiptPurchaseOrderList";
import ReceiptPurchaseOrderFilter from "../../../components/Coin/ReceiptPurchaseOrder/ReceiptPurchaseOrderFilter";
import Screen from "../../../layouts/Screen";

const ReceiptPurchaseOrder = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [filteredDataArray, setFilteredDataArray] = useState([]);
  const [inputToShow, setInputToShow] = useState("");
  const [hasBeenScrolled, setHasBeenScrolled] = useState(false);
  const [receiptPurchaseOrder, setReceiptPurchaseOrder] = useState([]);

  const navigation = useNavigation();

  const fetchReceiptPurchaseOrderParameters = {
    page: currentPage,
    search: searchInput,
    limit: 20,
  };

  const { data, isFetching, isLoading, refetch } = useFetch(
    `/acc/po-receipt`,
    [currentPage, searchInput],
    fetchReceiptPurchaseOrderParameters
  );

  const fetchMoreReceiptPurchaseOrder = () => {
    if (currentPage < data?.data?.last_page) {
      setCurrentPage(currentPage + 1);
    }
  };

  const searchReceiptPurchaseOrderHandler = useCallback(
    _.debounce((value) => {
      setSearchInput(value);
      setCurrentPage(1);
    }, 300),
    []
  );

  const handleSearch = (value) => {
    searchReceiptPurchaseOrderHandler(value);
    setInputToShow(value);
  };

  const handleClearSearch = () => {
    setInputToShow("");
    setSearchInput("");
  };

  useEffect(() => {
    setFilteredDataArray([]);
  }, [searchInput]);

  useEffect(() => {
    if (data?.data?.data?.length) {
      if (!searchInput) {
        setReceiptPurchaseOrder((prevData) => [...prevData, ...data?.data?.data]);
        setFilteredDataArray([]);
      } else {
        setFilteredDataArray((prevData) => [...prevData, ...data?.data?.data]);
        setReceiptPurchaseOrder([]);
      }
    }
  }, [data]);

  return (
    <Screen screenTitle="Receive Purchase Order" returnButton={true} onPress={() => navigation.goBack()}>
      <View style={styles.searchContainer}>
        <ReceiptPurchaseOrderFilter
          handleSearch={handleSearch}
          handleClearSearch={handleClearSearch}
          inputToShow={inputToShow}
          setInputToShow={setInputToShow}
          setSearchInput={setSearchInput}
        />
      </View>
      <ReceiptPurchaseOrderList
        data={receiptPurchaseOrder}
        isFetching={isFetching}
        isLoading={isLoading}
        refetch={refetch}
        fetchMore={fetchMoreReceiptPurchaseOrder}
        filteredData={filteredDataArray}
        hasBeenScrolled={hasBeenScrolled}
        setHasBeenScrolled={setHasBeenScrolled}
        navigation={navigation}
      />
    </Screen>
  );
};

export default ReceiptPurchaseOrder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  header: {
    gap: 15,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 14,
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
