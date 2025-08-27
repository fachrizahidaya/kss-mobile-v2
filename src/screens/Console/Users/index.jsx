<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 84ce2474 (fix: selfie location)
=======
>>>>>>> 859eea89 (first commit)
=======
>>>>>>> c3ae17e7 (new branch)
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useRef, useState } from "react";
import _ from "lodash";
import { StyleSheet, Text, View } from "react-native";

import Screen from "../../../layouts/Screen";
import Input from "../../../styles/forms/Input";
import { Colors } from "../../../styles/Color";
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 859eea89 (first commit)
=======
>>>>>>> c3ae17e7 (new branch)
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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 859eea89 (first commit)
=======
>>>>>>> c3ae17e7 (new branch)
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
<<<<<<< HEAD
<<<<<<< HEAD
=======
import { Text } from "react-native";
=======
import UserList from "../../../components/Console/UserList";
=======
import UserList from "../../../components/Console/User/UserList";
>>>>>>> 2075a560 (feat: new user)
import { useFetch } from "../../../hooks/useFetch";
>>>>>>> 84ce2474 (fix: selfie location)

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

  const handleSearch = useCallback(
=======
>>>>>>> 5ef7bde9 (fix: new user, contact list)
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
<<<<<<< HEAD
>>>>>>> cb78f292 (feat: console)
=======

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
>>>>>>> 84ce2474 (fix: selfie location)
=======
>>>>>>> 859eea89 (first commit)
=======
>>>>>>> c3ae17e7 (new branch)
