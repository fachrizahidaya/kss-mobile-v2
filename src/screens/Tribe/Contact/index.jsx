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
  ActivityIndicator,
} from "react-native";
import { FlashList } from "@shopify/flash-list";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";
import { SceneMap } from "react-native-tab-view";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { useFetch } from "../../../hooks/useFetch";
import ContactList from "../../../components/Tribe/Contact/ContactList";
import Tabs from "../../../styles/Tabs";
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
    { key: "all", title: "All", color: "#FFFFFF" },
    { key: "unattend", title: "Unattend", color: "#EDEDED" },
    { key: "attend", title: "Attend", color: "#3bc14a" },
    { key: "alpa", title: "Alpa", color: "#FDC500" },
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

  const handleTabChange = (i) => {
    setIndex(i);
    if (index === 0) {
      // setUnattendContacts([]);
      // setAttendContacts([]);
      // setAlpaContacts([]);
      // setCurrentPage(1);
    } else if (index === 1) {
      // setContacts([]);
      // setAttendContacts([]);
      // setAlpaContacts([]);
      setSearchInput("");
      setInputToShow("");
      setCurrentPage(1);
    } else if (index === 2) {
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
  };

  const renderFlashList = (data = []) => {
    return (
      <View style={{ gap: 10, flex: 1, backgroundColor: "#f8f8f8" }}>
        {data.length > 0 || filteredDataArray?.length ? (
          <>
            <FlashList
              refreshing={true}
              refreshControl={<RefreshControl refreshing={employeeDataIsFetching} onRefresh={refetchEmployeeData} />}
              data={data?.length ? data : filteredDataArray}
              keyExtractor={(item, index) => index}
              estimatedItemSize={200}
              onEndReachedThreshold={0.1}
              onEndReached={fetchMoreEmployeeContact}
              // onScrollBeginDrag={() => setHasBeenScrolled(true)}
              ListFooterComponent={
                // hasBeenScrolled &&
                employeeDataIsLoading && <ActivityIndicator />
              }
              renderItem={({ item, index }) => (
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

  const Unattend = () => renderFlashList(unattendEmployee);

  const Attend = () => renderFlashList(attendEmployee);

  const Alpa = () => renderFlashList(alpaEmployee);

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
              backgroundColor: index === i ? "#176688" : null,
            }}
            onPress={() => handleTabChange(i)}
          >
            <Text style={{ color: index === i ? "#FFFFFF" : "#000000" }}>{route.title}</Text>
            <MaterialCommunityIcons name="circle" color={route.color} size={10} />
          </TouchableOpacity>
        ))}
      </View>
      {/* </ScrollView> */}
      {/* {index === 0 && ( */}
      <View style={styles.wrapper}>
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
      {/* )} */}
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
        <View style={{ gap: 15, paddingHorizontal: 16, backgroundColor: "#FFFFFF" }}>
          <Tabs tabs={tabs} value={tabValue} onChange={onChangeTab} withIcon={true} />
          {/* <Input
            value={inputToShow}
            fieldName="search"
            startIcon="magnify"
            endIcon={inputToShow && "close-circle-outline"}
            onPressEndIcon={handleClearSearch}
            onChangeText={handleSearch}
            placeHolder="Search"
            height={40}
          /> */}
        </View>

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
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: "#FFFFFF",
  },
});

export default Contact;
