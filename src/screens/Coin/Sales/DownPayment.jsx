import { useCallback, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import _ from "lodash";

import { SafeAreaView, StyleSheet, View } from "react-native";

import PageHeader from "../../../styles/PageHeader";
import { useFetch } from "../../../hooks/useFetch";
import DownPaymentFilter from "../../../components/Coin/DownPayment/DownPaymentFilter";
import DownPaymentList from "../../../components/Coin/DownPayment/DownPaymentList";
import Screen from "../../../styles/Screen";

const DownPayment = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [filteredDataArray, setFilteredDataArray] = useState([]);
  const [inputToShow, setInputToShow] = useState("");
  const [hasBeenScrolled, setHasBeenScrolled] = useState(false);
  const [downPayment, setDownPayment] = useState([]);

  const navigation = useNavigation();

  const fetchDownPaymentParameters = {
    page: currentPage,
    search: searchInput,
    limit: 20,
  };

  const { data, isFetching, isLoading, refetch } = useFetch(
    `/acc/sales-down-payment`,
    [currentPage, searchInput],
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

  const handleSearch = (value) => {
    searchDownPaymentHandler(value);
    setInputToShow(value);
  };

  const handleClearSearch = () => {
    setInputToShow("");
    setSearchInput("");
  };

  const currencyConverter = new Intl.NumberFormat("en-US", {});

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
    <Screen screenTitle="Down Payment" returnButton={true} onPress={() => navigation.goBack()}>
      <View style={styles.searchContainer}>
        <DownPaymentFilter
          handleSearch={handleSearch}
          handleClearSearch={handleClearSearch}
          inputToShow={inputToShow}
          setInputToShow={setInputToShow}
          setSearchInput={setSearchInput}
        />
      </View>
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
      />
    </Screen>
  );
};

export default DownPayment;

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
