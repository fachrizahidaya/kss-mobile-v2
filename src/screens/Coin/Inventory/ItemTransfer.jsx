import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import _ from "lodash";

import { StyleSheet, View } from "react-native";

import { useFetch } from "../../../hooks/useFetch";
import Screen from "../../../layouts/Screen";
import DataFilter from "../../../components/Coin/shared/DataFilter";
import ItemTransferList from "../../../components/Coin/ItemTransfer/ItemTransferList";
import CustomFilter from "../../../styles/buttons/CustomFilter";
import ItemTransferFilter from "../../../components/Coin/ItemTransfer/ItemTransferFilter";

const ItemTransfer = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [filteredDataArray, setFilteredDataArray] = useState([]);
  const [inputToShow, setInputToShow] = useState("");
  const [hasBeenScrolled, setHasBeenScrolled] = useState(false);
  const [itemTransfer, setItemTransfer] = useState([]);
  const [status, setStatus] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const navigation = useNavigation();
  const filterSheetRef = useRef();

  const statusTypes = [
    { value: "Pending", label: "Pending" },
    { value: "Partially", label: "Partially" },
    { value: "Deivered", label: "Deivered" },
  ];

  const fetchItemTransferParameters = {
    page: currentPage,
    search: searchInput,
    limit: 20,
    begin_date: startDate,
    end_date: endDate,
    status: status,
  };

  const { data, isLoading, isFetching, refetch } = useFetch(
    `/acc/item-transfer`,
    [currentPage, searchInput, status, startDate, endDate],
    fetchItemTransferParameters
  );

  const fetchMoreItemTransfer = () => {
    if (currentPage < data?.data?.last_page) {
      setCurrentPage(currentPage + 1);
    }
  };

  const searchItemTransferHandler = useCallback(
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
    searchItemTransferHandler(value);
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
    setItemTransfer([]);
  }, [status, startDate, endDate]);

  useEffect(() => {
    setItemTransfer([]);
    setFilteredDataArray([]);
  }, [searchInput]);

  useEffect(() => {
    setItemTransfer([]);
    setFilteredDataArray([]);
  }, [searchInput]);

  useEffect(() => {
    if (data?.data?.data.length) {
      if (!searchInput) {
        setItemTransfer((prevData) => [...prevData, ...data?.data?.data]);
        setFilteredDataArray([]);
      } else {
        setFilteredDataArray((prevData) => [...prevData, ...data?.data?.data]);
        setItemTransfer([]);
      }
    }
  }, [data]);

  return (
    <Screen
      screenTitle="Item Transfer"
      returnButton={true}
      backgroundColor="#FFFFFF"
      onPress={() => navigation.goBack()}
      childrenHeader={<CustomFilter toggle={handleOpenSheet} filterAppear={status || startDate || endDate} />}
    >
      <View style={styles.searchContainer}>
        <DataFilter
          inputToShow={inputToShow}
          handleSearch={handleSearch}
          handleClearSearch={handleClearSearch}
          placeholder="Search"
        />
      </View>
      <ItemTransferList
        data={itemTransfer}
        hasBeenScrolled={hasBeenScrolled}
        setHasBeenScrolled={setHasBeenScrolled}
        filteredData={filteredDataArray}
        navigation={navigation}
        fetchMore={fetchMoreItemTransfer}
        refetch={refetch}
        isFetching={isFetching}
        isLoading={isLoading}
      />
      <ItemTransferFilter
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

export default ItemTransfer;

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
