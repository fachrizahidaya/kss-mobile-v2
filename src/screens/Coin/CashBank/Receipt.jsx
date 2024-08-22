import { useCallback, useEffect, useState, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import _ from "lodash";

import { SafeAreaView, StyleSheet, View } from "react-native";

import PageHeader from "../../../styles/PageHeader";
import { useFetch } from "../../../hooks/useFetch";
import DataFilter from "../../../components/Coin/shared/DataFilter";
import ReceiptList from "../../../components/Coin/Receipt/ReceiptList";
import ReceiptFilter from "../../../components/Coin/Receipt/ReceiptFilter";

const Receipt = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [filteredDataArray, setFilteredDataArray] = useState([]);
  const [inputToShow, setInputToShow] = useState("");
  const [hasBeenScrolled, setHasBeenScrolled] = useState(false);
  const [receipt, setReceipt] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [account, setAccount] = useState(null);

  const navigation = useNavigation();
  const filterSheetRef = useRef();

  const currencyFormatter = new Intl.NumberFormat("en-US", {});

  const fetchReceiptParameters = {
    page: currentPage,
    search: searchInput,
    limit: 20,
    begin_date: startDate,
    end_date: endDate,
    coa_id: account,
  };

  const { data, isFetching, isLoading, refetch } = useFetch(
    `/acc/receipt`,
    [currentPage, searchInput, startDate, endDate, account],
    fetchReceiptParameters
  );

  const { data: coaAccount } = useFetch("/acc/coa/option", [], { type: "BANK" });

  const fetchMoreReceipt = () => {
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

  const searchReceiptHandler = useCallback(
    _.debounce((value) => {
      setSearchInput(value);
      setCurrentPage(1);
    }, 300),
    []
  );

  const handleSearch = (value) => {
    searchReceiptHandler(value);
    setInputToShow(value);
  };

  const handleClearSearch = () => {
    setInputToShow("");
    setSearchInput("");
  };

  useEffect(() => {
    setReceipt([]);
  }, [account, startDate, endDate]);

  useEffect(() => {
    setReceipt([]);
    setFilteredDataArray([]);
  }, [searchInput]);

  useEffect(() => {
    if (data?.data?.data.length) {
      if (!searchInput) {
        setReceipt((prevData) => [...prevData, ...data?.data?.data]);
        setFilteredDataArray([]);
      } else {
        setFilteredDataArray((prevData) => [...prevData, ...data?.data?.data]);
        setReceipt([]);
      }
    }
  }, [data]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <PageHeader title="Receipt" onPress={() => navigation.goBack()} />
        <DataFilter
          handleSearch={handleSearch}
          handleClearSearch={handleClearSearch}
          inputToShow={inputToShow}
          setInputToShow={setInputToShow}
          setSearchInput={setSearchInput}
          placeholder="Search"
          withFilter={true}
          reference={filterSheetRef}
        />
      </View>
      <ReceiptList
        data={receipt}
        isFetching={isFetching}
        isLoading={isLoading}
        refetch={refetch}
        fetchMore={fetchMoreReceipt}
        filteredData={filteredDataArray}
        hasBeenScrolled={hasBeenScrolled}
        setHasBeenScrolled={setHasBeenScrolled}
        navigation={navigation}
        formatter={currencyFormatter}
      />
      <ReceiptFilter
        startDate={startDate}
        endDate={endDate}
        handleStartDate={startDateChangeHandler}
        handleEndDate={endDateChangeHandler}
        types={coaAccount?.data}
        handleAccountChange={setAccount}
        value={account}
        reference={filterSheetRef}
      />
    </SafeAreaView>
  );
};

export default Receipt;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    position: "relative",
  },
  header: {
    gap: 15,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 14,
    paddingVertical: 16,
  },
});
