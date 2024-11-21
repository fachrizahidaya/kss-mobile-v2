import { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import { useNavigation } from "@react-navigation/native";

import HistoryList from "../../../../components/Tribe/LiveHost/LiveHistory/HistoryList";
import { useFetch } from "../../../../hooks/useFetch";
import Screen from "../../../../layouts/Screen";
import CustomFilter from "../../../../styles/buttons/CustomFilter";
import HistoryFilter from "../../../../components/Tribe/LiveHost/LiveHistory/HistoryFilter";

const LiveHistory = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [hasBeenScrolled, setHasBeenScrolled] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [history, setHistory] = useState([]);

  const filterSheetRef = useRef();
  const navigation = useNavigation();

  const fetchHistoryParameters = {
    page: currentPage,
    limit: 20,
    begin_date: startDate,
    end_date: endDate,
  };

  const { data, isLoading, isFetching, refetch } = useFetch(
    "/hr/ecom-live-history",
    [currentPage, startDate, endDate],
    fetchHistoryParameters
  );

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
    setStartDate(dayjs().format("YYYY-MM-DD"));
    setEndDate(dayjs().format("YYYY-MM-DD"));
  };

  useEffect(() => {
    setEndDate(startDate);
  }, [startDate]);

  useEffect(() => {
    setHistory([]);
  }, [startDate, endDate]);

  useEffect(() => {
    if (data?.data?.data.length) {
      setHistory((prevData) => [...prevData, ...data?.data?.data]);
    }
  }, [data]);

  return (
    <Screen
      screenTitle="E-Commerce Live History"
      childrenHeader={<CustomFilter toggle={handleOpenFilter} filterAppear={startDate || endDate} />}
    >
      <HistoryList
        data={history}
        isFetching={isFetching}
        isLoading={isLoading}
        refetch={refetch}
        fetchMore={fetchMoreHistory}
        hasBeenScrolled={hasBeenScrolled}
        setHasBeenScrolled={setHasBeenScrolled}
        navigation={navigation}
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
