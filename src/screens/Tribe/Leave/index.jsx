import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import _ from "lodash";
import dayjs from "dayjs";

import { Text } from "react-native";

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
import Screen from "../../../layouts/Screen";
import { Colors } from "../../../styles/Color";

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
  const [number, setNumber] = useState(1);

  const approvalLeaveRequestCheckAccess = useCheckAccess(
    "approval",
    "Leave Requests"
  );

  const firstTimeRef = useRef(null);

  const navigation = useNavigation();

  const { isOpen: cancelModalIsOpen, toggle: toggleCancelModal } =
    useDisclosure(false);
  const { isOpen: alertIsOpen, toggle: toggleAlert } = useDisclosure(false);

  const {
    toggle: toggleCancelLeaveReqeuest,
    isLoading: cancelLeaveRequestIsLoading,
  } = useLoading(false);

  const fetchMorePendingParameters = {
    page: currentPagePending,
    limit: 100,
    status: tabValue,
  };

  const fetchMoreApprovedParameters = {
    page: currentPageApproved,
    limit: 10,
    status: tabValue,
  };

  const fetchMoreRejectedParameters = {
    page: currentPageRejected,
    limit: 10,
    status: tabValue,
  };

  const fetchMoreCanceledParameters = {
    page: currentPageCanceled,
    limit: 10,
    status: tabValue,
  };

  const {
    data: pendingLeaveRequest,
    refetch: refetchPendingLeaveRequest,
    isFetching: pendingLeaveRequestIsFetching,
    isLoading: pendingLeaveRequestIsLoading,
  } = useFetch(
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
    tabValue === "Approved" && "/hr/leave-requests/personal",
    [currentPageApproved, reloadApproved],
    fetchMoreApprovedParameters
  );

  const { data: personalLeaveRequest, refetch: refetchPersonalLeaveRequest } =
    useFetch("/hr/leave-requests/personal");
  const { data: teamLeaveRequestData } = useFetch(
    "/hr/leave-requests/waiting-approval"
  );

  const tabs = useMemo(() => {
    return [
      { title: `Pending`, value: "Pending", number: 1 },
      { title: `Canceled`, value: "Canceled", number: 2 },
      { title: `Rejected`, value: "Rejected", number: 3 },
      { title: `Approved`, value: "Approved", number: 4 },
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

  const onChangeNumber = (value) => {
    setNumber(value);
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
      await axiosInstance.patch(
        `/hr/leave-requests/${selectedData?.id}/cancel`
      );
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
      setApprovedList((prevData) => [
        ...prevData,
        ...approvedLeaveRequest?.data?.data,
      ]);
    }
  }, [approvedLeaveRequest?.data?.data?.length]);

  useEffect(() => {
    if (rejectedLeaveRequest?.data?.data?.length) {
      setRejectedList((prevData) => [
        ...prevData,
        ...rejectedLeaveRequest?.data?.data,
      ]);
    }
  }, [rejectedLeaveRequest?.data?.data?.length]);

  useEffect(() => {
    if (canceledLeaveRequest?.data?.data?.length) {
      setCanceledList((prevData) => [
        ...prevData,
        ...canceledLeaveRequest?.data?.data,
      ]);
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
    <Screen
      screenTitle="My Leave Request"
      childrenHeader={
        <>
          {/* <FilterLeave
            filterType={filterType}
            filterYear={filterYear}
            setFilterType={setFilterType}
            setFilterYear={setFilterYear}
          /> */}
          {teamLeaveRequestData?.data?.length > 0 &&
            approvalLeaveRequestCheckAccess && (
              <Button onPress={() => navigation.navigate("Team Leave Request")}>
                <Text style={{ color: Colors.fontLight }}>My Team</Text>
              </Button>
            )}
        </>
      }
    >
      {/* Content here */}
      <PersonalLeaveRequest
        openSelectedHandler={openSelectedLeaveHandler}
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
        number={number}
        setTabValue={setTabValue}
        tabs={tabs}
        onChangeTab={onChangeTab}
        onChangeNumber={onChangeNumber}
        refetchPersonalLeaveRequest={refetchPersonalLeaveRequest}
        teamLeaveRequestData={teamLeaveRequestData?.data.length}
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
    </Screen>
  );
};

export default PersonalLeave;
