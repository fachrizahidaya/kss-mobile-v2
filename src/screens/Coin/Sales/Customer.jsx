import { useCallback, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import _ from "lodash";

import { StyleSheet, View } from "react-native";

import CustomerList from "../../../components/Coin/Customer/CustomerList";
import CustomerListFilter from "../../../components/Coin/Customer/CustomerListFilter";
import { useFetch } from "../../../hooks/useFetch";
import Screen from "../../../styles/Screen";

const Customer = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [filteredDataArray, setFilteredDataArray] = useState([]);
  const [inputToShow, setInputToShow] = useState("");
  const [hasBeenScrolled, setHasBeenScrolled] = useState(false);
  const [customers, setCustomers] = useState([]);

  const navigation = useNavigation();

  const fetchCustomersParameters = {
    page: currentPage,
    search: searchInput,
    limit: 20,
  };

  const { data, isFetching, isLoading, refetch } = useFetch(
    `/acc/customer`,
    [currentPage, searchInput],
    fetchCustomersParameters
  );

  const fetchMoreCustomers = () => {
    if (currentPage < data?.data?.last_page) {
      setCurrentPage(currentPage + 1);
    }
  };

  const searchCustomersHandler = useCallback(
    _.debounce((value) => {
      setSearchInput(value);
      setCurrentPage(1);
    }, 300),
    []
  );

  const handleSearch = (value) => {
    searchCustomersHandler(value);
    setInputToShow(value);
  };

  const handleClearSearch = () => {
    setInputToShow("");
    setSearchInput("");
  };

  useEffect(() => {
    setCustomers([]);
    setFilteredDataArray([]);
  }, [searchInput]);

  useEffect(() => {
    if (data?.data?.data.length) {
      if (!searchInput) {
        setCustomers((prevData) => [...prevData, ...data?.data?.data]);
        setFilteredDataArray([]);
      } else {
        setFilteredDataArray((prevData) => [...prevData, ...data?.data?.data]);
        setCustomers([]);
      }
    }
  }, [data]);

  return (
    <Screen screenTitle="Customer" returnButton={true} onPress={() => navigation.goBack()}>
      <View style={styles.searchContainer}>
        <CustomerListFilter
          handleSearch={handleSearch}
          handleClearSearch={handleClearSearch}
          inputToShow={inputToShow}
          setInputToShow={setInputToShow}
          setSearchInput={setSearchInput}
        />
      </View>
      <CustomerList
        data={customers}
        isFetching={isFetching}
        isLoading={isLoading}
        refetch={refetch}
        fetchMore={fetchMoreCustomers}
        filteredData={filteredDataArray}
        hasBeenScrolled={hasBeenScrolled}
        setHasBeenScrolled={setHasBeenScrolled}
        navigation={navigation}
      />
    </Screen>
  );
};

export default Customer;

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
