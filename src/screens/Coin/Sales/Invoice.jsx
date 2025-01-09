import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import _ from "lodash";

import { useFetch } from "../../../hooks/useFetch";
import DataFilter from "../../../components/Coin/shared/DataFilter";
import InvoiceList from "../../../components/Coin/Invoice/InvoiceList";
import Screen from "../../../layouts/Screen";
import InvoiceFilter from "../../../components/Coin/Invoice/InvoiceFilter";
import CustomFilter from "../../../styles/buttons/CustomFilter";

const Invoice = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [filteredDataArray, setFilteredDataArray] = useState([]);
  const [inputToShow, setInputToShow] = useState("");
  const [hasBeenScrolled, setHasBeenScrolled] = useState(false);
  const [invoice, setInvoice] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [status, setStatus] = useState(null);

  const navigation = useNavigation();
  const filterSheetRef = useRef();

  const currencyConverter = new Intl.NumberFormat("en-US", {});

  const statusTypes = [
    { value: "Unpaid", label: "Unpaid" },
    { value: "Partially", label: "Partially" },
    { value: "Paid", label: "Paid" },
  ];

  const fetchInvoiceParameters = {
    page: currentPage,
    search: searchInput,
    limit: 20,
    status: status,
    begin_date: startDate,
    end_date: endDate,
  };

  const { data, isLoading, isFetching, refetch } = useFetch(
    `/acc/sales-invoice`,
    [currentPage, searchInput, startDate, endDate, status],
    fetchInvoiceParameters
  );

  const fetchMoreInvoice = () => {
    if (currentPage < data?.data?.last_page) {
      setCurrentPage(currentPage + 1);
    }
  };

  const searchInvoiceHandler = useCallback(
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
    searchInvoiceHandler(value);
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
    setInvoice([]);
  }, [status, startDate, endDate]);

  useEffect(() => {
    setInvoice([]);
    setFilteredDataArray([]);
  }, [searchInput]);

  useEffect(() => {
    if (data?.data?.data.length) {
      if (!searchInput) {
        setInvoice((prevData) => [...prevData, ...data?.data?.data]);
        setFilteredDataArray([]);
      } else {
        setFilteredDataArray((prevData) => [...prevData, ...data?.data?.data]);
        setInvoice([]);
      }
    }
  }, [data]);

  return (
    <Screen
      screenTitle="Sales Invoice"
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
      <InvoiceList
        data={invoice}
        filteredData={filteredDataArray}
        isLoading={isLoading}
        hasBeenScrolled={hasBeenScrolled}
        setHasBeenScrolled={setHasBeenScrolled}
        fetchMore={fetchMoreInvoice}
        isFetching={isFetching}
        refetch={refetch}
        navigation={navigation}
        converter={currencyConverter}
      />
      <InvoiceFilter
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

export default Invoice;
