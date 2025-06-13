import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import _ from "lodash";

import { useFetch } from "../../../hooks/useFetch";
import AccountHistoryFilter from "../../../components/Coin/AccountHistory/AccountHistoryFilter";
import AccountHistoryList from "../../../components/Coin/AccountHistory/AccountHistoryList";
import Screen from "../../../layouts/Screen";
import CustomFilter from "../../../styles/buttons/CustomFilter";

const AccountHistory = () => {
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

  const { data: coaAccount } = useFetch("/acc/coa/option");

  const fetchMoreJournal = () => {
    if (currentPage < data?.data?.last_page) {
      setCurrentPage(currentPage + 1);
    }
  };

  /**
   * Handle start and end date archived
   * @param {*} date
   */
  const handleStartDate = (date) => {
    setStartDate(date);
  };
  const handleEndDate = (date) => {
    setEndDate(date);
  };

  const handleResetFilter = () => {
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
    setHistory([]);
  }, [account, startDate, endDate]);

  useEffect(() => {
    if (data?.data?.length) {
      setHistory(null);
      setHistory(data?.data);
    }
  }, [data, account]);

  return (
    <Screen
      screenTitle="Account History"
      returnButton={true}
      onPress={() => navigation.goBack()}
      childrenHeader={
        <CustomFilter
          toggle={handleOpenSheet}
          filterAppear={
            account ||
            startDate !== dayjs().format("YYYY-MM-DD") ||
            endDate !== dayjs().format("YYYY-MM-DD")
          }
        />
      }
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
        handleStartDate={handleStartDate}
        handleEndDate={handleEndDate}
        types={coaAccount?.data}
        handleAccountChange={setAccount}
        value={account}
        reference={filterSheetRef}
        handleResetFilter={handleResetFilter}
        account={account}
      />
    </Screen>
  );
};

export default AccountHistory;
