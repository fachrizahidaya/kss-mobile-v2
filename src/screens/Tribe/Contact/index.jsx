import { useState, useCallback, useEffect, useRef, useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigation, useFocusEffect } from "@react-navigation/core";
import _ from "lodash";

import { SafeAreaView, StyleSheet, View, TouchableWithoutFeedback, Keyboard } from "react-native";

import { useFetch } from "../../../hooks/useFetch";
import ContactList from "../../../components/Tribe/Contact/ContactList";
import Tabs from "../../../styles/Tabs";
import PageHeader from "../../../styles/PageHeader";
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
  const [number, setNumber] = useState(0);

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
      { title: `All`, value: "All", color: "#FFFFFF", number: 1 },
      { title: `Unattend`, value: "Unattend", color: "#EDEDED", number: 2 },
      { title: `Attend`, value: "Attend", color: "#3bc14a", number: 3 },
      { title: `Alpa`, value: "Alpa", color: "#FDC500", number: 4 },
    ];
  }, [employeeData]);

  const onChangeNumber = (value) => {
    setNumber(value);
  };

  const onChangeTab = useCallback((value) => {
    setTabValue(value);
    if (tabValue === "Unattend") {
      setSearchInput("");
      setInputToShow("");
      setCurrentPage(1);
    } else if (tabValue === "Attend") {
      setSearchInput("");
      setInputToShow("");
      setCurrentPage(1);
    } else {
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
          <PageHeader title="Contact" backButton={false} />
        </View>
        <View style={styles.searchContainer}>
          <Tabs tabs={tabs} value={tabValue} onChange={onChangeTab} onChangeNumber={onChangeNumber} withIcon={true} />
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
          number={number}
          setInputToShow={setInputToShow}
          setSearchInput={setSearchInput}
          searchContactHandler={searchContactHandler}
          unattendData={unattendContacts}
          attendData={attendContacts}
          alpaData={alpaContacts}
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default Contact;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
    position: "relative",
  },
  header: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  searchContainer: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    gap: 10,
    borderTopColor: "#E8E9EB",
    backgroundColor: "#FFFFFF",
  },
});
