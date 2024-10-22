import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import _ from "lodash";

import { StyleSheet, View } from "react-native";

import DataFilter from "../../../components/Coin/shared/DataFilter";
import PurchaseOrderList from "../../../components/Coin/PurchaseOrder/PurchaseOrderList";
import { useFetch } from "../../../hooks/useFetch";
import Screen from "../../../layouts/Screen";
import CustomFilter from "../../../styles/buttons/CustomFilter";
import PurchaseOrderFilter from "../../../components/Coin/PurchaseOrder/PurchaseOrderFilter";

const PurchaseOrder = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [filteredDataArray, setFilteredDataArray] = useState([]);
  const [inputToShow, setInputToShow] = useState("");
  const [hasBeenScrolled, setHasBeenScrolled] = useState(false);
  const [purchaseOrder, setPurchaseOrder] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [status, setStatus] = useState(null);
  const [supplier, setSupplier] = useState(null);

  const navigation = useNavigation();
  const filterSheetRef = useRef();

  const currencyConverter = new Intl.NumberFormat("en-US", {});

  const statusTypes = [
    { value: "Pending", label: "Pending" },
    { value: "Partially", label: "Partially" },
    { value: "Processed", label: "Processed" },
  ];

  const fetchPurchaseOrderParameters = {
    page: currentPage,
    search: searchInput,
    limit: 20,
    status: status,
    supplier: supplier,
    begin_date: startDate,
    end_date: endDate,
  };

  const { data, isFetching, isLoading, refetch } = useFetch(
    `/acc/purchase-order`,
    [currentPage, searchInput, startDate, endDate, status, supplier],
    fetchPurchaseOrderParameters
  );

  const { data: supplierData } = useFetch(`/acc/supplier`);

  const supplierOptions = supplierData?.data?.map((item) => ({
    value: item?.id,
    label: item?.name,
  }));

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

  /**
   * Handle start and end date archived
   * @param {*} date
   */
  const startDateChangeHandler = (date) => {
    setStartDate(date);
  };
  const endDateChangeHandler = (date) => {
    setEndDate(date);
  };

  const handleClearSearch = () => {
    setInputToShow("");
    setSearchInput("");
  };

  const resetFilterHandler = () => {
    setStatus(null);
    setSupplier(null);
    setStartDate(null);
    setEndDate(null);
  };

  const handleSearch = (value) => {
    searchPurchaseOrderHandler(value);
    setInputToShow(value);
  };

  const handleOpenFilter = () => {
    filterSheetRef.current?.show();
  };

  useEffect(() => {
    setEndDate(startDate);
  }, [startDate]);

  useEffect(() => {
    setPurchaseOrder([]);
  }, [status, startDate, endDate, supplier]);

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
    <Screen
      screenTitle="Purchase Order"
      returnButton={true}
      onPress={() => navigation.goBack()}
      childrenHeader={
        <CustomFilter toggle={handleOpenFilter} filterAppear={status || supplier || startDate || endDate} />
      }
    >
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
        converter={currencyConverter}
      />
      <PurchaseOrderFilter
        reference={filterSheetRef}
        startDate={startDate}
        endDate={endDate}
        value={status}
        supplierValue={supplier}
        types={statusTypes}
        suppliers={supplierOptions}
        status={status}
        supplier={supplier}
        handleStartDate={startDateChangeHandler}
        handleEndDate={endDateChangeHandler}
        handleResetFilter={resetFilterHandler}
        handleStatusChange={setStatus}
        handleSupplierChange={setSupplier}
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
