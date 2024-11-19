import { useCallback, useEffect, useState } from "react";
import _ from "lodash";

import { useFetch } from "../../../../hooks/useFetch";
import BrandList from "../../../../components/Tribe/LiveHost/Brand/BrandList";
import Screen from "../../../../layouts/Screen";
import DataFilter from "../../../../components/Coin/shared/DataFilter";

const LiveBrand = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [filteredDataArray, setFilteredDataArray] = useState([]);
  const [inputToShow, setInputToShow] = useState("");
  const [hasBeenScrolled, setHasBeenScrolled] = useState(false);
  const [brands, setBrands] = useState([]);

  const fetchBrandsParameters = {
    page: currentPage,
    search: searchInput,
    limit: 20,
  };

  const { data, isLoading, isFetching, refetch } = useFetch(
    "/hr/ecom-brand",
    [currentPage, searchInput],
    fetchBrandsParameters
  );

  const fetchMoreBrands = () => {
    if (currentPage < data?.data?.last_page) {
      setCurrentPage(currentPage + 1);
    }
  };

  const searchBrandsHandler = useCallback(
    _.debounce((value) => {
      setSearchInput(value);
      setCurrentPage(1);
    }, 300),
    []
  );

  const handleSearch = (value) => {
    searchBrandsHandler(value);
    setInputToShow(value);
  };

  const handleClearSearch = () => {
    setInputToShow("");
    setSearchInput("");
  };

  useEffect(() => {
    setBrands([]);
    setFilteredDataArray([]);
  }, [searchInput]);

  useEffect(() => {
    if (data?.data?.data.length) {
      if (!searchInput) {
        setBrands((prevData) => [...prevData, ...data?.data?.data]);
        setFilteredDataArray([]);
      } else {
        setFilteredDataArray((prevData) => [...prevData, ...data?.data?.data]);
        setBrands([]);
      }
    }
  }, [data]);

  return (
    <Screen screenTitle="E-Commerce Live Brand">
      <DataFilter
        handleSearch={handleSearch}
        handleClearSearch={handleClearSearch}
        inputToShow={inputToShow}
        placeholder="Search"
      />
      <BrandList
        data={brands}
        filteredData={filteredDataArray}
        isFetching={isFetching}
        isLoading={isLoading}
        refetch={refetch}
        hasBeenScrolled={hasBeenScrolled}
        setHasBeenScrolledd={setHasBeenScrolled}
        fetchMore={fetchMoreBrands}
      />
    </Screen>
  );
};

export default LiveBrand;
