import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useFormik } from "formik";

import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { FlashList } from "@shopify/flash-list";
import { RefreshControl } from "react-native-gesture-handler";
import { SceneMap } from "react-native-tab-view";

import PageHeader from "../../../../styles/PageHeader";
import { useFetch } from "../../../../hooks/useFetch";
import axiosInstance from "../../../../config/api";
import MyTeamLeaveRequest from "../../../../components/Tribe/Leave/TeamLeaveRequest/MyTeamLeaveRequest";
import { useDisclosure } from "../../../../hooks/useDisclosure";
import AlertModal from "../../../../styles/modals/AlertModal";
import MyTeamLeaveRequestItem from "../../../../components/Tribe/Leave/TeamLeaveRequest/MyTeamLeaveRequestItem";
import EmptyPlaceholder from "../../../../styles/EmptyPlaceholder";
import TaskSkeleton from "../../../../components/Band/Task/TaskList/TaskSkeleton";

const TeamLeave = () => {
  const [isReady, setIsReady] = useState(false);
  const [requestType, setRequestType] = useState("");
  const [hasBeenScrolledPending, setHasBeenScrolledPending] = useState(false);
  const [hasBeenScrolledApproved, setHasBeenScrolledApproved] = useState(false);
  const [hasBeenScrolledRejected, setHasBeenScrolledRejected] = useState(false);
  const [pendingList, setPendingList] = useState([]);
  const [reloadPending, setReloadPending] = useState(false);
  const [approvedList, setApprovedList] = useState([]);
  const [reloadApproved, setReloadApproved] = useState(false);
  const [rejectedList, setRejectedList] = useState([]);
  const [reloadRejected, setReloadRejected] = useState(false);
  const [tabValue, setTabValue] = useState("Pending");
  const [currentPagePending, setCurrentPagePending] = useState(1);
  const [currentPageApproved, setCurrentPageApproved] = useState(1);
  const [currentPageRejected, setCurrentPageRejected] = useState(1);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(null);
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "pending", title: "Waiting Approval" },
    { key: "approved", title: "Approved" },
    { key: "rejected", title: "Rejected" },
  ]);

  const navigation = useNavigation();
  const firstTimeRef = useRef(null);

  const { isOpen: responseModalIsOpen, toggle: toggleResponseModal } = useDisclosure(false);

  const fetchMorePendingParameters = {
    page: currentPagePending,
    limit: 100,
    status:
      // "Pending",
      tabValue,
  };

  const fetchMoreApprovedParameters = {
    page: currentPageApproved,
    limit: 10,
    status:
      // "Approved",
      tabValue,
  };

  const fetchMoreRejectedParameters = {
    page: currentPageRejected,
    limit: 10,
    status:
      // "Rejected",
      tabValue,
  };

  const {
    data: pendingLeaveRequest,
    refetch: refetchPendingLeaveRequest,
    isFetching: pendingLeaveRequestIsFetching,
    isLoading: pendingLeaveRequestIsLoading,
  } = useFetch(
    // index === 0 &&
    tabValue === "Pending" && "/hr/leave-requests/my-team",
    [currentPagePending, reloadPending],
    fetchMorePendingParameters
  );

  const {
    data: approvedLeaveRequest,
    refetch: refetchApprovedLeaveRequest,
    isFetching: approvedLeaveRequestIsFetching,
    isLoading: approvedLeaveRequestIsLoading,
  } = useFetch(
    // index === 1 &&
    tabValue === "Approved" && "/hr/leave-requests/my-team",
    [currentPageApproved, reloadApproved],
    fetchMoreApprovedParameters
  );

  const {
    data: rejectedLeaveRequest,
    refetch: refetchRejectedLeaveRequest,
    isFetching: rejectedLeaveRequestIsFetching,
    isLoading: rejectedLeaveRequestIsLoading,
  } = useFetch(
    // index === 2 &&
    tabValue === "Rejected" && "/hr/leave-requests/my-team",
    [currentPageRejected, reloadRejected],
    fetchMoreRejectedParameters
  );

  const { data: teamLeaveRequest, refetch: refetchTeamLeaveRequest } = useFetch("/hr/leave-requests/my-team");

  const handleRefresh = (refetch) => {
    refetch();
    refetchTeamLeaveRequest();
  };

  const handleTabChange = (i) => {
    setIndex(i);
    if (index === 0) {
      setApprovedList([]);
      setRejectedList([]);
      setCurrentPagePending(1);
    } else if (index === 1) {
      setPendingList([]);
      setRejectedList([]);
      setCurrentPageRejected(1);
    } else {
      setPendingList([]);
      setApprovedList([]);
      setCurrentPageApproved(1);
    }
  };

  const renderFlashList = (
    data = [],
    isLoading,
    isFetching,
    refetch,
    hasBeenScrolled,
    setHasBeenScrolled,
    fetchMore
  ) => {
    return (
      <View style={{ gap: 10, flex: 1, backgroundColor: "#f8f8f8" }}>
        {data.length > 0 ? (
          <>
            <FlashList
              refreshControl={<RefreshControl refreshing={isFetching} onRefresh={() => handleRefresh(refetch)} />}
              data={data}
              keyExtractor={(item, index) => index}
              estimatedItemSize={70}
              onEndReachedThreshold={0.1}
              onEndReached={fetchMore}
              // onScrollBeginDrag={() => setHasBeenScrolled(!hasBeenScrolled)}
              renderItem={({ item, index }) => (
                <MyTeamLeaveRequestItem
                  item={item}
                  key={index}
                  id={item?.id}
                  leave_name={item?.leave_name}
                  reason={item?.reason}
                  days={item?.days}
                  begin_date={item?.begin_date}
                  end_date={item?.end_date}
                  status={item?.status}
                  employee_name={item?.employee_name}
                  employee_image={item?.employee_image}
                  handleResponse={responseHandler}
                  isSubmitting={isSubmitting}
                  formik={formik}
                />
              )}
              ListFooterComponent={() =>
                // hasBeenScrolled &&
                isLoading && <ActivityIndicator />
              }
            />
          </>
        ) : (
          <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
            <EmptyPlaceholder height={250} width={250} text="No Data" />
          </View>
        )}
      </View>
    );
  };

  const Pending = () =>
    renderFlashList(
      pendingList,
      pendingLeaveRequestIsLoading,
      pendingLeaveRequestIsFetching,
      refetchPendingLeaveRequest,
      hasBeenScrolledPending,
      setHasBeenScrolledPending,
      fetchMorePending
    );
  const Approved = () =>
    renderFlashList(
      approvedList,
      approvedLeaveRequestIsLoading,
      approvedLeaveRequestIsFetching,
      refetchApprovedLeaveRequest,
      hasBeenScrolledApproved,
      setHasBeenScrolledApproved,
      fetchMoreApproved
    );
  const Rejected = () =>
    renderFlashList(
      rejectedList,
      rejectedLeaveRequestIsLoading,
      rejectedLeaveRequestIsFetching,
      refetchRejectedLeaveRequest,
      hasBeenScrolledRejected,
      setHasBeenScrolledRejected,
      fetchMoreRejected
    );

  const renderScene = SceneMap({
    pending: Pending,
    approved: Approved,
    rejected: Rejected,
  });

  const layout = useWindowDimensions();

  const renderTabBar = (props) => (
    <View style={{ flexDirection: "row", backgroundColor: "#FFFFFF", paddingHorizontal: 14 }}>
      {props.navigationState.routes.map((route, i) => (
        <TouchableOpacity
          key={i}
          style={{
            flex: 1,
            height: 36,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 15,
            marginBottom: 8,
            backgroundColor: index === i ? "#176688" : null,
          }}
          onPress={() => handleTabChange(i)}
        >
          <Text style={{ color: index === i ? "#FFFFFF" : "#000000" }}>{route.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const tabs = useMemo(() => {
    return [
      { title: `Waiting Approval`, value: "Pending" },
      { title: `Approved`, value: "Approved" },
      { title: `Rejected`, value: "Rejected" },
    ];
  }, [teamLeaveRequest]);

  const onChangeTab = (value) => {
    setTabValue(value);
    if (tabValue === "Pending") {
      setApprovedList([]);
      setRejectedList([]);
      setCurrentPagePending(1);
    } else if (tabValue === "Approved") {
      setPendingList([]);
      setRejectedList([]);
      setCurrentPageApproved(1);
    } else {
      setPendingList([]);
      setApprovedList([]);
      setCurrentPageRejected(1);
    }
  };

  /**
   * Handle fetch more leave by status
   */
  const fetchMorePending = () => {
    if (currentPagePending < pendingLeaveRequest?.data?.last_page) {
      setCurrentPagePending(currentPagePending + 1);
      setReloadPending(!reloadPending);
    }
  };
  const fetchMoreApproved = () => {
    if (currentPageApproved < approvedLeaveRequest?.data?.last_page) {
      setCurrentPageApproved(currentPageApproved + 1);
      setReloadApproved(!reloadApproved);
    }
  };
  const fetchMoreRejected = () => {
    if (currentPageRejected < rejectedLeaveRequest?.data?.last_page) {
      setCurrentPageRejected(currentPageRejected + 1);
      setReloadRejected(!reloadRejected);
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
      approvalResponseHandler(values, setStatus, setSubmitting);
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

  /**
   * Handle submit response of leave request
   * @param {*} data
   * @param {*} setStatus
   * @param {*} setSubmitting
   */
  const approvalResponseHandler = async (data, setStatus, setSubmitting) => {
    try {
      const res = await axiosInstance.post(`/hr/approvals/approval`, data);
      if (data.status === "Approved") {
        setRequestType("patch");
      } else {
        setRequestType("reject");
      }
      toggleResponseModal();
      refetchPendingLeaveRequest();
      refetchTeamLeaveRequest();
      setSubmitting(false);
      setStatus("success");
    } catch (err) {
      console.log(err);
      toggleResponseModal();
      setErrorMessage(err.response.data.message);
      setRequestType("error");
      setSubmitting(false);
      setStatus("error");
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setIsReady(true);
    }, 100);
  });

  useEffect(() => {
    if (pendingLeaveRequest?.data?.data.length >= 0) {
      setPendingList(() => [...pendingLeaveRequest?.data?.data]);
    }
  }, [pendingLeaveRequest?.data?.data.length]);

  useEffect(() => {
    if (approvedLeaveRequest?.data?.data?.length) {
      setApprovedList((prevData) => [...prevData, ...approvedLeaveRequest?.data?.data]);
    }
  }, [approvedLeaveRequest?.data?.data?.length]);

  useEffect(() => {
    if (rejectedLeaveRequest?.data?.data?.length) {
      setRejectedList((prevData) => [...prevData, ...rejectedLeaveRequest?.data?.data]);
    }
  }, [rejectedLeaveRequest?.data?.data?.length]);

  useFocusEffect(
    useCallback(() => {
      if (firstTimeRef.current) {
        firstTimeRef.current = false;
        return;
      }
      refetchTeamLeaveRequest();
    }, [refetchTeamLeaveRequest])
  );

  return (
    <SafeAreaView style={styles.container}>
      {isReady ? (
        <>
          <View style={styles.header}>
            <PageHeader title="My Team Leave Request" onPress={() => navigation.goBack()} />
          </View>

          <MyTeamLeaveRequest
            pendingLeaveRequests={pendingList}
            approvedLeaveRequests={approvedList}
            rejectedLeaveRequests={rejectedList}
            pendingLeaveRequestIsFetching={pendingLeaveRequestIsFetching}
            approvedLeaveRequestIsFetching={approvedLeaveRequestIsFetching}
            rejectedLeaveRequestIsFetching={rejectedLeaveRequestIsFetching}
            refetchPendingLeaveRequest={refetchPendingLeaveRequest}
            refetchApprovedLeaveRequest={refetchApprovedLeaveRequest}
            refetchRejectedLeaveRequest={refetchRejectedLeaveRequest}
            hasBeenScrolled={hasBeenScrolledRejected}
            setHasBeenScrolled={setHasBeenScrolledRejected}
            hasBeenScrolledPending={hasBeenScrolledPending}
            setHasBeenScrolledPending={setHasBeenScrolledPending}
            hasBeenScrolledApproved={hasBeenScrolledApproved}
            setHasBeenScrolledApproved={setHasBeenScrolledApproved}
            fetchMorePending={fetchMorePending}
            fetchMoreApproved={fetchMoreApproved}
            fetchMoreRejected={fetchMoreRejected}
            pendingLeaveRequestIsLoading={pendingLeaveRequestIsLoading}
            approvedLeaveRequestIsLoading={approvedLeaveRequestIsLoading}
            rejectedLeaveRequestIsLoading={rejectedLeaveRequestIsLoading}
            onApproval={approvalResponseHandler}
            tabValue={tabValue}
            tabs={tabs}
            onChangeTab={onChangeTab}
            refetchTeamLeaveRequest={refetchTeamLeaveRequest}
            index={index}
            setIndex={setIndex}
            routes={routes}
            layout={layout}
            renderScene={renderScene}
            renderTabBar={renderTabBar}
          />
        </>
      ) : null}

      <AlertModal
        isOpen={responseModalIsOpen}
        toggle={toggleResponseModal}
        type={requestType === "patch" ? "info" : requestType === "reject" ? "warning" : "danger"}
        title={
          requestType === "patch"
            ? "Approval confirmed!"
            : requestType === "reject"
            ? "Decline confirmed!"
            : "Process error!"
        }
        description={
          requestType === "patch"
            ? "Thank you for your prompt action"
            : requestType === "reject"
            ? "Requester will be notified of the decline"
            : errorMessage || "Please try again later"
        }
      />
    </SafeAreaView>
  );
};

export default TeamLeave;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFF",
    position: "relative",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 14,
    paddingVertical: 16,
  },
});
