import { memo, useEffect, useState } from "react";
import { useFormik } from "formik";

import { StyleSheet, View } from "react-native";
import { TabView } from "react-native-tab-view";

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
  tabs,
  onChangeTab,
  index,
  routes,
  renderScene,
  setIndex,
  layout,
  renderTabBar,
}) => {
  // const [isSubmitting, setIsSubmitting] = useState(null);

  /**
   * Aprroval or Rejection handler
   */
  // const formik = useFormik({
  //   initialValues: {
  //     object: "",
  //     object_id: "",
  //     type: "",
  //     status: "",
  //     notes: "",
  //   },
  //   onSubmit: (values, { setStatus, setSubmitting }) => {
  //     setStatus("processing");
  //     onApproval(values, setStatus, setSubmitting);
  //   },
  // });

  /**
   * Response handler
   * @param {*} response
   */
  // const responseHandler = (response, data) => {
  //   formik.setFieldValue("object", data?.approval_object);
  //   formik.setFieldValue("object_id", data?.approval_object_id);
  //   formik.setFieldValue("type", data?.approval_type);
  //   formik.setFieldValue("status", response);
  //   setIsSubmitting(response);
  //   formik.handleSubmit();
  // };

  // useEffect(() => {
  //   if (!formik.isSubmitting && formik.status === "success") {
  //     refetchTeamLeaveRequest();
  //   }
  // }, [formik.isSubmitting && formik.status]);

  return (
    <>
      {/* <View style={{ paddingHorizontal: 16 }}>
        <Tabs tabs={tabs} value={tabValue} onChange={onChangeTab} />
      </View> */}
      <View style={styles.container}>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
          renderTabBar={renderTabBar}
        />
        {/* {tabValue === "Pending" ? (
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
        ) : tabValue === "Approved" ? (
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
        ) : (
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
        )} */}
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
});
