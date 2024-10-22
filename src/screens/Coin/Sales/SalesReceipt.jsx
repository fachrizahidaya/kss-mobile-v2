import { useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useRef, useState } from "react";
import _ from "lodash";

import { StyleSheet, View } from "react-native";

import { useFetch } from "../../../hooks/useFetch";
import Screen from "../../../layouts/Screen";
import CustomFilter from "../../../styles/buttons/CustomFilter";
import SalesReceiptList from "../../../components/Coin/SalesReceipt/SalesReceiptList";
import SalesReceiptFilter from "../../../components/Coin/SalesReceipt/SalesReceiptFilter";
import DataFilter from "../../../components/Coin/shared/DataFilter";

const SalesReceipt = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [filteredDataArray, setFilteredDataArray] = useState([]);
  const [inputToShow, setInputToShow] = useState("");
  const [hasBeenScrolled, setHasBeenScrolled] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [status, setStatus] = useState(null);
  const [salesReceipt, setSalesReceipt] = useState([]);

  const navigation = useNavigation();
  const filterSheetRef = useRef();

  const currencyConverter = new Intl.NumberFormat("en-US", {});

  const fetchSalesReceiptParameters = {
    page: currentPage,
    search: searchInput,
    limit: 20,
    begin_date: startDate,
    end_date: endDate,
    customer_id: status,
  };

  const { data, isFetching, isLoading, refetch } = useFetch(
    `/acc/sales-receipt`,
    [currentPage, searchInput, startDate, endDate, status],
    fetchSalesReceiptParameters
  );

  const { data: customerData } = useFetch(`/acc/customer`);

  const customerOptions = customerData?.data?.map((item, index) => ({
    value: item?.id,
    label: item?.name,
  }));

  const fetchMoreSalesReceipt = () => {
    if (currentPage < data?.data?.last_page) {
      setCurrentPage(currentPage + 1);
    }
  };

  const searchSalesReceiptHandler = useCallback(
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
    searchSalesReceiptHandler(value);
    setInputToShow(value);
  };

  const handleClearSearch = () => {
    setInputToShow("");
    setSearchInput("");
  };

  const resetFilterHandler = () => {
    setStatus(null);
    setStartDate(null);
    setEndDate(null);
  };

  const handleOpenSheet = () => {
    filterSheetRef.current?.show();
  };

  useEffect(() => {
    setEndDate(startDate);
  }, [startDate]);

  useEffect(() => {
    setSalesReceipt([]);
  }, [status, startDate, endDate]);

  useEffect(() => {
    setSalesReceipt([]);
    setFilteredDataArray([]);
  }, [searchInput]);

  useEffect(() => {
    if (data?.data?.data.length) {
      if (!searchInput) {
        setSalesReceipt((prevData) => [...prevData, ...data?.data?.data]);
        setFilteredDataArray([]);
      } else {
        setFilteredDataArray((prevData) => [...prevData, ...data?.data?.data]);
        setSalesReceipt([]);
      }
    }
  }, [data]);

  return (
    <Screen
      screenTitle="Sales Receipt"
      returnButton={true}
      onPress={() => navigation.goBack()}
      childrenHeader={<CustomFilter toggle={handleOpenSheet} filterAppear={status || startDate || endDate} />}
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
      <SalesReceiptList
        data={salesReceipt}
        isFetching={isFetching}
        isLoading={isLoading}
        refetch={refetch}
        fetchMore={fetchMoreSalesReceipt}
        filteredData={filteredDataArray}
        hasBeenScrolled={hasBeenScrolled}
        setHasBeenScrolled={setHasBeenScrolled}
        navigation={navigation}
        currencyConverter={currencyConverter}
      />
      <SalesReceiptFilter
        startDate={startDate}
        endDate={endDate}
        handleStartDate={startDateChangeHandler}
        handleEndDate={endDateChangeHandler}
        types={customerOptions}
        handleStatusChange={setStatus}
        value={status}
        reference={filterSheetRef}
        handleResetFilter={resetFilterHandler}
        status={status}
      />
    </Screen>
  );
};

export default SalesReceipt;

const styles = StyleSheet.create({
  searchContainer: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    gap: 10,
    borderTopColor: "#E8E9EB",
    backgroundColor: "#FFFFFF",
  },
  filterIndicator: {
    position: "absolute",
    backgroundColor: "#4AC96D",
    borderRadius: 10,
    right: 3,
    top: 3,
    width: 10,
    height: 10,
  },
  wrapper: {
    padding: 5,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#E8E9EB",
    backgroundColor: "#FFFFFF",
    position: "relative",
  },
});
