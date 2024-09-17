import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import _ from "lodash";

import { useFetch } from "../../../hooks/useFetch";
import AccountHistoryFilter from "../../../components/Coin/AccountHistory/AccountHistoryFilter";
import AccountHistoryList from "../../../components/Coin/AccountHistory/AccountHistoryList";
import Screen from "../../../styles/Screen";
import CustomFilter from "../../../styles/CustomFilter";

const BankHistory = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [hasBeenScrolled, setHasBeenScrolled] = useState(false);
  const [history, setHistory] = useState(null);
  const [startDate, setStartDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [endDate, setEndDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [account, setAccount] = useState(null);

  const navigation = useNavigation();
  const filterSheetRef = useRef();

  const currencyFormatter = new Intl.NumberFormat("en-US", {});

  const fetchHistoryParameters = {
    account_id: account,
    begin_date: startDate,
    end_date: endDate,
  };

  const { data, isFetching, isLoading, refetch } = useFetch(
    account && startDate && endDate && `/acc/account-history`,
    [startDate, endDate, account],
    fetchHistoryParameters
  );

  const { data: coaAccount } = useFetch("/acc/coa/option", [], { type: "BANK" });

  const fetchMoreJournal = () => {
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

  const resetFilterHandler = () => {
    setAccount(null);
    setStartDate(dayjs().format("YYYY-MM-DD"));
    setEndDate(dayjs().format("YYYY-MM-DD"));
  };

  const handleOpenSheet = () => {
    filterSheetRef.current?.show();
  };

  useEffect(() => {
    setEndDate(startDate);
  }, [startDate]);

  useEffect(() => {
    if (data?.data?.length) {
      setHistory(null);
      setHistory(data?.data);
    }
  }, [data, account]);

  return (
    <Screen
      screenTitle="Bank History"
      returnButton={true}
      onPress={() => navigation.goBack()}
      childrenHeader={<CustomFilter toggle={handleOpenSheet} filterAppear={account || startDate || endDate} />}
    >
      <AccountHistoryList
        data={history}
        isFetching={isFetching}
        isLoading={isLoading}
        refetch={refetch}
        fetchMore={fetchMoreJournal}
        hasBeenScrolled={hasBeenScrolled}
        setHasBeenScrolled={setHasBeenScrolled}
        navigation={navigation}
        formatter={currencyFormatter}
      />
      <AccountHistoryFilter
        startDate={startDate}
        endDate={endDate}
        handleStartDate={startDateChangeHandler}
        handleEndDate={endDateChangeHandler}
        types={coaAccount?.data}
        handleAccountChange={setAccount}
        value={account}
        reference={filterSheetRef}
        handleResetFilter={resetFilterHandler}
      />
    </Screen>
  );
};

export default BankHistory;
