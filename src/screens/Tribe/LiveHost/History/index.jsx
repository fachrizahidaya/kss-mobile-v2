import { useCallback, useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import { useNavigation } from "@react-navigation/native";
import _ from "lodash";

import HistoryList from "../../../../components/Tribe/LiveHost/LiveHistory/HistoryList";
import { useFetch } from "../../../../hooks/useFetch";
import Screen from "../../../../layouts/Screen";
import CustomFilter from "../../../../styles/buttons/CustomFilter";
import HistoryFilter from "../../../../components/Tribe/LiveHost/LiveHistory/HistoryFilter";
import useCheckAccess from "../../../../hooks/useCheckAccess";
import DataFilter from "../../../../components/Coin/shared/DataFilter";

const LiveHistory = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [hasBeenScrolled, setHasBeenScrolled] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [history, setHistory] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredDataArray, setFilteredDataArray] = useState([]);
  const [inputToShow, setInputToShow] = useState("");
  const [brand, setBrand] = useState(null);
  const [host, setHost] = useState(null);

  const filterSheetRef = useRef();
  const navigation = useNavigation();

  const currencyFormatter = new Intl.NumberFormat("en-US", {});
  const updateLiveHistoryCheckAccess = useCheckAccess(
    "update",
    "E-Commerce Live History"
  );

  const fetchHistoryParameters = {
    page: currentPage,
    limit: 20,
    begin_date: startDate,
    end_date: endDate,
    search: searchInput,
    ecom_brand_id: brand,
    host_id: host,
  };

  const { data, isLoading, isFetching, refetch } = useFetch(
    "/hr/ecom-live-history",
    [currentPage, startDate, endDate, searchInput, brand, host],
    fetchHistoryParameters
  );

  const { data: hostData } = useFetch("/hr/ecom-live-host/option");

  const fetchMoreHistory = () => {
    if (currentPage < data?.data?.last_page) {
      setCurrentPage(currentPage + 1);
    }
  };

  const startDateChangeHandler = (date) => {
    setStartDate(date);
  };

  const endDateChangeHandler = (date) => {
    setEndDate(date);
  };

  const handleOpenFilter = () => {
    filterSheetRef.current?.show();
  };

  const resetFilterHandler = () => {
    setStartDate(null);
    setEndDate(null);
  };

  const searchHistoryHandler = useCallback(
    _.debounce((value) => {
      setSearchInput(value);
      setCurrentPage(1);
    }, 300),
    []
  );

  const handleSearch = (value) => {
    searchHistoryHandler(value);
    setInputToShow(value);
  };

  const handleClearSearch = () => {
    setInputToShow("");
    setSearchInput("");
  };

  useEffect(() => {
    setEndDate(startDate);
  }, [startDate]);

  useEffect(() => {
    setHistory([]);
  }, [startDate, endDate]);

  useEffect(() => {
    if (data?.data?.data.length) {
      if (!searchInput) {
        setHistory((prevData) => [...prevData, ...data?.data?.data]);
        setFilteredDataArray([]);
      } else {
        setFilteredDataArray((prevData) => [...prevData, ...data?.data?.data]);
        setHistory([]);
      }
    }
  }, [data]);

  return (
    <Screen
      screenTitle="E-Commerce Live History"
      childrenHeader={
        <CustomFilter
          toggle={handleOpenFilter}
          filterAppear={startDate || endDate}
        />
      }
    >
      <DataFilter
        handleSearch={handleSearch}
        handleClearSearch={handleClearSearch}
        inputToShow={inputToShow}
        placeholder="Search"
      />
      <HistoryList
        data={history}
        isFetching={isFetching}
        isLoading={isLoading}
        refetch={refetch}
        fetchMore={fetchMoreHistory}
        hasBeenScrolled={hasBeenScrolled}
        setHasBeenScrolled={setHasBeenScrolled}
        navigation={navigation}
        formatter={currencyFormatter}
        updateAccess={updateLiveHistoryCheckAccess}
        setHistory={setHistory}
        filteredData={filteredDataArray}
      />
      <HistoryFilter
        reference={filterSheetRef}
        startDate={startDate}
        endDate={endDate}
        handleStartDate={startDateChangeHandler}
        handleEndDate={endDateChangeHandler}
        handleResetFilter={resetFilterHandler}
      />
    </Screen>
  );
};

export default LiveHistory;
