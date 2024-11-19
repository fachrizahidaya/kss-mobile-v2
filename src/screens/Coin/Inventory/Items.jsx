import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import _ from "lodash";

import Screen from "../../../layouts/Screen";
import DataFilter from "../../../components/Coin/shared/DataFilter";
import ItemList from "../../../components/Coin/Items/ItemList";
import { useFetch } from "../../../hooks/useFetch";
import ItemFilter from "../../../components/Coin/Items/ItemFilter";
import CustomFilter from "../../../styles/buttons/CustomFilter";

const Items = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [filteredDataArray, setFilteredDataArray] = useState([]);
  const [inputToShow, setInputToShow] = useState("");
  const [items, setItems] = useState([]);
  const [hasBeenScrolled, setHasBeenScrolled] = useState(false);
  const [category, setCategory] = useState(null);

  const navigation = useNavigation();
  const filterSheetRef = useRef();

  const fetchItemParameters = {
    page: currentPage,
    search: searchInput,
    limit: 20,
  };

  const { data, isLoading, isFetching, refetch } = useFetch(
    `/acc/item`,
    [currentPage, searchInput],
    fetchItemParameters
  );

  const { data: categoryData } = useFetch(`/acc/item-category`);
  const categoryOptions = categoryData?.data?.map((item) => ({
    value: item?.id,
    label: item?.name,
  }));

  const fetchMoreItem = () => {
    if (currentPage < data?.data?.last_page) {
      setCurrentPage(currentPage + 1);
    }
  };

  const searchItemHandler = useCallback(
    _.debounce((value) => {
      setSearchInput(value);
      setCurrentPage(1);
    }, 300),
    []
  );

  const handleSearch = (value) => {
    searchItemHandler(value);
    setInputToShow(value);
  };

  const handleClearSearch = () => {
    setInputToShow("");
    setSearchInput("");
  };

  const handleOpenSheet = () => {
    filterSheetRef.current?.show();
  };

  const resetFilterHandler = () => {
    setCategory(null);
  };

  useEffect(() => {
    setItems([]);
  }, [category]);

  useEffect(() => {
    setItems([]);
    setFilteredDataArray([]);
  }, [searchInput]);

  useEffect(() => {
    if (data?.data?.data.length) {
      if (!searchInput) {
        setItems((prevData) => [...prevData, ...data?.data?.data]);
        setFilteredDataArray([]);
      } else {
        setFilteredDataArray((prevData) => [...prevData, ...data?.data?.data]);
        setItems([]);
      }
    }
  }, [data]);

  return (
    <Screen
      screenTitle="Item"
      returnButton={true}
      backgroundColor="#FFFFFF"
      onPress={() => navigation.goBack()}
      childrenHeader={<CustomFilter toggle={handleOpenSheet} filterAppear={category} />}
    >
      <DataFilter
        inputToShow={inputToShow}
        handleSearch={handleSearch}
        handleClearSearch={handleClearSearch}
        placeholder="Search"
      />
      <ItemList
        data={items}
        hasBeenScrolled={hasBeenScrolled}
        setHasBeenScrolled={setHasBeenScrolled}
        filteredData={filteredDataArray}
        navigation={navigation}
        fetchMore={fetchMoreItem}
        refetch={refetch}
        isFetching={isFetching}
        isLoading={isLoading}
      />
      <ItemFilter
        types={categoryOptions}
        handleStatusChange={setCategory}
        value={category}
        reference={filterSheetRef}
        handleReset={resetFilterHandler}
        category={category}
      />
    </Screen>
  );
};

export default Items;
