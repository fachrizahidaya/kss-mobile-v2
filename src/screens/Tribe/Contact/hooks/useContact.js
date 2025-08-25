import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import _ from "lodash";

import { useFetch } from "../../../../hooks/useFetch";
import { Colors } from "../../../../styles/Color";

export const useContact = () => {
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

  const navigation = useNavigation();
  const firstTimeRef = useRef(null);
  const userSelector = useSelector((state) => state.auth);

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
  } = useFetch(
    "/hr/employees",
    [currentPage, searchInput],
    fetchEmployeeContactParameters
  );

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
  const handleSearchContact = useCallback(
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
    handleSearchContact(value);
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
      { title: `All`, value: "All", color: Colors.secondary, number: 1 },
      { title: `Unattend`, value: "Unattend", color: "#EDEDED", number: 2 },
      { title: `Present`, value: "Present", color: "#3bc14a", number: 3 },
      { title: `Absent`, value: "Absent", color: "#FDC500", number: 4 },
    ];
  }, [employeeData]);

  const onChangeNumber = (value) => {
    setNumber(value);
  };

  const handleChangeTab = useCallback((value) => {
    setTabValue(value);
    if (tabValue === "Unattend") {
      setSearchInput("");
      setInputToShow("");
      setCurrentPage(1);
    } else if (tabValue === "Attend" || tabValue === "Present") {
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
      } else {
        refetchEmployeeData();
      }
    }, [employeeData])
  );

  return {
    contacts,
    unattendContacts,
    attendContacts,
    alpaContacts,
    filteredDataArray,
    inputToShow,
    searchInput,
    number,
    tabValue,
    hasBeenScrolled,
    currentPage,
    navigation,
    userSelector,
    employeeDataIsFetching,
    employeeDataIsLoading,
    refetchEmployeeData,
    fetchMoreEmployeeContact,
    handleClearSearch,
    handleSearch,
    tabs,
    onChangeNumber,
    handleChangeTab,
    handleSearchContact,
    setInputToShow,
    setSearchInput,
    setHasBeenScrolled,
  };
};
