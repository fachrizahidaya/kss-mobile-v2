import { useCallback, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import _ from "lodash";

import { StyleSheet, View } from "react-native";

import { useFetch } from "../../../hooks/useFetch";
import Screen from "../../../layouts/Screen";
import ReceiveItemTransferList from "../../../components/Coin/ItemTransfer/ReceiveItemTransferList";
import DataFilter from "../../../components/Coin/shared/DataFilter";

const ReceiveItemTransfer = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [filteredDataArray, setFilteredDataArray] = useState([]);
  const [inputToShow, setInputToShow] = useState("");
  const [hasBeenScrolled, setHasBeenScrolled] = useState(false);
  const [receiveItem, setReceiveItem] = useState([]);

  const navigation = useNavigation();

  const fetchReceiveItemTransferParameters = {
    page: currentPage,
    search: searchInput,
    limit: 20,
  };

  const { data, isLoading, isFetching, refetch } = useFetch(
    `/acc/receive-item-transfer`,
    [currentPage, searchInput],
    fetchReceiveItemTransferParameters
  );

  const fetchMoreReceiveItemTransfer = () => {
    if (currentPage < data?.data?.last_page) {
      setCurrentPage(currentPage + 1);
    }
  };

  const searchReceiveItemTransferHandler = useCallback(
    _.debounce((value) => {
      setSearchInput(value);
      setCurrentPage(1);
    }, 300),
    []
  );

  const handleSearch = (value) => {
    searchReceiveItemTransferHandler(value);
    setInputToShow(value);
  };

  const handleClearSearch = () => {
    setInputToShow("");
    setSearchInput("");
  };

  useEffect(() => {
    setReceiveItem([]);
    setFilteredDataArray([]);
  }, [searchInput]);

  useEffect(() => {
    if (data?.data?.data.length) {
      if (!searchInput) {
        setReceiveItem((prevData) => [...prevData, ...data?.data?.data]);
        setFilteredDataArray([]);
      } else {
        setFilteredDataArray((prevData) => [...prevData, ...data?.data?.data]);
        setReceiveItem([]);
      }
    }
  }, [data]);

  return (
    <Screen
      screenTitle="Receive Item Transfer"
      returnButton={true}
      backgroundColor="#FFFFFF"
      onPress={() => navigation.goBack()}
    >
      <View style={styles.searchContainer}>
        <DataFilter
          inputToShow={inputToShow}
          handleSearch={handleSearch}
          handleClearSearch={handleClearSearch}
          placeholder="Search"
        />
      </View>
      <ReceiveItemTransferList
        data={receiveItem}
        hasBeenScrolled={hasBeenScrolled}
        setHasBeenScrolled={setHasBeenScrolled}
        filteredData={filteredDataArray}
        navigation={navigation}
        fetchMore={fetchMoreReceiveItemTransfer}
        refetch={refetch}
        isFetching={isFetching}
        isLoading={isLoading}
      />
    </Screen>
  );
};

export default ReceiveItemTransfer;

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
