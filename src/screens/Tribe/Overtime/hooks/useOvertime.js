import { useMemo, useState } from "react";
import { useFetch } from "../../../../hooks/useFetch";

export const useOvertime = () => {
  const [tabValue, setTabValue] = useState("Pending");
  const [pendingList, setPendingList] = useState([]);
  const [reloadPending, setReloadPending] = useState(false);
  const [approvedList, setApprovedList] = useState([]);
  const [reloadApproved, setReloadApproved] = useState(false);
  const [rejectedList, setRejectedList] = useState([]);
  const [reloadRejected, setReloadRejected] = useState(false);
  const [canceledList, setCanceledList] = useState([]);
  const [reloadCanceled, setReloadCanceled] = useState(false);
  const [currentPagePending, setCurrentPagePending] = useState(1);
  const [currentPageRejected, setCurrentPageRejected] = useState(1);
  const [currentPageApproved, setCurrentPageApproved] = useState(1);
  const [currentPageCanceled, setCurrentPageCanceled] = useState(1);
  const [number, setNumber] = useState(1);

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

  const tabs = useMemo(() => {
    return [
      { title: `Pending`, value: "Pending", number: 1 },
      { title: `Canceled`, value: "Canceled", number: 2 },
      { title: `Rejected`, value: "Rejected", number: 3 },
      { title: `Approved`, value: "Approved", number: 4 },
    ];
  });

  const handleChangeTab = (value) => {
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

  const handleChangeNumber = (value) => {
    setNumber(value);
  };

  return { tabs, tabValue, handleChangeTab, handleChangeNumber, number };
};
