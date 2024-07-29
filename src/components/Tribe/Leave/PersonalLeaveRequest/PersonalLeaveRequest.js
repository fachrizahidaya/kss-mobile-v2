import { memo, useEffect, useState } from "react";

import { Dimensions, StyleSheet, View } from "react-native";
import { TabView } from "react-native-tab-view";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

import Tabs from "../../../../styles/Tabs";
import LeaveRequestList from "./LeaveRequestList";

const PersonalLeaveRequest = ({
  onSelect,
  pendingList,
  approvedList,
  rejectedList,
  canceledList,
  pendingLeaveRequestIsFetching,
  approvedLeaveRequestIsFetching,
  rejectedLeaveRequestIsFetching,
  canceledLeaveRequestIsFetching,
  pendingLeaveRequestIsLoading,
  approvedLeaveRequestIsLoading,
  rejectedLeaveRequestIsLoading,
  canceledLeaveRequestIsLoading,
  refetchPendingLeaveRequest,
  refetchApprovedLeaveRequest,
  refetchRejectedLeaveRequest,
  refetchCanceledLeaveRequest,
  hasBeenScrolled,
  setHasBeenScrolled,
  fetchMorePending,
  fetchMoreApproved,
  fetchMoreRejected,
  fetchMoreCanceled,
  tabValue,
  tabs,
  onChangeTab,
  hasBeenScrolledPending,
  setHasBeenScrolledPending,
  hasBeenScrolledApproved,
  setHasBeenScrolledApproved,
  hasBeenScrolledCanceled,
  setHasBeenScrolledCanceled,
  refetchPersonalLeaveRequest,
  teamLeaveRequestData,
  index,
  routes,
  renderScene,
  setIndex,
  layout,
  renderTabBar,
}) => {
  const [previousTabValue, setPreviousTabValue] = useState(tabValue);

  const { width } = Dimensions.get("window");
  const translateX = useSharedValue(0);
  const offset = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  // const handleGesture = Animated.event(
  //   [
  //     {
  //       nativeEvent: {
  //         translationX: (value) => {
  //           offset.value = value;
  //         },
  //       },
  //     },
  //   ],
  //   { useNativeDriver: true }
  // );

  // const handleGestureEnd = (event) => {
  //   const { translationX } = event.nativeEvent;
  //   const direction = translationX > 0 ? -1 : 1;
  //   const newTabValue = tabValue + direction;

  //   if (newTabValue >= 0 && newTabValue < tabs.length) {
  //     onChangeTab(newTabValue);
  //   } else {
  //     offset.value = withTiming(0, { duration: 300 });
  //   }
  // };

  const renderContent = () => {
    switch (tabValue) {
      case "Approved":
        return (
          <LeaveRequestList
            data={approvedList}
            teamLeaveRequestData={teamLeaveRequestData}
            hasBeenScrolled={hasBeenScrolledApproved}
            setHasBeenScrolled={setHasBeenScrolledApproved}
            fetchMore={fetchMoreApproved}
            isFetching={approvedLeaveRequestIsFetching}
            refetch={refetchApprovedLeaveRequest}
            refetchPersonal={refetchPersonalLeaveRequest}
            isLoading={approvedLeaveRequestIsLoading}
          />
        );
      case "Canceled":
        return (
          <LeaveRequestList
            data={canceledList}
            teamLeaveRequestData={teamLeaveRequestData}
            hasBeenScrolled={hasBeenScrolledCanceled}
            setHasBeenScrolled={setHasBeenScrolledCanceled}
            fetchMore={fetchMoreCanceled}
            isFetching={canceledLeaveRequestIsFetching}
            refetch={refetchCanceledLeaveRequest}
            refetchPersonal={refetchPersonalLeaveRequest}
            isLoading={canceledLeaveRequestIsLoading}
          />
        );
      case "Rejected":
        return (
          <LeaveRequestList
            data={rejectedList}
            teamLeaveRequestData={teamLeaveRequestData}
            hasBeenScrolled={hasBeenScrolled}
            setHasBeenScrolled={setHasBeenScrolled}
            fetchMore={fetchMoreRejected}
            isFetching={rejectedLeaveRequestIsFetching}
            refetch={refetchRejectedLeaveRequest}
            refetchPersonal={refetchPersonalLeaveRequest}
            isLoading={rejectedLeaveRequestIsLoading}
          />
        );
      default:
        return (
          <LeaveRequestList
            data={pendingList}
            teamLeaveRequestData={teamLeaveRequestData}
            hasBeenScrolled={hasBeenScrolledPending}
            setHasBeenScrolled={setHasBeenScrolledPending}
            fetchMore={fetchMorePending}
            isFetching={pendingLeaveRequestIsFetching}
            refetch={refetchPendingLeaveRequest}
            refetchPersonal={refetchPersonalLeaveRequest}
            isLoading={pendingLeaveRequestIsLoading}
            onSelect={onSelect}
          />
        );
    }
  };
  useEffect(() => {
    if (previousTabValue !== tabValue) {
      const direction = previousTabValue < tabValue ? 1 : -1;
      translateX.value = withTiming(direction * width, { duration: 300, easing: Easing.out(Easing.cubic) }, () => {
        translateX.value = 0;
      });
    }
    setPreviousTabValue(tabValue);
  }, [tabValue]);

  return (
    <>
      <View style={{ paddingHorizontal: 16 }}>
        <Tabs tabs={tabs} value={tabValue} onChange={onChangeTab} />
      </View>
      <View style={styles.container}>
        {/* <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
          renderTabBar={renderTabBar}
        /> */}
        <Animated.View style={[styles.animatedContainer, animatedStyle]}>{renderContent()}</Animated.View>
        {/* {tabValue === "Pending" ? (
          <LeaveRequestList
            data={pendingList}
            teamLeaveRequestData={teamLeaveRequestData}
            hasBeenScrolled={hasBeenScrolledPending}
            setHasBeenScrolled={setHasBeenScrolledPending}
            fetchMore={fetchMorePending}
            isFetching={pendingLeaveRequestIsFetching}
            refetch={refetchPendingLeaveRequest}
            refetchPersonal={refetchPersonalLeaveRequest}
            isLoading={pendingLeaveRequestIsLoading}
            onSelect={onSelect}
          />
        ) : tabValue === "Approved" ? (
          <LeaveRequestList
            data={approvedList}
            teamLeaveRequestData={teamLeaveRequestData}
            hasBeenScrolled={hasBeenScrolledApproved}
            setHasBeenScrolled={setHasBeenScrolledApproved}
            fetchMore={fetchMoreApproved}
            isFetching={approvedLeaveRequestIsFetching}
            refetch={refetchApprovedLeaveRequest}
            refetchPersonal={refetchPersonalLeaveRequest}
            isLoading={approvedLeaveRequestIsLoading}
          />
        ) : tabValue === "Canceled" ? (
          <LeaveRequestList
            data={canceledList}
            teamLeaveRequestData={teamLeaveRequestData}
            hasBeenScrolled={hasBeenScrolledCanceled}
            setHasBeenScrolled={setHasBeenScrolledCanceled}
            fetchMore={fetchMoreCanceled}
            isFetching={canceledLeaveRequestIsFetching}
            refetch={refetchCanceledLeaveRequest}
            refetchPersonal={refetchPersonalLeaveRequest}
            isLoading={canceledLeaveRequestIsLoading}
          />
        ) : (
          <LeaveRequestList
            data={rejectedList}
            teamLeaveRequestData={teamLeaveRequestData}
            hasBeenScrolled={hasBeenScrolled}
            setHasBeenScrolled={setHasBeenScrolled}
            fetchMore={fetchMoreRejected}
            isFetching={rejectedLeaveRequestIsFetching}
            refetch={refetchRejectedLeaveRequest}
            refetchPersonal={refetchPersonalLeaveRequest}
            isLoading={rejectedLeaveRequestIsLoading}
          />
        )} */}
      </View>
    </>
  );
};

export default memo(PersonalLeaveRequest);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f8f8f8",
    flex: 1,
    flexDirection: "column",
  },
  animatedContainer: {
    flex: 1,
    width: "100%",
  },
});
