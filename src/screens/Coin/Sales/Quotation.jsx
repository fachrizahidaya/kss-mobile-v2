import { useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useRef, useState } from "react";
import _ from "lodash";

import { StyleSheet, View } from "react-native";

import Screen from "../../../layouts/Screen";
import CustomFilter from "../../../styles/buttons/CustomFilter";
import DataFilter from "../../../components/Coin/shared/DataFilter";
import { useFetch } from "../../../hooks/useFetch";
import QuotationList from "../../../components/Coin/Quotation/QuotationList";
import QuotationFilter from "../../../components/Coin/Quotation/QuotationFilter";

const Quotation = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [filteredDataArray, setFilteredDataArray] = useState([]);
  const [inputToShow, setInputToShow] = useState("");
  const [hasBeenScrolled, setHasBeenScrolled] = useState(false);
  const [quotation, setQuotation] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [status, setStatus] = useState(null);

  const navigation = useNavigation();
  const filterSheetRef = useRef();

  const currencyConverter = new Intl.NumberFormat("en-US", {});

  const statusTypes = [
    { value: "Pending", label: "Pending" },
    { value: "Partially", label: "Partially" },
    { value: "Processed", label: "Processed" },
  ];

  const fetchQuotationParameters = {
    page: currentPage,
    search: searchInput,
    limit: 20,
    begin_date: startDate,
    end_date: endDate,
    status: status,
  };

  const { data, isFetching, isLoading, refetch } = useFetch(
    `/acc/quotation`,
    [currentPage, searchInput, startDate, endDate, status],
    fetchQuotationParameters
  );

  const fetchMoreQuotation = () => {
    if (currentPage < data?.data?.last_page) {
      setCurrentPage(currentPage + 1);
    }
  };

  const searchQuotationHandler = useCallback(
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
    searchQuotationHandler(value);
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
    setQuotation([]);
  }, [status, startDate, endDate]);

  useEffect(() => {
    setQuotation([]);
    setFilteredDataArray([]);
  }, [searchInput]);

  useEffect(() => {
    if (data?.data?.data.length) {
      if (!searchInput) {
        setQuotation((prevData) => [...prevData, ...data?.data?.data]);
        setFilteredDataArray([]);
      } else {
        setFilteredDataArray((prevData) => [...prevData, ...data?.data?.data]);
        setQuotation([]);
      }
    }
  }, [data]);

  return (
    <Screen
      screenTitle="Quotation"
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
      <QuotationList
        data={quotation}
        isFetching={isFetching}
        isLoading={isLoading}
        refetch={refetch}
        fetchMore={fetchMoreQuotation}
        filteredData={filteredDataArray}
        hasBeenScrolled={hasBeenScrolled}
        setHasBeenScrolled={setHasBeenScrolled}
        navigation={navigation}
        converter={currencyConverter}
      />
      <QuotationFilter
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

export default Quotation;

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
