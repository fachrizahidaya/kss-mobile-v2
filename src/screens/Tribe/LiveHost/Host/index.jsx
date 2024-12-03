import { useCallback, useEffect, useState } from "react";
import _ from "lodash";

import DataFilter from "../../../../components/Coin/shared/DataFilter";
import HostList from "../../../../components/Tribe/LiveHost/Host/HostList";
import Screen from "../../../../layouts/Screen";
import { useFetch } from "../../../../hooks/useFetch";

const Host = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [filteredDataArray, setFilteredDataArray] = useState([]);
  const [inputToShow, setInputToShow] = useState("");
  const [hasBeenScrolled, setHasBeenScrolled] = useState(false);
  const [hosts, setHosts] = useState([]);

  const fetchSessionsParameters = {
    page: currentPage,
    search: searchInput,
    limit: 20,
  };

  const { data, isLoading, isFetching, refetch } = useFetch(
    "/hr/ecom-live-host",
    [currentPage, searchInput],
    fetchSessionsParameters
  );

  const fetchMoreSessions = () => {
    if (currentPage < data?.data?.last_page) {
      setCurrentPage(currentPage + 1);
    }
  };

  const searchSessionsHandler = useCallback(
    _.debounce((value) => {
      setSearchInput(value);
      setCurrentPage(1);
    }, 300),
    []
  );

  const handleSearch = (value) => {
    searchSessionsHandler(value);
    setInputToShow(value);
  };

  const handleClearSearch = () => {
    setInputToShow("");
    setSearchInput("");
  };

  useEffect(() => {
    setHosts([]);
    setFilteredDataArray([]);
  }, [searchInput]);

  useEffect(() => {
    if (data?.data?.data.length) {
      if (!searchInput) {
        setHosts((prevData) => [...prevData, ...data?.data?.data]);
        setFilteredDataArray([]);
      } else {
        setFilteredDataArray((prevData) => [...prevData, ...data?.data?.data]);
        setHosts([]);
      }
    }
  }, [data]);

  return (
    <Screen screenTitle="E-Commerce Live Host">
      <DataFilter
        handleClearSearch={handleClearSearch}
        handleSearch={handleSearch}
        inputToShow={inputToShow}
        placeholder="Search"
      />
      <HostList
        hasBeenScrolled={hasBeenScrolled}
        setHasBeenScrolled={setHasBeenScrolled}
        filteredData={filteredDataArray}
        isFetching={isFetching}
        isLoading={isLoading}
        refetch={refetch}
        fetchMore={fetchMoreSessions}
        data={hosts}
      />
    </Screen>
  );
};

export default Host;
