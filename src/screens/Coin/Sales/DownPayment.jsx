import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import _ from "lodash";

import { useFetch } from "../../../hooks/useFetch";
import DownPaymentFilter from "../../../components/Coin/DownPayment/DownPaymentFilter";
import DownPaymentList from "../../../components/Coin/DownPayment/DownPaymentList";
import Screen from "../../../layouts/Screen";
import DataFilter from "../../../components/Coin/shared/DataFilter";
import CustomFilter from "../../../styles/buttons/CustomFilter";

const DownPayment = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [filteredDataArray, setFilteredDataArray] = useState([]);
  const [inputToShow, setInputToShow] = useState("");
  const [hasBeenScrolled, setHasBeenScrolled] = useState(false);
  const [downPayment, setDownPayment] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [status, setStatus] = useState(null);

  const navigation = useNavigation();
  const filterSheetRef = useRef();

  const currencyConverter = new Intl.NumberFormat("en-US", {});

  const statusTypes = [
    { value: "Pending", label: "Pending" },
    { value: "Paid", label: "Paid" },
  ];

  const fetchDownPaymentParameters = {
    page: currentPage,
    search: searchInput,
    limit: 20,
    begin_date: startDate,
    end_date: endDate,
    status: status,
  };

  const { data, isFetching, isLoading, refetch } = useFetch(
    `/acc/sales-down-payment`,
    [currentPage, searchInput, startDate, endDate, status],
    fetchDownPaymentParameters
  );

  const fetchMoreDownPayment = () => {
    if (currentPage < data?.data?.last_page) {
      setCurrentPage(currentPage + 1);
    }
  };

  const searchDownPaymentHandler = useCallback(
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
    searchDownPaymentHandler(value);
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
    setDownPayment([]);
  }, [status, startDate, endDate]);

  useEffect(() => {
    setDownPayment([]);
    setFilteredDataArray([]);
  }, [searchInput]);

  useEffect(() => {
    if (data?.data?.data.length) {
      if (!searchInput) {
        setDownPayment((prevData) => [...prevData, ...data?.data?.data]);
        setFilteredDataArray([]);
      } else {
        setFilteredDataArray((prevData) => [...prevData, ...data?.data?.data]);
        setDownPayment([]);
      }
    }
  }, [data]);

  return (
    <Screen
      screenTitle="Sales Down Payment"
      returnButton={true}
      onPress={() => navigation.goBack()}
      childrenHeader={<CustomFilter toggle={handleOpenSheet} filterAppear={status || startDate || endDate} />}
    >
      <DataFilter
        handleSearch={handleSearch}
        handleClearSearch={handleClearSearch}
        inputToShow={inputToShow}
        setInputToShow={setInputToShow}
        setSearchInput={setSearchInput}
        placeholder="Search"
      />
      <DownPaymentList
        data={downPayment}
        isLoading={isLoading}
        isFetching={isFetching}
        refetch={refetch}
        fetchMore={fetchMoreDownPayment}
        filteredData={filteredDataArray}
        hasBeenScrolled={hasBeenScrolled}
        setHasBeenScrolled={setHasBeenScrolled}
        currencyConverter={currencyConverter}
        navigation={navigation}
      />
      <DownPaymentFilter
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

export default DownPayment;
