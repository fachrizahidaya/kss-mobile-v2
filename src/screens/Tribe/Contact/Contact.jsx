import { useState, useCallback, useEffect, useRef, useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigation, useFocusEffect } from "@react-navigation/core";
import _ from "lodash";

import { SafeAreaView, StyleSheet, View, Text, TouchableWithoutFeedback, Keyboard } from "react-native";

import { useFetch } from "../../../hooks/useFetch";
import ContactList from "../../../components/Tribe/Contact/ContactList";
import Tabs from "../../../styles/Tabs";

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

        <View style={styles.wrapper} backgroundColor="#FFFFFF">
          <Tabs tabs={tabs} value={tabValue} onChange={onChangeTab} withIcon={true} />
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
