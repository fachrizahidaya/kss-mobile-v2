import { useCallback, useEffect, useRef, useState } from "react";
import _ from "lodash";
import { useNavigation } from "@react-navigation/native";

import { StyleSheet, View } from "react-native";

import { useFetch } from "../../../hooks/useFetch";
import ReceiptPurchaseOrderList from "../../../components/Coin/ReceiptPurchaseOrder/ReceiptPurchaseOrderList";
import ReceiptPurchaseOrderFilter from "../../../components/Coin/ReceiptPurchaseOrder/ReceiptPurchaseOrderFilter";
import Screen from "../../../layouts/Screen";
import DataFilter from "../../../components/Coin/shared/DataFilter";
import CustomFilter from "../../../styles/buttons/CustomFilter";

const ReceiptPurchaseOrder = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [filteredDataArray, setFilteredDataArray] = useState([]);
  const [inputToShow, setInputToShow] = useState("");
  const [hasBeenScrolled, setHasBeenScrolled] = useState(false);
  const [receiptPurchaseOrder, setReceiptPurchaseOrder] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [status, setStatus] = useState(null);
  const [supplier, setSupplier] = useState(null);

  const navigation = useNavigation();
  const filterSheetRef = useRef();

  const statusTypes = [
    { value: "Pending", label: "Pending" },
    { value: "Invoice Partially", label: "Invoice Partially" },
    { value: "Received", label: "Received" },
  ];

  const fetchReceiptPurchaseOrderParameters = {
    page: currentPage,
    search: searchInput,
    limit: 20,
    status: status,
    supplier: supplier,
    begin_date: startDate,
    end_date: endDate,
  };

  const { data, isFetching, isLoading, refetch } = useFetch(
    `/acc/receive-purchase-order`,
    [currentPage, searchInput, startDate, endDate, status, supplier],
    fetchReceiptPurchaseOrderParameters
  );

  const { data: supplierData } = useFetch(`/acc/supplier`);

  const supplierOptions = supplierData?.data?.map((item) => ({
    value: item?.id,
    label: item?.name,
  }));

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

  const handleSearch = (value) => {
    searchReceiptPurchaseOrderHandler(value);
    setInputToShow(value);
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

  const handleOpenFilter = () => {
    filterSheetRef.current?.show();
  };

  useEffect(() => {
    setEndDate(startDate);
  }, [startDate]);

  useEffect(() => {
    setReceiptPurchaseOrder([]);
  }, [status, startDate, endDate, supplier]);

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
    <Screen
      screenTitle="Receive Purchase Order"
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
      <ReceiptPurchaseOrderFilter
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
