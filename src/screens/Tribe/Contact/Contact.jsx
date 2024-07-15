import { useState, useCallback, useEffect, useRef, useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigation, useFocusEffect } from "@react-navigation/core";
import _ from "lodash";

import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import { FlashList } from "@shopify/flash-list";
import { RefreshControl } from "react-native-gesture-handler";
import { SceneMap } from "react-native-tab-view";

import { useFetch } from "../../../hooks/useFetch";
import ContactList from "../../../components/Tribe/Contact/ContactList";
import Tabs from "../../../styles/Tabs";
import { TextProps } from "../../../styles/CustomStylings";
import TaskSkeleton from "../../../components/Band/Task/TaskList/TaskSkeleton";
import ContactItem from "../../../components/Tribe/Contact/ContactItem";
import EmptyPlaceholder from "../../../styles/EmptyPlaceholder";
import Input from "../../../styles/forms/Input";

const Contact = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [contacts, setContacts] = useState([]);
  const [unattendContacts, setUnattendContacts] = useState([]);
  const [attendContacts, setAttendContacts] = useState([]);
  const [alpaContacts, setAlpaContacts] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredDataArray, setFilteredDataArray] = useState([]);
  const [inputToShow, setInputToShow] = useState("");
  const [hasBeenScrolled, setHasBeenScrolled] = useState(false);
  const [tabValue, setTabValue] = useState("All");
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "all", title: "All" },
    { key: "unattend", title: "Unattend" },
    { key: "attend", title: "Attend" },
    { key: "alpa", title: "Alpa" },
  ]);

  const userSelector = useSelector((state) => state.auth);

  const navigation = useNavigation();
  const firstTimeRef = useRef(null);

  const fetchEmployeeContactParameters = {
    page: currentPage,
    search: searchInput,
    limit: 50,
  };

  const {
    data: employeeData,
    isFetching: employeeDataIsFetching,
    isLoading: employeeDataIsLoading,
    refetch: refetchEmployeeData,
  } = useFetch("/hr/employees", [currentPage, searchInput], fetchEmployeeContactParameters);

  /**
   * Handle fetch more employee contact
   */
  const fetchMoreEmployeeContact = () => {
    if (currentPage < employeeData?.data?.last_page) {
      setCurrentPage(currentPage + 1);
    }
  };

  /**
   * Handle search contact
   */
  const searchContactHandler = useCallback(
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
    searchContactHandler(value);
    setInputToShow(value);
  };

  const unattendEmployee = employeeData?.data?.data?.filter(checkUnattendToday);
  const attendEmployee = employeeData?.data?.data?.filter(checkAttendToday);
  const alpaEmployee = employeeData?.data?.data?.filter(checkAlpaToday);

  const all = employeeData?.data?.data;
  const unattend = employeeData?.data?.data?.filter(checkUnattendToday);
  const attend = employeeData?.data?.data?.filter(checkAttendToday);
  const alpa = employeeData?.data?.data?.filter(checkAlpaToday);

  const renderFlashList = (data = []) => {
    return (
      <View style={{ gap: 10, flex: 1, backgroundColor: "#f8f8f8" }}>
        {!employeeDataIsLoading ? (
          data.length > 0 ? (
            <>
              <FlashList
                refreshControl={<RefreshControl refreshing={employeeDataIsFetching} onRefresh={refetchEmployeeData} />}
                data={data}
                keyExtractor={(item) => item.id}
                estimatedItemSize={97}
                onEndReachedThreshold={0.1}
                onScrollBeginDrag={() => setHideIcon(true)}
                onScrollEndDrag={() => setHideIcon(false)}
                renderItem={({ item }) => (
                  <ContactItem
                    key={index}
                    id={item?.id}
                    name={item?.name}
                    position={item?.position_name}
                    image={item?.image}
                    phone={item?.phone_number}
                    email={item?.email}
                    user={item?.user}
                    user_id={item?.user?.id}
                    room_id={item?.chat_personal_id}
                    user_name={item?.user?.name}
                    user_type={item?.user?.user_type}
                    user_image={item?.user?.image}
                    loggedEmployeeId={userSelector?.user_role_id}
                    navigation={navigation}
                    leave_status={item?.is_leave_today}
                    attendanceToday={item?.attendance_today}
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

  function checkUnattendToday(data) {
    return !data?.attendance_today;
  }

  function checkAttendToday(data) {
    return data?.attendance_today?.time_in;
  }

  function checkAlpaToday(data) {
    return (
      // (data?.attendance_today !== null && data?.attendance_today?.att_type !== "Attend") ||
      data?.is_leave_today === 1
    );
  }

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
    <View style={{ flexDirection: "row", backgroundColor: "#FFFFFF", paddingHorizontal: 14 }}>
      {props.navigationState.routes.map((route, i) => (
        <TouchableOpacity
          key={i}
          style={{
            flex: 1,
            height: 36,
            justifyContent: "center",
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
        </TouchableOpacity>
      ))}
    </View>
  );

  const tabs = useMemo(() => {
    return [
      { title: `All`, value: "All", color: "#FFFFFF" },
      { title: `Unattend`, value: "Unattend", color: "#EDEDED" },
      { title: `Attend`, value: "Attend", color: "#3bc14a" },
      { title: `Alpa`, value: "Alpa", color: "#FDC500" },
    ];
  }, [employeeData]);

  const onChangeTab = useCallback((value) => {
    setTabValue(value);
    if (tabValue === "All") {
      // setUnattendContacts([]);
      // setAttendContacts([]);
      // setAlpaContacts([]);
      // setCurrentPage(1);
    } else if (tabValue === "Unattend") {
      // setContacts([]);
      // setAttendContacts([]);
      // setAlpaContacts([]);
      setSearchInput("");
      setInputToShow("");
      setCurrentPage(1);
    } else if (tabValue === "Attend") {
      // setContacts([]);
      // setUnattendContacts([]);
      // setAlpaContacts([]);
      setSearchInput("");
      setInputToShow("");
      setCurrentPage(1);
    } else {
      // setContacts([]);
      // setUnattendContacts([]);
      // setAttendContacts([]);
      setSearchInput("");
      setInputToShow("");
      setCurrentPage(1);
    }
  });

  useEffect(() => {
    setFilteredDataArray([]);
  }, [searchInput]);

  useEffect(() => {
    if (employeeData?.data?.data.length) {
      if (!searchInput) {
        setContacts((prevData) => [...prevData, ...employeeData?.data?.data]);
        setFilteredDataArray([]);
      } else {
        setFilteredDataArray((prevData) => [...prevData, ...employeeData?.data?.data]);
        setContacts([]);
      }
    }
  }, [employeeData]);

  useEffect(() => {
    if (unattendEmployee?.length) {
      setUnattendContacts(() => [...unattendEmployee]);
    }
  }, [employeeData]);

  useEffect(() => {
    if (attendEmployee?.length) {
      setAttendContacts(() => [...attendEmployee]);
    }
  }, [employeeData]);

  useEffect(() => {
    if (alpaEmployee?.length) {
      setAlpaContacts(() => [...alpaEmployee]);
    }
  }, [employeeData]);

  useFocusEffect(
    useCallback(() => {
      if (firstTimeRef.current) {
        firstTimeRef.current = false;
        return;
      }
      refetchEmployeeData();
    }, [refetchEmployeeData])
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View style={{ flexDirection: "row", gap: 1 }}>
            <Text style={{ fontSize: 16, fontWeight: "500" }}>Contact</Text>
          </View>
        </View>

        {index === 0 && (
          <View style={styles.wrapper} backgroundColor="#FFFFFF">
            <Input
              value={inputToShow}
              fieldName="search"
              startIcon="magnify"
              endIcon={inputToShow && "close-circle-outline"}
              onPressEndIcon={handleClearSearch}
              onChangeText={handleSearch}
              placeHolder="Search"
              height={40}
            />
          </View>
        )}

        {/* Content here */}
        <ContactList
          data={contacts}
          filteredData={filteredDataArray}
          hasBeenScrolled={hasBeenScrolled}
          setHasBeenScrolled={setHasBeenScrolled}
          handleFetchMoreContact={fetchMoreEmployeeContact}
          refetch={refetchEmployeeData}
          isFetching={employeeDataIsFetching}
          isLoading={employeeDataIsLoading}
          navigation={navigation}
          userSelector={userSelector}
          tabValue={tabValue}
          inputToShow={inputToShow}
          setInputToShow={setInputToShow}
          setSearchInput={setSearchInput}
          searchContactHandler={searchContactHandler}
          unattendData={unattendContacts}
          attendData={attendContacts}
          alpaData={alpaContacts}
          handleSearch={handleSearch}
          handleClearSearch={handleClearSearch}
          index={index}
          setIndex={setIndex}
          routes={routes}
          renderScene={renderScene}
          renderTabBar={renderTabBar}
          layout={layout}
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
    position: "relative",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  wrapper: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderTopWidth: 1,
    borderTopColor: "#E8E9EB",
  },
});

export default Contact;
