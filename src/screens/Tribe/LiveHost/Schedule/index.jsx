import { useEffect, useRef, useState } from "react";
import _ from "lodash";
import dayjs from "dayjs";
import { useNavigation } from "@react-navigation/native";

import ScheduleList from "../../../../components/Tribe/LiveHost/LiveSchedule/ScheduleList";
import { useFetch } from "../../../../hooks/useFetch";
import Screen from "../../../../layouts/Screen";
import CustomFilter from "../../../../styles/buttons/CustomFilter";
import ScheduleFilter from "../../../../components/Tribe/LiveHost/LiveSchedule/ScheduleFilter";

const LiveSchedule = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [hasBeenScrolled, setHasBeenScrolled] = useState(false);
  const [schedules, setSchedules] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const navigation = useNavigation();
  const filterSheetRef = useRef();

  const fetchSchedulesParameters = {
    page: currentPage,
    limit: 20,
    begin_date: startDate,
    end_date: endDate,
  };

  const { data, isLoading, isFetching, refetch } = useFetch(
    "/hr/ecom-live-schedule",
    [currentPage, startDate, endDate],
    fetchSchedulesParameters
  );

  const fetchMoreSchedules = () => {
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
    setSchedules([]);
  }, [startDate, endDate]);

  useEffect(() => {
    if (data?.data?.data.length) {
      setSchedules((prevData) => [...prevData, ...data?.data?.data]);
    }
  }, [data]);

  return (
    <Screen
      screenTitle="E-Commerce Live Schedule"
      childrenHeader={<CustomFilter toggle={handleOpenFilter} filterAppear={startDate || endDate} />}
    >
      <ScheduleList
        data={schedules}
        isFetching={isFetching}
        isLoading={isLoading}
        refetch={refetch}
        hasBeenScrolled={hasBeenScrolled}
        setHasBeenScrolled={setHasBeenScrolled}
        fetchMore={fetchMoreSchedules}
        navigation={navigation}
      />
      <ScheduleFilter
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

export default LiveSchedule;
