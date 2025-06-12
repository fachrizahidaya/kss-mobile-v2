import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import { useFetch } from "../../../../hooks/useFetch";
import axiosInstance from "../../../../config/api";
import MyTeamLeaveRequest from "../../../../components/Tribe/Leave/TeamLeaveRequest/MyTeamLeaveRequest";
import { useDisclosure } from "../../../../hooks/useDisclosure";
import AlertModal from "../../../../styles/modals/AlertModal";
import Screen from "../../../../layouts/Screen";

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
  const [number, setNumber] = useState(1);

  const navigation = useNavigation();
  const firstTimeRef = useRef(null);

  const { isOpen: responseModalIsOpen, toggle: toggleResponseModal } =
    useDisclosure(false);

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

  const {
    data: pendingLeaveRequest,
    refetch: refetchPendingLeaveRequest,
    isFetching: pendingLeaveRequestIsFetching,
    isLoading: pendingLeaveRequestIsLoading,
  } = useFetch(
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
    tabValue === "Rejected" && "/hr/leave-requests/my-team",
    [currentPageRejected, reloadRejected],
    fetchMoreRejectedParameters
  );

  const { data: teamLeaveRequest, refetch: refetchTeamLeaveRequest } = useFetch(
    "/hr/leave-requests/my-team"
  );

  const tabs = useMemo(() => {
    return [
      { title: `Waiting Approval`, value: "Pending", number: 1 },
      { title: `Approved`, value: "Approved", number: 2 },
      { title: `Rejected`, value: "Rejected", number: 3 },
    ];
  }, [teamLeaveRequest]);

  const handleChangeNumber = (value) => {
    setNumber(value);
  };

  const handleChangeTab = (value) => {
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
   * Handle submit response of leave request
   * @param {*} data
   * @param {*} setStatus
   * @param {*} setSubmitting
   */
  const handleApprovalResponse = async (data, setStatus, setSubmitting) => {
    try {
      const res = await axiosInstance.post(`/hr/approvals/approval`, data);
      if (data.status === "Approved") {
        setRequestType("patch");
      } else {
        setRequestType("reject");
      }
      toggleResponseModal();
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
    <Screen
      screenTitle="My Team Leave Request"
      returnButton={true}
      onPress={() => navigation.goBack()}
    >
      {isReady ? (
        <>
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
            handleApproval={handleApprovalResponse}
            tabValue={tabValue}
            number={number}
            tabs={tabs}
            onChangeTab={handleChangeTab}
            onChangeNumber={handleChangeNumber}
            refetchTeamLeaveRequest={refetchTeamLeaveRequest}
          />
        </>
      ) : null}

      <AlertModal
        isOpen={responseModalIsOpen}
        toggle={toggleResponseModal}
        type={
          requestType === "patch"
            ? "success"
            : requestType === "reject"
            ? "warning"
            : "danger"
        }
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
    </Screen>
  );
};

export default TeamLeave;
