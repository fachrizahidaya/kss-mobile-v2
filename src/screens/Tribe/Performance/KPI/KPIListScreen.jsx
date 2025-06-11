import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { Dimensions, StyleSheet, View } from "react-native";

import { useFetch } from "../../../../hooks/useFetch";
import Tabs from "../../../../layouts/Tabs";
import ArchivedKPIFilter from "../../../../components/Tribe/Performance/KPI/ArchivedKPIFilter";
import Screen from "../../../../layouts/Screen";
import CustomFilter from "../../../../styles/buttons/CustomFilter";
import { Colors } from "../../../../styles/Color";
import KPI from "../../../../components/Tribe/Performance/KPI/KPI";

const height = Dimensions.get("screen").height - 300;

const KPIListScreen = () => {
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
    data: kpiList,
    refetch: refetchKpiList,
    isFetching: kpiListIsFetching,
    isLoading: kpiListIsLoading,
  } = useFetch(tabValue === "Ongoing" && "/hr/employee-kpi/ongoing");

  const {
    data: archived,
    isLoading: archivedIsLoading,
    isFetching: archivedIsFetching,
  } = useFetch(
    tabValue === "Archived" && "/hr/employee-kpi/ongoing",
    [startDate, endDate],
    fetchArchivedParameters
  );

  const tabs = useMemo(() => {
    return [
      { title: `Ongoing`, value: "Ongoing" },
      { title: `Archived`, value: "Archived" },
    ];
  }, [kpiList, archived]);

  const handleChangeTab = (value) => {
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
  const handleChangeStartDate = (date) => {
    setStartDate(date);
  };
  const handleChangeEndDate = (date) => {
    setEndDate(date);
  };

  const handleResetFilter = () => {
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
    if (kpiList?.data?.length) {
      setOngoingList((prevData) => [...prevData, ...kpiList?.data]);
    }
  }, [kpiList?.data?.length, tabValue]);

  return (
    <Screen
      screenTitle="Employee KPI"
      // returnButton={true}
      onPress={() => navigation.goBack()}
      childrenHeader={
        tabValue === "Archived" && (
          <CustomFilter toggle={handleOpenSheet} filterAppear={startDate || endDate} />
        )
      }
    >
      <View style={styles.tabContainer}>
        <Tabs tabs={tabs} value={tabValue} onChange={handleChangeTab} />
      </View>
      <KPI
        tabValue={tabValue}
        ongoingList={ongoingList}
        archived={archived}
        isFetching={kpiListIsFetching}
        refetch={refetchKpiList}
        archivedIsFetching={archivedIsFetching}
        height={height}
      />

      <ArchivedKPIFilter
        startDate={startDate}
        startDateChangeHandler={handleChangeStartDate}
        endDate={endDate}
        endDateChangeHandler={handleChangeEndDate}
        reference={filterSheetRef}
        handleResetFilter={handleResetFilter}
      />
    </Screen>
  );
};

export default KPIListScreen;

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
