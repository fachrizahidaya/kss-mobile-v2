import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

import _ from "lodash";

import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { SceneMap } from "react-native-tab-view";
import { FlashList } from "@shopify/flash-list";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { useFetch } from "../../../hooks/useFetch";
import PageHeader from "../../../styles/PageHeader";
import { TextProps } from "../../../styles/CustomStylings";
import Tabs from "../../../styles/Tabs";
import PersonalChatList from "../../../components/Chat/UserSelection/PersonalChatList";
import UserListItem from "../../../components/Chat/UserSelection/UserListItem";
import EmptyPlaceholder from "../../../styles/EmptyPlaceholder";
import TaskSkeleton from "../../../components/Band/Task/TaskList/TaskSkeleton";
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
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "all", title: "All", color: "#FFFFFF" },
    { key: "unattend", title: "Unattend", color: "#EDEDED" },
    { key: "attend", title: "Attend", color: "#3bc14a" },
    { key: "alpa", title: "Alpa", color: "#FDC500" },
  ]);

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

  const all = data?.data?.data;
  const unattend = data?.data?.data?.filter(checkUnattendToday);
  const attend = data?.data?.data?.filter(checkAttendToday);
  const alpa = data?.data?.data?.filter(checkAlpaToday);

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

  const renderFlashList = (data = []) => {
    return (
      <View style={{ gap: 10, flex: 1, backgroundColor: "#ffffff" }}>
        {!isLoading ? (
          data.length > 0 ? (
            <>
              <FlashList
                refreshing={true}
                refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch} />}
                data={data}
                keyExtractor={(item) => item.id}
                estimatedItemSize={200}
                onEndReachedThreshold={0.1}
                // onScrollBeginDrag={() => setHasBeenScrolled(!hasBeenScrolled)}
                ListFooterComponent={() =>
                  // hasBeenScrolled &&
                  isLoading && <ActivityIndicator />
                }
                renderItem={({ item, index }) => (
                  <UserListItem
                    user={item}
                    roomId={item?.chat_personal_id}
                    id={item?.id}
                    image={item?.image}
                    name={item?.name}
                    userType={item?.user_type}
                    multiSelect={false}
                    email={item?.email}
                    type="personal"
                    active_member={0}
                    navigation={navigation}
                    userSelector={userSelector}
                    position={item?.employee?.position?.position?.name}
                    attendanceToday={item?.employee?.attendance_today}
                  />
                )}
              />
            </>
          ) : (
            <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
              <EmptyPlaceholder height={250} width={250} text="No Data" />
            </View>
          )
        ) : (
          <TaskSkeleton />
        )}
      </View>
    );
  };

  const All = () => renderFlashList(all);

  const Unattend = () => renderFlashList(unattend);

  const Attend = () => renderFlashList(attend);

  const Alpa = () => renderFlashList(alpa);

  const renderScene = SceneMap({
    all: All,
    unattend: Unattend,
    attend: Attend,
    alpa: Alpa,
  });

  const layout = useWindowDimensions();

  const renderTabBar = (props) => (
    <View>
      {/* <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ width: "100%", backgroundColor: "#FFFFFF", paddingHorizontal: 14 }}
      > */}
      <View style={{ flexDirection: "row", backgroundColor: "#FFFFFF", paddingHorizontal: 14 }}>
        {props.navigationState.routes.map((route, i) => (
          <TouchableOpacity
            key={i}
            style={{
              flex: 1,
              height: 36,
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "center",
              borderRadius: 15,
              marginBottom: 8,
              // borderBottomWidth: 2,
              // borderBottomColor: index === i ? "#176688" : "#E8E9EB",
              backgroundColor: index === i ? "#176688" : null,
            }}
            onPress={() => setIndex(i)}
          >
            <Text style={{ color: index === i ? "#FFFFFF" : "#000000" }}>{route.title}</Text>
            <MaterialCommunityIcons name="circle" color={route.color} size={10} />
          </TouchableOpacity>
        ))}
      </View>
      {/* </ScrollView> */}
      {/* {index === 0 && ( */}

      <View style={styles.wrapper}>
        <Text style={{ color: "#9E9E9E" }}>CONTACT</Text>
        <Input
          fieldName="search"
          value={inputToShow}
          placeHolder="Search"
          onChangeText={(value) => {
            searchHandler(value);
            setInputToShow(value);
          }}
          startIcon="magnify"
          endIcon={inputToShow && "close"}
          onPressEndIcon={() => {
            setSearchKeyword("");
            setInputToShow("");
          }}
        />
      </View>
      {/* )} */}
    </View>
  );

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
            index={index}
            setIndex={setIndex}
            routes={routes}
            layout={layout}
            renderScene={renderScene}
            renderTabBar={renderTabBar}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AddPersonalChat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  wrapper: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    gap: 10,
  },
});
