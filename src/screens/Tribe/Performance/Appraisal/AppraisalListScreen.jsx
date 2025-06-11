import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { Dimensions, StyleSheet, View } from "react-native";

import { useFetch } from "../../../../hooks/useFetch";
import Tabs from "../../../../layouts/Tabs";
import ArchivedAppraisalFilter from "../../../../components/Tribe/Performance/Appraisal/ArchivedAppraisalFilter";
import Screen from "../../../../layouts/Screen";
import CustomFilter from "../../../../styles/buttons/CustomFilter";
import { Colors } from "../../../../styles/Color";
import Appraisal from "../../../../components/Tribe/Performance/Appraisal/Appraisal";

const height = Dimensions.get("screen").height - 300;

const AppraisalListScreen = () => {
  const [tabValue, setTabValue] = useState("Ongoing");
  const [ongoingList, setOngoingList] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const navigation = useNavigation();
  const filterSheetRef = useRef();

  const fetchArchivedParameters = {
    begin_date: startDate,
    end_date: endDate,
  };

  const {
    data: appraisalList,
    refetch: refetchAppraisalList,
    isFetching: appraisalListIsFetching,
    isLoading: appraisalListIsLoading,
  } = useFetch(tabValue === "Ongoing" && "/hr/employee-appraisal/ongoing");

  const {
    data: archived,
    isLoading: archivedIsLoading,
    isFetching: archivedIsFetching,
  } = useFetch(
    tabValue === "Archived" && "/hr/employee-appraisal/ongoing",
    [startDate, endDate],
    fetchArchivedParameters
  );

  const tabs = useMemo(() => {
    return [
      {
        title: `Ongoing`,
        value: "Ongoing",
      },
      { title: `Archived`, value: "Archived" },
    ];
  }, [appraisalList, archived]);

  const onChangeTab = (value) => {
    setTabValue(value);
    if (tabValue === "Ongoing") {
      setStartDate(null);
      setEndDate(null);
    } else {
      setOngoingList([]);
    }
  };

  /**
   * Handle start and end date archived
   * @param {*} date
   */
  const startDateChangeHandler = (date) => {
    setStartDate(date);
  };
  const endDateChangeHandler = (date) => {
    setEndDate(date);
  };

  const resetFilterHandler = () => {
    setStartDate(null);
    setEndDate(null);
  };

  const handleOpenSheet = () => {
    filterSheetRef.current?.show();
  };

  useEffect(() => {
    setEndDate(startDate);
  }, [startDate]);

  useEffect(() => {
    if (appraisalList?.data?.length) {
      setOngoingList((prevData) => [...prevData, ...appraisalList?.data]);
    }
  }, [appraisalList?.data?.length, tabValue]);

  return (
    <Screen
      screenTitle="Employee Appraisal"
      // returnButton={true}
      onPress={() => navigation.goBack()}
      childrenHeader={
        tabValue === "Archived" && (
          <CustomFilter toggle={handleOpenSheet} filterAppear={startDate || endDate} />
        )
      }
    >
      <View style={styles.tabContainer}>
        <Tabs tabs={tabs} value={tabValue} onChange={onChangeTab} />
      </View>
      <Appraisal
        tabValue={tabValue}
        ongoingList={ongoingList}
        archived={archived}
        isFetching={appraisalListIsFetching}
        refetch={refetchAppraisalList}
        archivedIsFetching={archivedIsFetching}
        height={height}
      />

      <ArchivedAppraisalFilter
        startDate={startDate}
        endDate={endDate}
        startDateChangeHandler={startDateChangeHandler}
        endDateChangeHandler={endDateChangeHandler}
        reference={filterSheetRef}
        handleResetFilter={resetFilterHandler}
      />
    </Screen>
  );
};

export default AppraisalListScreen;

const styles = StyleSheet.create({
  tabContainer: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    gap: 10,
    borderTopColor: Colors.borderGrey,
    backgroundColor: Colors.secondary,
  },
});
