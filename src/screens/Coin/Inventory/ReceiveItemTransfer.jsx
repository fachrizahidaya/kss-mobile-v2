import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import _ from "lodash";

import { useFetch } from "../../../hooks/useFetch";
import Screen from "../../../layouts/Screen";
import ReceiveItemTransferList from "../../../components/Coin/ItemTransfer/ReceiveItemTransferList";
import DataFilter from "../../../components/Coin/shared/DataFilter";
import CustomFilter from "../../../styles/buttons/CustomFilter";
import ReceiveItemTransferFilter from "../../../components/Coin/ItemTransfer/ReceiveItemTransferFilter";
import { Colors } from "../../../styles/Color";

const ReceiveItemTransfer = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [filteredDataArray, setFilteredDataArray] = useState([]);
  const [inputToShow, setInputToShow] = useState("");
  const [hasBeenScrolled, setHasBeenScrolled] = useState(false);
  const [receiveItem, setReceiveItem] = useState([]);
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

  const fetchReceiveItemTransferParameters = {
    page: currentPage,
    search: searchInput,
    limit: 20,
    begin_date: startDate,
    end_date: endDate,
    status: status,
  };

  const { data, isLoading, isFetching, refetch } = useFetch(
    `/acc/receive-item-transfer`,
    [currentPage, searchInput, status, startDate, endDate],
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
    searchReceiveItemTransferHandler(value);
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
    setReceiveItem([]);
  }, [status, startDate, endDate]);

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
      backgroundColor={Colors.secondary}
      onPress={() => navigation.goBack()}
      childrenHeader={<CustomFilter toggle={handleOpenSheet} filterAppear={status || startDate || endDate} />}
    >
      <DataFilter
        inputToShow={inputToShow}
        handleSearch={handleSearch}
        handleClearSearch={handleClearSearch}
        placeholder="Search"
      />
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
      <ReceiveItemTransferFilter
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

export default ReceiveItemTransfer;
