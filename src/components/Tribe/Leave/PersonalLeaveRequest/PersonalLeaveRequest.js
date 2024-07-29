import { memo, useEffect, useState } from "react";

import { Dimensions, StyleSheet, View } from "react-native";
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
  number,
  tabs,
  onChangeTab,
  onChangeNumber,
  hasBeenScrolledPending,
  setHasBeenScrolledPending,
  hasBeenScrolledApproved,
  setHasBeenScrolledApproved,
  hasBeenScrolledCanceled,
  setHasBeenScrolledCanceled,
  refetchPersonalLeaveRequest,
  teamLeaveRequestData,
}) => {
  const [previousTabValue, setPreviousTabValue] = useState(0);

  const { width } = Dimensions.get("window");
  const translateX = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

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
    if (previousTabValue !== number) {
      const direction = previousTabValue < number ? -1 : 1;
      translateX.value = withTiming(direction * width, { duration: 300, easing: Easing.out(Easing.cubic) }, () => {
        translateX.value = 0;
      });
    }
    setPreviousTabValue(number);
  }, [number]);

  return (
    <>
      <View style={{ paddingHorizontal: 16 }}>
        <Tabs tabs={tabs} value={tabValue} onChange={onChangeTab} onChangeNumber={onChangeNumber} />
      </View>
      <View style={styles.container}>
        <Animated.View style={[styles.animatedContainer, animatedStyle]}>{renderContent()}</Animated.View>
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
