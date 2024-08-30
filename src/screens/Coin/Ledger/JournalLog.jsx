import { useCallback, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import _ from "lodash";

import { SafeAreaView, StyleSheet, View } from "react-native";

import PageHeader from "../../../styles/PageHeader";
import { useFetch } from "../../../hooks/useFetch";
import DataFilter from "../../../components/Coin/shared/DataFilter";
import JournalLogList from "../../../components/Coin/Journal/JournalLogList";

const JournalLog = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [filteredDataArray, setFilteredDataArray] = useState([]);
  const [inputToShow, setInputToShow] = useState("");
  const [hasBeenScrolled, setHasBeenScrolled] = useState(false);
  const [journalLog, setJournalLog] = useState([]);

  const navigation = useNavigation();

  const currencyFormatter = new Intl.NumberFormat("en-US", {});

  const fetchJournalLogParameters = {
    page: currentPage,
    search: searchInput,
    limit: 20,
  };

  const { data, isFetching, isLoading, refetch } = useFetch(
    `/acc/journal`,
    [currentPage, searchInput],
    fetchJournalLogParameters
  );

  const fetchMoreJournalLog = () => {
    if (currentPage < data?.data?.last_page) {
      setCurrentPage(currentPage + 1);
    }
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

  useEffect(() => {
    setJournalLog([]);
    setFilteredDataArray([]);
  }, [searchInput]);

  useEffect(() => {
    if (data?.data?.data.length) {
      if (!searchInput) {
        setJournalLog((prevData) => [...prevData, ...data?.data?.data]);
        setFilteredDataArray([]);
      } else {
        setFilteredDataArray((prevData) => [...prevData, ...data?.data?.data]);
        setJournalLog([]);
      }
    }
  }, [data]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <PageHeader title="Journal Logs" onPress={() => navigation.goBack()} />
        <DataFilter
          handleSearch={handleSearch}
          handleClearSearch={handleClearSearch}
          inputToShow={inputToShow}
          setInputToShow={setInputToShow}
          setSearchInput={setSearchInput}
          placeholder="Search"
        />
      </View>
      <JournalLogList
        data={journalLog}
        isFetching={isFetching}
        isLoading={isLoading}
        refetch={refetch}
        fetchMore={fetchMoreJournalLog}
        filteredData={filteredDataArray}
        hasBeenScrolled={hasBeenScrolled}
        setHasBeenScrolled={setHasBeenScrolled}
        navigation={navigation}
        formatter={currencyFormatter}
      />
    </SafeAreaView>
  );
};

export default JournalLog;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  header: {
    gap: 15,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
});
