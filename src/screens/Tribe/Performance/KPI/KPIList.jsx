import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { ActivityIndicator, Dimensions, ScrollView, StyleSheet, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { RefreshControl } from "react-native-gesture-handler";

import { useFetch } from "../../../../hooks/useFetch";
import Tabs from "../../../../layouts/Tabs";
import KPIListItem from "../../../../components/Tribe/Performance/KPI/KPIListItem";
import EmptyPlaceholder from "../../../../layouts/EmptyPlaceholder";
import ArchivedKPIFilter from "../../../../components/Tribe/Performance/KPI/ArchivedKPIFilter";
import Screen from "../../../../layouts/Screen";
import CustomFilter from "../../../../styles/buttons/CustomFilter";
import { Colors } from "../../../../styles/Color";

const height = Dimensions.get("screen").height - 300;

const KPIList = () => {
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

  const { data: archived, isLoading: archivedIsLoading } = useFetch(
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
    if (kpiList?.data?.length) {
      setOngoingList((prevData) => [...prevData, ...kpiList?.data]);
    }
  }, [kpiList?.data?.length, tabValue]);

  return (
    <Screen
      screenTitle="Employee KPI"
      returnButton={true}
      onPress={() => navigation.goBack()}
      childrenHeader={
        tabValue === "Archived" && <CustomFilter toggle={handleOpenSheet} filterAppear={startDate || endDate} />
      }
    >
      <View style={styles.tabContainer}>
        <Tabs tabs={tabs} value={tabValue} onChange={onChangeTab} />
      </View>
      <View style={{ flex: 1 }}>
        {tabValue === "Ongoing" ? (
          ongoingList?.length > 0 ? (
            <FlashList
              data={ongoingList}
              estimatedItemSize={50}
              onEndReachedThreshold={0.1}
              refreshing={true}
              refreshControl={<RefreshControl refreshing={kpiListIsFetching} onRefresh={refetchKpiList} />}
              keyExtractor={(item, index) => index}
              ListFooterComponent={() => kpiListIsLoading && <ActivityIndicator />}
              renderItem={({ item, index }) => (
                <KPIListItem
                  key={index}
                  id={item?.id}
                  start_date={item?.review?.begin_date}
                  end_date={item?.review?.end_date}
                  navigation={navigation}
                  name={item?.review?.description}
                  target={item?.target_name}
                  isExpired={false}
                  target_level={item?.target_level}
                  status="ongoing"
                  index={index}
                  length={ongoingList?.length}
                />
              )}
            />
          ) : (
            <ScrollView refreshControl={<RefreshControl refreshing={kpiListIsFetching} onRefresh={refetchKpiList} />}>
              <View style={styles.content}>
                <EmptyPlaceholder text="No Data" />
              </View>
            </ScrollView>
          )
        ) : archived?.data?.length > 0 ? (
          <FlashList
            data={archived?.data}
            estimatedItemSize={50}
            onEndReachedThreshold={0.1}
            keyExtractor={(item, index) => index}
            ListFooterComponent={() => archivedIsLoading && <ActivityIndicator />}
            renderItem={({ item, index }) => (
              <KPIListItem
                key={index}
                id={item?.id}
                start_date={item?.review?.begin_date}
                end_date={item?.review?.end_date}
                navigation={navigation}
                name={item?.review?.description}
                target={item?.target_name}
                isExpired={true}
                status="archived"
              />
            )}
          />
        ) : (
          <ScrollView refreshControl={<RefreshControl refreshing={kpiListIsFetching} onRefresh={refetchKpiList} />}>
            <View style={styles.content}>
              <EmptyPlaceholder text="No Data" />
            </View>
          </ScrollView>
        )}
      </View>
      <ArchivedKPIFilter
        startDate={startDate}
        startDateChangeHandler={startDateChangeHandler}
        endDate={endDate}
        endDateChangeHandler={endDateChangeHandler}
        reference={filterSheetRef}
        handleResetFilter={resetFilterHandler}
      />
    </Screen>
  );
};

export default KPIList;

const styles = StyleSheet.create({
  content: {
    alignItems: "center",
    justifyContent: "center",
    height: height,
  },
  tabContainer: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    gap: 10,
    borderTopColor: Colors.borderGrey,
    backgroundColor: Colors.secondary,
  },
});
