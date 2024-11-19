import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import _ from "lodash";

import { useFetch } from "../../../hooks/useFetch";
import DataFilter from "../../../components/Coin/shared/DataFilter";
import BankTransferList from "../../../components/Coin/BankTransfer/BankTransferList";
import BankTransferFilter from "../../../components/Coin/BankTransfer/BankTransferFilter";
import Screen from "../../../layouts/Screen";
import CustomFilter from "../../../styles/buttons/CustomFilter";

const BankTransfer = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [filteredDataArray, setFilteredDataArray] = useState([]);
  const [inputToShow, setInputToShow] = useState("");
  const [hasBeenScrolled, setHasBeenScrolled] = useState(false);
  const [transfer, setTransfer] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [accountTo, setAccountTo] = useState(null);
  const [accountFrom, setAccountFrom] = useState(null);

  const navigation = useNavigation();
  const filterSheetRef = useRef();

  const currencyFormatter = new Intl.NumberFormat("en-US", {});

  const fetchTransferParameters = {
    page: currentPage,
    search: searchInput,
    limit: 20,
    begin_date: startDate,
    end_date: endDate,
    from_coa_Id: accountFrom,
    to_coa_id: accountTo,
  };

  const { data, isFetching, isLoading, refetch } = useFetch(
    `/acc/bank-transfer`,
    [currentPage, searchInput, startDate, endDate, accountFrom, accountTo],
    fetchTransferParameters
  );

  const { data: coaAccount } = useFetch("/acc/coa/option", [], { type: "BANK" });

  const fetchMoreTransfer = () => {
    if (currentPage < data?.data?.last_page) {
      setCurrentPage(currentPage + 1);
    }
  };

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

  const searchJournalHandler = useCallback(
    _.debounce((value) => {
      setSearchInput(value);
      setCurrentPage(1);
    }, 300),
    []
  );

  const handleSearch = (value) => {
    searchJournalHandler(value);
    setInputToShow(value);
  };

  const handleClearSearch = () => {
    setInputToShow("");
    setSearchInput("");
  };

  const resetFilterHandler = () => {
    setAccountFrom(null);
    setAccountTo(null);
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
    setTransfer([]);
  }, [accountTo, accountFrom, startDate, endDate]);

  useEffect(() => {
    setTransfer([]);
    setFilteredDataArray([]);
  }, [searchInput]);

  useEffect(() => {
    if (data?.data?.data.length) {
      if (!searchInput) {
        setTransfer((prevData) => [...prevData, ...data?.data?.data]);
        setFilteredDataArray([]);
      } else {
        setFilteredDataArray((prevData) => [...prevData, ...data?.data?.data]);
        setTransfer([]);
      }
    }
  }, [data]);

  return (
    <Screen
      screenTitle="Bank Transfer"
      returnButton={true}
      onPress={() => navigation.goBack()}
      childrenHeader={
        <CustomFilter toggle={handleOpenSheet} filterAppear={accountFrom || accountTo || startDate || endDate} />
      }
    >
      <DataFilter
        handleSearch={handleSearch}
        handleClearSearch={handleClearSearch}
        inputToShow={inputToShow}
        setInputToShow={setInputToShow}
        setSearchInput={setSearchInput}
        placeholder="Search"
        withFilter={true}
        reference={filterSheetRef}
        account={accountFrom}
        accountTo={accountTo}
        startDate={startDate}
        endDate={endDate}
      />
      <BankTransferList
        data={transfer}
        isFetching={isFetching}
        isLoading={isLoading}
        refetch={refetch}
        fetchMore={fetchMoreTransfer}
        filteredData={filteredDataArray}
        hasBeenScrolled={hasBeenScrolled}
        setHasBeenScrolled={setHasBeenScrolled}
        navigation={navigation}
        formatter={currencyFormatter}
      />
      <BankTransferFilter
        startDate={startDate}
        endDate={endDate}
        handleStartDate={startDateChangeHandler}
        handleEndDate={endDateChangeHandler}
        types={coaAccount?.data}
        handleAccountToChange={setAccountTo}
        handleAccountFromChange={setAccountFrom}
        valueTo={accountTo}
        reference={filterSheetRef}
        valueFrom={accountFrom}
        handleResetFilter={resetFilterHandler}
      />
    </Screen>
  );
};

export default BankTransfer;
