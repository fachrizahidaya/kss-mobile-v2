import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import _ from "lodash";
import dayjs from "dayjs";

import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  ActivityIndicator,
} from "react-native";
import { SceneMap } from "react-native-tab-view";

import Button from "../../../styles/forms/Button";
import { useFetch } from "../../../hooks/useFetch";
import useCheckAccess from "../../../hooks/useCheckAccess";
import { useDisclosure } from "../../../hooks/useDisclosure";
import PersonalLeaveRequest from "../../../components/Tribe/Leave/PersonalLeaveRequest/PersonalLeaveRequest";
import FilterLeave from "../../../components/Tribe/Leave/PersonalLeaveRequest/FilterLeave";
import RemoveConfirmationModal from "../../../styles/modals/RemoveConfirmationModal";
import axiosInstance from "../../../config/api";
import { useLoading } from "../../../hooks/useLoading";
import AlertModal from "../../../styles/modals/AlertModal";
import { FlashList } from "@shopify/flash-list";
import { RefreshControl } from "react-native-gesture-handler";
import LeaveRequestItem from "../../../components/Tribe/Leave/PersonalLeaveRequest/LeaveRequestItem";
import EmptyPlaceholder from "../../../styles/EmptyPlaceholder";
import TaskSkeleton from "../../../components/Band/Task/TaskList/TaskSkeleton";

const PersonalLeave = () => {
  const [selectedData, setSelectedData] = useState(null);
  const [hasBeenScrolledPending, setHasBeenScrolledPending] = useState(false);
  const [hasBeenScrolledApproved, setHasBeenScrolledApproved] = useState(false);
  const [hasBeenScrolledRejected, setHasBeenScrolledRejected] = useState(false);
  const [hasBeenScrolledCanceled, setHasBeenScrolledCanceled] = useState(false);
  const [pendingList, setPendingList] = useState([]);
  const [reloadPending, setReloadPending] = useState(false);
  const [approvedList, setApprovedList] = useState([]);
  const [reloadApproved, setReloadApproved] = useState(false);
  const [rejectedList, setRejectedList] = useState([]);
  const [reloadRejected, setReloadRejected] = useState(false);
  const [canceledList, setCanceledList] = useState([]);
  const [reloadCanceled, setReloadCanceled] = useState(false);
  const [tabValue, setTabValue] = useState("Pending");
  const [currentPagePending, setCurrentPagePending] = useState(1);
  const [currentPageRejected, setCurrentPageRejected] = useState(1);
  const [currentPageApproved, setCurrentPageApproved] = useState(1);
  const [currentPageCanceled, setCurrentPageCanceled] = useState(1);
  const [filterYear, setFilterYear] = useState(dayjs().format("YYYY"));
  const [filterType, setFilterType] = useState("personal");
  const [errorMessage, setErrorMessage] = useState("");
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "pending", title: "Pending" },
    { key: "canceled", title: "Canceled" },
    { key: "rejected", title: "Rejected" },
    { key: "approved", title: "Approved" },
  ]);

  const approvalLeaveRequestCheckAccess = useCheckAccess("approval", "Leave Requests");

  const firstTimeRef = useRef(null);

  const navigation = useNavigation();

  const { isOpen: cancelModalIsOpen, toggle: toggleCancelModal } = useDisclosure(false);
  const { isOpen: alertIsOpen, toggle: toggleAlert } = useDisclosure(false);

  const { toggle: toggleCancelLeaveReqeuest, isLoading: cancelLeaveRequestIsLoading } = useLoading(false);

  const fetchMorePendingParameters = {
    page: currentPagePending,
    limit: 100,
    status:
      // "Pending"
      tabValue,
  };

  const fetchMoreApprovedParameters = {
    page: currentPageApproved,
    limit: 10,
    status:
      // "Approved"
      tabValue,
  };

  const fetchMoreRejectedParameters = {
    page: currentPageRejected,
    limit: 10,
    status:
      // "Rejected"
      tabValue,
  };

  const fetchMoreCanceledParameters = {
    page: currentPageCanceled,
    limit: 10,
    status:
      // "Canceled"
      tabValue,
  };

  const {
    data: pendingLeaveRequest,
    refetch: refetchPendingLeaveRequest,
    isFetching: pendingLeaveRequestIsFetching,
    isLoading: pendingLeaveRequestIsLoading,
  } = useFetch(
    // index === 0 &&
    tabValue === "Pending" && "/hr/leave-requests/personal",
    [currentPagePending, reloadPending],
    fetchMorePendingParameters
  );

  const {
    data: canceledLeaveRequest,
    refetch: refetchCanceledLeaveRequest,
    isFetching: canceledLeaveRequestIsFetching,
    isLoading: canceledLeaveRequestIsLoading,
  } = useFetch(
    // index === 1 &&
    tabValue === "Canceled" && "/hr/leave-requests/personal",
    [currentPageCanceled, reloadCanceled],
    fetchMoreCanceledParameters
  );

  const {
    data: rejectedLeaveRequest,
    refetch: refetchRejectedLeaveRequest,
    isFetching: rejectedLeaveRequestIsFetching,
    isLoading: rejectedLeaveRequestIsLoading,
  } = useFetch(
    // index === 2 &&
    tabValue === "Rejected" && "/hr/leave-requests/personal",
    [currentPageRejected, reloadRejected],
    fetchMoreRejectedParameters
  );

  const {
    data: approvedLeaveRequest,
    refetch: refetchApprovedLeaveRequest,
    isFetching: approvedLeaveRequestIsFetching,
    isLoading: approvedLeaveRequestIsLoading,
  } = useFetch(
    // index === 3 &&
    tabValue === "Approved" && "/hr/leave-requests/personal",
    [currentPageApproved, reloadApproved],
    fetchMoreApprovedParameters
  );

  const { data: personalLeaveRequest, refetch: refetchPersonalLeaveRequest } = useFetch("/hr/leave-requests/personal");
  const { data: teamLeaveRequestData } = useFetch("/hr/leave-requests/waiting-approval");

  const handleRefresh = (refetch) => {
    refetch();
    refetchPersonalLeaveRequest();
  };

  const handleTabChange = (i) => {
    setIndex(i);
    if (index === 0) {
      setApprovedList([]);
      setRejectedList([]);
      setCanceledList([]);
      setCurrentPagePending(1);
    } else if (index === 1) {
      setPendingList([]);
      setApprovedList([]);
      setRejectedList([]);
      setCurrentPageCanceled(1);
    } else if (index === 2) {
      setPendingList([]);
      setApprovedList([]);
      setCanceledList([]);
      setCurrentPageRejected(1);
    } else {
      setPendingList([]);
      setRejectedList([]);
      setCanceledList([]);
      setCurrentPageApproved(1);
    }
  };

  const renderFooterLoading = (hasBeenScrolled, isLoading) => {
    if (
      // hasBeenScrolled &&
      isLoading
    ) {
      return <ActivityIndicator />;
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
        {data?.length > 0 ? (
          <>
            <FlashList
              refreshControl={<RefreshControl refreshing={isFetching} onRefresh={() => handleRefresh(refetch)} />}
              data={data}
              keyExtractor={(item, index) => index}
              refreshing={true}
              estimatedItemSize={70}
              onEndReachedThreshold={0.1}
              onEndReached={fetchMore}
              // onScrollBeginDrag={() => setHasBeenScrolled(!hasBeenScrolled)}
              renderItem={({ item, index }) => (
                <LeaveRequestItem
                  item={item}
                  key={index}
                  leave_name={item?.leave_name}
                  reason={item?.reason}
                  days={item?.days}
                  begin_date={item?.begin_date}
                  end_date={item?.end_date}
                  status={item?.status}
                  approval_by={item?.approval_by}
                  onSelect={openSelectedLeaveHandler}
                  supervisor_name={item?.supervisor_name}
                />
              )}
              ListFooterComponent={() => renderFooterLoading(null, isLoading)}
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
  const Canceled = () =>
    renderFlashList(
      canceledList,
      cancelLeaveRequestIsLoading,
      canceledLeaveRequestIsFetching,
      refetchCanceledLeaveRequest,
      hasBeenScrolledCanceled,
      setHasBeenScrolledCanceled,
      fetchMoreCanceled
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
    canceled: Canceled,
    rejected: Rejected,
    approved: Approved,
  });

  const layout = useWindowDimensions();

  const renderTabBar = (props) => (
    <View style={{ flexDirection: "row", backgroundColor: "#FFFFFF", paddingHorizontal: 14 }}>
      {props.navigationState.routes.map((route, i) => (
        <TouchableOpacity
          key={i}
          style={[styles.tabBar, { backgroundColor: index === i ? "#176688" : null }]}
          onPress={() => handleTabChange(i)}
        >
          <Text style={{ color: index === i ? "#FFFFFF" : "#000000" }}>{route.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const tabs = useMemo(() => {
    return [
      { title: `Pending`, value: "Pending" },
      { title: `Canceled`, value: "Canceled" },
      { title: `Rejected`, value: "Rejected" },
      { title: `Approved`, value: "Approved" },
    ];
  }, [personalLeaveRequest]);

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
  const fetchMoreCanceled = () => {
    if (currentPageCanceled < canceledLeaveRequest?.data?.last_page) {
      setCurrentPageCanceled(currentPageCanceled + 1);
      setReloadCanceled(!reloadCanceled);
    }
  };

  /**
   * Handle selected leave to cancel
   * @param {*} leave
   */
  const openSelectedLeaveHandler = (leave) => {
    setSelectedData(leave);
    toggleCancelModal();
  };
  const closeSelectedLeaveHandler = () => {
    setSelectedData(null);
    toggleCancelModal();
  };

  const onChangeTab = (value) => {
    setTabValue(value);
    if (tabValue === "Pending") {
      setApprovedList([]);
      setRejectedList([]);
      setCanceledList([]);
      setCurrentPagePending(1);
    } else if (tabValue === "Canceled") {
      setPendingList([]);
      setApprovedList([]);
      setRejectedList([]);
      setCurrentPageCanceled(1);
    } else if (tabValue === "Rejected") {
      setPendingList([]);
      setApprovedList([]);
      setCanceledList([]);
      setCurrentPageRejected(1);
    } else {
      setPendingList([]);
      setRejectedList([]);
      setCanceledList([]);
      setCurrentPageApproved(1);
    }
  };

  const cancelLeaveRequestHandler = async () => {
    try {
      toggleCancelLeaveReqeuest();
      await axiosInstance.patch(`/hr/leave-requests/${selectedData?.id}/cancel`);
      refetchPendingLeaveRequest();
      refetchPersonalLeaveRequest();
      toggleCancelModal();
      toggleCancelLeaveReqeuest();
    } catch (err) {
      console.log(err);
      setErrorMessage(err.response.data.message);
      toggleAlert();
      toggleCancelLeaveReqeuest();
    }
  };

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

  useEffect(() => {
    if (canceledLeaveRequest?.data?.data?.length) {
      setCanceledList((prevData) => [...prevData, ...canceledLeaveRequest?.data?.data]);
    }
  }, [canceledLeaveRequest?.data?.data?.length]);

  useFocusEffect(
    useCallback(() => {
      if (firstTimeRef.current) {
        firstTimeRef.current = false;
        return;
      }
      refetchPersonalLeaveRequest();
    }, [refetchPersonalLeaveRequest])
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={{ flexDirection: "row", gap: 1 }}>
          <Text style={{ fontSize: 16, fontWeight: "500" }}>My Leave Request</Text>
        </View>

        {/* <FilterLeave
            filterType={filterType}
            filterYear={filterYear}
            setFilterType={setFilterType}
            setFilterYear={setFilterYear}
          /> */}

        {teamLeaveRequestData?.data.length > 0 && approvalLeaveRequestCheckAccess && (
          <Button height={35} onPress={() => navigation.navigate("Team Leave Request")} padding={5}>
            <Text style={{ fontSize: 12, fontWeight: "500", color: "#FFFFFF" }}>My Team</Text>
          </Button>
        )}
      </View>

      {/* Content here */}
      <PersonalLeaveRequest
        onSelect={openSelectedLeaveHandler}
        pendingList={pendingList}
        approvedList={approvedList}
        rejectedList={rejectedList}
        canceledList={canceledList}
        pendingLeaveRequestIsFetching={pendingLeaveRequestIsFetching}
        approvedLeaveRequestIsFetching={approvedLeaveRequestIsFetching}
        rejectedLeaveRequestIsFetching={rejectedLeaveRequestIsFetching}
        canceledLeaveRequestIsFetching={canceledLeaveRequestIsFetching}
        pendingLeaveRequestIsLoading={pendingLeaveRequestIsLoading}
        approvedLeaveRequestIsLoading={approvedLeaveRequestIsLoading}
        rejectedLeaveRequestIsLoading={rejectedLeaveRequestIsLoading}
        canceledLeaveRequestIsLoading={canceledLeaveRequestIsLoading}
        refetchPendingLeaveRequest={refetchPendingLeaveRequest}
        refetchApprovedLeaveRequest={refetchApprovedLeaveRequest}
        refetchRejectedLeaveRequest={refetchRejectedLeaveRequest}
        refetchCanceledLeaveRequest={refetchCanceledLeaveRequest}
        hasBeenScrolled={hasBeenScrolledRejected}
        setHasBeenScrolled={setHasBeenScrolledRejected}
        hasBeenScrolledPending={hasBeenScrolledPending}
        setHasBeenScrolledPending={setHasBeenScrolledPending}
        hasBeenScrolledApproved={hasBeenScrolledApproved}
        setHasBeenScrolledApproved={setHasBeenScrolledApproved}
        hasBeenScrolledCanceled={hasBeenScrolledCanceled}
        setHasBeenScrolledCanceled={setHasBeenScrolledCanceled}
        fetchMorePending={fetchMorePending}
        fetchMoreApproved={fetchMoreApproved}
        fetchMoreRejected={fetchMoreRejected}
        fetchMoreCanceled={fetchMoreCanceled}
        tabValue={tabValue}
        setTabValue={setTabValue}
        tabs={tabs}
        onChangeTab={onChangeTab}
        refetchPersonalLeaveRequest={refetchPersonalLeaveRequest}
        teamLeaveRequestData={teamLeaveRequestData?.data.length}
        index={index}
        routes={routes}
        layout={layout}
        setIndex={setIndex}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
      />

      <RemoveConfirmationModal
        isOpen={cancelModalIsOpen}
        toggle={closeSelectedLeaveHandler}
        description="Are you sure to cancel this request?"
        isLoading={cancelLeaveRequestIsLoading}
        onPress={cancelLeaveRequestHandler}
      />
      <AlertModal
        isOpen={alertIsOpen}
        toggle={toggleAlert}
        type="danger"
        title="Process error!"
        description={errorMessage || "Please try again later"}
      />
    </SafeAreaView>
  );
};

export default PersonalLeave;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
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
  tabBar: {
    flex: 1,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    marginBottom: 8,
  },
});
