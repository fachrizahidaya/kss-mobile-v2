import { useCallback, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import _ from "lodash";

import { SafeAreaView, StyleSheet, View } from "react-native";

import PageHeader from "../../../components/shared/PageHeader";
import DataFilter from "../../../components/Coin/shared/DataFilter";
import PurchaseOrderList from "../../../components/Coin/PurchaseOrder/PurchaseOrderList";
import { useFetch } from "../../../hooks/useFetch";

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
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <PageHeader title="Purchase Order" onPress={() => navigation.goBack()} />
          <DataFilter
            handleSearch={handleSearch}
            handleClearSearch={handleClearSearch}
            inputToShow={inputToShow}
            setInputToShow={setInputToShow}
            setSearchInput={setSearchInput}
            placeholder="Search PO..."
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
      </SafeAreaView>
    </>
  );
};

export default PurchaseOrder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    position: "relative",
  },
  header: {
    gap: 15,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 14,
    paddingVertical: 16,
  },
});
