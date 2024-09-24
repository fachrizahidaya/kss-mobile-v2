import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

import _ from "lodash";

import { StyleSheet, View, Text } from "react-native";

import { useFetch } from "../../../hooks/useFetch";
import Tabs from "../../../layouts/Tabs";
import PersonalChatList from "../../../components/Chat/UserSelection/PersonalChatList";
import Screen from "../../../layouts/Screen";
import Input from "../../../styles/forms/Input";

const AddPersonalChat = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [inputToShow, setInputToShow] = useState("");
  const [cumulativeData, setCumulativeData] = useState([]);
  const [unattendCumulativeData, setUnattendCumulativeData] = useState([]);
  const [attendCumulativeData, setAttendCumulativeData] = useState([]);
  const [alpaCumulativeData, setAlpaCumulativeData] = useState([]);
  const [filteredDataArray, setFilteredDataArray] = useState([]);
  const [tabValue, setTabValue] = useState("All");
  const [hasBeenScrolled, setHasBeenScrolled] = useState(false);
  const [number, setNumber] = useState(0);

  const userSelector = useSelector((state) => state.auth);
  const navigation = useNavigation();

  const userFetchParameters = {
    page: currentPage,
    search: searchKeyword,
    limit: 100,
  };

  const { data, isLoading, isFetching, refetch } = useFetch(
    "/chat/user",
    [currentPage, searchKeyword],
    userFetchParameters
  );

  const unattendUser = data?.data?.data?.filter(checkUnattendToday);
  const attendUser = data?.data?.data?.filter(checkAttendToday);
  const alpaUser = data?.data?.data?.filter(checkAlpaToday);

  function checkUnattendToday(attend) {
    return !attend?.employee?.attendance_today;
  }

  function checkAttendToday(attend) {
    return attend?.employee?.attendance_today?.time_in;
  }

  function checkAlpaToday(attend) {
    return (
      // !attend?.employee?.attendance_today && attend?.employee?.attendance_today?.att_type !== "Attend"
      null
    );
  }

  /**
   * Function that runs when user scrolled to the bottom of FlastList
   * Fetches more user data by incrementing currentPage by 1
   */
  const fetchMoreData = () => {
    if (currentPage < data?.data?.last_page) {
      setCurrentPage(currentPage + 1);
    }
  };

  const searchHandler = useCallback(
    _.debounce((value) => {
      setSearchKeyword(value);
      setCurrentPage(1);
    }, 300),
    []
  );

  const tabs = useMemo(() => {
    return [
      { title: `All`, value: "All", color: "#FFFFFF", number: 1 },
      { title: `Unattend`, value: "Unattend", color: "#EDEDED", number: 2 },
      { title: `Attend`, value: "Attend", color: "#3bc14a", number: 3 },
      { title: `Alpa`, value: "Alpa", color: "#FDC500", number: 4 },
    ];
  }, [data]);

  const onChangeNumber = (value) => {
    setNumber(value);
  };

  const onChangeTab = (value) => {
    setTabValue(value);
    if (tabValue === "All") {
      // setAlpaCumulativeData([]);
      // setAttendCumulativeData([]);
      // setUnattendCumulativeData([]);
      // setCurrentPage(1);
    } else if (tabValue === "Unattend") {
      // setCumulativeData([]);
      // setAlpaCumulativeData([]);
      // setAttendCumulativeData([]);
      setSearchKeyword("");
      setInputToShow("");
      setCurrentPage(1);
    } else if (tabValue === "Attend") {
      // setCumulativeData([]);
      // setAlpaCumulativeData([]);
      // setUnattendCumulativeData([]);
      setSearchKeyword("");
      setInputToShow("");
      setCurrentPage(1);
    } else {
      // setCumulativeData([]);
      // setUnattendCumulativeData([]);
      // setAttendCumulativeData([]);
      setSearchKeyword("");
      setInputToShow("");
      setCurrentPage(1);
    }
  };

  const handleChange = (value) => {
    searchHandler(value);
    setInputToShow(value);
  };

  const handleClearSearch = () => {
    setSearchKeyword("");
    setInputToShow("");
  };

  useEffect(() => {
    setFilteredDataArray([]);
  }, [searchKeyword]);

  useEffect(() => {
    if (data?.data?.data?.length) {
      if (!searchKeyword) {
        setCumulativeData((prevData) => [...prevData, ...data?.data?.data]);
        setFilteredDataArray([]);
      } else {
        setFilteredDataArray((prevData) => [...prevData, ...data?.data?.data]);
        setCumulativeData([]);
      }
    }
  }, [data]);

  useEffect(() => {
    if (unattendUser?.length) {
      setUnattendCumulativeData(() => [...unattendUser]);
    }
  }, [data]);

  useEffect(() => {
    if (attendUser?.length) {
      setAttendCumulativeData(() => [...attendUser]);
    }
  }, [data]);

  useEffect(() => {
    if (alpaUser?.length) {
      setAlpaCumulativeData(() => [...alpaUser]);
    }
  }, [data]);

  return (
    <Screen screenTitle="New Chat" returnButton={true} onPress={() => navigation.goBack()} backgroundColor="#FFFFFF">
      {/* <View style={{ justifyContent: "space-between", paddingVertical: 14, paddingHorizontal: 16 }}>
        <Text style={[{ fontSize: 12, marginLeft: 25 }, TextProps]}>{data?.data?.total} users</Text>
      </View> */}

      <View style={{ flex: 1, gap: 15 }}>
        <View style={styles.searchContainer}>
          <Text style={{ color: "#9E9E9E" }}>CONTACT</Text>
          <Input
            fieldName="search"
            value={inputToShow}
            placeHolder="Search"
            onChangeText={handleChange}
            startIcon="magnify"
            endIcon={inputToShow && "close"}
            onPressEndIcon={handleClearSearch}
          />
          <Tabs tabs={tabs} value={tabValue} onChange={onChangeTab} onChangeNumber={onChangeNumber} withIcon={true} />
        </View>

        <PersonalChatList
          tabValue={tabValue}
          cumulativeData={cumulativeData}
          unattendCumulativeData={unattendCumulativeData}
          attendCumulativeData={attendCumulativeData}
          alpaCumulativeData={alpaCumulativeData}
          filteredDataArray={filteredDataArray}
          inputToShow={inputToShow}
          searchHandler={searchHandler}
          setInputToShow={setInputToShow}
          setSearchKeyword={setSearchKeyword}
          isLoading={isLoading}
          hasBeenScrolled={hasBeenScrolled}
          setHasBeenScrolled={setHasBeenScrolled}
          fetchMoreData={fetchMoreData}
          navigation={navigation}
          userSelector={userSelector}
          number={number}
        />
      </View>
    </Screen>
  );
};

export default AddPersonalChat;

const styles = StyleSheet.create({
  searchContainer: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    gap: 10,
    borderTopColor: "#E8E9EB",
    backgroundColor: "#FFFFFF",
  },
});
