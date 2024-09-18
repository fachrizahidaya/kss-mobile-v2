import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { Dimensions, ScrollView, StyleSheet, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { RefreshControl } from "react-native-gesture-handler";

import { useFetch } from "../../../../hooks/useFetch";
import Tabs from "../../../../styles/Tabs";
import AppraisalListItem from "../../../../components/Tribe/Performance/Appraisal/AppraisalListItem";
import EmptyPlaceholder from "../../../../styles/EmptyPlaceholder";
import ArchivedAppraisalFilter from "../../../../components/Tribe/Performance/Appraisal/ArchivedAppraisalFilter";
import Screen from "../../../../styles/Screen";
import CustomFilter from "../../../../styles/CustomFilter";

const height = Dimensions.get("screen").height - 300;

const AppraisalList = () => {
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

  const { data: archived, isLoading: archivedIsLoading } = useFetch(
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
              keyExtractor={(item, index) => index}
              refreshing={true}
              ListFooterComponent={() => appraisalListIsLoading && <ActivityIndicator />}
              refreshControl={<RefreshControl refreshing={appraisalListIsFetching} onRefresh={refetchAppraisalList} />}
              renderItem={({ item, index }) => (
                <AppraisalListItem
                  key={index}
                  id={item?.id}
                  start_date={item?.review?.begin_date}
                  end_date={item?.review?.end_date}
                  navigation={navigation}
                  name={item?.review?.description}
                  target={item?.target_name}
                  isExpired={false}
                  target_level={item?.target_level}
                  index={index}
                  length={ongoingList?.length}
                />
              )}
            />
          ) : (
            <ScrollView
              refreshControl={<RefreshControl refreshing={appraisalListIsFetching} onRefresh={refetchAppraisalList} />}
            >
              <View style={styles.content}>
                <EmptyPlaceholder text="No Data" />
              </View>
            </ScrollView>
          )
        ) : (
          <View style={{ flex: 1 }}>
            {archived?.data?.length > 0 ? (
              <FlashList
                data={archived?.data}
                estimatedItemSize={50}
                onEndReachedThreshold={0.1}
                keyExtractor={(item, index) => index}
                ListFooterComponent={() => archivedIsLoading && <ActivityIndicator />}
                renderItem={({ item, index }) => (
                  <AppraisalListItem
                    key={index}
                    id={item?.id}
                    start_date={item?.review?.begin_date}
                    end_date={item?.review?.end_date}
                    navigation={navigation}
                    name={item?.review?.description}
                    target={item?.target_name}
                    isExpired={true}
                  />
                )}
              />
            ) : (
              <ScrollView
                refreshControl={
                  <RefreshControl refreshing={appraisalListIsFetching} onRefresh={refetchAppraisalList} />
                }
              >
                <View style={styles.content}>
                  <EmptyPlaceholder text="No Data" />
                </View>
              </ScrollView>
            )}
          </View>
        )}
      </View>
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

export default AppraisalList;

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
    borderTopColor: "#E8E9EB",
    backgroundColor: "#FFFFFF",
  },
});
