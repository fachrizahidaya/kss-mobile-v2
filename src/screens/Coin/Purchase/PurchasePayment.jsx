import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import _ from "lodash";

import { StyleSheet, View } from "react-native";

import { useFetch } from "../../../hooks/useFetch";
import Screen from "../../../layouts/Screen";
import DataFilter from "../../../components/Coin/shared/DataFilter";
import PurchasePaymentList from "../../../components/Coin/PurchasePayment/PurchasePaymentList";
import CustomFilter from "../../../styles/buttons/CustomFilter";
import PurchasePaymentFilter from "../../../components/Coin/PurchasePayment/PurchasePaymentFilter";

const PurchasePayment = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [filteredDataArray, setFilteredDataArray] = useState([]);
  const [inputToShow, setInputToShow] = useState("");
  const [hasBeenScrolled, setHasBeenScrolled] = useState(false);
  const [purchasePayment, setPurchasePayment] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [supplier, setSupplier] = useState(null);

  const navigation = useNavigation();
  const filterSheetRef = useRef();

  const currencyConverter = new Intl.NumberFormat("en-US", {});

  const fetchPurchasePaymentParameters = {
    page: currentPage,
    search: searchInput,
    limit: 20,
    supplier: supplier,
    begin_date: startDate,
    end_date: endDate,
  };

  const { data, isFetching, isLoading, refetch } = useFetch(
    `/acc/purchase-payment`,
    [currentPage, searchInput],
    fetchPurchasePaymentParameters
  );

  const { data: supplierData } = useFetch(`/acc/supplier`);

  const supplierOptions = supplierData?.data?.map((item) => ({
    value: item?.id,
    label: item?.name,
  }));

  const fetchMorePurchasePayment = () => {
    if (currentPage < data?.data?.last_page) {
      setCurrentPage(currentPage + 1);
    }
  };

  const searchPurchasePaymentHandler = useCallback(
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
    searchPurchasePaymentHandler(value);
    setInputToShow(value);
  };

  const handleClearSearch = () => {
    setInputToShow("");
    setSearchInput("");
  };

  const handleOpenFilter = () => {
    filterSheetRef.current?.show();
  };

  const resetFilterHandler = () => {
    setSupplier(null);
    setStartDate(null);
    setEndDate(null);
  };

  useEffect(() => {
    setEndDate(startDate);
  }, [startDate]);

  useEffect(() => {
    setPurchasePayment([]);
  }, [startDate, endDate, supplier]);

  useEffect(() => {
    setPurchasePayment([]);
    setFilteredDataArray([]);
  }, [searchInput]);

  useEffect(() => {
    if (data?.data?.data.length) {
      if (!searchInput) {
        setPurchasePayment((prevData) => [...prevData, ...data?.data?.data]);
        setFilteredDataArray([]);
      } else {
        setFilteredDataArray((prevData) => [...prevData, ...data?.data?.data]);
        setPurchasePayment([]);
      }
    }
  }, [data]);

  return (
    <Screen
      screenTitle="Purchase Payment"
      returnButton={true}
      onPress={() => navigation.goBack()}
      childrenHeader={<CustomFilter toggle={handleOpenFilter} filterAppear={startDate || endDate || supplier} />}
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
      <PurchasePaymentList
        data={purchasePayment}
        isFetching={isFetching}
        isLoading={isLoading}
        refetch={refetch}
        fetchMore={fetchMorePurchasePayment}
        filteredData={filteredDataArray}
        hasBeenScrolled={hasBeenScrolled}
        setHasBeenScrolled={setHasBeenScrolled}
        navigation={navigation}
        converter={currencyConverter}
      />
      <PurchasePaymentFilter
        reference={filterSheetRef}
        startDate={startDate}
        endDate={endDate}
        supplierValue={supplier}
        suppliers={supplierOptions}
        supplier={supplier}
        handleStartDate={startDateChangeHandler}
        handleEndDate={endDateChangeHandler}
        handleResetFilter={resetFilterHandler}
        handleSupplierChange={setSupplier}
      />
    </Screen>
  );
};

export default PurchasePayment;

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
