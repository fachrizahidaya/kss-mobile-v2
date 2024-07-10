import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

import _ from "lodash";

import { SafeAreaView, StyleSheet, View, Text } from "react-native";

import { useFetch } from "../../../hooks/useFetch";
import PageHeader from "../../../styles/PageHeader";
import { TextProps } from "../../../styles/CustomStylings";
import Tabs from "../../../styles/Tabs";
import PersonalChatList from "../../../components/Chat/UserSelection/PersonalChatList";

const AddPersonalChatScreen = () => {
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

  const userSelector = useSelector((state) => state.auth);
  const navigation = useNavigation();

  const userFetchParameters = {
    page: currentPage,
    search: searchKeyword,
    limit: 100,
  };

  const { data, isLoading } = useFetch("/chat/user", [currentPage, searchKeyword], userFetchParameters);

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
      { title: `All`, value: "All", color: "#FFFFFF" },
      { title: `Unattend`, value: "Unattend", color: "#EDEDED" },
      { title: `Attend`, value: "Attend", color: "#3bc14a" },
      { title: `Alpa`, value: "Alpa", color: "#FDC500" },
    ];
  }, [data]);

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
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1, gap: 5 }}>
        <View style={{ justifyContent: "space-between", paddingVertical: 14, paddingHorizontal: 16 }}>
          <PageHeader title="New Chat" onPress={() => navigation.goBack()} />
          <Text style={[{ fontSize: 12, marginLeft: 25 }, TextProps]}>{data?.data?.total} users</Text>
        </View>

        <View style={{ flex: 1, gap: 15 }}>
          <View style={{ gap: 15, paddingHorizontal: 16 }}>
            <Tabs tabs={tabs} value={tabValue} onChange={onChangeTab} withIcon={true} />
            <Text style={{ color: "#9E9E9E" }}>CONTACT</Text>
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
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AddPersonalChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
