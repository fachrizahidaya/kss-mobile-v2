import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import _ from "lodash";

import { useFetch } from "../../../hooks/useFetch";
import DataFilter from "../../../components/Coin/shared/DataFilter";
import COAList from "../../../components/Coin/COA/COAList";
import COAFilter from "../../../components/Coin/COA/COAFilter";
import Screen from "../../../layouts/Screen";
import CustomFilter from "../../../styles/buttons/CustomFilter";

const COA = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [filteredDataArray, setFilteredDataArray] = useState([]);
  const [inputToShow, setInputToShow] = useState("");
  const [hasBeenScrolled, setHasBeenScrolled] = useState(false);
  const [coa, setCoa] = useState([]);
  const [account, setAccount] = useState(null);

  const navigation = useNavigation();
  const filterSheetRef = useRef();

  const currencyFormatter = new Intl.NumberFormat("en-US", {});

  const fetchCoaParameters = {
    page: currentPage,
    search: searchInput,
    limit: 20,
    coa_type_id: account,
  };

  const { data, isFetching, isLoading, refetch } = useFetch(
    `/acc/coa`,
    [currentPage, searchInput, account],
    fetchCoaParameters
  );

  const { data: coaAccount } = useFetch("/acc/coa-type/option");

  const fetchMoreCoa = () => {
    if (currentPage < data?.data?.last_page) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleSearchCoa = useCallback(
    _.debounce((value) => {
      setSearchInput(value);
      setCurrentPage(1);
    }, 300),
    []
  );

  const handleSearch = (value) => {
    handleSearchCoa(value);
    setInputToShow(value);
  };

  const handleClearSearch = () => {
    setInputToShow("");
    setSearchInput("");
  };

  const handleResetFilter = () => {
    setAccount(null);
  };

  const handleOpenSheet = () => {
    filterSheetRef.current?.show();
  };

  useEffect(() => {
    setCoa([]);
    setFilteredDataArray([]);
  }, [searchInput]);

  useEffect(() => {
    setCoa([]);
  }, [account]);

  useEffect(() => {
    if (data?.data?.data.length) {
      if (!searchInput) {
        setCoa((prevData) => [...prevData, ...data?.data?.data]);
        setFilteredDataArray([]);
      } else {
        setFilteredDataArray((prevData) => [...prevData, ...data?.data?.data]);
        setCoa([]);
      }
    }
  }, [data]);

  return (
    <Screen
      screenTitle="COA"
      returnButton={true}
      onPress={() => navigation.goBack()}
      childrenHeader={<CustomFilter toggle={handleOpenSheet} filterAppear={account} />}
    >
      <DataFilter
        handleSearch={handleSearch}
        handleClearSearch={handleClearSearch}
        inputToShow={inputToShow}
        setInputToShow={setInputToShow}
        setSearchInput={setSearchInput}
        placeholder="Search"
        reference={filterSheetRef}
        withFilter={true}
        account={account}
      />
      <COAList
        data={coa}
        isFetching={isFetching}
        isLoading={isLoading}
        refetch={refetch}
        fetchMore={fetchMoreCoa}
        filteredData={filteredDataArray}
        hasBeenScrolled={hasBeenScrolled}
        setHasBeenScrolled={setHasBeenScrolled}
        navigation={navigation}
        formatter={currencyFormatter}
      />
      <COAFilter
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

export default COA;
