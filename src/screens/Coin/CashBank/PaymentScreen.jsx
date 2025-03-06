import { useCallback, useEffect, useState, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import _ from "lodash";

import { useFetch } from "../../../hooks/useFetch";
import DataFilter from "../../../components/Coin/shared/DataFilter";
import PaymentList from "../../../components/Coin/Payment/PaymentList";
import PaymentFilter from "../../../components/Coin/Payment/PaymentFilter";
import Screen from "../../../layouts/Screen";
import CustomFilter from "../../../styles/buttons/CustomFilter";

const PaymentScreen = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [filteredDataArray, setFilteredDataArray] = useState([]);
  const [inputToShow, setInputToShow] = useState("");
  const [hasBeenScrolled, setHasBeenScrolled] = useState(false);
  const [payment, setPayment] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [account, setAccount] = useState(null);

  const navigation = useNavigation();
  const filterSheetRef = useRef();

  const currencyFormatter = new Intl.NumberFormat("en-US", {});

  const fetchPaymentParameters = {
    page: currentPage,
    search: searchInput,
    limit: 20,
    begin_date: startDate,
    end_date: endDate,
    coa_id: account,
  };

  const { data, isFetching, isLoading, refetch } = useFetch(
    `/acc/payment`,
    [currentPage, searchInput, startDate, endDate, account],
    fetchPaymentParameters
  );

  const { data: coaAccount } = useFetch("/acc/coa/option", [], {
    type: "BANK",
  });

  const fetchMorePayment = () => {
    if (currentPage < data?.data?.last_page) {
      setCurrentPage(currentPage + 1);
    }
  };

  /**
   * Handle start and end date archived
   * @param {*} date
   */
  const handleStartDateChange = (date) => {
    setStartDate(date);
  };
  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const handleSearchPayment = useCallback(
    _.debounce((value) => {
      setSearchInput(value);
      setCurrentPage(1);
    }, 300),
    []
  );

  const handleSearch = (value) => {
    handleSearchPayment(value);
    setInputToShow(value);
  };

  const handleClearSearch = () => {
    setInputToShow("");
    setSearchInput("");
  };

  const handleResetFilter = () => {
    setAccount(null);
    setStartDate(null);
    setEndDate(null);
  };

  const handleOpenFilter = () => {
    filterSheetRef.current?.show();
  };

  const handleReturn = () => {
    navigation.goBack();
  };

  useEffect(() => {
    setEndDate(startDate);
  }, [startDate]);

  useEffect(() => {
    setPayment([]);
  }, [account, startDate, endDate]);

  useEffect(() => {
    setPayment([]);
    setFilteredDataArray([]);
  }, [searchInput]);

  useEffect(() => {
    if (data?.data?.data.length) {
      if (!searchInput) {
        setPayment((prevData) => [...prevData, ...data?.data?.data]);
        setFilteredDataArray([]);
      } else {
        setFilteredDataArray((prevData) => [...prevData, ...data?.data?.data]);
        setPayment([]);
      }
    }
  }, [data]);

  return (
    <Screen
      screenTitle="Payment"
      returnButton={true}
      onPress={handleReturn}
      childrenHeader={
        <CustomFilter
          toggle={handleOpenFilter}
          filterAppear={account || startDate || endDate}
        />
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
        account={account}
        startDate={startDate}
        endDate={endDate}
      />
      <PaymentList
        data={payment}
        isFetching={isFetching}
        isLoading={isLoading}
        refetch={refetch}
        fetchMore={fetchMorePayment}
        filteredData={filteredDataArray}
        hasBeenScrolled={hasBeenScrolled}
        setHasBeenScrolled={setHasBeenScrolled}
        navigation={navigation}
        formatter={currencyFormatter}
      />
      <PaymentFilter
        startDate={startDate}
        endDate={endDate}
        handleStartDate={handleStartDateChange}
        handleEndDate={handleEndDateChange}
        types={coaAccount?.data}
        handleAccountChange={setAccount}
        value={account}
        reference={filterSheetRef}
        handleResetFilter={handleResetFilter}
        account={account}
      />
    </Screen>
  );
};

export default PaymentScreen;
