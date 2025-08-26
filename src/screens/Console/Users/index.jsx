import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useRef, useState } from "react";
import _ from "lodash";
import { StyleSheet, Text, View } from "react-native";

import Screen from "../../../layouts/Screen";
import Input from "../../../styles/forms/Input";
import { Colors } from "../../../styles/Color";
import UserList from "../../../components/Console/User/UserList";
import { useFetch } from "../../../hooks/useFetch";

const Users = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [list, setList] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredDataArray, setFilteredDataArray] = useState([]);
  const [inputToShow, setInputToShow] = useState("");
  const [hasBeenScrolled, setHasBeenScrolled] = useState(false);

  const navigation = useNavigation();
  const firstTimeRef = useRef(null);

  const fetchParameters = {
    page: currentPage,
    search: searchInput,
    limit: 50,
  };

  const { data, isFetching, isLoading, refetch } = useFetch(
    "/users",
    [currentPage, searchInput],
    fetchParameters
  );

  const handleFetchMore = () => {
    if (currentPage < data?.data?.last_page) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleSearchList = useCallback(
    _.debounce((value) => {
      setSearchInput(value);
      setCurrentPage(1);
    }, 300),
    []
  );

  const handleClearSearch = () => {
    setInputToShow("");
    setSearchInput("");
  };

  const handleSearch = (value) => {
    handleSearchList(value);
    setInputToShow(value);
  };

  useEffect(() => {
    setFilteredDataArray([]);
  }, [searchInput]);

  useEffect(() => {
    if (data?.data?.data?.length) {
      if (!searchInput) {
        setList((prevData) => [...prevData, ...data?.data?.data]);
        setFilteredDataArray([]);
      } else {
        setFilteredDataArray((prevData) => [...prevData, ...data?.data?.data]);
        setList([]);
      }
    }
  }, [data]);

  useFocusEffect(
    useCallback(() => {
      if (firstTimeRef.current) {
        firstTimeRef.current = false;
        return;
      } else {
        refetch();
      }
    }, [data])
  );

  return (
    <Screen screenTitle="Users">
      <View style={styles.searchContainer}>
        <Input
          value={inputToShow}
          fieldName="search"
          startIcon="magnify"
          endIcon={inputToShow && "close-circle-outline"}
          onChangeText={handleSearch}
          onPressEndIcon={handleClearSearch}
          placeHolder="Search"
          height={40}
        />
      </View>
      <UserList
        data={list}
        filteredData={filteredDataArray}
        hasBeenScrolled={hasBeenScrolled}
        setHasBeenScrolled={setHasBeenScrolled}
        handleFetchMore={handleFetchMore}
        refetch={refetch}
        isFetching={isFetching}
        isLoading={isLoading}
        setInputShow={setInputToShow}
        setSearchInput={setSearchInput}
        handleSearch={handleSearch}
        handleClearSearch={handleClearSearch}
        navigation={navigation}
      />
    </Screen>
  );
};

export default Users;

const styles = StyleSheet.create({
  searchContainer: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    gap: 10,
    borderTopColor: Colors.borderGrey,
    backgroundColor: Colors.secondary,
  },
});
