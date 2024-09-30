import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import _ from "lodash";

import { StyleSheet, View } from "react-native";

import SalesOrderList from "../../../components/Coin/SalesOrder/SalesOrderList";
import { useFetch } from "../../../hooks/useFetch";
import DataFilter from "../../../components/Coin/shared/DataFilter";
import Screen from "../../../layouts/Screen";
import SalesOrderFilter from "../../../components/Coin/SalesOrder/SalesOrderFilter";
import CustomFilter from "../../../styles/buttons/CustomFilter";

const SalesOrder = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [filteredDataArray, setFilteredDataArray] = useState([]);
  const [inputToShow, setInputToShow] = useState("");
  const [hasBeenScrolled, setHasBeenScrolled] = useState(false);
  const [salesOrder, setSalesOrder] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [status, setStatus] = useState(null);

  const navigation = useNavigation();
  const filterSheetRef = useRef();

  const statusTypes = [
    { value: "Pending", label: "Pending" },
    { value: "Partially", label: "Partially" },
    { value: "Processed", label: "Processed" },
  ];

  const fetchSalesOrderParameters = {
    page: currentPage,
    search: searchInput,
    limit: 20,
    begin_date: startDate,
    end_date: endDate,
    status: status,
  };

  const { data, isFetching, isLoading, refetch } = useFetch(
    `/acc/sales-order`,
    [currentPage, searchInput, startDate, endDate, status],
    fetchSalesOrderParameters
  );

  const fetchMoreSalesOrder = () => {
    if (currentPage < data?.data?.last_page) {
      setCurrentPage(currentPage + 1);
    }
  };

  const searchSalesOrderHandler = useCallback(
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
    searchSalesOrderHandler(value);
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
    setSalesOrder([]);
  }, [status, startDate, endDate]);

  useEffect(() => {
    setSalesOrder([]);
    setFilteredDataArray([]);
  }, [searchInput]);

  useEffect(() => {
    if (data?.data?.data.length) {
      if (!searchInput) {
        setSalesOrder((prevData) => [...prevData, ...data?.data?.data]);
        setFilteredDataArray([]);
      } else {
        setFilteredDataArray((prevData) => [...prevData, ...data?.data?.data]);
        setSalesOrder([]);
      }
    }
  }, [data]);

  return (
    <Screen
      screenTitle="Sales Order"
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
      <SalesOrderList
        data={salesOrder}
        isFetching={isFetching}
        isLoading={isLoading}
        refetch={refetch}
        fetchMore={fetchMoreSalesOrder}
        filteredData={filteredDataArray}
        hasBeenScrolled={hasBeenScrolled}
        setHasBeenScrolled={setHasBeenScrolled}
        navigation={navigation}
      />
      <SalesOrderFilter
        startDate={startDate}
        endDate={endDate}
        handleStartDate={startDateChangeHandler}
        handleEndDate={endDateChangeHandler}
        types={statusTypes}
        handleStatusChange={setStatus}
        value={status}
        reference={filterSheetRef}
        handleResetFilter={resetFilterHandler}
        status={status}
      />
    </Screen>
  );
};

export default SalesOrder;

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
