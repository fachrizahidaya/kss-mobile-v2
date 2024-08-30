import { memo, useEffect, useState } from "react";
import { useFormik } from "formik";

import { Dimensions, StyleSheet, View } from "react-native";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

import Tabs from "../../../../styles/Tabs";
import MyTeamLeaveRequestList from "./MyTeamLeaveRequestList";

const MyTeamLeaveRequest = ({
  refetchTeamLeaveRequest,
  onApproval,
  pendingLeaveRequests,
  approvedLeaveRequests,
  rejectedLeaveRequests,
  pendingLeaveRequestIsFetching,
  approvedLeaveRequestIsFetching,
  rejectedLeaveRequestIsFetching,
  refetchPendingLeaveRequest,
  refetchApprovedLeaveRequest,
  refetchRejectedLeaveRequest,
  hasBeenScrolled,
  setHasBeenScrolled,
  hasBeenScrolledPending,
  setHasBeenScrolledPending,
  hasBeenScrolledApproved,
  setHasBeenScrolledApproved,
  fetchMorePending,
  fetchMoreApproved,
  fetchMoreRejected,
  pendingLeaveRequestIsLoading,
  approvedLeaveRequestIsLoading,
  rejectedLeaveRequestIsLoading,
  tabValue,
  number,
  tabs,
  onChangeTab,
  onChangeNumber,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(null);
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
          <MyTeamLeaveRequestList
            data={approvedLeaveRequests}
            hasBeenScrolled={hasBeenScrolledApproved}
            setHasBeenScrolled={setHasBeenScrolledApproved}
            fetchMore={fetchMoreApproved}
            isFetching={approvedLeaveRequestIsFetching}
            refetch={refetchApprovedLeaveRequest}
            refetchTeam={refetchTeamLeaveRequest}
            isLoading={approvedLeaveRequestIsLoading}
            formik={formik}
            isSubmitting={isSubmitting}
            handleResponse={responseHandler}
          />
        );
      case "Rejected":
        return (
          <MyTeamLeaveRequestList
            data={rejectedLeaveRequests}
            hasBeenScrolled={hasBeenScrolled}
            setHasBeenScrolled={setHasBeenScrolled}
            fetchMore={fetchMoreRejected}
            isFetching={rejectedLeaveRequestIsFetching}
            refetch={refetchRejectedLeaveRequest}
            refetchTeam={refetchTeamLeaveRequest}
            isLoading={rejectedLeaveRequestIsLoading}
            formik={formik}
            isSubmitting={isSubmitting}
            handleResponse={responseHandler}
          />
        );
      default:
        return (
          <MyTeamLeaveRequestList
            data={pendingLeaveRequests}
            hasBeenScrolled={hasBeenScrolledPending}
            setHasBeenScrolled={setHasBeenScrolledPending}
            fetchMore={fetchMorePending}
            isFetching={pendingLeaveRequestIsFetching}
            refetch={refetchPendingLeaveRequest}
            refetchTeam={refetchTeamLeaveRequest}
            isLoading={pendingLeaveRequestIsLoading}
            formik={formik}
            isSubmitting={isSubmitting}
            handleResponse={responseHandler}
          />
        );
    }
  };

  /**
   * Aprroval or Rejection handler
   */
  const formik = useFormik({
    initialValues: {
      object: "",
      object_id: "",
      type: "",
      status: "",
      notes: "",
    },
    onSubmit: (values, { setStatus, setSubmitting }) => {
      setStatus("processing");
      onApproval(values, setStatus, setSubmitting);
    },
  });

  /**
   * Response handler
   * @param {*} response
   */
  const responseHandler = (response, data) => {
    formik.setFieldValue("object", data?.approval_object);
    formik.setFieldValue("object_id", data?.approval_object_id);
    formik.setFieldValue("type", data?.approval_type);
    formik.setFieldValue("status", response);
    setIsSubmitting(response);
    formik.handleSubmit();
  };

  useEffect(() => {
    if (!formik.isSubmitting && formik.status === "success") {
      refetchTeamLeaveRequest();
    }
  }, [formik.isSubmitting && formik.status]);

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
      <View style={styles.tabContainer}>
        <Tabs tabs={tabs} value={tabValue} onChange={onChangeTab} onChangeNumber={onChangeNumber} />
      </View>
      <View style={styles.container}>
        <Animated.View style={[styles.animatedContainer, animatedStyle]}>{renderContent()}</Animated.View>
      </View>
    </>
  );
};

export default memo(MyTeamLeaveRequest);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f8f8f8",
    flex: 1,
    flexDirection: "column",
  },
  content: {
    marginTop: 20,
    gap: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  animatedContainer: {
    flex: 1,
    width: "100%",
  },
  tabContainer: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: "#E8E9EB",
  },
});
